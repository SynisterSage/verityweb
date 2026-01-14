import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Benefits } from './components/sections/Benefits';
import { Agencies } from './components/sections/Agencies';
import { FAQ } from './components/sections/FAQ';
import { Waitlist } from './components/sections/Waitlist';
import { ExplainerVideo } from './components/sections/ExplainerVideo';
import { Footer } from './components/layout/Footer';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { CookieConsent } from './components/ui/CookieConsent';
import { initGA, pageview } from './src/analytics';
import Page from './src/Page';
import seo from './src/seo';

function Home({ scrollTo }: { scrollTo?: string }) {
  React.useEffect(() => {
    if (!scrollTo) return;
    // small delay to ensure layout rendered
    const t = setTimeout(() => {
      try {
        const el = document.querySelector(scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } catch {}
    }, 60);
    return () => clearTimeout(t);
  }, [scrollTo]);

  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <ExplainerVideo />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <Agencies />
      <Waitlist />
    </div>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    try {
      const consent = localStorage.getItem('verity_cookie_consent');
      if (consent === 'true') {
        initGA();
        // send initial pageview
        pageview(window.location.pathname + window.location.search);
      }
    } catch {}
  }, []);

  useEffect(() => {
    // send SPA pageview on route change if gtag initialized
    pageview(location.pathname + location.search);
    try {
      const path = location.pathname.replace(/\/$/, '') || '/';
      const mapped = seo[path];
      if (mapped && mapped.title) {
        // set document.title to ensure immediate update on client navigation
        const base = 'Verity Protect';
        const title = mapped.title.includes('|') ? mapped.title : `${mapped.title} | ${base}`;
        document.title = title;
      }
    } catch {}
  }, [location]);
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg font-sans selection:bg-brand-blue selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<Page title="How it works" description="How Verity screens calls and keeps your family safe"><Home scrollTo="#how-it-works" /></Page>} />
          <Route path="/benefits" element={<Page title="Benefits" description="Why families trust Verity to protect their loved ones"><Home scrollTo="#benefits" /></Page>} />
          <Route path="/faq" element={<Page title="FAQ" description="Frequently asked questions about Verity Protect"><Home scrollTo="#faq" /></Page>} />
          <Route path="/agencies" element={<Page title="Agencies" description="Information for agencies and partners"><Home scrollTo="#agencies" /></Page>} />
          <Route path="/waitlist" element={<Page title="Join the waitlist" description="Sign up to join the Verity Protect waitlist"><Home scrollTo="#waitlist" /></Page>} />
          <Route path="/privacy" element={<div className="animate-in fade-in duration-500"><PrivacyPolicy /></div>} />
          <Route path="/terms" element={<div className="animate-in fade-in duration-500"><TermsOfService /></div>} />
        </Routes>
      </main>
      <CookieConsent />
      <Footer />
    </div>
  );
}

export default App;
