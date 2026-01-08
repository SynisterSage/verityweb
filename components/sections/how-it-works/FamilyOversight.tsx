import React from 'react';
import { Users, Shield } from 'lucide-react';

interface FamilyOversightProps {
   isActive?: boolean;
}

export const FamilyOversight: React.FC<FamilyOversightProps> = ({ isActive = false }) => {
  const members = [
    { name: 'Sarah (You)', role: 'Owner', initial: 'S', color: 'bg-brand-blue' },
    { name: 'David', role: 'Brother', initial: 'D', color: 'bg-indigo-500' }
  ];

  return (
    <div className="w-full max-w-[280px]">
       
       {/* Team Card */}
       <div className={`bg-white dark:bg-[#121a26] border rounded-xl p-4 transition-all duration-500 ${
          isActive 
            ? 'border-brand-blue/30 shadow-[0_0_15px_rgba(45,109,246,0.1)]' 
            : 'border-light-border dark:border-dark-border shadow-sm'
       }`}>
          <div className="flex items-center justify-between mb-4">
             <div className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-wider flex items-center gap-2">
                <Users size={14} /> Account Members
             </div>
             <div className={`bg-green-500/10 p-1.5 rounded-lg transition-all duration-500 ${isActive ? 'shadow-[0_0_10px_rgba(34,197,94,0.2)]' : ''}`}>
                <Shield size={14} className="text-green-500" />
             </div>
          </div>

          <div className="space-y-3">
             {members.map((m) => (
               <div 
                  key={m.name} 
                    className="flex items-center justify-between"
                >
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${m.color} text-white flex items-center justify-center text-xs font-bold ring-2 ring-white/5 transition-all duration-500 ${
                          isActive ? 'shadow-[0_0_10px_rgba(45,109,246,0.25)] scale-105' : ''
                      }`}>
                         {m.initial}
                      </div>
                      <div>
                         <div className="text-sm font-medium text-light-text dark:text-dark-text">{m.name}</div>
                         <div className="text-[10px] text-light-muted dark:text-dark-muted">{m.role}</div>
                      </div>
                   </div>
                   {m === 0 && (
                       <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-500 ${
                          isActive 
                            ? 'bg-brand-blue/20 text-brand-blue border-brand-blue/30 shadow-[0_0_8px_rgba(45,109,246,0.25)]' 
                            : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                       }`}>
                           Admin
                       </span>
                   )}
                </div>
             ))}
          </div>
       </div>

    </div>
  );
};
