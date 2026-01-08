// Edge middleware: detect common crawler user-agents and serve prerendered
// snapshots from `/prerender/<route>.html` when available.
// This file is intended for Vercel Edge middleware usage.

const BOT_UA = /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Twitterbot|facebookexternalhit|LinkedInBot|Pinterest/i;
const ALLOWED_SNAPSHOT_PATHS = new Set(['/', '/terms', '/privacy']);

export default async function middleware(request: Request) {
  try {
    const ua = (request.headers.get('user-agent') || '').toString();
    if (!BOT_UA.test(ua)) {
      // Not a crawler we care about — let the request proceed normally.
      return fetch(request);
    }

    const url = new URL(request.url);
    // Only serve snapshots for a small set of critical routes to avoid
    // exposing internal pages unnecessarily.
    if (!ALLOWED_SNAPSHOT_PATHS.has(url.pathname)) {
      return fetch(request);
    }

    // Map '/' -> /prerender/index.html, '/terms' -> /prerender/terms.html
    const snapshotPath = `/prerender${url.pathname === '/' ? '/index' : url.pathname}.html`;
    const snapshotUrl = `${url.origin}${snapshotPath}`;

    const res = await fetch(snapshotUrl, { method: 'GET' });
    if (res.ok) {
      const body = await res.text();
      return new Response(body, {
        status: 200,
        headers: { 'content-type': 'text/html; charset=utf-8' }
      });
    }

    // Snapshot not found — fallback to normal request so SPA shell is served.
    return fetch(request);
  } catch (err) {
    // On any unexpected error, fall back to default behavior.
    return fetch(request);
  }
}

// Note for deployment:
// - Place static prerender snapshots in `/public/prerender/index.html`,
//   `/public/prerender/terms.html`, `/public/prerender/privacy.html`.
// - Vercel will pick up `middleware.ts` at project root as Edge Middleware.
// - If you prefer more crawler UAs, extend BOT_UA or ALLOWED_SNAPSHOT_PATHS.
