import React, { useState, useEffect } from 'react';
import { Voicemail, Lock, UserCheck } from 'lucide-react';

interface GatekeeperProps {
    isActive?: boolean;
}

export const Gatekeeper: React.FC<GatekeeperProps> = ({ isActive = false }) => {
  const [pin, setPin] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'input' | 'bridging' | 'voicemail'>('idle');
  const [activeKey, setActiveKey] = useState<string | null>(null);
    const dotsRef = React.useRef<HTMLDivElement | null>(null);

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
        let timers: number[] = [];
        let onEndRef: (() => void) | null = null;

        const runSequence = async () => {
                // Slightly longer initial delay for a calmer animation
                await new Promise(r => setTimeout(r, 500));
                if (cancelled) return;

                setStatus('input');

                const el = dotsRef.current;
                if (!el) {
                    setPin('1234');
                    setStatus('bridging');
                    return;
                }

                const lastDot = el.querySelectorAll('.dot')[3] as HTMLElement | undefined;

                onEndRef = () => {
                    if (cancelled) return;
                    setPin('1234');
                    setStatus('bridging');
                    lastDot?.removeEventListener('animationend', onEndRef!);
                    el.classList.remove('typing');
                    timers.forEach(t => clearTimeout(t));
                    timers = [];
                    setActiveKey(null);
                };

                // Start the CSS animation by adding a class
                el.classList.add('typing');

                // Set lightweight timeouts to toggle activeKey for button highlight in sync with CSS
                const keys = ['1','2','3','4'];
                const delays = [160, 520, 880, 1240];
                const animDuration = 340; // ms (matches CSS below)

                for (let i = 0; i < keys.length; i++) {
                    timers.push(window.setTimeout(() => setActiveKey(keys[i]), delays[i]));
                    timers.push(window.setTimeout(() => setActiveKey(null), delays[i] + animDuration));
                }

                if (lastDot) {
                    lastDot.addEventListener('animationend', onEndRef);
                } else {
                    timers.push(window.setTimeout(() => onEndRef && onEndRef(), delays[delays.length - 1] + animDuration + 80));
                }
        };

        runSequence();

        return () => {
                cancelled = true;
                timers.forEach(t => clearTimeout(t));
                timers = [];
                const el = dotsRef.current;
                if (el) {
                    const lastDot = el.querySelectorAll('.dot')[3] as HTMLElement | undefined;
                    if (lastDot && onEndRef) lastDot.removeEventListener('animationend', onEndRef);
                    el.classList.remove('typing');
                }
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
                                        <div className="flex gap-2.5 h-3 items-center justify-center" ref={dotsRef}>
                                                        {Array(4).fill(0).map((_, i) => (
                                                                 <div
                                                                        key={i}
                                                                        className={`dot w-2 h-2 rounded-full ${pin.length === 4 ? 'bg-brand-blue scale-110' : 'bg-light-muted dark:bg-dark-card/40'}`}
                                                                 ></div>
                                                        ))}
                                                        <style>{`
                                                            @keyframes dotFill {
                                                                0% { transform: scale(1); background-color: var(--dot-empty,#cbd5e1); }
                                                                60% { transform: scale(1.12); }
                                                                100% { transform: scale(1.08); background-color: var(--dot-fill,#2d6dfa); }
                                                            }
                                                            .typing .dot:nth-child(1) { animation: dotFill 340ms cubic-bezier(.2,.9,.3,1) forwards; animation-delay: 160ms; }
                                                            .typing .dot:nth-child(2) { animation: dotFill 340ms cubic-bezier(.2,.9,.3,1) forwards; animation-delay: 520ms; }
                                                            .typing .dot:nth-child(3) { animation: dotFill 340ms cubic-bezier(.2,.9,.3,1) forwards; animation-delay: 880ms; }
                                                            .typing .dot:nth-child(4) { animation: dotFill 340ms cubic-bezier(.2,.9,.3,1) forwards; animation-delay: 1240ms; }
                                                            @media (prefers-reduced-motion: reduce) {
                                                                .typing .dot { animation: none !important; }
                                                            }
                                                        `}</style>
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
                         className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border ${activeKey === num.toString() ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-95' : 'bg-light-card dark:bg-dark-card/50 text-light-text dark:text-dark-text border-transparent'}`}
                >
                    {num}
                </button>
            ))}
            <div className="aspect-square flex items-center justify-center text-light-muted dark:text-dark-text text-[10px]">*</div>
            <button type="button" aria-hidden disabled className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border ${activeKey === '0' ? 'bg-brand-blue text-white border-brand-blue shadow-lg scale-95' : 'bg-light-card dark:bg-dark-card/50 text-light-text dark:text-dark-text border-transparent'}`}>0</button>
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
