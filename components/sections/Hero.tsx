import React from 'react';
import { Button } from '../ui/Button';
import { ArrowDown } from 'lucide-react';
import { openAppStore } from '../../src/appStore';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden border-b border-light-border dark:border-dark-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 lg:space-y-10">
          
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-light-text dark:text-dark-text leading-[1.15] animate-in slide-in-from-bottom-6 fade-in duration-700">
            The smart shield for your <span className="text-brand-blue">family's phone.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-light-muted dark:text-dark-muted max-w-2xl leading-relaxed animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100">
            Peace of mind for their independence. Scam screening that works quietly in the background.
          </p>

          {/* Legal/Trial info */}
          <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted max-w-2xl leading-relaxed animate-in slide-in-from-bottom-6 fade-in duration-700 delay-200">
            7-day free trial. Apple billing applies after unless canceled.
          </p>
          
          {/* Primary CTA */}
          <div className="animate-in slide-in-from-bottom-6 fade-in duration-700 delay-300">
            <Button size="lg" onClick={openAppStore} className="px-10 py-5 text-lg">
              Download on the App Store
            </Button>
          </div>

          {/* Secondary CTA */}
          <button 
            onClick={() => scrollTo('#how-it-works')}
            className="flex items-center gap-2 text-light-muted dark:text-dark-muted hover:text-brand-blue dark:hover:text-brand-blue transition-colors animate-in slide-in-from-bottom-6 fade-in duration-700 delay-400"
          >
            <span className="text-sm sm:text-base">Learn how it works</span>
            <ArrowDown size={16} className="mt-0.5" />
          </button>

        </div>
      </div>
    </section>
  );
};
