import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ArrowRight, Building2, CheckCircle2, Heart, Shield, Sparkles } from 'lucide-react';

export const Agencies: React.FC = () => {
  const navigate = useNavigate();

  const handlePartnershipClick = () => {
    navigate('/facilities-contact');
    setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch {}
    }, 60);
  };

  return (
    <section id="agencies" className="py-24 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-7 sm:p-10 lg:p-14 shadow-sm">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg px-3 py-1 text-xs font-bold uppercase tracking-wide text-light-muted dark:text-dark-muted">
                <Building2 size={14} />
                For Senior Living Facilities
              </div>

              <h2 className="mb-3 text-3xl font-semibold tracking-tight text-light-text dark:text-dark-text sm:text-4xl">
                Protect residents. Attract families. Zero work for your team.
              </h2>

              <p className="mb-7 max-w-xl text-base leading-relaxed text-light-muted dark:text-dark-muted sm:text-lg">
                Position your facility as the safer choice. We handle everything. You just share our materials with incoming families.
              </p>

              <ul className="mb-7 space-y-2">
                <li className="flex items-start gap-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg/60 dark:bg-dark-bg/40 px-3 py-3 text-light-text dark:text-dark-text">
                  <div className="mt-0.5 rounded-full bg-light-card dark:bg-dark-card p-1 text-brand-blue/90">
                    <Shield size={18} />
                  </div>
                  <span>Stop scammers before they reach your residents</span>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg/60 dark:bg-dark-bg/40 px-3 py-3 text-light-text dark:text-dark-text">
                  <div className="mt-0.5 rounded-full bg-light-card dark:bg-dark-card p-1 text-brand-blue/90">
                    <Heart size={18} />
                  </div>
                  <span>Stand out to families during tours</span>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-light-border dark:border-dark-border bg-light-bg/60 dark:bg-dark-bg/40 px-3 py-3 text-light-text dark:text-dark-text">
                  <div className="mt-0.5 rounded-full bg-light-card dark:bg-dark-card p-1 text-brand-blue/90">
                    <Sparkles size={18} />
                  </div>
                  <span>Exclusive pricing for your community</span>
                </li>
              </ul>

              <div className="hidden space-y-3 lg:block">
                <Button variant="primary" onClick={handlePartnershipClick} className="w-full sm:w-auto">
                  Request partnership info
                  <ArrowRight size={18} className="ml-2" />
                </Button>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-light-muted dark:text-dark-muted">
                  <CheckCircle2 size={14} className="text-brand-blue" />
                  No contract required. Your team can opt in anytime.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-bg/70 dark:bg-dark-bg/45 p-6 sm:p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted">Program snapshot</p>
                      <h3 className="mt-2 text-2xl font-bold text-light-text dark:text-dark-text">
                        Partnership made simple
                      </h3>
                      <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
                        Everything is designed to be lightweight for facility teams.
                      </p>
                    </div>
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-card dark:bg-dark-card text-brand-blue">
                      <Building2 size={22} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted">Facility cost</p>
                      <p className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">$0</p>
                    </div>
                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted">Contract</p>
                      <p className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">None</p>
                    </div>
                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted">Staff setup</p>
                      <p className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">Minimal</p>
                    </div>
                    <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-3">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted">Family onboarding</p>
                      <p className="mt-1 text-lg font-semibold text-light-text dark:text-dark-text">Self-serve</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-light-border dark:border-dark-border pt-4">
                    {[
                      'Branded brochures for your welcome packets',
                      'Custom discount code for your residents',
                      'Families handle all setup and support',
                      'Your team does nothing after signup',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                        <p className="text-sm text-light-text dark:text-dark-text">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3 lg:hidden">
            <Button variant="primary" onClick={handlePartnershipClick} className="w-full">
              Request partnership info
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-light-muted dark:text-dark-muted">
              <CheckCircle2 size={14} className="text-brand-blue" />
              No contract required. Your team can opt in anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
