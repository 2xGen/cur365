import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/icons/CategoryIcons";
import { ToursCategoryFilter } from "@/components/ToursCategoryFilter";
import { ToursSortSelect } from "@/components/ToursSortSelect";
import { Footer } from "@/components/Footer";
import { categorySlugsWithListings, getTourListingsByCategory, type TourListing } from "@/data/listings";
import { kleinCuracaoHubSlug } from "@/data/kleinListingsCuracao";
import { getPillarBySlug } from "@/data/pillars";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";
import type { Metadata } from "next";

const SITE_URL = "https://cur365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/cur365/cur365%20tours%20and%20excursions%20in%20curacao.png";

const PAGE_TITLE = "Klein Curaçao Tours & Excursions";
const PAGE_DESCRIPTION =
  "Browse and book Klein Curaçao tours from Curaçao. Day trips, yachts, powerboats and private luxury charters. Compare boats and prices in one place.";
const META_TITLE = "Klein Curaçao Tours & Excursions | Day Trips, Yachts, Powerboats | Cur365";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category: categoryParam } = await searchParams;
  const validCategory =
    categoryParam && FILTER_CATEGORIES.includes(categoryParam) ? categoryParam : null;
  const pillar = validCategory ? getPillarBySlug(validCategory) : null;

  if (pillar) {
    const title = `${pillar.title} | Tours & Excursions | Cur365`;
    const description =
      pillar.description.length > 160
        ? pillar.description.slice(0, 157).trim() + "..."
        : pillar.description;
    const url = `${SITE_URL}/tours-excursions?category=${encodeURIComponent(validCategory!)}`;
    return {
      title,
      description,
      openGraph: {
        url,
        title,
        description,
        images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `Cur365 – ${pillar.title}` }],
      },
      alternates: { canonical: url },
    };
  }

  return {
    title: META_TITLE,
    description: PAGE_DESCRIPTION,
    openGraph: {
      url: `${SITE_URL}/tours-excursions`,
      title: META_TITLE,
      description: PAGE_DESCRIPTION,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Cur365 – Tours and excursions in Curaçao" }],
    },
    alternates: { canonical: `${SITE_URL}/tours-excursions` },
  };
}

/** Hub lists every boat again; style categories are the useful filters. */
const FILTER_CATEGORIES = categorySlugsWithListings.filter((s) => s !== kleinCuracaoHubSlug);

const TOURS_PER_PAGE = 21;

type Props = {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
};

const VALID_SORT = ["price_asc", "price_desc", "rating_asc", "rating_desc"] as const;

function buildQuery(params: { category?: string | null; sort?: string | null; page?: number }) {
  const q = new URLSearchParams();
  if (params.category) q.set("category", params.category);
  if (params.sort) q.set("sort", params.sort);
  if (params.page && params.page > 1) q.set("page", String(params.page));
  const s = q.toString();
  return s ? `?${s}` : "";
}

/** Parse numeric price from fromPriceDisplay (e.g. "Price from $44" -> 44). */
function parsePrice(s: string): number {
  const m = s.match(/[\d,]+(?:\.\d{2})?/);
  return m ? parseFloat(m[0].replace(/,/g, "")) : 0;
}

type TourWithSummary = {
  listing: TourListing;
  categorySlug: string;
  categoryTitle: string;
  summary: { productCode: string; title: string; fromPriceDisplay: string; rating: number; reviewCount: number; imageUrl: string | null; productUrl: string };
};

/** Build flat list of all tours with listing + summary per category. Uses static data only for speed. */
function getAllTours(): TourWithSummary[] {
  const out: TourWithSummary[] = [];
  for (const categorySlug of categorySlugsWithListings) {
    const listings = getTourListingsByCategory(categorySlug);
    if (listings.length === 0) continue;
    const codes = listings.map((l) => l.productCode);
    const summaries = getStaticProductSummaries(codes, categorySlug);
    const pillar = getPillarBySlug(categorySlug);
    const categoryTitle = pillar?.title ?? categorySlug;
    for (const listing of listings) {
      const summary = summaries.find((s) => s.productCode === listing.productCode);
      if (summary) {
        out.push({
          listing,
          categorySlug,
          categoryTitle,
          summary: {
            productCode: summary.productCode,
            title: summary.title,
            fromPriceDisplay: summary.fromPriceDisplay,
            rating: summary.rating,
            reviewCount: summary.reviewCount,
            imageUrl: summary.imageUrl,
            productUrl: summary.productUrl,
          },
        });
      }
    }
  }
  return out;
}

