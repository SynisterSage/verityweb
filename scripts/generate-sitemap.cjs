const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const seoPath = path.join(projectRoot, 'src', 'seo.json');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const siteUrl = 'https://www.verityprotect.com';

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toAbsoluteUrl = (route) => {
  if (route === '/') return `${siteUrl}/`;
  return `${siteUrl}${route}`;
};

const formatPriority = (priority) => {
  const normalized = Number(Number(priority).toFixed(2));
  return Number.isInteger(normalized) ? normalized.toFixed(1) : String(normalized);
};

const buildSitemapXml = (routes) => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  for (const route of Object.keys(routes)) {
    const entry = routes[route];
    const includeInSitemap = entry.includeInSitemap !== false && entry.indexable !== false;
    if (!includeInSitemap) continue;

    lines.push('  <url>');
    lines.push(`    <loc>${escapeXml(toAbsoluteUrl(route))}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    if (entry.changefreq) {
      lines.push(`    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`);
    }
    if (typeof entry.priority === 'number') {
      lines.push(`    <priority>${formatPriority(entry.priority)}</priority>`);
    }
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  lines.push('');
  return lines.join('\n');
};

const rawSeo = fs.readFileSync(seoPath, 'utf8');
const seo = JSON.parse(rawSeo);
const xml = buildSitemapXml(seo);
fs.writeFileSync(sitemapPath, xml);
console.log(`Wrote ${sitemapPath}`);
