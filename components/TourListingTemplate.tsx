"use client";

import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import type { TourListing } from "@/data/listings";
import type { ViatorProductSummary, ItineraryStep } from "@/lib/viator-api";

export interface TourListingTemplateProps {
  /** Static listing content (SEO copy, best for, inclusions) */
  listing: TourListing;
  /** Category page title (e.g. "Catamaran Cruises in Curaçao") */
  categoryTitle: string;
  /** Category page URL (e.g. "/catamaran-cruises-in-aruba") */
  categoryHref: string;
  /** Live data from Viator (price, rating, image, book URL). When missing, placeholders are shown. */
  liveData?: ViatorProductSummary | null;
  /** Up to 3 related/similar tours from the same category (excluding current). imageUrl from Viator when available. */
  relatedListings?: { listing: TourListing; imageUrl?: string | null }[];
  /** Itinerary from Viator API (single-product). When set, shown instead of listing.itinerary. */
  viatorItinerary?: ItineraryStep[];
}

function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:border-cur-blue/50 open:border-cur-blue open:shadow-md"
        >
          <summary className="px-6 py-5 font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4">
            <span className="pr-2">{faq.question}</span>
            <span className="shrink-0 w-11 h-11 rounded-xl bg-slate-100 text-cur-blue flex items-center justify-center group-open:bg-cur-blue group-open:text-white transition-all duration-200">
              <svg className="w-5 h-5 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

function formatUsdPrice(fromPriceDisplay: string | undefined): string {
  if (!fromPriceDisplay || !fromPriceDisplay.trim()) return "Price from (see options)";
  const s = fromPriceDisplay;
  const m = s.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  if (!m) return "Price from (see options)";
  const amount = m[1];
  return `Price from $${amount}`;
}

