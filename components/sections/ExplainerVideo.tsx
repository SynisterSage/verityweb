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
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadVideo(true);
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    video.loop = true;
    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, [shouldLoadVideo]);

  return (
    <section
      ref={sectionRef}
      id="explainer-video"
      className="relative py-20 lg:py-32 overflow-hidden bg-light-card dark:bg-dark-card/30"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text leading-tight animate-in slide-in-from-bottom-6 fade-in duration-700">
            See it in action
          </h2>
        </div>

        {/* Video */}
        <div className="relative w-full aspect-video bg-light-card dark:bg-dark-card rounded-lg overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100">
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
    </section>
  );
};
