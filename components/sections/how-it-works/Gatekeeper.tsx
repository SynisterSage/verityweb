import React, { useState, useEffect } from 'react';
import { Voicemail, Lock, UserCheck } from 'lucide-react';

interface GatekeeperProps {
    isActive?: boolean;
}

export const Gatekeeper: React.FC<GatekeeperProps> = ({ isActive = false }) => {
  const [pin, setPin] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'input' | 'bridging' | 'voicemail'>('idle');
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) {
        // Reset when not active
        setPin('');
        setStatus('idle');
        setActiveKey(null);
        return;
    }

    if (typeof window === 'undefined') return;

    const nav: any = typeof navigator !== 'undefined' ? navigator : {};
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = (nav.deviceMemory && nav.deviceMemory <= 1) || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) || (nav.connection && nav.connection.saveData);

    // Fast-path for low-power or reduced-motion devices: skip heavy animation sequence
    if (reduceMotion || lowPower) {
        setPin('1234');
        setStatus('bridging');
        setActiveKey(null);
        return;
    }

    let cancelled = false;
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const runSequence = async () => {
        // Initial delay
        await wait(300);
        if (cancelled) return;

        // We'll do a short animated sequence but fewer state churns
        const keys = ['1','2','3','4'];
        setStatus('input');
        for (let i = 0; i < keys.length; i++) {
            if (cancelled) return;
            setActiveKey(keys[i]);
            await wait(140);
            if (cancelled) return;
            setPin(prev => prev + keys[i]);
            setActiveKey(null);
            await wait(160);
        }

        if (cancelled) return;
        setStatus('bridging');
    };

    runSequence();

    return () => {
        cancelled = true;
    };
  }, [isActive]);

    return (
        <div className="w-[200px] translate-y-24 bg-light-card dark:bg-dark-card rounded-[1.5rem] p-3 shadow-sm border border-light-border dark:border-dark-border flex flex-col gap-3 relative select-none">

        {/* Decorative Speaker Grill */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-light-bg dark:bg-dark-bg"></div>

        {/* Screen Area */}
        <div className="bg-light-card/60 dark:bg-dark-card/60 rounded-xl h-[64px] flex flex-col items-center justify-center relative overflow-hidden shrink-0 border border-light-border dark:border-dark-border shadow-inner">
            {status === 'bridging' ? (
                <div className="animate-in zoom-in duration-300 text-green-400 flex flex-col items-center">
                    <UserCheck size={20} className="mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-green-400/90">Authorized</span>
                </div>
            ) : status === 'voicemail' ? (
                <div className="animate-in zoom-in duration-300 text-amber-400 flex flex-col items-center">
                    <Voicemail size={20} className="mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-amber-400/90">Screening...</span>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full px-4">
                    <div className="text-[9px] text-light-muted uppercase font-bold tracking-widest mb-1.5 flex items-center gap-1">
                        <Lock size={8} /> Enter PIN
                    </div>
                    <div className="flex gap-2.5 h-3 items-center justify-center">
                        {Array(4).fill(0).map((_, i) => (
                             <div 
                                key={i} 
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i < pin.length ? 'bg-brand-blue scale-110 shadow-[0_0_8px_rgba(45,109,246,0.6)]' : 'bg-light-muted dark:bg-dark-card/40'}`}
                             ></div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-1.5 px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                   key={num}
                   type="button"
                   aria-hidden
                   disabled
                   className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-150 border ${activeKey === num.toString() ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-95' : 'bg-light-card dark:bg-dark-card/50 text-light-text dark:text-dark-text border-transparent'}`}
                >
                    {num}
                </button>
            ))}
            <div className="aspect-square flex items-center justify-center text-light-muted dark:text-dark-text text-[10px]">*</div>
            <button type="button" aria-hidden disabled className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-150 border ${activeKey === '0' ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-95' : 'bg-light-card dark:bg-dark-card/50 text-light-text dark:text-dark-text border-transparent'}`}>0</button>
            <div className="aspect-square flex items-center justify-center text-light-muted dark:text-dark-text text-[10px]">#</div>
        </div>

        {/* Footer Action */}
        <div className="text-center pb-1">
            <span className="text-[10px] text-gray-600 font-medium">
                No PIN? Leave Message
            </span>
        </div>

    </div>
  );
};
