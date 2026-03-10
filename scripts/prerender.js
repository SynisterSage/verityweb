const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const seoPath = path.join(projectRoot, 'src', 'seo.json');
const appStoreConfigPath = path.join(projectRoot, 'src', 'appStoreConfig.json');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function loadSeo() {
  if (!fs.existsSync(seoPath)) {
    console.error('Missing src/seo.json');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(seoPath, 'utf8'));
}

function loadAppStoreConfig() {
  if (!fs.existsSync(appStoreConfigPath)) {
    console.error('Missing src/appStoreConfig.json');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(appStoreConfigPath, 'utf8'));
}

function readTemplate() {
  const indexHtml = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtml)) {
    console.error('Missing built index.html in dist/. Run `npm run build` first.');
    process.exit(1);
  }
  return fs.readFileSync(indexHtml, 'utf8');
}

function removeExistingTags(head) {
  // remove title, description, og:*, twitter:*, canonical
  return head
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name=["']apple-itunes-app["'][^>]*>/i, '')
    .replace(/<meta[^>]+name=["']description["'][^>]*>/i, '')
    .replace(/<meta[^>]+name=["']robots["'][^>]*>/i, '')
    .replace(/<meta[^>]+name=["']googlebot["'][^>]*>/i, '')
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, '');
}

function toAbsoluteUrl(url, baseUrl) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}

function buildMeta({ title, description, ogImage, canonical, indexable, baseUrl }) {
  const parts = [];
  if (title) parts.push(`<title>${title}</title>`);
  if (description) parts.push(`<meta name="description" content="${escapeHtml(description)}" />`);
  const robots = indexable === false
    ? 'noindex,nofollow,noarchive'
    : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  parts.push(`<meta name="robots" content="${robots}" />`);
  parts.push(`<meta name="googlebot" content="${robots}" />`);

  // Open Graph
  const resolvedOgImage = toAbsoluteUrl(ogImage || '/og-image.png', baseUrl);
  if (title) parts.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  if (description) parts.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  if (resolvedOgImage) parts.push(`<meta property="og:image" content="${resolvedOgImage}" />`);
  if (canonical) parts.push(`<meta property="og:url" content="${canonical}" />`);
  parts.push(`<meta property="og:site_name" content="Verity Protect" />`);
  parts.push(`<meta property="og:locale" content="en_US" />`);
  parts.push(`<meta property="og:type" content="website" />`);

  // Twitter
  parts.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (title) parts.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  if (description) parts.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  if (resolvedOgImage) parts.push(`<meta name="twitter:image" content="${resolvedOgImage}" />`);

  if (canonical) parts.push(`<link rel="canonical" href="${canonical}" />`);

  return parts.join('\n    ');
}

function normalizeRoute(route) {
  return route.replace(/\/$/, '') || '/';
}

function getSmartAppBannerContent(route, appStoreConfig) {
  const normalizedRoute = normalizeRoute(route);
  if (!appStoreConfig.smartAppBannerRoutes.includes(normalizedRoute)) {
    return null;
  }

  return `app-id=${appStoreConfig.appId}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function writeForRoute(template, route, metaHtml) {
  // route: '/' or '/how-it-works'
  const outPath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.replace(/^\//, ''), 'index.html');
  const headOpen = template.indexOf('<head>');
  const headClose = template.indexOf('</head>');
  if (headOpen === -1 || headClose === -1) {
    console.error('index.html does not contain <head>...</head>');
    process.exit(1);
  }
  const beforeHead = template.slice(0, headOpen + '<head>'.length);
  const headContent = template.slice(headOpen + '<head>'.length, headClose);
  const afterHead = template.slice(headClose);

  const cleaned = removeExistingTags(headContent);
  const newHead = cleaned + '\n    ' + metaHtml + '\n  ';

  const outHtml = beforeHead + newHead + afterHead;

  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, outHtml, 'utf8');
  console.log('Wrote', outPath);
}

function main() {
  const seo = loadSeo();
  const appStoreConfig = loadAppStoreConfig();
  const template = readTemplate();
  const baseUrl = 'https://www.verityprotect.com';

  Object.keys(seo).forEach((route) => {
    const data = seo[route];
    const canonical = baseUrl + (route === '/' ? '/' : route);
    const title = data.title && data.title.includes('|') ? data.title : data.title;
    const metaParts = [];
    const smartAppBannerContent = getSmartAppBannerContent(route, appStoreConfig);
    if (smartAppBannerContent) {
      metaParts.push(`<meta name="apple-itunes-app" content="${escapeHtml(smartAppBannerContent)}" />`);
    }
    metaParts.push(buildMeta({
      title,
      description: data.description,
      ogImage: data.ogImage,
      canonical,
      indexable: data.indexable,
      baseUrl
    }));
    writeForRoute(template, route, metaParts.join('\n    '));
  });
}

main();
