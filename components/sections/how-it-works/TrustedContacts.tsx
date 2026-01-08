import React from 'react';
import { Check } from 'lucide-react';

interface TrustedContactsProps {
   isActive?: boolean;
}

export const TrustedContacts: React.FC<TrustedContactsProps> = ({ isActive = false }) => {
  const contacts = [
     { name: 'Mom', initial: 'M', color: 'bg-pink-500/20 text-pink-600 dark:text-pink-500' },
     { name: 'Dr. Stuart', initial: 'DR', color: 'bg-blue-500/20 text-blue-600 dark:text-blue-500' },
     { name: 'Alex', initial: 'A', color: 'bg-purple-500/20 text-purple-600 dark:text-purple-500' },
  ];

  return (
     <div className="w-full max-w-[260px] space-y-3">
        {contacts.map((contact, i) => (
           <div 
             key={i} 
             className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#121a26] border transition-all duration-500 ${
               isActive 
                 ? 'border-brand-blue/30 shadow-[0_0_15px_rgba(45,109,246,0.1)]' 
                 : 'border-gray-200 dark:border-[#202c3c] shadow-sm'
             }`}
           >
              <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${contact.color}`}>
                    <span className="text-xs font-bold">{contact.initial}</span>
                 </div>
                 <span className="text-gray-900 dark:text-[#f5f7fb] text-sm font-medium">{contact.name}</span>
              </div>
              <div className={`transition-all duration-500 ${isActive ? 'scale-105' : ''}`}>
                 <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 transition-all duration-500 ${
                    isActive 
                      ? 'bg-brand-blue/20 text-brand-blue border-brand-blue/30 shadow-[0_0_8px_rgba(45,109,246,0.25)]' 
                      : 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                 }`}>
                    <Check size={10} strokeWidth={3} /> Trusted
                 </span>
              </div>
           </div>
        ))}
     </div>
  )
};
