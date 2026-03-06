export const APP_STORE_WEB_URL = 'https://apps.apple.com/us/app/verity-protect/id6759526773';
const APP_STORE_IOS_URL = 'itms-apps://apps.apple.com/us/app/verity-protect/id6759526773';

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
