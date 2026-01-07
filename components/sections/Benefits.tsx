import React from 'react';
import { Heart, Lock, Smartphone, Zap } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Peace of Mind",
      description: "Stop worrying about your parents answering the wrong call. We handle the vigilance so you can enjoy the conversation."
    },
    {
      icon: Lock,
      title: "Financial Safety",
      description: "Prevent costly scams before they start. Verity identifies voice-cloning and urgency tactics used by modern fraudsters."
    },
    {
      icon: Smartphone,
      title: "Simple for Parents",
      description: "No new apps for them to learn. No complex interfaces. It works with their existing phone carrier and dialer."
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "As a caretaker, you're always in the loop. Receive email or SMS alerts the moment a threat is intercepted."
    }
  ];

  return (
    <section id="benefits" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 grid sm:grid-cols-2 gap-6">
            {benefits.map((item, idx) => (
              <div key={idx} className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-2xl hover:shadow-glow-sm transition-shadow duration-300">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-4 text-brand-blue">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">{item.title}</h3>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
              Why families trust Verity
            </h2>
            <p className="text-lg text-light-muted dark:text-dark-muted">
              Protecting your family shouldn’t add stress. Verity creates a calm, reliable layer between your loved ones and the outside world, so you stay informed without constant worry.
            </p>
            <p className="text-lg text-light-muted dark:text-dark-muted">
              We take a <span className="text-brand-blue font-semibold">human-first approach</span>. Unknown callers are screened by default, trusted people get through instantly, and you decide what’s safe. It returns the phone to what it should be, a connection without fear.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};