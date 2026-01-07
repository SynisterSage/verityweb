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
  const baseUrl = 'https://www.verityprotect.com';

  // Organization + WebSite JSON-LD to help Google associate brand with site
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Verity Protect",
    "url": baseUrl,
    "logo": `${baseUrl}/logo-192.png`,
    "sameAs": []
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": baseUrl,
    "name": "Verity Protect",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ items (copied from components/sections/FAQ.tsx) so we can prerender JSON-LD
  const faqItems = [
    {
      question: "Can I use this with mobile phones and landlines?",
      answer: "Yes. Verity works with mobile phones and most landlines so calls stay protected no matter the device."
    },
    {
      question: "Will my loved one have to answer unknown callers?",
      answer: "No. Unknown callers are screened and sent to voicemail for family review so your loved one is not bothered by strangers."
    },
    {
      question: "How does the Family PIN work?",
      answer: "Unknown callers are asked to enter a short Family PIN. If they enter it correctly the call connects. If they get it wrong or skip it, they leave a short voicemail for your family to review. You can turn the PIN off if you prefer."
    },
    {
      question: "What happens if a caller isn't on the trusted list?",
      answer: "Their call is answered by Verity, not your loved one. Verity asks them to leave a short message (or enter the PIN if you’ve turned that on). You review it in the app and decide to allow or block the number."
    },
    {
      question: "How do trusted contacts work?",
      answer: "Add family, friends, and doctors from your phone's Contacts. Calls from trusted contacts bypass the PIN and ring through right away."
    },
    {
      question: "What if a doctor or caregiver calls from a new number?",
      answer: "They will be asked for the Family PIN. If they enter it the call connects. If not, they can leave a short message and you can mark the number as trusted afterward."
    },
    {
      question: "How much does this cost?",
      answer: "We're in early access and will share pricing soon. Join the waitlist to get updates and early access offers."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(i => ({
      "@type": "Question",
      "name": i.question,
      "acceptedAnswer": { "@type": "Answer", "text": i.answer }
    }))
  };

  Object.keys(seo).forEach((route) => {
    const data = seo[route];
    const canonical = baseUrl + (route === '/' ? '/' : route);
    const title = data.title && data.title.includes('|') ? data.title : data.title;
    const metaHtml = buildMeta({ title, description: data.description, ogImage: data.ogImage, canonical });
    // Inject JSON-LD for Organization and WebSite into every prerendered page
    let jsonLdScripts = `\n    <script type="application/ld+json">${JSON.stringify(orgJsonLd)}</script>\n    <script type="application/ld+json">${JSON.stringify(websiteJsonLd)}</script>`;
    // For the FAQ route, also inject the FAQPage JSON-LD so Google sees it in the static HTML
    if (route === '/faq') {
      jsonLdScripts += `\n    <script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`;
    }
    writeForRoute(template, route, metaHtml + jsonLdScripts);
  });
}

main();