/** One card per boat. Same product sits on the hub and in a style category (and the 38ft yacht is on yacht + private). */
function uniqueByProductCode(tours: TourWithSummary[]): TourWithSummary[] {
  const preferred = [...tours].sort((a, b) => {
    const aHub = a.categorySlug === kleinCuracaoHubSlug ? 1 : 0;
    const bHub = b.categorySlug === kleinCuracaoHubSlug ? 1 : 0;
    return aHub - bHub;
  });
  const seen = new Set<string>();
  const out: TourWithSummary[] = [];
  for (const tour of preferred) {
    if (seen.has(tour.listing.productCode)) continue;
    seen.add(tour.listing.productCode);
    out.push(tour);
  }
  return out;
}

export default async function ToursExcursionsPage({ searchParams }: Props) {
  const { category: categoryParam, sort: sortParam, page: pageParam } = await searchParams;
  const allTours = getAllTours();
  const validCategory =
    categoryParam && FILTER_CATEGORIES.includes(categoryParam) ? categoryParam : null;
  const categoryPillar = validCategory ? getPillarBySlug(validCategory) : null;
  let tours = validCategory
    ? allTours.filter((t) => t.categorySlug === validCategory)
    : uniqueByProductCode(allTours);
  const validSort =
    sortParam && VALID_SORT.includes(sortParam as (typeof VALID_SORT)[number]) ? sortParam : null;

  if (validSort) {
    tours = [...tours].sort((a, b) => {
      if (validSort === "price_asc" || validSort === "price_desc") {
        const pa = parsePrice(a.summary.fromPriceDisplay);
        const pb = parsePrice(b.summary.fromPriceDisplay);
        return validSort === "price_asc" ? pa - pb : pb - pa;
      }
      const ra = a.summary.rating;
      const rb = b.summary.rating;
      return validSort === "rating_desc" ? rb - ra : ra - rb;
    });
  }

  const totalTours = tours.length;
  const totalPages = Math.max(1, Math.ceil(totalTours / TOURS_PER_PAGE));
  const page = Math.min(totalPages, Math.max(1, parseInt(pageParam ?? "1", 10) || 1));
  const start = (page - 1) * TOURS_PER_PAGE;
  const toursOnPage = tours.slice(start, start + TOURS_PER_PAGE);

  const listSchema = {
    "@context": "https://schema.org" as const,
    "@type": "ItemList" as const,
    name: categoryPillar ? categoryPillar.title : PAGE_TITLE,
    description: categoryPillar ? categoryPillar.description : PAGE_DESCRIPTION,
    url: categoryPillar
      ? `${SITE_URL}/tours-excursions?category=${encodeURIComponent(validCategory!)}`
      : `${SITE_URL}/tours-excursions`,
    numberOfItems: totalTours,
    itemListElement: toursOnPage.map((t, i) => ({
      "@type": "ListItem" as const,
      position: start + i + 1,
      item: {
        "@type": "Product" as const,
        name: t.summary.title,
        url: t.summary.productUrl.startsWith("http") ? t.summary.productUrl : `${SITE_URL}${t.summary.productUrl}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <main className="min-h-screen bg-white">
        <div className="border-b border-slate-200 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Klein Curaçao tours", href: "/klein-curacao-tours" },
                { label: "Tours & Excursions" },
              ]}
            />
          </div>
        </div>

        <div className="bg-cur-cyan/5 border-b border-cur-cyan/10 py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1
              className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              {categoryPillar ? categoryPillar.title : PAGE_TITLE}
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {categoryPillar ? categoryPillar.description : PAGE_DESCRIPTION}
            </p>

            {/* Category filter */}
            <div className="mt-8">
              <Suspense fallback={<div className="h-12 w-52 rounded-xl bg-slate-100 animate-pulse" />}>
                <ToursCategoryFilter
                  options={FILTER_CATEGORIES.map((slug) => {
                    const pillar = getPillarBySlug(slug);
                    const label = pillar ? pillar.title.replace(/\s+in\s+Curaçao$/i, "").trim() : slug;
                    return { value: slug, label };
                  })}
                  currentValue={validCategory}
                />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <p className="text-slate-500 text-sm">
              {totalTours === 0 ? (
                "No tours found."
              ) : totalPages > 1 ? (
                <>
                  Showing {start + 1}–{Math.min(start + TOURS_PER_PAGE, totalTours)} of {totalTours} tour{totalTours !== 1 ? "s" : ""}.
                </>
              ) : validCategory ? (
                <>
                  Showing {totalTours} tour{totalTours !== 1 ? "s" : ""} in this category.
                </>
              ) : (
                <>Showing all {totalTours} tours and excursions.</>
              )}
            </p>
            <Suspense fallback={<div className="h-12 w-44 rounded-xl bg-slate-100 animate-pulse" />}>
              <ToursSortSelect currentValue={validSort} />
            </Suspense>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {toursOnPage.map(({ listing, categorySlug, categoryTitle, summary }) => {
              const href = summary.productUrl.startsWith("http")
                ? summary.productUrl
                : summary.productUrl;
              const isInternal = !summary.productUrl.startsWith("http");
              const cardContent = (
                <>
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                    {summary.imageUrl ? (
                      <Image
                        src={summary.imageUrl}
                        alt=""
                        width={400}
                        height={250}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                        <CategoryIcon slug={categorySlug} className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-cur-coral uppercase tracking-wider mt-2">
                    {categoryTitle.replace(/\s+in\s+Curaçao$/i, "").trim()}
                  </p>
                  <div className="flex-1 mt-1 flex flex-col min-h-0">
                    <h2 className="font-display font-bold text-lg text-slate-900 mt-1 group-hover:text-cur-coral transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                      {listing.seoTitle ?? summary.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                      {summary.rating > 0 && (
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                          <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {summary.rating.toFixed(1)}
                        </span>
                      )}
                      {summary.rating > 0 && summary.reviewCount > 0 && <span className="text-slate-400">·</span>}
                      {summary.reviewCount > 0 && (
                        <span className="text-slate-500">{summary.reviewCount.toLocaleString("en-US")} reviews</span>
                      )}
                    </div>
                    <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-slate-500 text-sm">{summary.fromPriceDisplay}</p>
                      <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-cur-coral group-hover:bg-cur-coral-dark transition-colors shadow-sm">
                        View &amp; Book
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </>
              );
              const cardClassName =
                "group flex flex-col rounded-2xl border-2 border-cur-coral/20 bg-white p-6 text-left transition-all duration-300 hover:border-cur-coral hover:shadow-xl hover:shadow-cur-coral/10 hover:-translate-y-1 min-h-0";
              return isInternal ? (
                <Link key={`${categorySlug}-${listing.slug}`} href={href} className={cardClassName}>
                  {cardContent}
                </Link>
              ) : (
                <a
                  key={`${categorySlug}-${listing.slug}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  {cardContent}
                </a>
              );
            })}
          </div>

          {totalPages > 1 && (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <Link
                  href={`/tours-excursions${buildQuery({ category: validCategory, sort: validSort, page: page - 1 })}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-cur-cyan hover:text-cur-cyan transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </Link>
              )}
              <span className="px-4 py-2.5 text-sm font-medium text-slate-600">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/tours-excursions${buildQuery({ category: validCategory, sort: validSort, page: page + 1 })}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-cur-cyan hover:text-cur-cyan transition-colors"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
