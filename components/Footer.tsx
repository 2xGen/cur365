"use client";

import Link from "next/link";
import { pillars } from "@/data/pillars";
import { useCookieConsent } from "@/components/CookieConsentContext";

export function Footer() {
  const { openCookiePreferences } = useCookieConsent();

  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
      {/* Accent top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cur-blue/80 to-cur-coral/60" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center gap-8 lg:gap-10">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="font-display font-bold text-2xl text-white block hover:text-cur-blue transition-colors duration-200 group"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                Cur365
                <span className="block h-0.5 w-12 mx-auto mt-1.5 rounded-full bg-cur-blue/60 group-hover:bg-cur-blue group-hover:w-16 transition-all duration-200" />
              </Link>
              <span className="text-slate-400 text-sm sm:text-base mt-3 block">
                Klein Curaçao tours, compared from Curaçao.{" "}
                <span className="text-cur-blue/90 font-medium">Day trips, yachts and private boats that actually land.</span>
              </span>
              <p className="text-slate-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                Planning more than the uninhabited island?{" "}
                <a
                  href="https://toptours.ai/destinations/curacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cur-blue hover:text-white underline underline-offset-2 decoration-cur-blue/60 hover:decoration-cur-blue transition-colors"
                >
                  Explore Curaçao tours on TopTours.ai
                </a>
                .
              </p>
              <p className="text-slate-500 text-xs mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
                <span className="text-slate-600">More destinations:</span>
                <a
                  href="https://lon365.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cur-blue transition-colors"
                >
                  London
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://tyo365.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cur-blue transition-colors"
                >
                  Tokyo
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://prg365.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cur-blue transition-colors"
                >
                  Prague
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://aru365.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cur-blue transition-colors"
                >
                  Aruba
                </a>
                <span className="text-slate-600">·</span>
                <a
                  href="https://arubabuddies.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cur-blue transition-colors"
                >
                  Aruba Buddies
                </a>
              </p>
            </div>

            {/* Categories */}
            <div className="w-full pt-6 border-t border-slate-700/80">
              <p className="text-slate-400 text-sm font-medium mb-3 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cur-blue" aria-hidden />
                Explore by category
              </p>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm" aria-label="Footer categories">
                {pillars.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="text-slate-400 hover:text-cur-blue transition-colors py-0.5 border-b border-transparent hover:border-cur-blue/50"
                  >
                    {p.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal + affiliate */}
            <div className="pt-6 border-t border-slate-700/80 w-full space-y-3">
              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm" aria-label="Footer legal and info">
                <Link
                  href="/partner"
                  className="text-slate-400 hover:text-cur-blue px-3 py-1.5 rounded-lg hover:bg-cur-blue/10 transition-colors"
                >
                  Partner with us
                </Link>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-cur-blue px-3 py-1.5 rounded-lg hover:bg-cur-blue/10 transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="text-slate-400 hover:text-cur-blue px-3 py-1.5 rounded-lg hover:bg-cur-blue/10 transition-colors bg-transparent border-none cursor-pointer font-inherit text-left"
                >
                  Cookie preference
                </button>
              </nav>
              <p className="text-slate-500 text-xs max-w-xl mx-auto leading-relaxed">
                We are a Viator affiliate. We may earn a commission when you book through our links, at no extra cost
                to you. We do not handle bookings; you book directly with Viator and the operator. See{" "}
                <Link href="/terms" className="text-cur-blue hover:text-cur-blue-dark hover:underline transition-colors">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>

            {/* 2xGen */}
            <div className="pt-6 border-t border-slate-700/80 w-full">
              <p className="text-slate-400 text-sm leading-relaxed">
                Owned and operated by{" "}
                <Link
                  href="/2xgen"
                  className="text-cur-blue hover:text-white font-medium transition-colors underline underline-offset-2 decoration-cur-blue/60 hover:decoration-cur-blue"
                >
                  2xGen LLC
                </Link>{" "}
                <span className="text-slate-500">— creators of next-gen digital platforms.</span>
              </p>
            </div>

            {/* Copyright */}
            <p className="text-slate-500 text-sm flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden />
              © {new Date().getFullYear()} Cur365. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
