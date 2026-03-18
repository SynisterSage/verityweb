import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Loader2,
  Users,
} from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '../ui/Button';
import { openAppStore } from '../../src/appStore';

const APP_DEEP_LINK_BASE = 'verityprotect://invite';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://api.verityprotect.com/api/v1').replace(/\/+$/, '');

type InviteResolveResponse = {
  eligible: boolean;
  token?: string;
  code: string;
  invite: {
    id: string;
    role: string;
  };
};

function getSingleQueryValue(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function toRoleLabel(role?: string) {
  if (!role) {
    return 'Circle member';
  }
  if (role.toLowerCase() === 'admin') {
    return 'Caretaker';
  }
  if (role.toLowerCase() === 'editor') {
    return 'Family';
  }
  return 'Circle member';
}

export const InviteLanding: React.FC = () => {
  const location = useLocation();
  const { inviteToken } = useParams();
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resolvedInvite, setResolvedInvite] = useState<InviteResolveResponse | null>(null);

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const claimToken = getSingleQueryValue(searchParams, 't') ?? getSingleQueryValue(searchParams, 'token');
  const fallbackCode =
    getSingleQueryValue(searchParams, 'code') ?? getSingleQueryValue(searchParams, 'inviteId') ?? inviteToken ?? null;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if (!claimToken && !fallbackCode) {
      setLoading(false);
      setErrorMessage('This invite link is missing required claim details.');
      setResolvedInvite(null);
      return () => controller.abort();
    }

    setLoading(true);
    setErrorMessage(null);
    setResolvedInvite(null);

    const resolveInvite = async () => {
      try {
        const params = new URLSearchParams();
        if (claimToken) {
          params.set('t', claimToken);
        } else if (fallbackCode) {
          params.set('code', fallbackCode);
        }

        const response = await fetch(
          `${API_BASE_URL}/profiles/invites/resolve-token?${params.toString()}`,
          {
            method: 'GET',
            headers: { Accept: 'application/json' },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const body = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error || 'Invite link is invalid or expired.');
        }

        const payload = (await response.json()) as InviteResolveResponse;
        if (!isMounted) {
          return;
        }

        setResolvedInvite(payload);
        setLoading(false);
      } catch (error) {
        if (!isMounted || controller.signal.aborted) {
          return;
        }
        setLoading(false);
        setResolvedInvite(null);
        setErrorMessage(error instanceof Error ? error.message : 'Invite link is invalid or expired.');
      }
    };

    void resolveInvite();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [claimToken, fallbackCode]);

  const deepLink = useMemo(() => {
    if (!resolvedInvite) {
      return null;
    }
    const params = new URLSearchParams();
    if (resolvedInvite.token?.trim()) {
      params.set('t', resolvedInvite.token.trim());
    }
    params.set('code', resolvedInvite.code);
    params.set('source', 'circle_invite');
    return `${APP_DEEP_LINK_BASE}?${params.toString()}`;
  }, [resolvedInvite]);

  const handleOpenApp = () => {
    if (!deepLink || typeof window === 'undefined') {
      return;
    }

    const startedAt = Date.now();
    window.location.href = deepLink;
    window.setTimeout(() => {
      const elapsed = Date.now() - startedAt;
      if (document.visibilityState === 'visible' && elapsed > 1000) {
        openAppStore();
      }
    }, 1200);
  };

  const handleCopyCode = async () => {
    if (!resolvedInvite?.code || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setCopyState('error');
      return;
    }

    try {
      await navigator.clipboard.writeText(resolvedInvite.code);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('error');
    }
  };

  return (
    <section className="min-h-screen bg-light-bg dark:bg-dark-bg pb-10 pt-28 sm:pb-14 sm:pt-32">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="rounded-3xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 sm:p-8 shadow-sm">
          {loading ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center">
              <Loader2 size={28} className="animate-spin text-brand-blue" />
              <p className="mt-3 text-sm text-light-muted dark:text-dark-muted">Checking invite link…</p>
            </div>
          ) : errorMessage ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-danger/10 text-brand-danger">
                <AlertTriangle size={28} />
              </div>
              <h1 className="mt-5 text-2xl font-bold text-light-text dark:text-dark-text">Link unavailable</h1>
              <p className="mt-3 max-w-md text-base text-light-muted dark:text-dark-muted">{errorMessage}</p>
              <Button onClick={openAppStore} className="mt-6 gap-2">
                Download Verity App
                <Download size={16} />
              </Button>
            </div>
          ) : resolvedInvite ? (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-light-border dark:border-dark-border bg-brand-blue/10 text-brand-blue">
                <Users size={30} />
              </div>
              <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-light-muted dark:text-dark-muted">
                Circle Invite
              </p>
              <h1 className="mt-3 text-center text-3xl font-bold leading-tight text-light-text dark:text-dark-text sm:text-4xl">
                You&apos;re invited to join
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-light-muted dark:text-dark-muted">
                Join as <span className="font-semibold text-light-text dark:text-dark-text">{toRoleLabel(resolvedInvite.invite.role)}</span> and
                access shared activity, alerts, and trusted updates in Verity Protect.
              </p>

              <div className="mt-6 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-light-muted dark:text-dark-muted">
                  Invite Code
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-xl font-bold tracking-[0.08em] text-light-text dark:text-dark-text">{resolvedInvite.code}</p>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2 rounded-lg border border-light-border dark:border-dark-border px-3 py-2 text-sm font-medium text-light-text dark:text-dark-text transition-colors hover:border-brand-blue hover:text-brand-blue"
                  >
                    <Copy size={15} />
                    {copyState === 'copied' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="mt-2 text-xs text-light-muted dark:text-dark-muted">
                  This code will be prefilled when you open the app.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button onClick={handleOpenApp} className="w-full justify-center gap-2">
                  Open Verity App
                  <ExternalLink size={16} />
                </Button>
                <Button onClick={openAppStore} variant="outline" className="w-full justify-center gap-2">
                  Download App
                  <Download size={16} />
                </Button>
              </div>

              <div className="mt-7 rounded-2xl border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg p-4">
                <ol className="space-y-2 text-sm text-light-muted dark:text-dark-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                    Open Verity and sign in (or create an account).
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                    We&apos;ll prefill your invite code automatically.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                    Confirm to join the shared circle.
                  </li>
                </ol>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
};

