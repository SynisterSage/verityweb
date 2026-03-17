import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Benefits } from './components/sections/Benefits';
import { Agencies } from './components/sections/Agencies';
import { FAQ } from './components/sections/FAQ';
import { ExplainerVideo } from './components/sections/ExplainerVideo';
import { Footer } from './components/layout/Footer';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';
import { CookieConsent } from './components/ui/CookieConsent';
import { initGA, pageview } from './src/analytics';
import Page from './src/Page';
import seo from './src/seo';
import { AuthCallbackPage } from './components/sections/AuthCallbackPage';
import { SupportCenter } from './components/sections/SupportCenter';
import { FacilitiesContact } from './components/sections/FacilitiesContact';
import { FacilityResidentOffer } from './components/sections/FacilityResidentOffer';

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
      const rawPath = location.pathname.replace(/\/$/, '') || '/';
      const path = rawPath.startsWith('/support/') ? '/support' : rawPath;
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
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/how-it-works" element={<Page><Home scrollTo="#how-it-works" /></Page>} />
          <Route path="/benefits" element={<Page><Home scrollTo="#benefits" /></Page>} />
          <Route path="/faq" element={<Page><Home scrollTo="#faq" /></Page>} />
          <Route path="/agencies" element={<Page><Home scrollTo="#agencies" /></Page>} />
          <Route
            path="/facilities-contact"
            element={
              <Page>
                <FacilitiesContact />
              </Page>
            }
          />
          <Route
            path="/f/:facilitySlug"
            element={
              <Page
                title="Facility resident offer"
                description="Claim your facility resident offer and continue to download or open Verity Protect."
              >
                <FacilityResidentOffer />
              </Page>
            }
          />
          <Route path="/waitlist" element={<Navigate to="/" replace />} />
          <Route path="/privacy" element={<Page><PrivacyPolicy /></Page>} />
          <Route path="/terms" element={<Page><TermsOfService /></Page>} />
          <Route
            path="/support"
            element={
              <Page>
                <SupportCenter />
              </Page>
            }
          />
          <Route
            path="/support/:sectionSlug"
            element={
              <Page>
                <SupportCenter />
              </Page>
            }
          />
          <Route
            path="/auth/callback"
            element={
              <Page>
                <AuthCallbackPage />
              </Page>
            }
          />
        </Routes>
      </main>
      <CookieConsent />
      <Footer />
    </div>
  );
}

export default App;
