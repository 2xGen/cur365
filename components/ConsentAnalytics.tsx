"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/CookieConsentContext";

/** Vercel Analytics only after the visitor accepts analytics cookies (GDPR). */
export function ConsentAnalytics() {
  const { consent } = useCookieConsent();
  if (!consent?.analytics) return null;
  return <Analytics />;
}
