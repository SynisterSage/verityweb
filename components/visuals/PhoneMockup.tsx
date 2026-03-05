import React from 'react';
import { ShieldCheck, PhoneIncoming, UserX, AlertTriangle } from 'lucide-react';

interface PhoneMockupProps {
  variant?: 'success' | 'warning';
  screens?: string[];
  autoPlayMs?: number;
  visibleLayers?: number;
  observeSectionOnSmallScreens?: boolean;
}

const DEFAULT_AUTOPLAY_MS = 2600;
const DEFAULT_VISIBLE_LAYERS = 4;
const INTERACTION_RELEASE_DELAY_MS = 280;

const getDepth = (index: number, activeIndex: number, total: number) => {
  return (index - activeIndex + total) % total;
};

const getStackStyle = (
  depth: number,
  visibleLayers: number,
  reduceMotion: boolean,
  isInteracting: boolean
): React.CSSProperties => {
  const clampedDepth = Math.min(depth, visibleLayers + 2);
  const interactionBoost = depth === 0 && isInteracting ? 1 : 0;
  const translateX = clampedDepth * 10 - interactionBoost * 2;
  const translateY = clampedDepth * 18 - interactionBoost * 6;
  const scale = Math.max(0.76, 1 - clampedDepth * 0.045);
  const finalScale = scale + interactionBoost * 0.03;
  const opacity =
    depth === 0
      ? 1
      : depth <= visibleLayers
        ? Math.max(0.12, 0.9 - depth * 0.22)
        : depth === visibleLayers + 1
          ? 0.05
          : 0;

  return {
    opacity,
    zIndex: 200 - clampedDepth,
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${finalScale})`,
    transition: reduceMotion
      ? 'none'
      : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms cubic-bezier(0.22, 1, 0.36, 1)'
  };
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  variant = 'warning',
  screens = [],
  autoPlayMs = DEFAULT_AUTOPLAY_MS,
  visibleLayers = DEFAULT_VISIBLE_LAYERS,
  observeSectionOnSmallScreens = false
}) => {
  const frameRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isInView, setIsInView] = React.useState(true);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [isSmallViewport, setIsSmallViewport] = React.useState(false);
  const [isHoverCapable, setIsHoverCapable] = React.useState(false);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const releaseTimerRef = React.useRef<number | null>(null);
  const hasScreens = screens.length > 0;

  const clearInteractionTimer = React.useCallback(() => {
    if (releaseTimerRef.current) {
      window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = null;
    }
  }, []);

  const startInteraction = React.useCallback(() => {
    if (!hasScreens || typeof window === 'undefined') return;
    clearInteractionTimer();
    setIsInteracting(true);
  }, [clearInteractionTimer, hasScreens]);

  const endInteraction = React.useCallback(() => {
    if (!hasScreens || typeof window === 'undefined') return;
    clearInteractionTimer();
    releaseTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      releaseTimerRef.current = null;
    }, INTERACTION_RELEASE_DELAY_MS);
  }, [clearInteractionTimer, hasScreens]);

  React.useEffect(() => {
    return () => {
      clearInteractionTimer();
    };
  }, [clearInteractionTimer]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyPreference = () => setReduceMotion(mediaQuery.matches);
    applyPreference();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', applyPreference);
      return () => mediaQuery.removeEventListener('change', applyPreference);
    }
    mediaQuery.addListener(applyPreference);
    return () => mediaQuery.removeListener(applyPreference);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const applyViewport = () => setIsSmallViewport(mediaQuery.matches);
    applyViewport();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', applyViewport);
      return () => mediaQuery.removeEventListener('change', applyViewport);
    }
    mediaQuery.addListener(applyViewport);
    return () => mediaQuery.removeListener(applyViewport);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const applyHoverCapability = () => setIsHoverCapable(mediaQuery.matches);
    applyHoverCapability();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', applyHoverCapability);
      return () => mediaQuery.removeEventListener('change', applyHoverCapability);
    }
    mediaQuery.addListener(applyHoverCapability);
    return () => mediaQuery.removeListener(applyHoverCapability);
  }, []);

  React.useEffect(() => {
    if (!hasScreens || typeof IntersectionObserver === 'undefined') return;
    const node = frameRef.current;
    if (!node) return;
    const observeSection = observeSectionOnSmallScreens && isSmallViewport;
    const target = (observeSection ? node.closest('section') : node) ?? node;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: observeSection ? 0.18 : 0.45,
        rootMargin: observeSection ? '0px 0px -10% 0px' : '0px'
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasScreens, isSmallViewport, observeSectionOnSmallScreens]);

  React.useEffect(() => {
    if (!hasScreens || screens.length < 2) return;
    setActiveIndex((prev) => prev % screens.length);
  }, [hasScreens, screens.length]);

  React.useEffect(() => {
    if (!hasScreens || screens.length < 2 || reduceMotion || !isInView || isInteracting) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screens.length);
    }, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, hasScreens, isInView, isInteracting, reduceMotion, screens.length]);

  React.useEffect(() => {
    if (!hasScreens || typeof window === 'undefined') return;
    const current = screens[activeIndex];
    const next = screens[(activeIndex + 1) % screens.length];
    const targets = [current, next].filter(Boolean) as string[];
    const preloaded = targets.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    return () => {
      preloaded.forEach((img) => {
        img.src = '';
      });
    };
  }, [activeIndex, hasScreens, screens]);

  if (hasScreens) {
    return (
      <div
        ref={frameRef}
        className="relative isolate z-0 mx-auto w-[240px] sm:w-[280px] lg:w-[320px] aspect-[823/1677] overflow-visible select-none touch-manipulation cursor-grab active:cursor-grabbing"
        aria-label="Verity app preview carousel"
        onPointerDown={startInteraction}
        onPointerUp={endInteraction}
        onPointerCancel={endInteraction}
        onPointerLeave={endInteraction}
        onMouseEnter={isHoverCapable ? startInteraction : undefined}
        onMouseLeave={isHoverCapable ? endInteraction : undefined}
      >
        {screens.map((screen, index) => {
          const depth = getDepth(index, activeIndex, screens.length);
          return (
            <div
              key={screen}
              className="absolute inset-0"
              style={getStackStyle(depth, visibleLayers, reduceMotion, isInteracting && !reduceMotion)}
              aria-hidden={depth !== 0}
            >
              <img
                src={screen}
                alt={depth === 0 ? 'Verity app preview screen' : ''}
                className="h-full w-full object-contain object-top"
                loading={depth <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col justify-start overflow-hidden">
      {/* Notch */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-light-bg dark:bg-dark-bg flex flex-col relative">
        {/* Status Bar (Simulated) */}
        <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-medium text-light-text dark:text-dark-text opacity-50">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2.5 bg-current rounded-[1px]"></div>
          </div>
        </div>

        {/* Dynamic App UI */}
        {variant === 'warning' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in duration-700">
            <div className="w-24 h-24 rounded-full bg-brand-danger/10 flex items-center justify-center mb-2 animate-pulse">
              <AlertTriangle size={48} className="text-brand-danger" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">Likely Scam</h3>
              <p className="text-light-muted dark:text-dark-muted text-sm">+1 (555) 019-2834</p>
              <p className="text-light-muted dark:text-dark-muted text-xs mt-1">Unknown Caller</p>
            </div>

            <div className="w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-4 shadow-sm">
              <p className="text-xs text-left mb-2 font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">
                Verity Screening
              </p>
              <p className="text-sm text-left italic opacity-80">
                "Hello, I'm calling from your bank regarding a compromised account..."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-auto pt-8">
              <button className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text p-3 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Block
              </button>
              <button className="bg-brand-danger text-white p-3 rounded-xl text-sm font-medium shadow-lg shadow-brand-danger/20">
                Report Fraud
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Overview</h3>
                <p className="text-xs text-light-muted dark:text-dark-muted">Today, Oct 24</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <ShieldCheck size={16} className="text-brand-blue" />
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-brand-blue text-white rounded-2xl p-5 shadow-glow-sm">
              <div className="flex items-center gap-2 mb-1 opacity-80">
                <ShieldCheck size={16} />
                <span className="text-xs font-medium uppercase tracking-wide">Protected</span>
              </div>
              <div className="text-3xl font-bold">14 Calls</div>
              <p className="text-sm opacity-80 mt-1">Screened this week</p>
            </div>

            {/* Recent Activity */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">
                Recent Activity
              </p>

              <div className="flex items-center justify-between p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-danger/10 flex items-center justify-center text-brand-danger">
                    <UserX size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-light-text dark:text-dark-text">Scam Blocked</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">10:23 AM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <PhoneIncoming size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-light-text dark:text-dark-text">Mom (Mobile)</p>
                    <p className="text-xs text-light-muted dark:text-dark-muted">Trusted Contact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav Bar */}
        <div className="absolute bottom-0 w-full h-16 bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-md border-t border-light-border dark:border-dark-border flex justify-around items-center px-4 pb-2">
          <div className="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-600 absolute bottom-2 left-1/2 transform -translate-x-1/2"></div>
          <div
            className={`p-2 rounded-full ${
              variant === 'success' ? 'text-brand-blue bg-brand-blue/10' : 'text-light-muted dark:text-dark-muted'
            }`}
          >
            <ShieldCheck size={20} />
          </div>
          <div className="p-2 text-light-muted dark:text-dark-muted">
            <UserX size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
