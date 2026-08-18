import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HomeTopPicks } from "@/components/HomeTopPicks";
import { HomeCategories } from "@/components/HomeCategories";
import { WhyBookWithUs } from "@/components/WhyBookWithUs";
import { Footer } from "@/components/Footer";
import { getListingByProductCode } from "@/data/listings";
import { getPillarBySlug } from "@/data/pillars";
import { featuredTours } from "@/data/featuredTours";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";
import { fetchProductsBulk } from "@/lib/viator-api";

const SITE_URL = "https://cur365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/cur365/cur365%20tours%20and%20excursions%20in%20curacao.png";

export const metadata: Metadata = {
  title: "Cur365 – Klein Curaçao Tours | Book Day Trips, Yachts & Private Boats",
  description:
    "Book Klein Curaçao tours from Curaçao. Compare catamaran day trips, yachts, powerboats and private charters that land on the uninhabited island.",
  openGraph: {
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Cur365 – Klein Curaçao tours from Curaçao" }],
  },
  alternates: { canonical: SITE_URL },
};

/** Six unique Klein Curaçao landings — not one-per-category (that left a lopsided fifth card). */
const HOMEPAGE_PICKS: { categorySlug: string; productCode: string }[] = [
  { categorySlug: "klein-curacao-day-trips", productCode: "74296P5" },
  { categorySlug: "klein-curacao-day-trips", productCode: "119383P1" },
  { categorySlug: "klein-curacao-day-trips", productCode: "409718P1" },
  { categorySlug: "klein-curacao-yacht-tours", productCode: "310247P3" },
  { categorySlug: "klein-curacao-powerboat-tours", productCode: "86035P2" },
  { categorySlug: "klein-curacao-private-luxury", productCode: "350808P2909" },
];
const HIDDEN_ON_HOMEPAGE: string[] = [];

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cur365 – Klein Curaçao Tours",
  url: SITE_URL,
  description:
    "Book Klein Curaçao tours from Curaçao. Compare catamaran day trips, yachts, powerboats and private charters.",
  isPartOf: { "@type": "WebSite", name: "Cur365", url: SITE_URL },
};

export default async function Home() {
  const oneCodePerCategory = HOMEPAGE_PICKS;

  const allCodes = oneCodePerCategory.map((x) => x.productCode);
  let products: Awaited<ReturnType<typeof fetchProductsBulk>> = [];
  if (allCodes.length > 0) {
    try {
      products = await fetchProductsBulk(allCodes);
    } catch {
      // leave empty
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
      return {
        categorySlug,
        categoryTitle: pillar?.title ?? categorySlug,
        productCode: product.productCode,
        title: listing?.seoTitle ?? product.title,
        fromPriceDisplay: product.fromPriceDisplay,
        imageUrl: product.imageUrl ?? null,
        href,
        isInternal: !!listing,
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
          productCode: s.productCode,
          title: listing?.seoTitle ?? s.title,
          fromPriceDisplay: s.fromPriceDisplay,
          imageUrl: s.imageUrl ?? null,
          href,
          isInternal: !!listing,
        };
      }).filter((x): x is NonNullable<typeof x> => x !== null);
    }
    if (topPicks.length === 0) {
      topPicks = featuredTours
        .filter((ft) => ft.categorySlug && !HIDDEN_ON_HOMEPAGE.includes(ft.categorySlug))
        .slice(0, 6)
        .map((ft) => ({
          categorySlug: ft.categorySlug!,
          categoryTitle: getPillarBySlug(ft.categorySlug!)?.title ?? ft.categorySlug!,
          productCode: ft.id,
          title: ft.title,
          fromPriceDisplay: ft.fromPriceLabel ?? `From $${ft.fromPrice}`,
          imageUrl: null as string | null,
          href: `/${ft.categorySlug}`,
          isInternal: true,
        }));
    }
  }

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <Hero />
      <HomeTopPicks topPicks={topPicks} />
      <HomeCategories />
      <WhyBookWithUs />
      <Footer />
    </main>
  );
}
