import React, { useEffect, useMemo, useState } from 'react';
import {
  ResourceSection,
  SupportResourceType,
  SYSTEM_BASICS_CONTENT,
  PRIVACY_CONTENT,
  FAQ_CONTENT,
  BILLING_CONTENT,
} from './supportResources';

const groups: { type: SupportResourceType; title: string; description: string; sections: ResourceSection[] }[] = [
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
];

export const SupportCenter: React.FC = () => {
  const sectionIds = useMemo(
    () => groups.flatMap((group) => group.sections).map((section) => section.id),
    []
  );
  const flatSections = useMemo(
    () => groups.flatMap((group) => group.sections),
    []
  );
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  const scrollOffset = 140;

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const targetTop = target.offsetTop - scrollOffset;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const elementTop = el.offsetTop;
        if (elementTop <= window.scrollY + scrollOffset) {
          current = id;
        } else {
          break;
        }
      }
      setActiveSection((prev) => (prev !== current ? current : prev));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-blue">Support hub</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text">
              Your support center
            </h1>
            <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted max-w-3xl">
              Browse system basics, privacy notes, FAQs, and billing answers in one place.
            </p>
          </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px,1fr]">
          <aside className="hidden lg:block sticky top-24 self-start rounded-3xl border border-light-border dark:border-dark-border bg-light-card/60 dark:bg-dark-card/60 p-6 shadow-lg shadow-black/5 backdrop-blur">
            <nav className="flex flex-col gap-6" aria-label="Support section navigation">
              {groups.map((group) => (
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
                          href={`#${section.id}`}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSection(section.id);
                            scrollToSection(section.id);
                          }}
                          className={`rounded-2xl px-3 py-2 text-sm font-medium transition duration-200 border border-transparent ${
                            isActive
                              ? 'bg-brand-blue/15 text-light-text dark:text-white border-brand-blue/40'
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
          </aside>

          <div className="space-y-12">
            {groups.map((group) => (
              <div key={group.type}>
                <div className="rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-inner shadow-black/5 p-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-light-muted dark:text-dark-muted">
                      {group.title}
                    </p>
                    <p className="text-sm text-light-text dark:text-dark-text">{group.description}</p>
                  </div>

                  <div className="mt-8 space-y-8">
                    {group.sections.map((section) => (
                        <article id={section.id} key={section.id} className="space-y-4 scroll-mt-28">
                        <div className="flex items-center gap-3">
                          <span className="h-1.5 flex-1 rounded-full bg-light-border dark:bg-dark-border" />
                          <span className="text-xs uppercase tracking-[0.3em] text-light-muted dark:text-dark-muted">
                            {section.id}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-light-text dark:text-dark-text">
                          {section.title}
                        </h3>
                        <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                          {section.body}
                        </p>
                        {section.bullets && (
                          <ul className="space-y-2 text-sm text-light-text dark:text-dark-text list-disc list-inside marker:text-brand-blue dark:marker:text-brand-blue marker:font-semibold">
                            {section.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
