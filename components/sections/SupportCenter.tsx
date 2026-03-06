import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ResourceSection,
  SupportResourceType,
  SYSTEM_BASICS_CONTENT,
  PRIVACY_CONTENT,
  FAQ_CONTENT,
  BILLING_CONTENT,
  APP_STORE_CONTENT,
} from './supportResources';

type SupportGroup = {
  type: SupportResourceType;
  title: string;
  description: string;
  sections: ResourceSection[];
};

type IndexedSection = ResourceSection & {
  groupType: SupportResourceType;
  groupTitle: string;
  groupDescription: string;
  normalizedSearchText: string;
  normalizedTitle: string;
  normalizedBody: string;
  normalizedId: string;
  normalizedGroupTitle: string;
  compactTitle: string;
  searchWords: string[];
};

const groups: SupportGroup[] = [
  {
    type: 'system-basics',
    title: 'System basics',
    description: 'How the app, automation, and circle controls work together to keep you protected.',
    sections: SYSTEM_BASICS_CONTENT,
  },
  {
    type: 'privacy',
    title: 'Privacy & security',
    description: 'Policies on data collection, retention, and how your circle sees call content.',
    sections: PRIVACY_CONTENT,
  },
  {
    type: 'faq',
    title: 'Support FAQ',
    description: 'Common questions we hear from families, tickets, and billing inquiries.',
    sections: FAQ_CONTENT,
  },
  {
    type: 'billing',
    title: 'Billing & subscriptions',
    description: 'Guidance for store billing, refunds, and how support helps.',
    sections: BILLING_CONTENT,
  },
  {
    type: 'app-store',
    title: 'Apple platform policies',
    description: 'iOS age suitability details, accessibility approach, and platform policy guidance.',
    sections: APP_STORE_CONTENT,
  },
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const splitWords = (value: string) => normalizeText(value).split(' ').filter(Boolean);

const isSubsequence = (needle: string, haystack: string) => {
  if (!needle || !haystack) return false;
  let i = 0;
  let j = 0;
  while (i < needle.length && j < haystack.length) {
    if (needle[i] === haystack[j]) i += 1;
    j += 1;
  }
  return i === needle.length;
};

const levenshteinDistance = (a: string, b: string, maxDistance = 2) => {
  const aLen = a.length;
  const bLen = b.length;

  if (!aLen) return bLen;
  if (!bLen) return aLen;
  if (Math.abs(aLen - bLen) > maxDistance) return maxDistance + 1;

  let previous: number[] = [];
  let current: number[] = [];

  for (let j = 0; j <= bLen; j += 1) {
    previous[j] = j;
  }

  for (let i = 1; i <= aLen; i += 1) {
    current[0] = i;
    let rowMin = current[0];

    for (let j = 1; j <= bLen; j += 1) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + substitutionCost
      );
      if (current[j] < rowMin) rowMin = current[j];
    }

    if (rowMin > maxDistance) return maxDistance + 1;

    const temp = previous;
    previous = current;
    current = temp;
  }

  return previous[bLen];
};

const getTokenScore = (token: string, section: IndexedSection) => {
  if (!token) return 0;

  let score = 0;

  if (section.normalizedTitle.includes(token)) score = Math.max(score, 42);
  if (section.normalizedId.includes(token)) score = Math.max(score, 34);
  if (section.normalizedGroupTitle.includes(token)) score = Math.max(score, 24);
  if (section.normalizedBody.includes(token)) score = Math.max(score, 14);

  if (score > 0) return score;

  if (section.searchWords.some((word) => word.startsWith(token))) {
    score = Math.max(score, 12);
  }

  if (token.length >= 4) {
    const compactToken = token.replace(/\s+/g, '');
    if (compactToken && isSubsequence(compactToken, section.compactTitle)) {
      score = Math.max(score, 10);
    }

    for (const word of section.searchWords) {
      if (Math.abs(word.length - token.length) > 2) continue;
      const distance = levenshteinDistance(token, word, 2);
      if (distance === 1) {
        score = Math.max(score, 10);
        break;
      }
      if (distance === 2) {
        score = Math.max(score, 7);
      }
    }
  }

  return score;
};

