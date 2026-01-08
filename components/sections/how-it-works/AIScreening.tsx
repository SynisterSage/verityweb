import React, { useState, useEffect, useRef } from 'react';
import { BrainCircuit, ShieldAlert } from 'lucide-react';

interface AIScreeningProps {
    isActive?: boolean;
}

export const AIScreening: React.FC<AIScreeningProps> = ({ isActive = false }) => {
   const [step, setStep] = useState(0); // 0: listening, 1: detecting, 2: blocked
   const [progressActive, setProgressActive] = useState(false);
   const fillRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (!isActive) {
         setStep(0);
         setProgressActive(false);
         return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
         // Respect reduced-motion: jump to final state without animation
         setStep(2);
         return;
      }

      // Start detection state and kick off CSS-driven progress animation.
      setStep(1);
      // trigger animation on next tick to ensure initial styles applied
      const raf = requestAnimationFrame(() => setProgressActive(true));

      const handleAnimEnd = () => {
         setStep(2);
         setProgressActive(false);
      };

      const el = fillRef.current;
      el?.addEventListener('animationend', handleAnimEnd);

      return () => {
         cancelAnimationFrame(raf as number);
         el?.removeEventListener('animationend', handleAnimEnd);
         setProgressActive(false);
      };
   }, [isActive]);

    return (
       <div className="w-full max-w-[280px] flex flex-col gap-4">
          {/* Transcript bubble */}
          <div className="bg-gray-50 dark:bg-[#121a26] border border-gray-200 dark:border-[#202c3c] p-4 rounded-xl rounded-tl-none relative shadow-lg transition-colors duration-300">
             <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-gray-500 dark:text-[#8aa0c6] uppercase tracking-wide font-semibold flex items-center gap-1.5">
                    <BrainCircuit size={12} className={step > 0 ? "text-brand-blue animate-pulse" : "text-gray-400 dark:text-gray-600"} />
                    Live Transcript
                </div>
             </div>
             <p className="text-sm text-gray-800 dark:text-[#f5f7fb] leading-relaxed font-mono opacity-90 transition-colors duration-300">
                "Hello, I'm calling from <span className={`transition-all duration-500 rounded px-0.5 ${step >= 1 ? 'bg-red-500/20 text-red-600 dark:text-[#ff8a8a]' : ''}`}>Tech Support</span>. We detected a <span className={`transition-all duration-500 rounded px-0.5 ${step >= 1 ? 'bg-red-500/20 text-red-600 dark:text-[#ff8a8a]' : ''}`}>virus</span> on your computer..."
             </p>
          </div>

          {/* Analysis UI */}
          <div className="space-y-2 bg-gray-50/50 dark:bg-[#121a26]/50 p-3 rounded-xl border border-gray-200 dark:border-[#202c3c] transition-colors duration-300">
             <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                <span className="text-gray-500 dark:text-[#8aa0c6]">Risk Score</span>
                <span className={`transition-colors duration-300 ${step === 2 ? 'text-red-500 dark:text-[#ff8a8a]' : 'text-gray-500 dark:text-[#8aa0c6]'}`}>
                   {step === 0 ? 'Analyzing...' : step === 1 ? 'Escalating...' : '92/100'}
                </span>
             </div>
                   <div
                      className="h-1.5 w-full bg-gray-200 dark:bg-[#202c3c] rounded-full overflow-hidden transition-colors duration-300 relative"
                      role="progressbar"
                      aria-label="Fraud detection progress"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={step === 2 ? 92 : step === 1 ? 65 : 15}
                   >
                        {/*
                           Use a transform-based animation (scaleX) for the fill so the browser can promote
                           it to the compositor and avoid main-thread layout thrashing. The animation itself
                           is CSS-driven; JS only toggles the animation class and listens for completion.
                        */}
                        <div
                           ref={fillRef}
                           className={`h-full rounded-full transform origin-left will-change-transform ${progressActive ? 'progress-animate' : ''} ${step === 2 ? 'bg-red-500 dark:bg-[#ff8a8a] shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-brand-blue'}`}
                           style={{ transform: 'scaleX(0.15)' }}
                        ></div>

                        {/* Inline keyframes scoped to this component to avoid global CSS changes */}
                        <style>{`
                           @keyframes progressAnim {
                              from { transform: scaleX(0.15); }
                              to { transform: scaleX(0.92); }
                           }
                           .progress-animate {
                              animation: progressAnim 2s ease-out forwards;
                              will-change: transform;
                           }
                        `}</style>
                   </div>
          </div>

          {/* Blocked Badge */}
          <div className={`transform transition-all duration-500 ease-out ${step === 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'} flex justify-center absolute bottom-0 left-0 right-0`}>
             <span className="bg-red-500 dark:bg-[#ff8a8a] text-white dark:text-[#0b111b] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg dark:shadow-[0_4px_20px_rgba(255,138,138,0.4)] border border-red-400 dark:border-[#ff8a8a]/50">
                <ShieldAlert size={16} /> Auto-blocked
             </span>
          </div>
       </div>
    );
};