export function TourListingTemplate({
  listing,
  categoryTitle,
  categoryHref,
  liveData,
  relatedListings = [],
  viatorItinerary,
}: TourListingTemplateProps) {
  const itinerary = (listing.itinerary && listing.itinerary.length > 0
    ? listing.itinerary
    : viatorItinerary) ?? [];
  const displayTitle = listing.seoTitle ?? listing.angle;
  const hasRating = (liveData?.rating ?? 0) > 0;
  const hasReviews = (liveData?.reviewCount ?? 0) > 0;
  const priceDisplay = formatUsdPrice(liveData?.fromPriceDisplay);
  const bookUrl = liveData?.productUrl ?? "#";

  // Numeric price for Merchant listings structured data (required by Google)
  const numericPrice =
    (typeof liveData?.fromPrice === "number" && liveData.fromPrice) ||
    (() => {
      const s = liveData?.fromPriceDisplay ?? "";
      const m = s.match(/\$?\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/);
      return m ? parseFloat(m[1].replace(/,/g, "")) : undefined;
    })();

  // priceValidUntil: last day of next month (ISO YYYY-MM-DD) for Product snippets
  const priceValidUntil = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 2);
    d.setDate(0);
    return d.toISOString().slice(0, 10);
  })();

  const productSchema =
    liveData && typeof numericPrice === "number" ? (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: displayTitle,
            description: listing.metaDescription,
            brand: { "@type": "Brand", name: listing.operator },
            ...(liveData.imageUrl && { image: liveData.imageUrl }),
            ...(hasRating &&
              hasReviews && {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: liveData.rating,
                  reviewCount: liveData.reviewCount,
                },
              }),
            offers: {
              "@type": "Offer",
              url: bookUrl,
              price: numericPrice,
              priceCurrency: "USD",
              priceValidUntil,
              priceSpecification: {
                "@type": "PriceSpecification",
                price: numericPrice,
                priceCurrency: "USD",
              },
              availability: "https://schema.org/InStock",
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnFees: "https://schema.org/FreeReturn",
              },
              shippingDetails: {
                "@type": "ShippingDetails",
                shippingRate: {
                  "@type": "MonetaryAmount",
                  value: 0,
                  currency: "USD",
                },
                deliveryTime: {
                  "@type": "DeliveryTimeSpecification",
                  handlingTime: {
                    "@type": "QuantitativeValue",
                    minValue: 0,
                    maxValue: 1,
                    unitCode: "DAY",
                  },
                },
              },
            },
          }),
        }}
      />
    ) : null;

  return (
    <article className="min-h-screen bg-white">
      {productSchema}
      {/* Floating sticky book button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={bookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white bg-cur-coral hover:bg-cur-coral-dark transition-colors shadow-lg hover:shadow-xl"
        >
          View options &amp; book
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Klein Curaçao tours", href: "/klein-curacao-tours" },
              { label: categoryTitle, href: categoryHref },
              { label: displayTitle },
            ]}
          />
        </div>
      </div>

      {/* Hero: image + title, operator, rating, price, CTA */}
      <div className="relative bg-cur-blue/5 overflow-hidden border-b border-cur-blue/10">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Image */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] lg:aspect-auto lg:min-h-[280px]">
              {liveData?.imageUrl ? (
                <img
                  src={liveData.imageUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400">
                  <svg className="w-16 h-16 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  </svg>
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              <p className="text-cur-blue font-medium text-sm uppercase tracking-widest">
                {categoryTitle}
              </p>
              <h1
                className="mt-2 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
              >
                {displayTitle}
              </h1>
              <p className="mt-2 text-slate-600 font-medium">
                {listing.operator}
              </p>
              {(hasRating || hasReviews) && (
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {hasRating && (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {liveData!.rating.toFixed(1)}
                    </span>
                  )}
                  {hasRating && hasReviews && <span className="text-slate-400">·</span>}
                  {hasReviews && (
                    <span className="text-slate-500">{liveData!.reviewCount.toLocaleString("en-US")} reviews</span>
                  )}
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <p className="text-lg font-semibold text-slate-900">{priceDisplay}</p>
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-cur-coral hover:bg-cur-coral-dark transition-colors shadow-md hover:shadow-lg"
                >
                  View options &amp; book
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              {liveData?.freeCancellation && (
                <p className="mt-1 text-emerald-600 text-sm font-medium">Free cancellation</p>
              )}
              <p className="mt-3 text-sm text-slate-500">
                Powered by Viator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro + why this pick — editorial copy, not a Viator dump */}
      <div className="bg-white py-10 lg:py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-slate-600 leading-relaxed">
              {listing.intro}
            </p>
          </div>
          {listing.whyWeRecommend && (
            <section className="mt-10 rounded-2xl border border-cur-coral/20 bg-cur-coral/5 p-6 lg:p-8">
              <h2 className="font-display font-bold text-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                Why this is our pick
              </h2>
              {Array.isArray(listing.whyWeRecommend) ? (
                <ul className="space-y-2 text-slate-700">
                  {listing.whyWeRecommend.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-cur-coral" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-700 leading-relaxed">{listing.whyWeRecommend}</p>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Who this is for */}
      {listing.whoIsThisFor && (Array.isArray(listing.whoIsThisFor) ? listing.whoIsThisFor.length > 0 : !!listing.whoIsThisFor) && (
        <div className="bg-white py-8 lg:py-10 border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-display font-bold text-lg text-slate-900 mb-4" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Who this is for
            </h2>
            {Array.isArray(listing.whoIsThisFor) ? (
              <ul className="grid sm:grid-cols-2 gap-2 text-slate-700 leading-snug">
                {listing.whoIsThisFor.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-cur-blue" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600 leading-relaxed">{listing.whoIsThisFor}</p>
            )}
          </div>
        </div>
      )}

      {/* Best For */}
      {listing.bestFor && listing.bestFor.length > 0 && (
        <div className="bg-amber-50/80 border-y border-amber-200/60 py-8 lg:py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              <span className="text-amber-600" aria-hidden>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </span>
              Best for
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-slate-700 leading-snug">
              {listing.bestFor.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-amber-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* What's included */}
      {listing.inclusions && listing.inclusions.length > 0 && (
        <div className="bg-slate-50/80 border-y border-slate-200 py-10 lg:py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              What&apos;s included
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-slate-700">
              {listing.inclusions.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-cur-blue" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Itinerary (optional): Viator when available, else listing copy */}
      {itinerary.length > 0 && (
        <div className="bg-white py-10 lg:py-14 border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Itinerary
            </h2>
            <ol className="space-y-6">
              {itinerary.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-cur-blue/20 text-cur-blue font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.stop}</h3>
                    <p className="mt-1 text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Highlights */}
      {listing.highlights && listing.highlights.length > 0 && (
        <div className="bg-white py-10 lg:py-14 border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-4" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Highlights
            </h2>
            <ul className="flex flex-wrap gap-2">
              {listing.highlights.map((h, i) => (
                <li key={i}>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-cur-coral/10 text-cur-coral border border-cur-coral/20">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Similar / related tours */}
      {relatedListings.length > 0 && (
        <div className="bg-slate-50/80 py-10 lg:py-14 border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Similar tours
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedListings.slice(0, 3).map(({ listing: related, imageUrl }) => {
                const title = related.seoTitle ?? related.angle;
                return (
                  <Link
                    key={related.productCode}
                    href={`${categoryHref}/${related.slug}`}
                    className="group flex flex-col rounded-xl border-2 border-slate-200 bg-white overflow-hidden text-left transition-all duration-200 hover:border-cur-blue hover:shadow-lg hover:shadow-cur-blue/10"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-cur-blue/20 to-cur-coral/20">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400">
                          <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-cur-blue transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                        {title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{related.operator}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cur-blue">
                        View tour
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {listing.faqs && listing.faqs.length > 0 && (
        <div className="bg-cur-blue/5 py-10 lg:py-14 border-y border-cur-blue/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 id="faq-heading" className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Frequently asked questions
            </h2>
            <FaqAccordion faqs={listing.faqs} />
          </div>
        </div>
      )}

      {/* CTA + back to category */}
      <div className="bg-cur-coral/5 py-10 lg:py-14 border-t-2 border-cur-coral/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-cur-coral hover:bg-cur-coral-dark transition-colors shadow-md hover:shadow-lg"
          >
            View options &amp; book
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-slate-500">
            Powered by Viator
          </p>
          <Link
            href={categoryHref}
            className="mt-8 inline-flex items-center gap-2 text-cur-blue font-semibold hover:text-cur-blue-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to {categoryTitle}
          </Link>
        </div>
      </div>
    </article>
  );
}
