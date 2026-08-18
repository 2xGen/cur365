"use client";

import Link from "next/link";
import Image from "next/image";
import { CategoryIcon } from "@/components/icons/CategoryIcons";

export type HomeTopPick = {
  categorySlug: string;
  categoryTitle: string;
  productCode: string;
  title: string;
  fromPriceDisplay: string;
  imageUrl: string | null;
  href: string;
  isInternal: boolean;
};

type Props = {
  topPicks?: HomeTopPick[];
};

export function HomeTopPicks({ topPicks = [] }: Props) {
  return (
    <section
      id="top-picks"
      className="py-16 lg:py-20 bg-cur-orange/5 border-y border-cur-orange/10"
      aria-labelledby="top-picks-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <p className="text-sm font-medium text-cur-orange uppercase tracking-wider">Popular now</p>
          <h2 id="top-picks-heading" className="font-display font-bold text-2xl sm:text-3xl text-slate-900 mt-1" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
            Top Klein Curaçao picks
          </h2>
          <p className="mt-2 text-slate-600">
            Six boats that actually land on Klein Curaçao. Compare prices and book with free cancellation on most tours.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {topPicks.map((tour) => {
            const cardContent = (
              <>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
                  {tour.imageUrl ? (
                    <Image
                      src={tour.imageUrl}
                      alt=""
                      width={400}
                      height={250}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      <CategoryIcon slug={tour.categorySlug} className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <p className="text-xs font-medium text-cur-orange uppercase tracking-wider">{tour.categoryTitle}</p>
                <div className="flex-1 mt-1 flex flex-col min-h-0">
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-cur-orange transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                    {tour.title}
                  </h3>
                  <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-slate-500 text-sm">{tour.fromPriceDisplay}</p>
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-cur-orange group-hover:bg-cur-orange-dark transition-colors shadow-sm">
                      View &amp; Book
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </>
            );
            const cardClassName = "group flex flex-col rounded-2xl border-2 border-cur-orange/20 bg-white p-6 text-left transition-all duration-300 hover:border-cur-orange hover:shadow-xl hover:shadow-cur-orange/10 hover:-translate-y-1 min-h-0";
            return tour.isInternal ? (
              <Link key={tour.productCode} href={tour.href} className={cardClassName}>
                {cardContent}
              </Link>
            ) : (
              <a key={tour.productCode} href={tour.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
                {cardContent}
              </a>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/klein-curacao-tours"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-cur-cyan hover:bg-cur-cyan-dark transition-colors shadow-sm"
          >
            View all Klein Curaçao tours
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
