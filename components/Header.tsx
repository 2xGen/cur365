"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { pillars } from "@/data/pillars";

const HIDDEN_IN_NAV: string[] = [];

/** Nav label: strip " in Curaçao" so we show e.g. "Catamaran Cruises" not "Catamaran Cruises in Curaçao". */
function navCategoryLabel(title: string): string {
  return title.replace(/\s+in\s+Curaçao$/i, "").trim() || title;
}

const navPillars = pillars.filter((p) => !HIDDEN_IN_NAV.includes(p.slug));

export function Header() {
  const pathname = usePathname();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isHome = pathname === "/";
  const isBestTours = pathname === "/klein-curacao-tours" || pathname === "/best-tours-in-curacao";
  const isToursExcursions = pathname === "/tours-excursions";
  const isPartner = pathname === "/partner";

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${active ? "text-cur-coral" : "text-slate-600 hover:text-slate-900"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-14 sm:h-16" aria-label="Main">
          <Link
            href="/"
            className="font-display font-bold text-xl text-slate-900 hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            <span className="text-cur-coral">Cur</span>
            <span className="text-cur-blue">365</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/" className={navLinkClass(isHome)}>
              Home
            </Link>
            <Link href="/klein-curacao-tours" className={navLinkClass(isBestTours)}>
              Klein Curaçao
            </Link>
            <Link href="/tours-excursions" className={navLinkClass(isToursExcursions)}>
              All tours
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                id="categories-menu-button"
              >
                Categories
                <svg
                  className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {categoriesOpen && (
                <div
                  className="absolute right-0 top-full mt-1 w-72 max-h-[min(70vh,400px)] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="categories-menu-button"
                >
                  {navPillars.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${p.slug}`}
                      role="menuitem"
                      onClick={() => setCategoriesOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {navCategoryLabel(p.title)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="sm:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={`sm:hidden absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-lg overflow-y-auto transition-all duration-200 ease-out ${
          mobileMenuOpen ? "max-h-[min(85vh,600px)] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="container mx-auto px-4 py-3 pb-6">
          <div className="flex flex-col gap-1 py-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium ${isHome ? "text-cur-coral bg-slate-100" : "text-slate-700 hover:bg-slate-100"}`}
            >
              Home
            </Link>
            <Link
              href="/klein-curacao-tours"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium ${isBestTours ? "text-cur-coral bg-slate-100" : "text-slate-700 hover:bg-slate-100"}`}
            >
              Klein Curaçao
            </Link>
            <Link
              href="/tours-excursions"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium ${isToursExcursions ? "text-cur-coral bg-slate-100" : "text-slate-700 hover:bg-slate-100"}`}
            >
              All tours
            </Link>
          </div>
          <div className="border-t border-slate-200 mt-2 pt-3">
            <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Categories</p>
            <div className="rounded-lg overflow-hidden border border-slate-200">
              {navPillars.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium border-b border-slate-100 last:border-0 ${pathname === `/${p.slug}` ? "text-cur-coral bg-slate-50/50" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  {navCategoryLabel(p.title)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
