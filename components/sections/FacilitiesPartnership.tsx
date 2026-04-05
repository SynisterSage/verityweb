import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

export const FacilitiesPartnership: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Shield,
      title: 'Protect residents',
      description: 'Reduce scam-related financial and emotional harm across your community.'
    },
    {
      icon: Users,
      title: 'Simplify management',
      description: 'Staff oversight features make resident safety a coordinated effort.'
    },
    {
      icon: Building2,
      title: 'Trusted partnerships',
      description: 'Join senior living communities nationwide using Verity.'
    }
  ];

  const handleContact = () => {
    navigate('/facilities-contact');
    setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch {}
    }, 60);
  };

  return (
    <section className="py-24 bg-light-card dark:bg-dark-card/30" id="facilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-3 py-1 mb-6 text-xs font-semibold uppercase tracking-wide text-light-muted dark:text-dark-muted">
            <Building2 size={14} />
            For Facilities
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6 leading-tight">
            Partner with Verity for your community
          </h2>

          <p className="text-xl text-light-muted dark:text-dark-muted leading-relaxed mb-12">
            Senior living communities trust Verity to protect their residents from phone scams. Simple to implement, easy to manage, proven to reduce harm.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, idx) => (
              <div key={idx}>
                <div className="mb-4 text-brand-blue">
                  <benefit.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">
                  {benefit.title}
                </h3>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <Button size="lg" onClick={handleContact} className="px-8">
            Contact us about partnership
          </Button>
        </div>
      </div>
    </section>
  );
};