const getMatchScore = (section: IndexedSection, normalizedQuery: string, queryTokens: string[]) => {
  if (!normalizedQuery) return 0;

  let score = 0;

  if (section.normalizedTitle.includes(normalizedQuery)) score += 120;
  if (section.normalizedId.includes(normalizedQuery)) score += 100;
  if (section.normalizedGroupTitle.includes(normalizedQuery)) score += 70;
  if (section.normalizedBody.includes(normalizedQuery)) score += 36;
  if (section.normalizedSearchText.includes(normalizedQuery)) score += 18;

  for (const token of queryTokens) {
    score += getTokenScore(token, section);
  }

  if (queryTokens.length > 1 && section.normalizedTitle.includes(queryTokens.join(' '))) {
    score += 25;
  }

  return score;
};

export const SupportCenter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionSlug } = useParams<{ sectionSlug?: string }>();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const scrollOffset = 140;

  useEffect(() => {
    const queryFromUrl = searchParams.get('q') ?? '';
    setQuery((prev) => (prev === queryFromUrl ? prev : queryFromUrl));
  }, [searchParams]);

  const indexedSections = useMemo<IndexedSection[]>(
    () =>
      groups.flatMap((group) =>
        group.sections.map((section) => {
          const bodyContent = [section.body, ...(section.bullets ?? [])].join(' ');
          const referenceContent = (section.references ?? [])
            .map((reference) => `${reference.prefix ?? ''} ${reference.label} ${reference.url}`)
            .join(' ');
          const searchSource = `${section.id} ${section.title} ${bodyContent} ${referenceContent} ${group.title} ${group.description}`;
          const normalizedSearchText = normalizeText(searchSource);
          const searchWords = Array.from(
            new Set(normalizedSearchText.split(' ').filter((word) => word.length > 1))
          );

          return {
            ...section,
            groupType: group.type,
            groupTitle: group.title,
            groupDescription: group.description,
            normalizedSearchText,
            normalizedTitle: normalizeText(section.title),
            normalizedBody: normalizeText(bodyContent),
            normalizedId: normalizeText(section.id),
            normalizedGroupTitle: normalizeText(group.title),
            compactTitle: normalizeText(section.title).replace(/\s+/g, ''),
            searchWords,
          };
        })
      ),
    []
  );

  const normalizedQuery = useMemo(() => normalizeText(query), [query]);
  const queryTokens = useMemo(() => splitWords(query), [query]);

  const searchMatches = useMemo(() => {
    if (!normalizedQuery) return [] as { section: IndexedSection; score: number }[];

    const matches: { section: IndexedSection; score: number }[] = [];

    for (const section of indexedSections) {
      const score = getMatchScore(section, normalizedQuery, queryTokens);
      if (score > 0) {
        matches.push({ section, score });
      }
    }

    matches.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.section.title.localeCompare(b.section.title);
    });

    return matches;
  }, [indexedSections, normalizedQuery, queryTokens]);

  const matchedSectionIds = useMemo(
    () => new Set(searchMatches.map((item) => item.section.id)),
    [searchMatches]
  );

  const visibleGroups = useMemo(() => {
    if (!normalizedQuery) return groups;

    return groups
      .map((group) => ({
        ...group,
        sections: group.sections.filter((section) => matchedSectionIds.has(section.id)),
      }))
      .filter((group) => group.sections.length > 0);
  }, [matchedSectionIds, normalizedQuery]);

  const visibleSections = useMemo(
    () => visibleGroups.flatMap((group) => group.sections),
    [visibleGroups]
  );

  const allSectionIds = useMemo(() => indexedSections.map((section) => section.id), [indexedSections]);
  const sectionIds = useMemo(() => visibleSections.map((section) => section.id), [visibleSections]);

  const sectionTitleById = useMemo(() => {
    const titleMap = new Map<string, string>();
    for (const section of visibleSections) {
      titleMap.set(section.id, section.title);
    }
    return titleMap;
  }, [visibleSections]);

  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!sectionIds.length) {
      setActiveSection('');
      return;
    }

    setActiveSection((prev) => (prev && sectionIds.includes(prev) ? prev : sectionIds[0]));
  }, [sectionIds]);

  const updateQueryRoute = useCallback(
    (nextQuery: string) => {
      const params = new URLSearchParams(location.search);
      const trimmed = nextQuery.trim();
      const hasActiveQuery = Boolean(trimmed);
      if (trimmed) {
        params.set('q', trimmed);
      } else {
        params.delete('q');
      }

      const search = params.toString();
      const nextSearch = search ? `?${search}` : '';
      const nextHash = hasActiveQuery ? '' : location.hash;
      const nextPathname = hasActiveQuery ? '/support' : location.pathname;
      if (
        nextSearch === location.search &&
        nextHash === location.hash &&
        nextPathname === location.pathname
      ) {
        return;
      }

      navigate(
        {
          pathname: nextPathname,
          search: nextSearch,
          hash: nextHash,
        },
        { replace: true }
      );
    },
    [location.hash, location.pathname, location.search, navigate]
  );

  const scrollToSection = useCallback(
    (id: string, behavior: ScrollBehavior = 'smooth', updateRoute = true) => {
      const target = document.getElementById(id);
      if (!target) return;

      const targetTop = target.offsetTop - scrollOffset;
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior,
      });
      setActiveSection(id);

      if (updateRoute) {
        navigate(
          {
            pathname: `/support/${id}`,
            search: location.search,
            hash: '',
          },
          { replace: true }
        );
      }
    },
    [location.search, navigate]
  );

  useEffect(() => {
    const hashId = location.hash.replace('#', '');
    if (!hashId || !allSectionIds.includes(hashId)) return;

    const timer = window.setTimeout(() => {
      scrollToSection(hashId, 'auto', false);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [allSectionIds, location.hash, scrollToSection]);

  useEffect(() => {
    if (!sectionSlug) return;
    if (allSectionIds.includes(sectionSlug)) return;

    navigate(
      {
        pathname: '/support',
        search: location.search,
        hash: location.hash,
      },
      { replace: true }
    );
  }, [allSectionIds, location.hash, location.search, navigate, sectionSlug]);

  useEffect(() => {
    if (!sectionSlug || !allSectionIds.includes(sectionSlug)) return;

    const timer = window.setTimeout(() => {
      scrollToSection(sectionSlug, 'auto', false);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [allSectionIds, scrollToSection, sectionSlug]);

  useEffect(() => {
    if (!sectionIds.length) return;

    const computeCurrentSection = () => {
      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= window.scrollY + scrollOffset) {
          current = id;
        } else {
          break;
        }
      }
      return current;
    };

    if (typeof IntersectionObserver !== 'undefined') {
      const entryMap = new Map<string, IntersectionObserverEntry>();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = (entry.target as HTMLElement).id;
            if (!id) return;
            entryMap.set(id, entry);
          });

          const visible = Array.from(entryMap.values())
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

          const next = visible.length
            ? ((visible[0].target as HTMLElement).id ?? sectionIds[0] ?? '')
            : computeCurrentSection();

          setActiveSection((prev) => (prev !== next ? next : prev));
        },
        {
          root: null,
          rootMargin: `-${scrollOffset}px 0px -55% 0px`,
          threshold: [0, 0.2, 0.5, 1],
        }
      );

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      const initialCurrent = computeCurrentSection();
      setActiveSection((prev) => (prev !== initialCurrent ? initialCurrent : prev));
      return () => observer.disconnect();
    }

    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = window.requestAnimationFrame(() => {
        const current = computeCurrentSection();
        setActiveSection((prev) => (prev !== current ? current : prev));
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [sectionIds]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setQuery(nextValue);
    updateQueryRoute(nextValue);
  };

  const clearSearch = () => {
    setQuery('');
    updateQueryRoute('');
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue">Support hub</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text">
            Your support center
          </h1>
          <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-3xl">
            Browse system basics, privacy notes, FAQs, billing answers, and iOS age-suitability guidance in one place.
          </p>
        </div>

        <div className="mt-8 border-t border-light-border dark:border-dark-border pt-6">
          <label
            htmlFor="support-search"
            className="text-xs sm:text-sm uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted"
          >
            Search the support center
          </label>

          <div className="mt-3 relative max-w-4xl">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted pointer-events-none"
            />
            <input
              id="support-search"
              type="search"
              value={query}
              onChange={handleSearchChange}
              placeholder="Try: billing refund, trusted contacts, iOS 12+"
              className="support-search-input w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent pl-10 pr-11 py-3 text-sm sm:text-base text-light-text dark:text-dark-text placeholder:text-light-muted dark:placeholder:text-dark-muted focus:outline-none focus:ring-2 focus:ring-brand-blue/40 appearance-none"
            />
            {query ? (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Clear support search"
              >
                <X size={16} />
              </button>
            ) : null}
          </div>

          <p className="mt-2 text-xs sm:text-sm text-light-muted dark:text-dark-muted">
            {normalizedQuery
              ? `${searchMatches.length} ${searchMatches.length === 1 ? 'match' : 'matches'} found`
              : `${sectionIds.length} sections available`}
          </p>

          {normalizedQuery && searchMatches.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {searchMatches.slice(0, 6).map(({ section }) => (
                <button
                  key={`match-${section.id}`}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className="rounded-full border border-light-border dark:border-dark-border bg-light-bg/60 dark:bg-dark-bg/60 px-3 py-1.5 text-xs sm:text-sm text-light-text dark:text-dark-text hover:border-brand-blue/40 hover:text-brand-blue transition-colors"
                >
                  {section.title}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-4 lg:hidden">
          <label
            htmlFor="support-jump"
            className="text-xs uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted"
          >
            Jump to section
          </label>
          <select
            id="support-jump"
            value={activeSection}
            onChange={(event) => {
              const nextId = event.target.value;
              if (!nextId) return;
              scrollToSection(nextId);
            }}
            className="mt-2 w-full rounded-xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-[#0f1726] px-3 py-2.5 text-sm text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          >
            {sectionIds.map((id) => (
              <option key={id} value={id}>
                {sectionTitleById.get(id) ?? id}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px,1fr]">
          <aside className="hidden lg:block sticky top-24 self-start rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-5 shadow-sm">
            {visibleGroups.length > 0 ? (
              <nav className="flex flex-col gap-6" aria-label="Support section navigation">
                {visibleGroups.map((group) => (
                  <div key={group.type} className="space-y-2 flex flex-col gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-light-muted dark:text-dark-muted">
                        {group.title}
                      </p>
                      <p className="text-xs text-light-text dark:text-dark-text">{group.description}</p>
                    </div>
                    <div className="space-y-1 flex flex-col gap-1">
                      {group.sections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                          <a
                            key={section.id}
                            href={`/support/${section.id}`}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(section.id);
                            }}
                            className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                              isActive
                                ? 'bg-brand-blue/15 text-light-text dark:text-white'
                                : 'text-light-text dark:text-dark-text hover:text-brand-blue'
                            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue/60`}
                          >
                            {section.title}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-light-muted dark:text-dark-muted">
                No sections match your query yet. Try a broader keyword.
              </p>
            )}
          </aside>

          <div className="space-y-12">
            {visibleGroups.length === 0 ? (
              <div className="rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-8 text-center">
                <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text">No matching support articles</h2>
                <p className="mt-3 text-sm sm:text-base text-light-muted dark:text-dark-muted">
                  Try broader terms like "billing", "automation", "safe phrases", or "trusted contacts".
                </p>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 inline-flex items-center rounded-xl border border-brand-blue/30 bg-brand-blue/10 px-4 py-2 text-sm font-medium text-brand-blue hover:bg-brand-blue/15 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              visibleGroups.map((group) => (
                <div key={group.type}>
                  <div className="rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 sm:p-8 shadow-sm">
                    {group.type === 'system-basics' ? (
                      <div className="mb-6 h-1.5 w-16 rounded-full bg-brand-blue/70" aria-hidden />
                    ) : group.type === 'app-store' ? (
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-blue/25 bg-brand-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
                        iOS 12+
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-light-muted dark:text-dark-muted">
                        {group.title}
                      </p>
                      <p className="text-sm text-light-text dark:text-dark-text">{group.description}</p>
                    </div>

                    <div className="mt-8 space-y-8">
                      {group.sections.map((section) => (
                        <article
                          id={section.id}
                          key={section.id}
                          className={`space-y-4 scroll-mt-28 ${
                            group.type === 'system-basics'
                              ? 'border-l-2 border-brand-blue/30 pl-4 sm:pl-5'
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-1.5 flex-1 rounded-full bg-light-border dark:bg-dark-border" />
                            <span
                              className={`text-xs uppercase tracking-[0.3em] ${
                                group.type === 'app-store'
                                  ? 'text-brand-blue'
                                  : 'text-light-muted dark:text-dark-muted'
                              }`}
                            >
                              {section.id}
                            </span>
                          </div>
                          <h3 className="text-2xl font-semibold text-light-text dark:text-dark-text">
                            {section.title}
                          </h3>
                          <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                            {section.body}
                          </p>
                          {section.references?.length ? (
                            <div className="flex flex-wrap gap-3">
                              {section.references.map((reference) => (
                                <a
                                  key={`${section.id}-${reference.url}-${reference.label}`}
                                  href={reference.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
                                >
                                  {reference.prefix ? `${reference.prefix}: ` : ''}
                                  {reference.label}
                                </a>
                              ))}
                            </div>
                          ) : null}
                          {section.bullets ? (
                            <ul className="space-y-2 text-sm text-light-text dark:text-dark-text list-disc list-inside marker:text-brand-blue dark:marker:text-brand-blue marker:font-semibold">
                              {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
