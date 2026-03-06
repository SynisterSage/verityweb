import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, ChevronDown, Loader2, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { openAppStore } from '../../src/appStore';

type FacilitiesFormData = {
  facilityName: string;
  contactName: string;
  workEmail: string;
  phone: string;
  residents: string;
  currentSolution: string;
  timeline: string;
  message: string;
  website: string;
};

const INITIAL_FORM: FacilitiesFormData = {
  facilityName: '',
  contactName: '',
  workEmail: '',
  phone: '',
  residents: '',
  currentSolution: '',
  timeline: '',
  message: '',
  website: '',
};

export const FacilitiesContact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FacilitiesFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot field: real users never fill this.
    if (formData.website.trim()) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const payload = {
        facility_name: formData.facilityName,
        contact_name: formData.contactName,
        work_email: formData.workEmail,
        phone: formData.phone,
        residents: formData.residents,
        current_solution: formData.currentSolution,
        timeline: formData.timeline,
        message: formData.message,
        _subject: 'Facility Partnership Inquiry - Verity Protect',
        _captcha: 'false',
      };

      const response = await fetch('https://formsubmit.co/ajax/verityprotect@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Submission failed: ${response.status} ${text}`);
      }

      setStatus('success');
      setFormData(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Could not send your request right now. Please try again or email support@verityprotect.com.');
    }
  };

  const routeAndTop = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch {}
    }, 60);
  };

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card px-3 py-1 text-xs font-bold uppercase tracking-wide text-light-muted dark:text-dark-muted">
            <Building2 size={14} />
            Facility Partnerships
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-light-text dark:text-dark-text">
            Contact sales
          </h1>
          <p className="mt-3 text-base sm:text-lg text-light-muted dark:text-dark-muted">
            Tell us about your community and we will follow up with partnership details, rollout guidance, and resident pricing options.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">Request sent</h2>
            <p className="text-light-muted dark:text-dark-muted">
              Thanks for reaching out. Our team will contact you shortly.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => setStatus('idle')}>
                Submit another request
              </Button>
              <Button onClick={openAppStore}>
                Download on the App Store
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <input type="hidden" name="_captcha" value="false" />

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                autoComplete="off"
                tabIndex={-1}
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="facilityName" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Facility name
                </label>
                <input
                  id="facilityName"
                  name="facilityName"
                  required
                  value={formData.facilityName}
                  onChange={handleChange}
                  placeholder="Sunset Senior Living"
                  className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Contact name
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="workEmail" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Work email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted" />
                  <input
                    type="email"
                    id="workEmail"
                    name="workEmail"
                    required
                    value={formData.workEmail}
                    onChange={handleChange}
                    placeholder="jane@facility.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Phone <span className="text-xs text-light-muted dark:text-dark-muted">(optional)</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="residents" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Number of residents
                </label>
                <div className="relative">
                  <select
                    id="residents"
                    name="residents"
                    required
                    value={formData.residents}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 pr-12 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select range</option>
                    <option value="1-49">1-49</option>
                    <option value="50-99">50-99</option>
                    <option value="100-199">100-199</option>
                    <option value="200-499">200-499</option>
                    <option value="500+">500+</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Timeline
                </label>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 pr-12 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Not sure yet</option>
                    <option value="this-month">This month</option>
                    <option value="next-30-days">Next 30 days</option>
                    <option value="next-quarter">This quarter</option>
                    <option value="future">Future planning</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="currentSolution" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Current call protection solution <span className="text-xs text-light-muted dark:text-dark-muted">(optional)</span>
              </label>
              <input
                id="currentSolution"
                name="currentSolution"
                value={formData.currentSolution}
                onChange={handleChange}
                placeholder="Carrier filters, robocall app, internal process, etc."
                className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                Message <span className="text-xs text-light-muted dark:text-dark-muted">(optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Anything you want us to know before we follow up."
                className="w-full px-4 py-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {status === 'error' ? (
              <p className="text-sm text-red-500">{errorMessage}</p>
            ) : null}

            <Button type="submit" fullWidth size="lg" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Sending request...
                </span>
              ) : (
                'Send request'
              )}
            </Button>

            <p className="text-xs sm:text-sm text-center text-light-muted dark:text-dark-muted">
              By sending this form, you agree to our{' '}
              <a href="/terms" onClick={routeAndTop('/terms')} className="text-brand-blue hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="/privacy" onClick={routeAndTop('/privacy')} className="text-brand-blue hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-xs sm:text-sm text-center text-light-muted dark:text-dark-muted">
              Questions?{' '}
              <a href="mailto:support@verityprotect.com" className="text-brand-blue hover:underline">
                support@verityprotect.com
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
