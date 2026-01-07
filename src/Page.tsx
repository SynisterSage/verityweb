import React from 'react';
import { Helmet } from 'react-helmet-async';
import seo from './seo';

interface PageProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, description, children }) => {
  const base = 'Verity Protect';
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const rawPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const pathname = rawPath.replace(/\/$/, '') || '/';

  const routeSeo = seo[pathname] || {};
  const resolvedTitle = title || routeSeo.title || seo['/'].title || base;
  const finalTitle = resolvedTitle.includes('|') || resolvedTitle === base ? resolvedTitle : `${resolvedTitle} | ${base}`;
  const resolvedDescription = description || routeSeo.description || seo['/'].description || '';
  const defaultOgBase = '/og-image.png';
  const defaultOg2x = '/og-image@2x.png';
  let ogImage = routeSeo.ogImage || seo['/'].ogImage || defaultOgBase;
  try {
    if (typeof window !== 'undefined' && (window as any).devicePixelRatio >= 2) {
      if (ogImage.endsWith('.png')) {
        ogImage = ogImage.replace(/\.png$/, '@2x.png');
      } else {
        ogImage = defaultOg2x;
      }
    }
  } catch {}
  const canonicalPath = pathname === '/' ? '/' : pathname;

  return (
    <>
      <Helmet>
        <title>{finalTitle}</title>
        <meta name="description" content={resolvedDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={resolvedDescription} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="canonical" href={`${origin}${canonicalPath}`} />
      </Helmet>

      <div className="animate-in fade-in duration-500">{children}</div>
    </>
  );
};

export default Page;
