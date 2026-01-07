import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items: FaqItem[] = [
    {
      question: "Can I use this with mobile phones and landlines?",
      answer: "Yes. Verity works with mobile phones and most landlines so calls stay protected no matter the device."
    },
    {
      question: "Will my loved one have to answer unknown callers?",
      answer: "No. Unknown callers are screened and sent to voicemail for family review so your loved one is not bothered by strangers."
    },
    {
      question: "How does the Family PIN work?",
      answer: "Unknown callers are asked to enter a short Family PIN. If they enter it correctly the call connects. If they get it wrong or skip it, they leave a short voicemail for your family to review. You can turn the PIN off if you prefer."
    },
    {
      question: "What happens if a caller isn't on the trusted list?",
      answer: "Their call is answered by Verity, not your loved one. Verity asks them to leave a short message (or enter the PIN if you’ve turned that on). You review it in the app and decide to allow or block the number."
    },
    {
      question: "How do trusted contacts work?",
      answer: "Add family, friends, and doctors from your phone's Contacts. Calls from trusted contacts bypass the PIN and ring through right away."
    },
    {
      question: "What if a doctor or caregiver calls from a new number?",
      answer: "They will be asked for the Family PIN. If they enter it the call connects. If not, they can leave a short message and you can mark the number as trusted afterward."
    },
    {
      question: "How much does this cost?",
      answer: "We're in early access and will share pricing soon. Join the waitlist to get updates and early access offers."
    }
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Inject JSON-LD for FAQ to help search engines
  useEffect(() => {
    try {
      const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(i => ({
          "@type": "Question",
          "name": i.question,
          "acceptedAnswer": { "@type": "Answer", "text": i.answer }
        }))
      };
      let script = document.getElementById('faq-jsonld') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = 'faq-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(data);
    } catch {}
    return () => {
      const s = document.getElementById('faq-jsonld');
      if (s) s.remove();
    };
  }, []);

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