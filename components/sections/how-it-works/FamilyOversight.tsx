import React from 'react';
import { Users, Shield } from 'lucide-react';

interface FamilyOversightProps {
   isActive?: boolean;
}

const MEMBERS = [
   { name: 'Sarah (You)', role: 'Owner', initial: 'S', color: 'bg-brand-blue' },
   { name: 'David', role: 'Brother', initial: 'D', color: 'bg-indigo-500' }
];

const FamilyOversightInner: React.FC<FamilyOversightProps> = ({ isActive = false }) => {
   return (
      <div className="w-full max-w-[280px]">

         {/* Team Card */}
         <div className={`bg-white dark:bg-[#121a26] border rounded-xl p-4 transition-colors duration-150 ${
               isActive ? 'border-brand-blue/30' : 'border-light-border dark:border-dark-border'
            }`}>
            <div className="flex items-center justify-between mb-4">
               <div className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-wider flex items-center gap-2">
                  <Users size={14} /> Account Members
               </div>
               <div className={`bg-green-500/10 p-1.5 rounded-lg transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-70'}`} style={{ willChange: 'opacity' }}>
                  <Shield size={14} className="text-green-500" />
               </div>
            </div>

            <div className="space-y-3">
               {MEMBERS.map((m, i) => (
                  <div key={m.name} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div
                           className={`${m.color} text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold`}
                           style={{
                              willChange: 'transform',
                              transform: isActive ? 'scale(1.04) translateZ(0)' : 'scale(1) translateZ(0)',
                              transition: 'transform 120ms ease-out'
                           }}
                        >
                           {m.initial}
                        </div>

                        <div>
                           <div className="text-sm font-medium text-light-text dark:text-dark-text">{m.name}</div>
                           <div className="text-[10px] text-light-muted dark:text-dark-muted">{m.role}</div>
                        </div>
                     </div>

                     {i === 0 && (
                        <div className={`transition-transform duration-200 ${isActive ? 'scale-105' : ''}`} style={{ willChange: 'transform, opacity' }}>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 transition-colors duration-200 ${
                            isActive ? 'bg-brand-blue/20 text-brand-blue border-brand-blue/30' : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                          }`} style={{ willChange: 'opacity, color' }}>
                            Admin
                          </span>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>

      </div>
   );
};

export const FamilyOversight = React.memo(FamilyOversightInner);
