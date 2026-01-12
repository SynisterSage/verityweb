import React from 'react';
import { Twitter, Instagram } from 'lucide-react';
import { Logo } from '../visuals/Logo';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/privacy');
    // ensure we scroll to top after navigation completes (some mobile browsers
    // update layout slower; delay a bit and use multiple scroll targets)
    setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch {}
    }, 60);
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/terms');
    setTimeout(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch {}
    }, 60);
  };

  return (
    <footer className="bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Container */}
        <div className="flex flex-col gap-4 mb-8">
          
          {/* Top Row: Brand - Links - Copyright */}
          {/* On desktop: All 3 on one line, vertically centered. */}
          {/* On mobile: Stacked column. */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Brand (clickable - go home) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  try {
                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  } catch {}
                }, 60);
              }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { navigate('/'); setTimeout(() => { try { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; } catch {} }, 60); } }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Logo className="w-8 h-8 rounded-xl shadow-md shadow-black/10" />
              <span className="text-lg font-bold text-light-text dark:text-dark-text">
                Verity Protect
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-light-muted dark:text-dark-muted">
              <button onClick={handlePrivacyClick} className="hover:text-light-text dark:hover:text-dark-text transition-colors">Privacy & Data</button>
              <button onClick={handleTermsClick} className="hover:text-light-text dark:hover:text-dark-text transition-colors">Terms</button>
              <a href="mailto:verityprotect@gmail.com" className="hover:text-light-text dark:hover:text-dark-text transition-colors">VerityProtect@Gmail.com</a>
            </div>

            {/* Copyright - Visible on Desktop in this row */}
            <div className="hidden md:block text-sm text-light-muted dark:text-dark-muted">
              © {new Date().getFullYear()} Verity Protect.
            </div>

          </div>

          {/* Bottom Row: Socials */}
          <div className="flex flex-col items-center gap-4 relative">
             <div className="flex gap-4 text-light-muted dark:text-dark-muted">
              <a 
                href="https://twitter.com/VerityProtect" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="hover:text-brand-blue transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com/VerityProtect" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="hover:text-brand-blue transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Copyright - Visible on Mobile only (moved to bottom of stack) */}
            <div className="md:hidden text-sm text-light-muted dark:text-dark-muted">
              © {new Date().getFullYear()} Verity Protect Inc.
            </div>
          </div>

        </div>

        <div className="border-t border-light-border dark:border-dark-border pt-8 text-center">
            <p className="text-xs text-light-muted dark:text-dark-muted opacity-70 max-w-2xl mx-auto">
                Verity Protect is a call screening and management service. <strong>It is not a replacement for emergency services.</strong> Verity cannot route 911 calls or detect emergencies. In an emergency, always dial 911 directly from your phone.
            </p>
        </div>
      </div>
    </footer>
  );
};