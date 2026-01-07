import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../visuals/Logo';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
}

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [paddingRight, setPaddingRight] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open and compensate for scrollbar
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      setPaddingRight(scrollbarWidth);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      setPaddingRight(0);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.body.style.paddingRight = '0px';
    };
  }, [mobileMenuOpen]);

  // Apply a theme value to the document and local state
  const updateMetaThemeColor = (dark: boolean) => {
    try {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#0b111b' : '#ffffff');
    } catch {}
  };

  const applyTheme = (theme: 'dark' | 'light' | 'system') => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      setIsDark(prefersDark);
      updateMetaThemeColor(prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      setIsDark(theme === 'dark');
      updateMetaThemeColor(theme === 'dark');
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('verity_theme') as 'dark' | 'light' | 'system' | null;
    if (stored) {
      applyTheme(stored);
    } else {
      // default behavior (fallback to system)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      setIsDark(prefersDark);
    }

    // Sync theme across tabs/windows on storage change
    const handleStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if (e.key === 'verity_theme') {
        const newTheme = (e.newValue || null) as 'dark' | 'light' | 'system' | null;
        if (newTheme) applyTheme(newTheme);
      }
      if (e.key === 'verity_cookie_consent') {
        // if consent was removed in another tab, don't persist theme there
        const consent = e.newValue;
        if (consent !== 'true') {
          try { localStorage.removeItem('verity_theme'); } catch {};
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle('dark', nextIsDark);
    updateMetaThemeColor(nextIsDark);
    try {
      const consent = localStorage.getItem('verity_cookie_consent');
      if (consent === 'true') {
        localStorage.setItem('verity_theme', nextIsDark ? 'dark' : 'light');
      }
    } catch {}
  };

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Agencies', href: '#agencies' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const goHome = () => {
    setMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // We restrict transition properties to avoid animating padding-right which causes visual jumps when scrollbar disappears
  const navClasses = `fixed top-0 left-0 right-0 z-50 duration-300 border-b transition-[padding-top,padding-bottom,background-color,border-color,box-shadow,backdrop-filter] ${
    isScrolled || mobileMenuOpen 
      ? 'bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl border-light-border dark:border-dark-border py-3 lg:py-4 shadow-sm' 
      : 'bg-transparent border-transparent py-4 lg:py-6'
  }`;

  return (
    <>
      <nav 
        className={navClasses} 
        style={{ paddingRight: paddingRight ? `${paddingRight}px` : undefined }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group relative z-50" onClick={goHome}>
              <div className="group-hover:scale-105 transition-transform">
                <Logo className="w-10 h-10 shadow-lg shadow-black/10 rounded-2xl" />
              </div>
              <span className="text-xl font-bold tracking-tight text-light-text dark:text-dark-text">
                Verity Protect
              </span>
            </div>

            {/* Desktop Nav - Visible on Large Screens only */}
            {isHome && (
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm font-medium text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Desktop Actions - Visible on Large Screens only */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {isHome && (
                <Button size="sm" onClick={() => handleNavClick('#waitlist')}>
                  Join Waitlist
                </Button>
              )}
              {!isHome && (
                <Button size="sm" variant="outline" onClick={goHome}>
                  Back to Home
                </Button>
              )}
            </div>

            {/* Tablet/Mobile Actions & Menu Toggle */}
            <div className="lg:hidden flex items-center gap-3 relative z-50">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-light-bg dark:bg-dark-bg transition-all duration-300 lg:hidden flex flex-col pt-24 px-6 pb-6 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
          {isHome ? (
            <div className="space-y-2">
              <div className="pb-4 border-b border-light-border dark:border-dark-border mb-4">
                <span className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-wider">Menu</span>
              </div>
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="flex items-center justify-between p-4 -mx-4 rounded-xl text-xl font-medium text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {link.label}
                  <ArrowRight size={20} className="text-light-muted dark:text-dark-muted opacity-50" />
                </a>
              ))}
              <div className="pt-6 mt-6 border-t border-light-border dark:border-dark-border">
                <Button fullWidth size="lg" onClick={() => handleNavClick('#waitlist')}>
                  Join Waitlist
                </Button>
              </div>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-1/2">
                <Button fullWidth size="lg" variant="outline" onClick={goHome}>
                  Back to Home
                </Button>
             </div>
          )}
          
          <div className="mt-auto text-center">
            <p className="text-sm text-light-muted dark:text-dark-muted">
              © {new Date().getFullYear()} Verity Protect
            </p>
          </div>
        </div>
    </>
  );
};