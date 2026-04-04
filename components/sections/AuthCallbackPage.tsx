import React, { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { ClipboardCopy, Loader2, ShieldCheck, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '../ui/Button';

const FALLBACK_REDIRECT = 'verityprotect://auth/callback';
const MOBILE_REGEX = /iPhone|iPad|iPod|Android/i;
const DEEP_LINK_TIMEOUT = 2000; // milliseconds

// Helper function to validate email format
const isValidEmail = (email: string | null): email is string => {
  return typeof email === 'string' && email.includes('@');
};

// Helper function to detect mobile device
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return MOBILE_REGEX.test(navigator.userAgent);
};

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
  // URL Parameters
  const [emailParam, setEmailParam] = useState<string | null>(null);
  const [tokenParam, setTokenParam] = useState<string | null>(null);
  const [typeParam, setTypeParam] = useState<string>('verify');
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [errorParam, setErrorParam] = useState<string | null>(null);
  
  // Legacy params for password reset
  const [modeParam, setModeParam] = useState<string | null>(null);
  const [sourceParam, setSourceParam] = useState<string>('confirmation');
  const [resetToken, setResetToken] = useState<string | null>(null);

  // UI State
  const [stage, setStage] = useState<'connecting' | 'success' | 'failed'>('connecting');
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [appNotInstalled, setAppNotInstalled] = useState(false);
  const [redirectUri, setRedirectUri] = useState(FALLBACK_REDIRECT);

  // Password reset state
  const [resetState, setResetState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [resetError, setResetError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Refs and tracking
  const redirectedRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrError, setQrError] = useState(false);
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [autoRedirected, setAutoRedirected] = useState(false);

  const isResetFlow = modeParam === 'reset' && sourceParam === 'password';

  // Build deep link with proper URL encoding
  const deepLink = useMemo(() => {
    if (!isValidEmail(emailParam) || !tokenParam) {
      return null;
    }
    const params = new URLSearchParams();
    params.set('email', emailParam);
    params.set('token', tokenParam);
    params.set('type', typeParam || 'verify');
    return `verityprotect://auth/callback?${params.toString()}`;
  }, [emailParam, tokenParam, typeParam]);

  // Legacy scheme URL for backwards compatibility
  const schemeUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('source', sourceParam || 'confirmation');
    if (modeParam) {
      params.set('mode', modeParam);
    }
    if (emailParam) {
      params.set('email', emailParam);
    }
    return `verityprotect://auth/callback?${params.toString()}`;
  }, [emailParam, modeParam, sourceParam]);

  const passwordRequirements = useMemo(() => [
    { label: 'At least 8 characters', met: newPassword.length >= 8 },
    { label: 'Contains a letter', met: /[a-zA-Z]/.test(newPassword) },
    { label: 'Contains a special character', met: /[^a-zA-Z0-9]/.test(newPassword) },
  ], [newPassword]);

  // Initialize: Parse URL parameters and handle mobile deep linking
  useEffect(() => {
    if (redirectedRef.current || typeof window === 'undefined') return;
    redirectedRef.current = true;

    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const getParam = (key: string) => searchParams.get(key) ?? hashParams.get(key);

    // Parse standard email confirmation parameters
    const email = getParam('email');
    const token = getParam('token') ?? getParam('access_token');
    const type = getParam('type') ?? 'verify';
    const errDesc = getParam('error_description');
    const err = getParam('error');

    // Set parameters
    if (email) setEmailParam(email);
    if (token) setTokenParam(token);
    if (type) setTypeParam(type);
    if (errDesc) setErrorDescription(errDesc);
    if (err) setErrorParam(err);

    // Handle error state
    if (errDesc || err) {
      setStage('failed');
      setLinkError(errDesc || 'Authentication error. Please request a fresh confirmation email.');
      return;
    }

    // Legacy password reset flow detection
    const legacyToken = getParam('token') ?? getParam('access_token');
    if (legacyToken) {
      setResetToken(legacyToken);
    }
    const legacyMode = getParam('mode') ?? (type === 'recovery' ? 'reset' : null);
    if (legacyMode) {
      setModeParam(legacyMode);
    }
    const legacySource = getParam('source') ?? (type === 'recovery' ? 'password' : null);
    if (legacySource) {
      setSourceParam(legacySource);
    }

    const target = searchParams.get('redirect_to') || hashParams.get('redirect_to') || FALLBACK_REDIRECT;
    setRedirectUri(target);

    // Check if this is a password reset flow
    const isPasswordReset = legacyMode === 'reset' && legacySource === 'password';
    if (isPasswordReset) {
      return;
    }

    // Detect if user is on mobile
    const mobileDetected = isMobileDevice();
    setIsMobile(mobileDetected);

    // Handle mobile deep linking
    if (mobileDetected && isValidEmail(email) && token) {
      // Valid email and token - attempt deep link
      const deepLinkUrl = `verityprotect://auth/callback?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}&type=${encodeURIComponent(type || 'verify')}`;
      
      // Attempt redirect with timeout fallback
      const timeoutId = window.setTimeout(() => {
        // Timeout reached - app not installed, show web UI
        setAppNotInstalled(true);
        setStage('connecting');
      }, DEEP_LINK_TIMEOUT);

      // Attempt the deep link
      window.location.href = deepLinkUrl;

      return () => {
        window.clearTimeout(timeoutId);
      };
    } else if (mobileDetected && isValidEmail(email)) {
      // Mobile but missing token - show error
      setStage('failed');
      setLinkError('Invalid or expired confirmation link. Please request a fresh email.');
      return;
    }

    // Non-mobile flow: show success stage after delay
    const successTimer = window.setTimeout(() => setStage('success'), 1500);
    const failTimer = window.setTimeout(() => setStage(prev => (prev === 'connecting' ? 'failed' : prev)), 60_000);

    return () => {
      window.clearTimeout(successTimer);
      window.clearTimeout(failTimer);
    };
  }, []);

  // Clean hash from URL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) return;
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  // Handle manual redirects
  const manualHref = deepLink || schemeUrl;
  const handleManualRedirect = () => {
    window.location.href = manualHref;
  };

  // Password reset handler
  const handleResetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resetToken) {
      setResetError(null);
      return;
    }
    if (!newPassword) {
      setResetError('Enter a new password before continuing.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords must match.');
      return;
    }
    if (newPassword.length < 8) {
      setResetError('Use a password with at least 8 characters.');
      return;
    }

    setResetState('submitting');
    setResetError(null);

    try {
      const payload = {
        token: resetToken,
        new_password: newPassword,
        email: emailParam ?? undefined,
      };
      console.log('AuthCallbackPage reset payload', payload);
      const response = await fetch('https://api.verityprotect.com/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message =
          payload?.message ?? payload?.error ?? payload?.detail ?? 'Unable to reset your password right now.';
        throw new Error(message);
      }

      setResetState('success');
    } catch (error) {
      setResetState('idle');
      setResetError(error instanceof Error ? error.message : 'Unable to reset your password right now.');
    }
  };

  // Generate QR code for desktop users
  useEffect(() => {
    if (isResetFlow || !manualHref || !isDesktop) {
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
  }, [manualHref, isDesktop, isResetFlow]);

  // Auto-redirect for success stage
  useEffect(() => {
    if (stage !== 'success' || linkError || autoRedirected || isResetFlow) return;
    const timer = window.setTimeout(() => {
      window.location.href = schemeUrl;
      setAutoRedirected(true);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [stage, linkError, schemeUrl, autoRedirected, isResetFlow]);

  // Detect desktop vs mobile device
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

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(manualHref);
      setCopied('copied');
    } catch {
      setCopied('failed');
    }
  };

  // Computed values
  const { title, description, indicator, button } = stageContent[stage];
  const isSuccess = stage === 'success';
  const indicatorColor = stage === 'failed' ? 'bg-red-400' : isSuccess ? 'bg-emerald-400' : 'bg-brand-blue/70';

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-[620px] space-y-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-light-card dark:bg-dark-card/90 p-8 shadow-[0_30px_120px_rgba(3,6,15,0.6)] backdrop-blur-[24px] sm:px-10">
          <div className="absolute -left-16 top-4 h-48 w-48 rounded-full bg-brand-blue/10 blur-[80px]" />
          <div className="absolute right-[-20%] bottom-0 h-96 w-96 rounded-full bg-brand-blue/30 opacity-20 blur-[140px]" />
          {/* SCENARIO: Mobile with app not installed - Web confirmation UI */}
          {isMobile && appNotInstalled && isValidEmail(emailParam) && (
            <div className="relative flex flex-col gap-6 text-left text-light-text dark:text-light-text">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-dark-text dark:text-light-muted">
                  Confirm your email
                </p>
                <h2 className="text-4xl font-semibold text-light-text dark:text-white">Check your email</h2>
                <p className="text-base text-light-muted dark:text-light-muted/90">
                  Check your email to confirm your address
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-light-muted dark:text-light-muted/80">
                  We've sent a confirmation link to <span className="font-semibold text-light-text dark:text-white">{emailParam}</span>. Click the link in your email to verify your address.
                </p>

                <div className="rounded-2xl border border-yellow-200/60 bg-yellow-50/60 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-500/60 dark:bg-yellow-900/30 dark:text-yellow-100">
                  <p className="font-semibold mb-1">SafeCall app not installed</p>
                  <p className="text-[13px] text-yellow-800/80 dark:text-yellow-200/80">
                    Install the SafeCall app from the App Store to complete confirmation directly in the app.
                  </p>
                </div>

                <Button
                  size="lg"
                  fullWidth
                  onClick={() => {
                    // Attempt to open app store
                    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
                    const storeUrl = isIOS 
                      ? 'https://apps.apple.com/app/safecall/id6734567890'
                      : 'https://play.google.com/store/apps/details?id=com.verityprotect.safecall';
                    window.open(storeUrl, '_blank');
                  }}
                  className="w-full bg-brand-blue text-white shadow-[0_10px_30px_rgba(45,109,246,0.35)]"
                >
                  Install SafeCall App
                </Button>

                <p className="text-xs text-light-muted dark:text-light-muted/90 text-center">
                  Already confirmed? <a href="/" className="text-brand-blue hover:underline font-semibold">Return to home</a>
                </p>
              </div>
            </div>
          )}

          {/* SCENARIO: Password reset flow */}
          {isResetFlow && (
            <div className="relative flex flex-col gap-6 text-left text-light-text dark:text-light-text sm:text-left">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-dark-text dark:text-light-muted">
                  Reset password
                </p>
                <h2 className="text-4xl font-semibold text-light-text dark:text-white">Choose a new password</h2>
                <p className="text-base text-light-muted dark:text-light-muted/90">
                  {emailParam
                    ? `We sent this link to ${emailParam}.`
                    : 'Use the recovery link from your email to update your password.'}
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="w-full space-y-4">
                <div className="space-y-1 text-left">
                  <label htmlFor="new-password" className="text-[11px] font-semibold uppercase tracking-[0.35em] text-dark-muted dark:text-light-muted">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                        setResetError(null);
                      }}
                      autoComplete="new-password"
                      disabled={resetState === 'success'}
                      placeholder="Enter a new password"
                      className="w-full rounded-2xl border border-light-border bg-white/90 px-4 py-3 pr-12 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 dark:border-dark-border dark:bg-dark-card/70 dark:text-white dark:placeholder:text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-light-muted hover:text-dark-text dark:text-light-muted dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  {(newPassword.length > 0) && (
                    <div className="pt-2 pl-1 space-y-1 transition-all duration-300">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2 text-[11px]">
                          {req.met ? (
                            <Check size={12} className="text-emerald-500" strokeWidth={3} />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-dark-muted/30 dark:border-light-muted/30" />
                          )}
                          <span className={req.met ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-dark-muted/70 dark:text-light-muted/70'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-left">
                  <label htmlFor="confirm-password" className="text-[11px] font-semibold uppercase tracking-[0.35em] text-dark-muted dark:text-light-muted">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        setResetError(null);
                      }}
                      autoComplete="new-password"
                      disabled={resetState === 'success'}
                      placeholder="Re-enter your password"
                      className="w-full rounded-2xl border border-light-border bg-white/90 px-4 py-3 pr-12 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30 dark:border-dark-border dark:bg-dark-card/70 dark:text-white dark:placeholder:text-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-light-muted hover:text-dark-text dark:text-light-muted dark:hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={resetState !== 'idle' || !resetToken}
                  className="w-full bg-brand-blue text-white shadow-[0_10px_30px_rgba(45,109,246,0.35)] disabled:bg-brand-blue/60"
                >
                  {resetState === 'submitting' ? 'Resetting password…' : 'Reset my password'}
                </Button> 
              </form>

              {resetError && (
                <div
                  className="rounded-2xl border border-red-200/60 bg-red-50/60 px-4 py-3 text-sm text-red-800 dark:border-red-500/60 dark:bg-red-900/50 dark:text-red-200"
                  aria-live="polite"
                >
                  {resetError}
                </div>
              )}
              {!resetToken && (
                <div className="rounded-2xl border border-red-200/60 bg-red-50/60 px-4 py-3 text-sm text-red-800 dark:border-red-500/60 dark:bg-red-900/50 dark:text-red-200">
                  <p className="font-semibold">Missing token</p>
                  <p className="text-[13px] text-red-800/80 dark:text-red-200/80">
                    The reset link has expired. Request a new email and try again.
                  </p>
                </div>
              )}
              {resetState === 'success' && (
                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/60 dark:bg-emerald-900/30 dark:text-emerald-100">
                  <p className="font-semibold">Success</p>
                  <p className="text-[13px] text-emerald-700/80 dark:text-emerald-100/80">
                    Your password was updated. Open the Verity Protect app to sign in with your new password or return to the landing page.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      fullWidth
                      onClick={() => {
                        window.location.href = '/';
                      }}
                      className="text-sm text-emerald-800 dark:text-emerald-200 border-emerald-300/60 dark:border-emerald-500/50 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 hover:border-emerald-400 dark:hover:border-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
                    >
                      Back to the homepage
                    </Button>
                  </div>
                </div>
              )}
              <div className="text-center text-xs text-slate-500 dark:text-light-muted/80">
                <p className="font-semibold uppercase tracking-[0.4em] text-[10px] text-slate-900 dark:text-light-muted">
                  Need a fresh link?
                </p>
                <p className="mt-1">
                  Request a new password reset email to get a fresh link and return here to continue.
                </p>
              </div>
            </div>
          )}

          {/* SCENARIO: Standard redirect flow (connecting/success/failed stages) */}
          {!isResetFlow && !(isMobile && appNotInstalled) && (
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
                  <p className="inline-flex rounded-md bg-brand-blue px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-white shadow-[0_6px_20px_rgba(45,109,246,0.35)] dark:bg-brand-blue/90">
                    Desktop? Scan this QR
                  </p>
                  <p className="mt-2 text-[11px] text-dark-text/70 dark:text-light-muted/80">
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
          )}

          {!isResetFlow && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
