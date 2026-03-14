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

  const resolvedOgImage = toAbsoluteUrl(ogImage || '/og-image.png', baseUrl);
  if (title) parts.push(`<meta property="og:title" content="${escapeHtml(title)}" />`);
  if (description) parts.push(`<meta property="og:description" content="${escapeHtml(description)}" />`);
  if (resolvedOgImage) parts.push(`<meta property="og:image" content="${resolvedOgImage}" />`);
  if (canonical) parts.push(`<meta property="og:url" content="${canonical}" />`);
  parts.push(`<meta property="og:site_name" content="Verity Protect" />`);
  parts.push(`<meta property="og:locale" content="en_US" />`);
  parts.push(`<meta property="og:type" content="website" />`);

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
      "target": `${baseUrl}/support?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Verity Protect",
    "applicationCategory": "CommunicationApplication",
    "operatingSystem": "iOS",
    "url": baseUrl,
    "description": "Family-managed call screening that protects older adults from scam calls.",
    "offers": [
      {
        "@type": "Offer",
        "name": "Monthly plan",
        "price": "9.99",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "9.99",
          "priceCurrency": "USD",
          "billingDuration": "P1M"
        }
      },
      {
        "@type": "Offer",
        "name": "Annual plan",
        "price": "99.99",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "99.99",
          "priceCurrency": "USD",
          "billingDuration": "P1Y"
        }
      }
    ]
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
      answer: "Verity Protect is $9.99 per month or $99.99 per year, which is about 17% off monthly billing. The monthly plan begins with a 7-day free trial before your Apple account is charged."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes. The monthly plan starts with a 7-day free trial. We surface an in-app reminder when two days remain so you can keep protection or cancel before the charge hits your Apple ID."
    },
    {
      question: "How is billing handled?",
      answer: "All charges run through Apple subscriptions so you manage, cancel, or change plans inside your Apple ID settings. Renewals include a 3-day grace period before protection pauses."
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
    // Inject JSON-LD for Organization and WebSite into every prerendered page
    let jsonLdScripts = `\n    <script type="application/ld+json">${JSON.stringify(orgJsonLd)}</script>\n    <script type="application/ld+json">${JSON.stringify(websiteJsonLd)}</script>`;
    if (route === '/') {
      jsonLdScripts += `\n    <script type="application/ld+json">${JSON.stringify(softwareAppJsonLd)}</script>`;
    }
    // For the FAQ route, also inject the FAQPage JSON-LD so Google sees it in the static HTML
    if (route === '/faq') {
      jsonLdScripts += `\n    <script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`;
    }
    writeForRoute(template, route, metaParts.join('\n    ') + jsonLdScripts);
  });
}

main();
