import React from 'react';

interface ExplainerVideoProps {
  videoSrc?: string;
  poster?: string;
}

export const ExplainerVideo: React.FC<ExplainerVideoProps> = ({
  videoSrc = '/explainer.mp4',
  poster = '/thumbnail.webp',
}) => {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = React.useState(true);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const [isPlayableZone, setIsPlayableZone] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setShouldLoadVideo(true);
      setIsPlayableZone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
        }
        setIsPlayableZone(entry.intersectionRatio >= 0.5);
      },
      {
        threshold: [0, 0.5],
        rootMargin: '300px 0px',
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (!shouldLoadVideo || !isPlayableZone) {
      videoElement.pause();
      return;
    }

    videoElement.loop = true;
    const playPromise = videoElement.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        // ignore autoplay errors
      });
    }

    return () => {
      videoElement.pause();
    };
  }, [isPlayableZone, shouldLoadVideo]);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      const el = videoRef.current;
      if (el) {
        el.muted = next;
        if (!next) {
          if (shouldLoadVideo && isPlayableZone) {
            const playPromise = el.play();
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise.catch(() => {});
            }
          }
        }
      }
      return next;
    });
  }, [isPlayableZone, shouldLoadVideo]);

  return (
    <section
      ref={sectionRef}
      id="explainer-video"
      className="relative py-24 lg:py-28 overflow-hidden bg-brand-blue/5 border-t border-light-border dark:border-dark-border"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-light-muted dark:text-dark-muted opacity-60">
              Trust, verified
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text leading-tight">
              Just Clarity.
            </h2>
            <p className="text-lg text-light-muted dark:text-dark-muted max-w-xl leading-relaxed">
              Verify who’s calling before they reach the people you protect, no guessing, just calm,
              confident screening in thirty seconds.
            </p>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl dark:bg-[#0c121f]">
              <div className="relative aspect-video bg-white dark:bg-[#0b111c]">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-black/60 text-white text-sm px-3 py-2 backdrop-blur border border-white/10 hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/70"
                  aria-pressed={!isMuted}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: isMuted ? '#9CA3AF' : '#34D399' }} />
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <video
                  ref={videoRef}
                  src={shouldLoadVideo ? videoSrc : undefined}
                  poster={poster}
                  playsInline
                  muted
                  loop
                  preload={shouldLoadVideo ? 'metadata' : 'none'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
