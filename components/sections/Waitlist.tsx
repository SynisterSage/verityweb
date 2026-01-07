import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { UserRole, WaitlistFormData } from '../../types';
import { CheckCircle2, Loader2 } from 'lucide-react';

export const Waitlist: React.FC = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    phone: '',
    notes: '',
    role: UserRole.FAMILY_MEMBER,
    organization: '',
    teamSize: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const ajaxEndpoint = 'https://formsubmit.co/ajax/verityprotect@gmail.com';
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        organization: formData.organization,
        teamSize: formData.teamSize,
        notes: formData.notes,
        _subject: 'Verity Protect Waitlist Submission',
        _captcha: 'false'
      };

      const res = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Form submit failed: ${res.status} ${text}`);
      }

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert('There was an error submitting the form. Please try again or email verityprotect@gmail.com');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="waitlist" className="py-24 bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
            Join the waitlist
          </h2>
          <p className="text-light-muted dark:text-dark-muted">
            Secure your spot for early access. We are onboarding families and agencies on a rolling basis.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">You're on the list!</h3>
            <p className="text-light-muted dark:text-dark-muted">
              Thanks for trusting Verity. We'll be in touch shortly with your invite code.
            </p>
            <Button 
              variant="ghost" 
              className="mt-6 border border-light-border/50 dark:border-dark-border/50 text-light-text dark:text-dark-text hover:bg-light-text/5 dark:hover:bg-dark-text/5 hover:border-light-text/30 dark:hover:border-dark-text/30" 
              onClick={() => setStatus('idle')}
            >
              Register another email
            </Button>
          </div>
        ) : (
          <form
            action="https://formsubmit.co/verityprotect@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6 bg-light-bg dark:bg-dark-bg p-8 md:p-12 rounded-2xl border border-light-border dark:border-dark-border shadow-lg"
          >
            <input type="hidden" name="_subject" value="Verity Protect Waitlist Submission" />
            <input type="hidden" name="_next" value="/" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Phone Number <span className="text-light-muted dark:text-dark-muted font-normal text-xs ml-1">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">I am a...</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { val: UserRole.FAMILY_MEMBER, label: 'Family Member' },
                  { val: UserRole.CARETAKER, label: 'Caretaker' },
                  { val: UserRole.AGENCY, label: 'Agency' }
                ].map((option) => (
                  <button
                    key={option.val}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: option.val })}
                    className={`px-3 py-3 rounded-xl text-sm font-medium border transition-all ${
                      formData.role === option.val
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:border-brand-blue/50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Agency Fields */}
            {formData.role === UserRole.AGENCY && (
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-light-border dark:border-dark-border animate-in slide-in-from-top-2 fade-in duration-300">
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="Care Solutions Inc."
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Clients / Team Size
                  </label>
                  <div className="relative">
                    <select
                      id="teamSize"
                      name="teamSize"
                      required
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all appearance-none h-12"
                      value={formData.teamSize}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="50+">50+</option>
                    </select>
                    {/* Chevron indicator for dropdown */}
                    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Notes / Questions <span className="text-light-muted dark:text-dark-muted font-normal text-xs ml-1">(Optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
                placeholder="Anything else you'd like us to know?"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <Button 
              type="submit" 
              fullWidth 
              size="lg"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </span>
              ) : 'Request Access'}
            </Button>
            
            <p className="text-sm text-center text-light-muted dark:text-dark-muted">
              By joining, you agree to our Terms of Service and Privacy Policy.
            </p>

            <p className="pt-4 text-center text-sm text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border mt-6">
               Questions? Email us directly at <a href="mailto:verityprotect@gmail.com" className="text-brand-blue hover:underline">verityprotect@gmail.com</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};