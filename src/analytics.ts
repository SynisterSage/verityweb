export const GA_ID = 'G-FR2MNGPZCN';

function injectScript(id: string) {
  if (document.querySelector(`script[data-gtag="${id}"]`)) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  s.setAttribute('data-gtag', id);
  document.head.appendChild(s);
}

export function initGA() {
  try {
    if ((window as any).gtag) return;
    injectScript(GA_ID);
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag() { (window as any).dataLayer.push(arguments); }
    (window as any).gtag = gtag;
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', GA_ID, { send_page_view: false });
  } catch (err) {
    // fail silently
  }
}

export function pageview(path: string) {
  try {
    if (!(window as any).gtag) return;
    (window as any).gtag('event', 'page_view', { page_path: path });
  } catch {}
}
