import React from 'react';
import { Heart, Lock, Smartphone, Zap } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Peace of mind",
      description: "Stop worrying. Scams are automatically screened before they reach your loved ones."
    },
    {
      icon: Lock,
      title: "Financial safety",
      description: "Protect money and personal details. Risky calls are stopped before damage is done."
    },
    {
      icon: Smartphone,
      title: "Simple for everyone",
      description: "No new apps to learn. Works with the phone they already use, exactly as they expect."
    },
    {
      icon: Zap,
      title: "Stay informed",
      description: "Get alerts the moment we block something. You're always in the loop."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-light-card dark:bg-dark-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-light-text dark:text-dark-text mb-16">
          Why <span className="text-brand-blue">Verity</span> works
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-4 text-brand-blue">
                <item.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">{item.title}</h3>
              <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
