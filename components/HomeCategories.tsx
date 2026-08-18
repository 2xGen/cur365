"use client";

import Link from "next/link";
import { pillars } from "@/data/pillars";
import { CategoryIcon } from "./icons/CategoryIcons";

const HIDDEN_ON_HOMEPAGE = ["klein-curacao-tours"];

export function HomeCategories() {
  const visible = pillars.filter((p) => !HIDDEN_ON_HOMEPAGE.includes(p.slug));
  return (
    <section
      id="categories"
      className="relative py-20 lg:py-28 bg-slate-100"
      aria-labelledby="categories-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2
            id="categories-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-slate-900 opacity-0 animate-fade-in-up"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif", animationFillMode: "forwards" }}
          >
            Or browse by <span className="text-cur-coral">Klein Curaçao</span> style
          </h2>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Day trips, yachts, powerboats and private luxury. Each page compares boats that actually land on Klein Curaçao.
          </p>
          <Link
            href="/klein-curacao-tours"
            className="mt-6 inline-flex items-center gap-2 text-cur-blue font-semibold hover:text-cur-blue-dark transition-colors opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            View all Klein Curaçao tours
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {visible.map((p, i) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex items-start gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:border-cur-blue hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cur-blue focus:ring-offset-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.15 + i * 0.04}s`, animationFillMode: "forwards" }}
            >
              <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-cur-blue/10 text-cur-blue flex items-center justify-center group-hover:bg-cur-blue group-hover:text-white transition-colors">
                <CategoryIcon slug={p.slug} className="w-6 h-6" />
              </span>
              <span className="font-semibold text-slate-800 group-hover:text-slate-900 pt-0.5">
                {p.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
