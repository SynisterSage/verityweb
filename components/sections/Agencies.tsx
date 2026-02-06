import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Building2, Heart, Shield, Sparkles } from 'lucide-react';

export const Agencies: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePartnershipClick = () => {
    // If already on home page, navigate to same page with role param to trigger update
    if (location.pathname === '/') {
      navigate('/?role=facility', { replace: true });
      setTimeout(() => {
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
          waitlistSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      // Navigate to home with waitlist section and role
      navigate('/?role=facility');
      setTimeout(() => {
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
          waitlistSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <section id="agencies" className="py-24 bg-gradient-to-b from-transparent to-brand-blue/5 border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wide mb-6">
                <Building2 size={14} />
                For Senior Living Facilities
              </div>
              <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
                Protect residents. Attract families. Zero work for your team.
              </h2>
              <p className="text-lg text-light-muted dark:text-dark-muted mb-8">
                Position your facility as the safer choice. We handle everything. You just share our materials with incoming families.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-light-text dark:text-dark-text">
                  <div className="bg-brand-blue/10 p-1 rounded-full text-brand-blue">
                    <Shield size={18} />
                  </div>
                  <span>Stop scammers before they reach your residents</span>
                </li>
                <li className="flex items-center gap-3 text-light-text dark:text-dark-text">
                  <div className="bg-brand-blue/10 p-1 rounded-full text-brand-blue">
                    <Heart size={18} />
                  </div>
                  <span>Stand out to families during tours</span>
                </li>
                <li className="flex items-center gap-3 text-light-text dark:text-dark-text">
                  <div className="bg-brand-blue/10 p-1 rounded-full text-brand-blue">
                    <Sparkles size={18} />
                  </div>
                  <span>Exclusive pricing for your community</span>
                </li>
              </ul>

              <Button variant="primary" onClick={handlePartnershipClick}>
                Request partnership info
              </Button>
            </div>

            <div className="relative">
                <div className="bg-gradient-to-br from-brand-blue/5 to-brand-blue/10 p-8 rounded-2xl border border-brand-blue/20 shadow-2xl">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/10 mb-4">
                        <Building2 size={32} className="text-brand-blue" />
                      </div>
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                        Partnership Made Simple
                      </h3>
                      <p className="text-light-muted dark:text-dark-muted text-sm">
                        Free for your facility. No contracts. No hassle.
                      </p>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-light-border dark:border-dark-border">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                        <p className="text-sm text-light-text dark:text-dark-text">Branded brochures for your welcome packets</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                        <p className="text-sm text-light-text dark:text-dark-text">Custom discount code for your residents</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                        <p className="text-sm text-light-text dark:text-dark-text">Families handle all setup and support</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-blue"></div>
                        <p className="text-sm text-light-text dark:text-dark-text">Your team does nothing after signup</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};