import React, { useEffect, useRef, useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

const FALLBACK_REDIRECT = 'verityprotect://auth/callback';

const stageContent = {
  verifying: {
    title: 'Verifying Identity',
    description: 'We’re confirming your credentials and returning you to the Verity Protect app.',
    indicator: 'Encrypted redirect in progress',
    button: 'Opening App...',
  },
  success: {
    title: 'Secure Connection',
    description: 'Verification complete. Tap below to continue in the Verity app.',
    indicator: 'Connection secured',
    button: 'Open Verity Protect',
  },
  failed: {
    title: 'Something went wrong',
    description: 'Verification took too long. Tap below to retry or copy the link.',
    indicator: 'Redirect timeout',
    button: 'Retry',
  },
};

export const AuthCallbackPage: React.FC = () => {
  const [redirectUri, setRedirectUri] = useState(FALLBACK_REDIRECT);
  const [queryString, setQueryString] = useState('');
  const [stage, setStage] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (redirectedRef.current || typeof window === 'undefined') return;
    redirectedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const target = params.get('redirect_to') || FALLBACK_REDIRECT;
    setRedirectUri(target);
    setQueryString(window.location.search);

    const successTimer = window.setTimeout(() => setStage('success'), 1500);
    const failTimer = window.setTimeout(() => setStage(prev => (prev === 'verifying' ? 'failed' : prev)), 60_000);

    try {
      window.location.href = `${target}${window.location.search}`;
    } catch (err) {
      console.error('Redirect failed', err);
    }

    return () => {
      window.clearTimeout(successTimer);
      window.clearTimeout(failTimer);
    };
  }, []);

  const manualHref = `${redirectUri}${queryString}`;
  const { title, description, indicator, button } = stageContent[stage];
  const isSuccess = stage === 'success';
  const indicatorColor = stage === 'failed' ? 'bg-red-400' : isSuccess ? 'bg-emerald-400' : 'bg-brand-blue/70';

  const handleManualRedirect = () => {
    window.location.href = manualHref;
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-[460px]">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-light-card dark:bg-dark-card/90 p-8 shadow-[0_30px_120px_rgba(3,6,15,0.6)] backdrop-blur-[24px] sm:px-10">
          <div className="absolute -left-16 top-4 h-48 w-48 rounded-full bg-brand-blue/10 blur-[80px]" />
          <div className="absolute right-[-20%] bottom-0 h-96 w-96 rounded-full bg-brand-blue/30 opacity-20 blur-[140px]" />
          <div className="relative flex flex-col items-center gap-6 text-center text-light-text dark:text-light-text">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-[26px] border border-white/10 bg-brand-blue/10 ${
                isSuccess ? '' : 'calm-scale'
              }`}
              data-testid="auth-squircle"
            >
              {isSuccess ? (
                <ShieldCheck className="h-10 w-10 text-brand-blue" aria-hidden="true" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Loader2 className="h-6 w-6 text-brand-blue animate-spin" aria-hidden="true" />
                </div>
              )}
            </div>
            <h2 className="text-4xl font-semibold text-light-text dark:text-white">{title}</h2>
            <p className="text-base text-light-muted dark:text-light-muted">{description}</p>

            <div className="space-y-4 w-full">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]">
                <span className={`inline-flex h-2 w-2 rounded-full transition-colors duration-500 ${indicatorColor}`} />
                <span
                  className={`whitespace-nowrap text-light-text dark:text-light-muted ${
                    stage === 'failed' ? 'text-red-500' : ''
                  }`}
                >
                  {indicator}
                </span>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-light-border/60 dark:bg-white/10">
                <div
                  className={`absolute inset-0 origin-left rounded-full ${
                    stage === 'failed'
                      ? 'bg-gradient-to-r from-red-500 via-red-400 to-red-300'
                      : 'bg-gradient-to-r from-brand-blue to-white'
                  } transition-transform duration-[1500ms] ${isSuccess ? 'scale-x-100' : 'scale-x-0 calm-progress'}`}
                />
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleManualRedirect}
              disabled={stage === 'verifying'}
              className="w-full bg-brand-blue text-white shadow-[0_10px_30px_rgba(45,109,246,0.35)] disabled:bg-brand-blue/60"
            >
              {button}
            </Button>

            <p className="text-xs text-light-muted dark:text-light-muted/90">
              If the app doesn’t open automatically, tap the button above.
            </p>
          </div>

          <div className="mt-12 border-t border-light-border dark:border-dark-border pt-6">
            <div className="flex flex-col items-center gap-1 text-[12px] text-dark-muted dark:text-light-muted">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Protected by Verity Cloud</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.5em] text-dark-muted/70 dark:text-light-muted/70">
                Global Security Mesh Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
