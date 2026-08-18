"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
};

type ContextValue = {
  consent: CookieConsent | null;
  setConsent: (value: CookieConsent) => void;
  openCookiePreferences: () => void;
};

// Provide a non-null default and keep behavior simple to avoid runtime issues
const CookieConsentContext = createContext<ContextValue>({
  consent: { essential: true, analytics: false },
  setConsent: () => {},
  openCookiePreferences: () => {},
});

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent | null>({
    essential: true,
    analytics: false,
  });

  const setConsent = useCallback((value: CookieConsent) => {
    setConsentState(value);
  }, []);

  const openCookiePreferences = useCallback(() => {
    // No-op in this simplified implementation
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        setConsent,
        openCookiePreferences,
      }}
    >
      {children}
      {/* Cookie banner temporarily disabled to avoid dev runtime issues */}
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
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-700 leading-relaxed">
              We use essential cookies to make the site work. We may use analytics (e.g. Google Search Console and
              similar tools) to understand how the site is used. You can accept all cookies or only essential ones.{" "}
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
