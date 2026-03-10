import appStoreConfig from './appStoreConfig.json';

export const APP_STORE_ID = appStoreConfig.appId;
export const APP_STORE_WEB_URL = appStoreConfig.webUrl;
const APP_STORE_IOS_URL = appStoreConfig.iosUrl;
const SMART_APP_BANNER_ROUTES = new Set(appStoreConfig.smartAppBannerRoutes);

const normalizePathname = (pathname: string) => pathname.replace(/\/$/, '') || '/';

// Keep the banner homepage-only until the app supports richer website routing context.
export const getSmartAppBannerContent = (pathname: string) => {
  const normalizedPathname = normalizePathname(pathname);
  if (!SMART_APP_BANNER_ROUTES.has(normalizedPathname)) {
    return null;
  }

  return `app-id=${APP_STORE_ID}`;
};

const isIOSDevice = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const iOSUa = /iPad|iPhone|iPod/i.test(ua);
  const iPadOSDesktopUa = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iOSUa || iPadOSDesktopUa;
};

const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
};

export const openAppStore = () => {
  if (typeof window === 'undefined') return;

  if (isIOSDevice()) {
    window.location.href = APP_STORE_IOS_URL;
    window.setTimeout(() => {
      window.location.href = APP_STORE_WEB_URL;
    }, 900);
    return;
  }

  if (isMobileDevice()) {
    window.location.href = APP_STORE_WEB_URL;
    return;
  }

  const popup = window.open(APP_STORE_WEB_URL, '_blank', 'noopener,noreferrer');
  if (!popup) {
    window.location.href = APP_STORE_WEB_URL;
  }
};
