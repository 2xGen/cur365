"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "cur365-cookie-consent";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
};

type ContextValue = {
  consent: CookieConsent | null;
  setConsent: (value: CookieConsent) => void;
  openCookiePreferences: () => void;
};

const CookieConsentContext = createContext<ContextValue>({
  consent: null,
  setConsent: () => {},
  openCookiePreferences: () => {},
});

function readStoredConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { analytics?: unknown };
    if (typeof parsed.analytics === "boolean") {
      return { essential: true, analytics: parsed.analytics };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsentState(readStoredConsent());
    setReady(true);
  }, []);

  const setConsent = useCallback((value: CookieConsent) => {
    setConsentState(value);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      /* ignore */
    }
    setPreferencesOpen(false);
  }, []);

  const openCookiePreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const showBanner = ready && (consent === null || preferencesOpen);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        setConsent,
        openCookiePreferences,
      }}
    >
      {children}
      {showBanner && (
        <CookieBanner
          onAcceptAll={() => setConsent({ essential: true, analytics: true })}
          onEssentialOnly={() => setConsent({ essential: true, analytics: false })}
          onClose={consent !== null ? () => setPreferencesOpen(false) : undefined}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): ContextValue {
  return useContext(CookieConsentContext);
}

function CookieBanner({
  onAcceptAll,
  onEssentialOnly,
  onClose,
}: {
  onAcceptAll: () => void;
  onEssentialOnly: () => void;
  onClose?: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1 min-w-0">
            <p id="cookie-consent-title" className="text-sm font-semibold text-slate-900">
              Cookies
            </p>
            <p id="cookie-consent-desc" className="mt-1 text-sm text-slate-700 leading-relaxed">
              Essential cookies make the site work. If you accept all, we also use{" "}
              <strong className="font-medium">Vercel Analytics</strong> to count page views (anonymous, no ads).
              You can change this anytime via Cookie preference in the footer.{" "}
              <Link href="/terms" className="text-cur-blue hover:underline font-medium">
                Terms &amp; Conditions
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            )}
            <button
              type="button"
              onClick={onEssentialOnly}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={onAcceptAll}
              className="px-4 py-2.5 text-sm font-medium text-white bg-cur-blue hover:bg-cur-blue-dark rounded-lg transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
