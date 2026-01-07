import React from 'react';
import { Heart, Lock, Smartphone, Zap } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Peace of Mind",
      description: "Stop worrying about your loved ones answering the wrong call. We quietly screen risky calls so you can enjoy talking with them."
    },
    {
      icon: Lock,
      title: "Financial Safety",
      description: "Stop scams before money is lost. Verity looks for callers who try to rush or trick people into giving money or personal details."
    },
    {
      icon: Smartphone,
      title: "Simple for Parents",
      description: "No new apps to learn. No confusing menus. It works with the phone they already know and uses the usual calling screen."
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description: "You stay informed. Get immediate alerts by email or text the moment we block a risky call."
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
              How <span className="text-brand-blue">Verity</span> protects your family
            </h2>
            <p className="text-lg text-white dark:text-white">
              Phone scams are getting smarter and often target older adults. Did you know scams can cost families hundreds or even thousands of dollars? <span className="text-brand-blue font-semibold">Verity</span> stops risky calls so your loved ones don’t have to decide in the moment.
            </p>
            <p className="text-lg text-white dark:text-white">
              <span className="text-brand-blue font-semibold">Trusted contacts</span> ring through automatically. Unknown callers must enter a <span className="text-brand-blue font-semibold">Family PIN</span>. Entering the correct PIN connects the call. Entering the wrong PIN or skipping it asks the caller to leave a short <span className="text-brand-blue font-semibold">voicemail for family review</span>.
            </p>
            <p className="text-lg text-light-muted dark:text-dark-muted font-semibold">
              Simple, automatic, and focused on keeping money and peace of mind with your family.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};