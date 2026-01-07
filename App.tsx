import React from 'react';
import { Routes, Route } from 'react-router-dom';
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