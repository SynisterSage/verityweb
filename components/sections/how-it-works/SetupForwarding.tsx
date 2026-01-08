import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck } from 'lucide-react';

interface SetupForwardingProps {
  isActive?: boolean;
}

export const SetupForwarding: React.FC<SetupForwardingProps> = ({ isActive = false }) => {
  const [isForwarded, setIsForwarded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isActive) {
      const timer = setTimeout(() => {
        // use rAF to avoid jank if the browser is busy
        requestAnimationFrame(() => setIsForwarded(true));
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsForwarded(false);
    }
  }, [isActive]);

  return (
    <div className="w-full max-w-[280px] flex flex-col items-center gap-6 select-none pb-4">
       
       {/* Diagram */}
       <div className="flex items-center gap-4 w-full justify-between relative px-2">
          {/* User Phone */}
          <div className="flex flex-col items-center gap-3 relative z-10">
             <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500 shadow-md ${isForwarded ? 'bg-brand-blue/10 text-brand-blue ring-2 ring-brand-blue/20' : 'bg-white dark:bg-[#1a2332] text-gray-400 border border-gray-200 dark:border-[#202c3c]'}`}>
                <Smartphone size={32} />
             </div>
             <span className="text-xs font-bold text-light-muted dark:text-dark-muted">Your Phone</span>
          </div>

          {/* Connection Line */}
          <div className="flex-1 h-[3px] bg-gray-200 dark:bg-[#202c3c] relative rounded-full overflow-hidden mx-2">
             <div className={`absolute top-0 left-0 h-full bg-brand-blue transition-all duration-700 ease-in-out ${isForwarded ? 'w-full' : 'w-0'}`}></div>
          </div>

          {/* Verity Shield */}
          <div className="flex flex-col items-center gap-3 relative z-10">
             <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-md ${isForwarded ? 'bg-brand-blue text-white shadow-brand-blue/30 scale-105' : 'bg-white dark:bg-[#1a2332] text-gray-400 border border-gray-200 dark:border-[#202c3c]'}`}>
                <ShieldCheck size={32} />
             </div>
             <span className="text-xs font-bold text-light-muted dark:text-dark-muted">Verity #</span>
          </div>
       </div>

       {/* Control Card */}
       <div 
         className="w-full bg-white dark:bg-[#1a2332] border border-gray-200 dark:border-[#202c3c] p-4 rounded-2xl shadow-sm flex items-center justify-between transition-all"
       >
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Call Forwarding</span>
            <span className={`text-xs font-medium transition-colors ${isForwarded ? 'text-green-500' : 'text-gray-500'}`}>
                {isForwarded ? 'Active' : 'Disabled'}
            </span>
          </div>
          
          <div className={`w-14 h-8 rounded-full relative transition-colors duration-300 shadow-inner ${isForwarded ? 'bg-brand-blue' : 'bg-gray-200 dark:bg-gray-700'}`}>
             <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-md ${isForwarded ? 'left-7' : 'left-1'}`}></div>
          </div>
       </div>

    </div>
  );
};
