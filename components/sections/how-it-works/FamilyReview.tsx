import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, MousePointer2 } from 'lucide-react';

interface FamilyReviewProps {
   isActive?: boolean;
}

export const FamilyReview: React.FC<FamilyReviewProps> = ({ isActive = false }) => {
   const [state, setState] = useState<'idle' | 'moving' | 'clicking' | 'blocked'>('idle');

   useEffect(() => {
      if (!isActive) {
         setState('idle');
         return;
      }

      let cancelled = false;
      const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

      const run = async () => {
         await wait(500);
         if(cancelled) return;
         setState('moving');
         
         await wait(1000);
         if(cancelled) return;
         setState('clicking');
         
         await wait(300);
         if(cancelled) return;
         setState('blocked');
      };

      run();
      return () => { cancelled = true; };
   }, [isActive]);

   return (
      <div className="w-full max-w-[260px] relative">
         {/* Main Card */}
         <div className="bg-gray-50 dark:bg-[#121a26] border border-gray-200 dark:border-[#202c3c] rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-[#202c3c] relative z-10 transition-colors duration-300 p-4">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
               <span className="px-2 py-0.5 rounded bg-red-500/10 dark:bg-[#ff8a8a]/10 text-red-600 dark:text-[#ff8a8a] border border-red-500/20 dark:border-[#ff8a8a]/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={10} /> Fraud Alert
               </span>
               <span className="text-[10px] text-gray-500 dark:text-[#8aa0c6]">Now</span>
            </div>
            
            <div className="text-gray-900 dark:text-[#f5f7fb] font-semibold text-sm mb-0.5">Unknown Caller</div>
            <div className="text-gray-500 dark:text-[#8aa0c6] text-xs font-mono mb-5">+1 (510) 999-0234</div>
            
            {/* Actions */}
            <div className="h-[36px] flex items-center justify-center relative w-full">
               {state === 'blocked' ? (
                  <div className="w-full animate-in zoom-in duration-300">
                      <div className="bg-red-500 dark:bg-[#ff8a8a] text-white dark:text-[#0b111b] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 dark:shadow-[#ff8a8a]/20 w-full">
                         <ShieldAlert size={14} /> Number Blocked
                      </div>
                  </div>
               ) : (
                  <div className="flex gap-2 w-full">
                     <button className="flex-1 bg-gray-200 dark:bg-[#202c3c] text-gray-500 dark:text-[#f5f7fb] py-2 rounded-lg text-xs font-medium opacity-70 dark:opacity-50 hover:opacity-100 transition-opacity">
                        Mark Safe
                     </button>
                     <button 
                        className={`flex-1 bg-brand-danger text-white shadow-[0_0_15px_rgba(255,138,138,0.3)] py-2 rounded-lg text-xs font-medium transition-transform duration-200 ${state === 'clicking' ? 'scale-95 brightness-110' : ''}`}
                     >
                        Mark Fraud
                     </button>
                  </div>
               )}
            </div>
         </div>
         
         {/* Cursor */}
         <div 
            className={`absolute z-50 pointer-events-none transition-all duration-1000 ease-in-out text-gray-900 dark:text-white drop-shadow-md ${state === 'idle' ? 'opacity-0 translate-x-8 translate-y-8' : 'opacity-100'}`}
            style={{
               bottom: state === 'idle' ? '0%' : '20px',
               right: state === 'idle' ? '0%' : '30px',
               transform: state === 'clicking' ? 'scale(0.9)' : 'scale(1)'
            }}
         >
            <MousePointer2 size={24} fill="currentColor" className="text-gray-900 dark:text-[#f5f7fb] drop-shadow-md" />
            {/* Click Ripple */}
            {state === 'clicking' && (
               <div className="absolute top-0 left-0 w-6 h-6 bg-brand-blue/30 rounded-full animate-ping"></div>
            )}
         </div>
      </div>
   )
};
