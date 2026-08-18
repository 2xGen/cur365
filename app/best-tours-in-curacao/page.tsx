import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryIcon } from "@/components/icons/CategoryIcons";
import { Footer } from "@/components/Footer";
import { pillars } from "@/data/pillars";
import { pillarProductCodes } from "@/data/pillarProducts";
import { getListingByProductCode } from "@/data/listings";
import { getPillarBySlug } from "@/data/pillars";
import { featuredTours } from "@/data/featuredTours";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";
import { fetchProductsBulk } from "@/lib/viator-api";
import type { ViatorProductSummary } from "@/lib/viator-api";
import { getCategoryBookUrl } from "@/lib/booking";
import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Best Klein Curaçao Tours | Compare Day Trips, Yachts & Private Boats | Cur365",
  description:
    "Compare the best Klein Curaçao tours from Curaçao. Day trips, yachts, powerboats and private charters. Book with free cancellation.",
  path: "/best-tours-in-curacao",
});

const bestToursSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Best Klein Curaçao Tours | Cur365",
  url: `${SITE_URL}/best-tours-in-curacao`,
  description:
    "Compare the best Klein Curaçao tours from Curaçao. Day trips, yachts, powerboats and private charters.",
  isPartOf: { "@type": "WebSite", name: "Cur365", url: SITE_URL },
};

/** One tour per category for the top picks section (first product code per pillar). */
const HIDDEN_ON_BEST_TOURS = ["klein-curacao-tours"];
const CATEGORY_SLUGS_WITH_PICKS = (Object.keys(pillarProductCodes) as string[]).filter(
  (s) => !HIDDEN_ON_BEST_TOURS.includes(s)
);

export default async function BestToursPage() {
  const oneCodePerCategory: { categorySlug: string; productCode: string }[] = [];
  for (const slug of CATEGORY_SLUGS_WITH_PICKS) {
    if (oneCodePerCategory.length >= 6) break;
    const codes = pillarProductCodes[slug];
    if (codes && codes.length > 0) {
      oneCodePerCategory.push({ categorySlug: slug, productCode: codes[0] });
    }
  }

  const allCodes = oneCodePerCategory.map((x) => x.productCode);
  let products: Awaited<ReturnType<typeof fetchProductsBulk>> = [];
  if (allCodes.length > 0) {
    try {
      products = await fetchProductsBulk(allCodes);
    } catch {
      // Keep empty; section will show nothing or we could add fallback
    }
  }

  const codeToProduct = new Map(products.map((p) => [p.productCode, p]));
  let topPicks = oneCodePerCategory
    .slice(0, 6)
    .map(({ categorySlug, productCode }) => {
      const product = codeToProduct.get(productCode);
      if (!product) return null;
      const pillar = getPillarBySlug(categorySlug);
      const listing = getListingByProductCode(categorySlug, productCode);
      const href = listing ? `/${categorySlug}/${listing.slug}` : product.productUrl;
      const isInternal = !!listing;
      return {
        categorySlug,
        categoryTitle: pillar?.title ?? categorySlug,
        product,
        href,
        isInternal,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Fallback: use static snapshot (with images) when API is disabled or fails; else featuredTours
  if (topPicks.length === 0) {
    const staticSummaries = oneCodePerCategory.slice(0, 6).flatMap(({ categorySlug, productCode }) =>
      getStaticProductSummaries([productCode], categorySlug)
    );
    if (staticSummaries.length > 0) {
      topPicks = oneCodePerCategory.slice(0, 6).map(({ categorySlug, productCode }, i) => {
        const s = staticSummaries[i];
        if (!s) return null;
        const pillar = getPillarBySlug(categorySlug);
        const listing = getListingByProductCode(categorySlug, productCode);
        const href = listing ? `/${categorySlug}/${listing.slug}` : s.productUrl;
        return {
          categorySlug,
          categoryTitle: pillar?.title ?? categorySlug,
          product: s,
          href,
          isInternal: !!listing,
        };
      }).filter((x): x is NonNullable<typeof x> => x !== null);
    }
    if (topPicks.length === 0) {
      const fallbackProduct = (ft: (typeof featuredTours)[number]): ViatorProductSummary => ({
        productCode: ft.id,
        title: ft.title,
        productUrl: getCategoryBookUrl(ft.categorySlug),
        fromPriceDisplay: ft.fromPriceLabel ?? `From $${ft.fromPrice}`,
        reviewCount: 0,
        rating: 0,
        imageUrl: null,
        freeCancellation: false,
      });
      topPicks = featuredTours
        .filter((ft) => ft.categorySlug && !HIDDEN_ON_BEST_TOURS.includes(ft.categorySlug))
        .slice(0, 6)
        .map((ft) => ({
          categorySlug: ft.categorySlug!,
          categoryTitle: getPillarBySlug(ft.categorySlug!)?.title ?? ft.categorySlug!,
          product: fallbackProduct(ft),
          href: `/${ft.categorySlug}`,
          isInternal: true,
        }));
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bestToursSchema) }}
      />
      <main className="min-h-screen bg-white">
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Best Klein Curaçao tours" },
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <header className="max-w-3xl mb-12">
            <h1
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Find &amp; book the best <span className="text-cur-coral">Klein Curaçao</span> tours
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Compare day trips, yachts, powerboats and private charters that land on the uninhabited island. Choose a style below or browse every Klein Curaçao option.
            </p>
          </header>

          {/* Top picks – one real tour per category */}
          <section className="mb-16" aria-labelledby="top-picks-heading">
            <h2 id="top-picks-heading" className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Top picks
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
              {topPicks.map(({ categorySlug, categoryTitle, product, href, isInternal }) => {
                const cardContent = (
                  <>
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 mb-4">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
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
                    <p className="text-xs font-medium text-cur-coral uppercase tracking-wider">{categoryTitle}</p>
                    <div className="flex-1 mt-1 flex flex-col min-h-0">
                      <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-cur-coral transition-colors line-clamp-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                        {product.title}
                      </h3>
                      <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-slate-500 text-sm">{product.fromPriceDisplay}</p>
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
                const cardClassName = "group flex flex-col rounded-2xl border-2 border-cur-coral/20 bg-white p-6 text-left transition-all duration-300 hover:border-cur-coral hover:shadow-xl hover:shadow-cur-coral/10 hover:-translate-y-1 min-h-0";
                return isInternal ? (
                  <Link key={product.productCode} href={href} className={cardClassName}>
                    {cardContent}
                  </Link>
                ) : (
                  <a key={product.productCode} href={href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
                    {cardContent}
                  </a>
                );
              })}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                href="/tours-excursions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-cur-blue hover:bg-cur-blue-dark transition-colors shadow-sm"
              >
                View all tours
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Browse by category */}
          <section aria-labelledby="categories-heading">
            <h2 id="categories-heading" className="font-display font-bold text-xl text-slate-900 mb-6" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              Browse by category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {pillars
                .filter((p) => !HIDDEN_ON_BEST_TOURS.includes(p.slug))
                .map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex flex-col rounded-2xl border-2 border-slate-200 bg-slate-50/30 p-6 text-left transition-all duration-300 hover:border-cur-blue hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span className="flex-shrink-0 w-14 h-14 rounded-2xl bg-cur-blue/10 text-cur-blue flex items-center justify-center mb-4 group-hover:bg-cur-blue group-hover:text-white transition-colors">
                    <CategoryIcon slug={p.slug} className="w-7 h-7" />
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-cur-blue transition-colors" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed flex-grow">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-cur-blue group-hover:bg-cur-blue-dark transition-colors shadow-sm">
                      View &amp; Book
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
