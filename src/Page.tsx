import React from 'react';
import { Helmet } from 'react-helmet-async';
import seo, { SITE_URL } from './seo';
import { getSmartAppBannerContent } from './appStore';

interface PageProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, description, children }) => {
  const base = 'Verity Protect';
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pathname = rawPath.replace(/\/$/, '') || '/';

  const routeSeo = seo[pathname] || {};
  const resolvedTitle = title || routeSeo.title || seo['/'].title || base;
  const finalTitle = resolvedTitle.includes('|') || resolvedTitle === base ? resolvedTitle : `${resolvedTitle} | ${base}`;
  const resolvedDescription = description || routeSeo.description || seo['/'].description || '';
  const rawOgImage = routeSeo.ogImage || seo['/'].ogImage || '/og-image.png';
  const ogImage = /^https?:\/\//i.test(rawOgImage)
    ? rawOgImage
    : `${SITE_URL}${rawOgImage.startsWith('/') ? '' : '/'}${rawOgImage}`;
  const canonicalPath = pathname === '/' ? '/' : pathname;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const smartAppBannerContent = getSmartAppBannerContent(pathname);
  const isIndexable = routeSeo.indexable !== false;
  const robotsContent = isIndexable
    ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    : 'noindex,nofollow,noarchive';

  return (
    <>
      <Helmet>
        {smartAppBannerContent ? (
          <meta name="apple-itunes-app" content={smartAppBannerContent} />
        ) : null}
        <title>{finalTitle}</title>
        <meta name="description" content={resolvedDescription} />
        <meta name="robots" content={robotsContent} />
        <meta name="googlebot" content={robotsContent} />

        {/* Open Graph */}
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={base} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={resolvedDescription} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="animate-in fade-in duration-500">{children}</div>
    </>
  );
};

export default Page;
