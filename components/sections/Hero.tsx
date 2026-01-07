import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PhoneMockup } from '../visuals/PhoneMockup';
import { ChevronRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
               <Badge>For Families</Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-light-text dark:text-dark-text leading-[1.1] animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
              The smart shield for your <span className="text-brand-blue">family's phone.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-light-muted dark:text-dark-muted max-w-lg leading-relaxed animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
              Verity screens unknown callers so your loved ones don't have to. We block fraud, let family through, and give you peace of mind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
              <Button size="lg" onClick={() => scrollTo('#waitlist')}>
                Join Waitlist
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('#how-it-works')}>
                How it works
                <ArrowDown size={18} className="ml-2" />
              </Button>
            </div>

            <p className="text-sm text-light-muted dark:text-dark-muted flex items-center gap-2 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Early access available for agencies
            </p>
          </div>

          {/* Visual Content */}
          <div className="relative animate-in zoom-in-95 fade-in duration-1000 delay-200">
            {/* Decorative circles behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-brand-blue/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-brand-blue/10 rounded-full"></div>
            
            <PhoneMockup variant="success" />
          </div>

        </div>
      </div>
    </section>
  );
};