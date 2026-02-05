import React, { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { ClipboardCopy, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

const FALLBACK_REDIRECT = 'verityprotect://auth/callback';

const stageContent = {
  connecting: {
    title: 'Connecting to Verity Protect…',
    description: 'Awaiting your native app to open and claim this URL.',
    indicator: 'Checking the universal link',
    button: 'Open the app',
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
  const [emailParam, setEmailParam] = useState<string | null>(null);
  const schemeUrl = React.useMemo(() => {
    const params = new URLSearchParams({ source: 'confirmation' });
    if (emailParam) {
      params.set('email', emailParam);
    }
    return `verityprotect://auth/callback?${params.toString()}`;
  }, [emailParam]);
  const [redirectUri, setRedirectUri] = useState(FALLBACK_REDIRECT);
  const [stage, setStage] = useState<'connecting' | 'success' | 'failed'>('connecting');
  const [linkError, setLinkError] = useState<string | null>(null);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (redirectedRef.current || typeof window === 'undefined') return;
    redirectedRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    if (email) {
      setEmailParam(email);
    }
    const target = params.get('redirect_to') || FALLBACK_REDIRECT;
    setRedirectUri(target);

    const errorDescription = params.get('error_description');
    const type = params.get('type');
    if (errorDescription) {
      setStage('failed');
      setLinkError('This link was already used; request a fresh confirmation email.');
      return;
    }

    if (type === 'oauth') {
      window.location.href = schemeUrl;
      return;
    }

    const successTimer = window.setTimeout(() => setStage('success'), 1500);
    const failTimer = window.setTimeout(() => setStage(prev => (prev === 'connecting' ? 'failed' : prev)), 60_000);

    return () => {
      window.clearTimeout(successTimer);
      window.clearTimeout(failTimer);
    };
  }, []);

  const manualHref = schemeUrl;
  const { title, description, indicator, button } = stageContent[stage];
  const isSuccess = stage === 'success';
  const indicatorColor = stage === 'failed' ? 'bg-red-400' : isSuccess ? 'bg-emerald-400' : 'bg-brand-blue/70';
  const [isDesktop, setIsDesktop] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrError, setQrError] = useState(false);
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleManualRedirect = () => {
    window.location.href = schemeUrl;
  };

  useEffect(() => {
    if (!manualHref || !isDesktop) {
      setQrDataUrl(null);
      return;
    }

    let cancelled = false;
    QRCode.toDataURL(manualHref, { margin: 2, color: { dark: '#0b111b', light: '#f8fafc' } })
      .then((url) => {
        if (!cancelled) {
          setQrDataUrl(url);
          setQrError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setQrError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [manualHref, isDesktop]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDesktop = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const small = window.innerWidth < 640;
      setIsDesktop(!coarse && !small);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    window.addEventListener('orientationchange', checkDesktop);
    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('orientationchange', checkDesktop);
    };
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(manualHref);
      setCopied('copied');
    } catch {
      setCopied('failed');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-[620px] space-y-8">
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
                  className={`absolute inset-0 origin-left rounded-full transition-transform duration-[1500ms] ${isSuccess ? 'scale-x-100' : 'scale-x-0 calm-progress'}`}
                  style={{
                    background: stage === 'failed'
                      ? 'linear-gradient(90deg, rgba(239,68,68,1), rgba(252,165,165,1))'
                      : isSuccess
                        ? 'linear-gradient(90deg, rgba(16,185,129,1), rgba(34,197,94,1))'
                        : 'linear-gradient(90deg, rgba(59,130,246,1), rgba(191,219,254,1))',
                  }}
                />
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleManualRedirect}
              disabled={stage === 'connecting'}
              className="w-full bg-brand-blue text-white shadow-[0_10px_30px_rgba(45,109,246,0.35)] disabled:bg-brand-blue/60"
            >
              {button}
            </Button>

            <p className="text-xs text-light-muted dark:text-light-muted/90">
              If the app doesn’t open automatically, tap the button above.
            </p>
            {linkError && (
              <div className="mt-4 rounded-2xl border border-red-200/60 bg-red-50/60 px-4 py-3 text-sm text-red-800 dark:border-red-500/60 dark:bg-red-900/50 dark:text-red-200">
                <p className="font-semibold">Link expired</p>
                <p className="text-[13px] text-red-800/80 dark:text-red-200/80">
                  This confirmation link was already used. Please request a fresh email or open the app manually.
                </p>
              </div>
            )}
            {isDesktop && (
            <div className="mt-6 w-full rounded-2xl border border-light-border/40 bg-white/20 p-4 text-center shadow-lg shadow-black/20 dark:border-dark-border/40 dark:bg-dark-card/80">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-dark-text dark:text-light-muted">
                  Desktop? Scan this QR
                </p>
                <p className="text-[11px] text-dark-muted dark:text-light-muted/80">
                  Use your phone camera to open the Verity Protect app.
                </p>
                <div className="mt-3 flex items-center justify-center">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="Scan to open Verity Protect" className="h-36 w-36 rounded-2xl border border-white/20 bg-white" />
                  ) : qrError ? (
                    <div className="flex h-36 w-36 items-center justify-center rounded-2xl border border-red-300/50 bg-red-50 text-xs text-red-600">
                      QR unavailable
                    </div>
                  ) : (
                    <div className="flex h-36 w-36 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xs text-light-muted">
                      Generating QR…
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-2 text-xs text-light-muted dark:text-light-muted/80">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-dark-border/80 dark:border-white/40 bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.4em] text-[#0f172a] dark:text-white transition hover:border-brand-blue hover:text-brand-blue dark:hover:text-brand-blue"
                >
                <ClipboardCopy className="h-4 w-4" />
                {copied === 'copied' ? 'Link copied' : 'Copy link'}
              </button>
                  {copied === 'failed' && (
                    <span className="text-[10px] text-red-400">Unable to copy—please copy manually</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 border-t border-light-border dark:border-dark-border pt-6">
            <div className="flex flex-col items-center gap-1 text-[11px] text-dark-muted dark:text-light-muted">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-semibold">Protected by Verity Cloud</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-dark-muted/70 dark:text-light-muted/70 text-center">
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
