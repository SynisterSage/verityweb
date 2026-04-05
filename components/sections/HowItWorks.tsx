import React from 'react';

const features = [
  {
    title: 'Real-time alerts',
    description: 'Know instantly when an unknown caller reaches your loved one. Get notified immediately with details about what Verity blocked. You\'re always in the loop, informed and in control.',
    images: ['/mockups/optimized/iPhone-1.webp', '/mockups/optimized/iPhone-2.webp'],
  },
  {
    title: 'Control who has access',
    description: 'Add caregivers and family members to stay informed together. Everyone authorized can see what calls were blocked and when. Shared oversight means peace of mind across the entire family.',
    images: ['/mockups/optimized/iPhone-2.webp', '/mockups/optimized/iPhone-4.webp'],
  },
  {
    title: 'Stay connected',
    description: 'Trusted contacts always get through—no delays, no interruptions. Unknown callers must enter the family PIN. It\'s simple, automatic protection that doesn\'t get in the way of real calls.',
    images: ['/mockups/optimized/iPhone-4.webp', '/mockups/optimized/iPhone-1.webp'],
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Features - alternating left/right layout */}
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-2 gap-12 items-center ${
              idx % 2 === 1 ? 'md:grid-flow-col-dense' : ''
            }`}
          >
            {/* Content */}
            <div className={idx % 2 === 1 ? 'md:col-start-2' : ''}>
              <h3 className="text-3xl lg:text-4xl font-bold text-light-text dark:text-dark-text mb-6">
                {feature.title}
              </h3>
              <p className="text-lg lg:text-xl text-light-muted dark:text-dark-muted leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Images */}
            <div className={idx % 2 === 1 ? 'md:col-start-1 md:row-start-1' : 'md:justify-self-end'}>
              <div className="relative w-full max-w-[280px] mx-auto md:mx-0">
                {/* Back image - offset */}
                <img
                  src={feature.images[1]}
                  alt={`${feature.title} - secondary`}
                  className="absolute top-6 left-6 w-full max-w-[260px] shadow-lg rounded-2xl opacity-80"
                />
                {/* Front image - tilted */}
                <img
                  src={feature.images[0]}
                  alt={feature.title}
                  className={`relative w-full max-w-[260px] shadow-xl rounded-2xl transition-transform duration-300 ${
                    idx % 2 === 1 ? 'rotate-3' : '-rotate-3'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};