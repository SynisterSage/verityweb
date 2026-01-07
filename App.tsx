import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Benefits } from './components/sections/Benefits';
import { Agencies } from './components/sections/Agencies';
import { FAQ } from './components/sections/FAQ';
import { Waitlist } from './components/sections/Waitlist';
import { Footer } from './components/layout/Footer';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { CookieConsent } from './components/ui/CookieConsent';
import { initGA, pageview } from './analytics';

function Home() {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
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
  }, [location]);
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg font-sans selection:bg-brand-blue selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
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