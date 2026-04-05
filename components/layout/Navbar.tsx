import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Logo } from '../visuals/Logo';
import { useLocation, useNavigate } from 'react-router-dom';
import { openAppStore } from '../../src/appStore';

// Animated Hamburger Icon Component
const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <style>{`
        @keyframes line1-open {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(8px) rotate(45deg);
          }
        }
        @keyframes line1-close {
          0% {
            transform: translateY(8px) rotate(45deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        @keyframes line2-open {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes line2-close {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes line3-open {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-8px) rotate(-45deg);
          }
        }
        @keyframes line3-close {
          0% {
            transform: translateY(-8px) rotate(-45deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }
        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: currentColor;
          border-radius: 1px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hamburger-line-1 {
          animation: ${isOpen ? 'line1-open' : 'line1-close'} 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hamburger-line-2 {
          animation: ${isOpen ? 'line2-open' : 'line2-close'} 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hamburger-line-3 {
          animation: ${isOpen ? 'line3-open' : 'line3-close'} 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <span className="hamburger-line hamburger-line-1"></span>
      <span className="hamburger-line hamburger-line-2" style={{ margin: '4px 0' }}></span>
      <span className="hamburger-line hamburger-line-3"></span>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Simple scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Benefits', href: '/benefits' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Facilities', href: '/agencies' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  const goHome = () => {
    setMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border'
            : 'bg-transparent border-b border-transparent'
        } ${isScrolled ? 'py-3' : 'py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Logo */}
            <button
              onClick={goHome}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Home"
            >
              <Logo className="w-8 h-8" />
              <span className="text-lg font-semibold text-light-text dark:text-dark-text hidden sm:block">
                Verity
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button size="sm" onClick={openAppStore}>
                Download
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-light-text dark:text-dark-text"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-light-bg dark:bg-dark-bg lg:hidden">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-light-border dark:border-dark-border mt-4">
              <Button fullWidth size="lg" onClick={openAppStore}>
                Download on the App Store
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
