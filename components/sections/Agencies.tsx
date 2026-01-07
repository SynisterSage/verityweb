import React from 'react';
import { Button } from '../ui/Button';
import { Building2, ListChecks, FileText, LayoutDashboard } from 'lucide-react';

export const Agencies: React.FC = () => {
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
                For Agencies
              </div>
              <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
                Protection your care teams can trust
              </h2>
              <p className="text-lg text-light-muted dark:text-dark-muted mb-8">
                Verity Protect helps agencies keep clients safe from phone scams. Standardize trusted‑contact lists, review screened calls, and grow with a system built for care teams.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-light-text dark:text-dark-text">
                  <div className="bg-brand-blue/10 p-1 rounded-full text-brand-blue">
                    <ListChecks size={18} />
                  </div>
                  <span>Trusted‑contact allowlists per client</span>
                </li>
                <li className="flex items-center gap-3 text-light-text dark:text-dark-text">
                  <div className="bg-brand-blue/10 p-1 rounded-full text-brand-blue">
                    <FileText size={18} />
                  </div>
                  <span>Screened call reviews and notes</span>
                </li>
                <li className="flex items-center gap-3 text-light-text dark:text-dark-text">
                  <div className="bg-brand-blue/10 p-1 rounded-full text-brand-blue">
                    <LayoutDashboard size={18} />
                  </div>
                  <span>Agency dashboard in early access</span>
                </li>
              </ul>

              <Button variant="primary" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                Join agency waitlist
              </Button>
            </div>

            <div className="relative group">
                {/* Early Access Pill */}
                <div className="absolute -top-3 -right-2 z-20 bg-brand-warning text-dark-bg px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-brand-warning/50 animate-bounce">
                    Early Access
                </div>

                <div className="bg-light-bg dark:bg-dark-bg p-6 rounded-2xl border border-light-border dark:border-dark-border shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-6 border-b border-light-border dark:border-dark-border pb-4">
                     <span className="font-semibold text-light-text dark:text-dark-text text-sm">Agency tools (early access)</span>
                  </div>
                  <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-light-card dark:bg-dark-card/50 hover:bg-light-card dark:hover:bg-dark-border transition-colors cursor-default">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                             <div>
                                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse delay-75"></div>
                                <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded animate-pulse delay-100"></div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="text-xs font-mono text-green-500">Active</div>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};