const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const seoPath = path.join(projectRoot, 'src', 'seo.json');

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

function readTemplate() {
  const indexHtml = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtml)) {
    console.error('Missing built index.html in dist/. Run `npm run build` first.');
    process.exit(1);
  }
  return fs.readFileSync(indexHtml, 'utf8');
}

function removeExistingTags(head) {
  return head
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name=["']description["'][^>]*>/i, '')
    .replace(/<meta[^>]+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/<meta[^>]+name=["']twitter:[^"']+["'][^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/i, '');
}

function buildMeta({ title, description, ogImage, canonical }) {
  const parts = [];
  if (title) parts.push(`<title>${title}</title>`);
  if (description) parts.push(`<meta name="description" content="${escapeHtml(description)}" />`);

  if (title) parts.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  if (description) parts.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  if (ogImage) parts.push(`<meta property="og:image" content="${ogImage}" />`);
  parts.push(`<meta property="og:type" content="website" />`);

  parts.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (title) parts.push(`<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  if (description) parts.push(`<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  if (ogImage) parts.push(`<meta name="twitter:image" content="${ogImage}" />`);

  if (canonical) parts.push(`<link rel="canonical" href="${canonical}" />`);

  return parts.join('\n    ');
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
  const template = readTemplate();
  const baseUrl = 'https://verityprotect.com';

  Object.keys(seo).forEach((route) => {
    const data = seo[route];
    const canonical = baseUrl + (route === '/' ? '/' : route);
    const title = data.title && data.title.includes('|') ? data.title : data.title;
    const metaHtml = buildMeta({ title, description: data.description, ogImage: data.ogImage, canonical });
    writeForRoute(template, route, metaHtml);
  });
}

main();
