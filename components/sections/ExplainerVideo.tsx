import React from 'react';

interface ExplainerVideoProps {
  videoSrc?: string;
  poster?: string;
}

export const ExplainerVideo: React.FC<ExplainerVideoProps> = ({
  videoSrc = '/explainer.mp4',
  poster = '/thumbnail.jpg',
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.loop = true;
            const playPromise = videoElement.play();
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise.catch(() => {
                // ignore autoplay errors
              });
            }
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(videoElement);
    return () => {
      observer.disconnect();
      videoElement.pause();
    };
  }, []);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      const el = videoRef.current;
      if (el) {
        el.muted = next;
        if (!next) {
          const playPromise = el.play();
          if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {});
          }
        }
      }
      return next;
    });
  };

  return (
    <section
      id="explainer-video"
      className="relative py-24 lg:py-28 overflow-hidden bg-light-bg dark:bg-[#0a0f19]"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6f9ff] via-[#f9fbff] to-[#edf2ff] dark:from-[#0b1321] dark:via-[#0a101c] dark:to-[#060912]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_75%_30%,rgba(59,130,246,0.12),transparent_44%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.12),transparent_42%),radial-gradient(circle_at_75%_30%,rgba(59,130,246,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 dark:from-transparent dark:via-transparent dark:to-transparent" />
      </div>

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
                  src={videoSrc}
                  poster={poster}
                  playsInline
                  muted
                  loop
                  preload="auto"
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
