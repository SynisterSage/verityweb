import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items: FaqItem[] = [
    {
      question: "Does it work on phones and landlines?",
      answer: "Yes, as long as call forwarding is supported. Verity works seamlessly with mobile phones and most landline providers to ensure protection regardless of the device."
    },
    {
      question: "Will my loved one have to answer unknown callers?",
      answer: "No. Unknown callers are screened silently and go to voicemail where they are reviewed by family or caregivers. Your loved one is never disturbed by strangers."
    },
    {
      question: "How does the PIN work, and can families make it optional?",
      answer: "Unknown callers are asked for a short PIN. If they enter it, the call connects; if not, they can leave a message for review. Families can choose to disable the PIN so unknown callers go straight to the reviewed message instead."
    },
    {
      question: "What happens when someone isn’t trusted, do they still reach voicemail?",
      answer: "They don’t ring your loved one. Verity answers, asks for a brief message, and you review it in the app. You can then mark it safe or block the number."
    },
    {
      question: "How do trusted contacts work?",
      answer: "You choose family, friends, and doctors to add to the safe list. Calls from these trusted contacts bypass the PIN requirement and ring the phone immediately."
    },
    {
      question: "What if a doctor calls from a new number?",
      answer: "Verity will ask them for the Family PIN. If they enter it, the call rings through. If they don't have it, they can leave a message, and you can mark the number as safe for next time."
    },
    {
      question: "How much does Verity Protect cost?",
      answer: "We are currently in early access. Pricing will be announced soon. We encourage you to join the waitlist to get the latest updates on launch availability."
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-blue/5 border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-light-text dark:text-dark-text mb-12">
          Common Questions
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl overflow-hidden transition-colors duration-200 hover:border-brand-blue/30"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                onClick={() => toggle(index)}
              >
                <span className="font-medium text-light-text dark:text-dark-text pr-4 text-lg">{item.question}</span>
                {openIndex === index ? (
                  <div className="bg-brand-blue/10 p-2 rounded-full flex-shrink-0">
                    <Minus className="text-brand-blue" size={20} />
                  </div>
                ) : (
                  <div className="bg-light-bg dark:bg-dark-bg p-2 rounded-full flex-shrink-0 group-hover:bg-brand-blue/10 transition-colors">
                    <Plus className="text-light-muted dark:text-dark-muted group-hover:text-brand-blue transition-colors" size={20} />
                  </div>
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-light-muted dark:text-dark-muted leading-relaxed text-base">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};