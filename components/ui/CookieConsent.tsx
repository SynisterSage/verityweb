import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from './Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('verity_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('verity_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-[100] animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-light-card/90 dark:bg-dark-card/90 backdrop-blur-xl border border-light-border dark:border-dark-border p-5 rounded-2xl shadow-2xl shadow-black/20 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue shrink-0">
             <Cookie size={20} />
          </div>
          <div>
            <h4 className="font-bold text-light-text dark:text-dark-text text-sm mb-1">We use cookies</h4>
            <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">
              We use analytics cookies to understand how you use our website and improve your experience.
            </p>
            {/* Theme is controlled via the navbar toggle; acceptance enables persistence when toggled. */}
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex gap-2 justify-end">
           <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)}>
             Decline
           </Button>
           <Button size="sm" onClick={handleAccept}>
             Accept
           </Button>
        </div>
      </div>
    </div>
  );
};