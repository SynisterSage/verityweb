import React, { useState, useEffect } from 'react';
import { Users, PhoneOff, ShieldCheck, UserCheck, ShieldAlert, Check, AlertTriangle, BrainCircuit, MousePointer2 } from 'lucide-react';

interface CardContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({ title, description, children }) => (
  <div className="flex flex-col h-full group">
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl overflow-hidden shadow-sm hover:shadow-glow-sm transition-all duration-500 flex flex-col h-full">
      
      {/* Interactive Area */}
      <div className="bg-gray-50/50 dark:bg-[#0b111b] p-6 h-72 relative flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 border-b border-light-border dark:border-dark-border">
        <div className="relative z-10 w-full flex justify-center">
            {children}
        </div>
      </div>

      {/* Description Area */}
      <div className="p-8 bg-light-card dark:bg-dark-card flex-1 transition-colors duration-300">
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">{title}</h3>
        <p className="text-light-muted dark:text-dark-muted leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  </div>
);

// Mini App 1: Trusted Contacts
const TrustedContactsApp = () => {
   return (
     <div className="w-full max-w-[260px] space-y-3">
        {[
           { name: 'Mom', initial: 'M', color: 'bg-pink-500/20 text-pink-600 dark:text-pink-500' },
           { name: 'Dr. Stuart', initial: 'DR', color: 'bg-blue-500/20 text-blue-600 dark:text-blue-500' },
           { name: 'Alex', initial: 'A', color: 'bg-purple-500/20 text-purple-600 dark:text-purple-500' },
        ].map((contact, i) => (
           <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#121a26] border border-gray-200 dark:border-[#202c3c] shadow-sm dark:shadow-lg transform transition-all duration-300 hover:scale-102">
              <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${contact.color}`}>
                    <span className="text-xs font-bold">{contact.initial}</span>
                 </div>
                 <span className="text-gray-900 dark:text-[#f5f7fb] text-sm font-medium">{contact.name}</span>
              </div>
              <div className="animate-in fade-in zoom-in duration-700 fill-mode-both" style={{ animationDelay: `${i * 0.8}s` }}>
                 <span className="px-2 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-wider border border-brand-blue/20 flex items-center gap-1 shadow-[0_0_10px_rgba(45,109,246,0.1)]">
                    <Check size={10} strokeWidth={3} /> Trusted
                 </span>
              </div>
           </div>
        ))}
        {/* Ghost item */}
        <div className="h-12 rounded-xl bg-gray-50/50 dark:bg-[#121a26]/50 border border-gray-200/50 dark:border-[#202c3c]/50 border-dashed"></div>
     </div>
   )
}

// Mini App 2: AI Screening
const AIScreeningApp = () => {
    const [step, setStep] = useState(0); // 0: listening, 1: detecting, 2: blocked
    
    useEffect(() => {
        const timer = setInterval(() => {
           setStep(s => (s + 1) % 3);
        }, 3500); 
        return () => clearInterval(timer);
    }, []);

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
             <div className="h-1.5 w-full bg-gray-200 dark:bg-[#202c3c] rounded-full overflow-hidden transition-colors duration-300">
                <div 
                   className={`h-full transition-all duration-[1000ms] ease-out rounded-full ${step === 2 ? 'bg-red-500 dark:bg-[#ff8a8a] shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-brand-blue'}`}
                   style={{ width: `${step === 0 ? 15 : step === 1 ? 65 : 92}%` }}
                ></div>
             </div>
          </div>

          {/* Blocked Badge */}
          <div className={`transform transition-all duration-500 ease-out ${step === 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'} flex justify-center absolute bottom-0 left-0 right-0`}>
             <span className="bg-red-500 dark:bg-[#ff8a8a] text-white dark:text-[#0b111b] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg dark:shadow-[0_4px_20px_rgba(255,138,138,0.4)] border border-red-400 dark:border-[#ff8a8a]/50">
                <ShieldAlert size={16} /> Auto-blocked
             </span>
          </div>
       </div>
    )
}

// Mini App 3: Family Review
const FamilyReviewApp = () => {
   const [state, setState] = useState<'idle' | 'moving' | 'clicking' | 'blocked'>('idle');

   useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      const loop = () => {
         setState('idle'); // 0s
         timer = setTimeout(() => {
            setState('moving'); // 1.5s
            timer = setTimeout(() => {
               setState('clicking'); // 2.5s
               timer = setTimeout(() => {
                  setState('blocked'); // 2.8s
                  timer = setTimeout(() => {
                     loop(); // 5.8s
                  }, 3000);
               }, 300);
            }, 1000);
         }, 1500);
      };
      loop();
      return () => clearTimeout(timer);
   }, []);

   return (
      <div className="w-full max-w-[260px] relative">
         {/* Main Card */}
         <div className="bg-gray-50 dark:bg-[#121a26] border border-gray-200 dark:border-[#202c3c] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-[#202c3c] relative z-10 transition-colors duration-300">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-[#202c3c] bg-white/50 dark:bg-[#1a2332]/50 backdrop-blur-sm">
               <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 dark:bg-[#ff8a8a]/10 text-red-600 dark:text-[#ff8a8a] border border-red-500/20 dark:border-[#ff8a8a]/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                     <AlertTriangle size={10} /> Fraud Alert
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-[#8aa0c6]">Now</span>
               </div>
               <div className="text-gray-900 dark:text-[#f5f7fb] font-semibold text-sm mb-0.5">Unknown Caller</div>
               <div className="text-gray-500 dark:text-[#8aa0c6] text-xs font-mono">+1 (510) 999-0234</div>
            </div>
            
            {/* Body */}
            <div className="p-3 bg-gray-50 dark:bg-[#121a26] h-[60px] flex items-center justify-center relative transition-colors duration-300">
               {state === 'blocked' ? (
                  <div className="w-full animate-in zoom-in duration-300">
                      <div className="bg-red-500 dark:bg-[#ff8a8a] text-white dark:text-[#0b111b] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 dark:shadow-[#ff8a8a]/20">
                         <ShieldAlert size={14} /> Number Blocked
                      </div>
                  </div>
               ) : (
                  <div className="flex gap-2 w-full">
                     <button className="flex-1 bg-gray-200 dark:bg-[#202c3c] text-gray-500 dark:text-[#f5f7fb] py-2.5 rounded-lg text-xs font-medium opacity-70 dark:opacity-50">
                        Mark Safe
                     </button>
                     <button 
                        className={`flex-1 bg-brand-danger text-white shadow-[0_0_15px_rgba(255,138,138,0.3)] py-2.5 rounded-lg text-xs font-medium transition-transform duration-200 ${state === 'clicking' ? 'scale-95 brightness-110' : ''}`}
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
               bottom: state === 'idle' ? '0%' : '25px',
               right: state === 'idle' ? '0%' : '40px',
               transform: state === 'clicking' ? 'scale(0.9)' : 'scale(1)'
            }}
         >
            <MousePointer2 size={24} fill="currentColor" className="text-gray-900 dark:text-[#f5f7fb] drop-shadow-md" />
            {/* Click Ripple */}
            {state === 'clicking' && (
               <div className="absolute top-0 left-0 w-6 h-6 bg-brand-blue/30 rounded-full animate-ping"></div>
            )}
         </div>

         {/* Stacked Cards Effect */}
         <div className="absolute top-4 left-4 right-[-10px] h-full bg-gray-50 dark:bg-[#121a26] border border-gray-200 dark:border-[#202c3c] rounded-2xl -z-10 opacity-60 dark:opacity-40 scale-95 origin-center transition-colors duration-300"></div>
         <div className="absolute top-8 left-8 right-[-20px] h-full bg-gray-50 dark:bg-[#121a26] border border-gray-200 dark:border-[#202c3c] rounded-2xl -z-20 opacity-40 dark:opacity-20 scale-90 origin-center transition-colors duration-300"></div>
      </div>
   )
}

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-light-card dark:bg-dark-card/50 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4 tracking-tight">
            Protection without isolation
          </h2>
          <p className="text-lg text-light-muted dark:text-dark-muted">
            Intelligent screening that keeps your loved ones safe while keeping them connected.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <CardContainer 
            title="1. Trusted Contacts" 
            description="Calls from your safe list (family, doctors, friends) skip the PIN and ring through immediately. They are never blocked."
          >
             <TrustedContactsApp />
          </CardContainer>

          <CardContainer 
            title="2. The Gatekeeper" 
            description="Unknown callers are asked for a Family PIN. If they know it, they connect instantly. If not, they are sent to voicemail for AI screening."
          >
             <AIScreeningApp />
          </CardContainer>

          <CardContainer 
            title="3. Family Review" 
            description="Review screened voicemails, or enable Auto-Block to automatically silence known scams. Mark calls as 'Safe' or 'Fraud' to keep your trusted list up to date."
          >
             <FamilyReviewApp />
          </CardContainer>

        </div>
      </div>
    </section>
  );
};