import React, { useState, useEffect, useRef } from 'react';

interface CardContainerProps {
  title: string;
  description: string;
  stepNumber: number;
  children: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({ title, description, stepNumber, children }) => {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover
    const hoverQuery = window.matchMedia('(hover: hover)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    let observer: IntersectionObserver | null = null;

    // If user prefers reduced motion, skip autoplay/on-scroll activation
    if (reduceMotionQuery.matches) return;

    if (!hoverQuery.matches) {
       // Touch device logic: trigger when in view
       observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             setIsActive(true);
           } else {
             setIsActive(false);
           }
         });
       }, { threshold: 0.6 }); // Trigger when 60% visible
       
       if (containerRef.current) {
         observer.observe(containerRef.current);
       }
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsActive(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsActive(false);
    }
  };

  // Clone child to pass isActive prop
  const childWithProp = React.isValidElement(children) 
    ? React.cloneElement(children as React.ReactElement<any>, { isActive }) 
    : children;

  return (
    <div 
      className="flex flex-col h-full group" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl overflow-hidden shadow-sm hover:shadow-glow-sm transition-all duration-500 flex flex-col h-full">
        
        {/* Interactive Area */}
        <div className="bg-gray-50/50 dark:bg-[#0b111b] p-6 h-72 relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 border-b border-light-border dark:border-dark-border">
          <div className="relative z-10 w-full flex justify-center h-full items-center">
              {childWithProp}
          </div>
        </div>

        {/* Description Area */}
        <div className="p-8 bg-light-card dark:bg-dark-card flex-1 transition-colors duration-300 relative">
          <div className="absolute -top-6 left-8 bg-brand-blue text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border-4 border-light-card dark:border-dark-card">
              {stepNumber}
          </div>
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3 mt-2">{title}</h3>
          <p className="text-light-muted dark:text-dark-muted leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
