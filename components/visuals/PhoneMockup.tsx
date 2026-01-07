import React from 'react';
import { ShieldCheck, PhoneIncoming, UserX, AlertTriangle } from 'lucide-react';

interface PhoneMockupProps {
  variant?: 'success' | 'warning';
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ variant = 'warning' }) => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col justify-start overflow-hidden">
      {/* Notch */}
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-light-bg dark:bg-dark-bg flex flex-col relative">
        {/* Status Bar (Simulated) */}
        <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-medium text-light-text dark:text-dark-text opacity-50">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2.5 bg-current rounded-[1px]"></div>
          </div>
        </div>

        {/* Dynamic App UI */}
        {variant === 'warning' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 animate-in fade-in duration-700">
             <div className="w-24 h-24 rounded-full bg-brand-danger/10 flex items-center justify-center mb-2 animate-pulse">
                <AlertTriangle size={48} className="text-brand-danger" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">Likely Scam</h3>
                <p className="text-light-muted dark:text-dark-muted text-sm">+1 (555) 019-2834</p>
                <p className="text-light-muted dark:text-dark-muted text-xs mt-1">Unknown Caller</p>
             </div>
             
             <div className="w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-4 shadow-sm">
                <p className="text-xs text-left mb-2 font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">Verity AI Screening</p>
                <p className="text-sm text-left italic opacity-80">"Hello, I'm calling from your bank regarding a compromised account..."</p>
             </div>

             <div className="grid grid-cols-2 gap-3 w-full mt-auto pt-8">
                <button className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text p-3 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Block
                </button>
                <button className="bg-brand-danger text-white p-3 rounded-xl text-sm font-medium shadow-lg shadow-brand-danger/20">
                   Report Fraud
                </button>
             </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-6 space-y-6">
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-xl font-bold text-light-text dark:text-dark-text">Overview</h3>
                   <p className="text-xs text-light-muted dark:text-dark-muted">Today, Oct 24</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-brand-blue"/>
                </div>
             </div>

             {/* Stats Card */}
             <div className="bg-brand-blue text-white rounded-2xl p-5 shadow-glow-sm">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                   <ShieldCheck size={16} />
                   <span className="text-xs font-medium uppercase tracking-wide">Protected</span>
                </div>
                <div className="text-3xl font-bold">14 Calls</div>
                <p className="text-sm opacity-80 mt-1">Screened this week</p>
             </div>

             {/* Recent Activity */}
             <div className="space-y-3">
                <p className="text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider">Recent Activity</p>
                
                <div className="flex items-center justify-between p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-danger/10 flex items-center justify-center text-brand-danger">
                         <UserX size={18} />
                      </div>
                      <div className="text-left">
                         <p className="text-sm font-medium text-light-text dark:text-dark-text">Scam Blocked</p>
                         <p className="text-xs text-light-muted dark:text-dark-muted">10:23 AM</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                         <PhoneIncoming size={18} />
                      </div>
                      <div className="text-left">
                         <p className="text-sm font-medium text-light-text dark:text-dark-text">Mom (Mobile)</p>
                         <p className="text-xs text-light-muted dark:text-dark-muted">Trusted Contact</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Bottom Nav Bar */}
        <div className="absolute bottom-0 w-full h-16 bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-md border-t border-light-border dark:border-dark-border flex justify-around items-center px-4 pb-2">
           <div className="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-600 absolute bottom-2 left-1/2 transform -translate-x-1/2"></div>
           <div className={`p-2 rounded-full ${variant === 'success' ? 'text-brand-blue bg-brand-blue/10' : 'text-light-muted dark:text-dark-muted'}`}>
              <ShieldCheck size={20} />
           </div>
           <div className="p-2 text-light-muted dark:text-dark-muted">
              <UserX size={20} />
           </div>
        </div>
      </div>
    </div>
  );
};