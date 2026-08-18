import { notFound } from "next/navigation";
import {
  getTourListing,
  getTourListingsByCategory,
  categorySlugsWithListings,
} from "@/data/listings";
import { getGuide, getGuideSlugsByCategory, getRelatedGuides } from "@/data/guides";
import { getPillarBySlug } from "@/data/pillars";
import { getStaticProductSummaries, getViatorProductUrl } from "@/data/staticProductSummaries";
import { fetchProductsBulk, fetchProductDetails } from "@/lib/viator-api";
import { getCategoryBookUrl } from "@/lib/booking";
import { TourListingTemplate } from "@/components/TourListingTemplate";
import { GuideTemplate } from "@/components/GuideTemplate";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

const SITE_URL = "https://cur365.com";
const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/cur365/cur365%20tours%20and%20excursions%20in%20curacao.png";

type Props = {
  params: Promise<{ slug: string; tourSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: categorySlug, tourSlug } = await params;
  const pillar = getPillarBySlug(categorySlug);
  const categoryTitle = pillar?.title ?? categorySlug;
  const pageUrl = `${SITE_URL}/${categorySlug}/${tourSlug}`;
  const ogImages = [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Cur365 – Klein Curaçao tours from Curaçao" }];

  const guide = getGuide(categorySlug, tourSlug);
  if (guide) {
    const title = `${guide.title} | ${categoryTitle} | Cur365`;
    return {
      title,
      description: guide.description,
      openGraph: { title, description: guide.description, url: pageUrl, images: ogImages },
      alternates: { canonical: pageUrl },
    };
  }

  const listing = getTourListing(categorySlug, tourSlug);
  if (!listing) return {};
  const displayTitle = listing.seoTitle ?? `${listing.operator} — ${listing.angle}`;
  const title = `${displayTitle} | ${categoryTitle} | Cur365`;
  return {
    title,
    description: listing.metaDescription,
    openGraph: { title, description: listing.metaDescription, url: pageUrl, images: ogImages },
    alternates: { canonical: pageUrl },
  };
}

export async function generateStaticParams() {
  const params: { slug: string; tourSlug: string }[] = [];
  for (const categorySlug of categorySlugsWithListings) {
    const listings = getTourListingsByCategory(categorySlug);
    for (const listing of listings) {
      params.push({ slug: categorySlug, tourSlug: listing.slug });
    }
    const guideSlugs = getGuideSlugsByCategory(categorySlug);
    for (const guideSlug of guideSlugs) {
      params.push({ slug: categorySlug, tourSlug: guideSlug });
    }
  }
  return params;
}

export default async function CategorySubPage({ params }: Props) {
  const { slug: categorySlug, tourSlug } = await params;

  const pillar = getPillarBySlug(categorySlug);
  const categoryTitle = pillar?.title ?? categorySlug;
  const categoryHref = `/${categorySlug}`;

  // Guide page (e.g. /catamaran-cruises-in-aruba/morning-cruises)
  const guide = getGuide(categorySlug, tourSlug);
  if (guide) {
    const productCodesToFetch: string[] = [];
    for (const pick of guide.picks) {
      const listing = getTourListing(categorySlug, pick.slug);
      if (listing && !productCodesToFetch.includes(listing.productCode)) {
        productCodesToFetch.push(listing.productCode);
      }
    }

    const picksWithTours = guide.picks.map((pick) => ({
      pick,
      tour: null as Awaited<ReturnType<typeof fetchProductsBulk>>[number] | null,
    }));

    if (productCodesToFetch.length > 0) {
      try {
        const products = await fetchProductsBulk(productCodesToFetch);
        const codeToProduct = new Map(products.map((p) => [p.productCode, p]));
        for (let i = 0; i < guide.picks.length; i++) {
          const listing = getTourListing(categorySlug, guide.picks[i].slug);
          const product = listing ? (codeToProduct.get(listing.productCode) ?? null) : null;
          picksWithTours[i].tour = product
            ? { ...product, title: listing?.seoTitle ?? product.title }
            : null;
        }
      } catch {
        // Use placeholder when API fails
      }
      // When API is off or failed: fill from static summaries so guide picks show image, title, price
      const anyMissing = picksWithTours.some((p) => !p.tour);
      if (anyMissing) {
        const staticSummaries = getStaticProductSummaries(productCodesToFetch, categorySlug);
        const codeToProduct = new Map(staticSummaries.map((s) => [s.productCode, s]));
        for (let i = 0; i < guide.picks.length; i++) {
          if (picksWithTours[i].tour) continue;
          const listing = getTourListing(categorySlug, guide.picks[i].slug);
          if (listing) {
            const product = codeToProduct.get(listing.productCode);
            picksWithTours[i].tour = product
              ? { ...product, title: listing.seoTitle ?? product.title }
              : null;
          }
        }
      }
    }

    const relatedGuides = getRelatedGuides(categorySlug, guide.slug, 3).map((g) => ({
      label: g.title,
      href: `/${categorySlug}/${g.slug}`,
    }));

    return (
      <>
        <GuideTemplate
          guide={guide}
          categoryTitle={categoryTitle}
          categoryHref={categoryHref}
          picksWithTours={picksWithTours}
          relatedGuides={relatedGuides}
        />
        <Footer />
      </>
    );
  }

  // Tour listing page
  if (!categorySlugsWithListings.includes(categorySlug)) notFound();
  const listing = getTourListing(categorySlug, tourSlug);
  if (!listing) notFound();

  const allListings = getTourListingsByCategory(categorySlug);
  const relatedListingsRaw = allListings
    .filter((l) => l.productCode !== listing.productCode)
    .slice(0, 3);

  let liveData: Awaited<ReturnType<typeof fetchProductsBulk>>[number] | null = null;
  const relatedProductCodes = relatedListingsRaw.map((l) => l.productCode);
  let relatedProducts: Awaited<ReturnType<typeof fetchProductsBulk>> = [];
  let viatorItinerary: Awaited<ReturnType<typeof fetchProductDetails>> = null;

  try {
    const [mainProducts, related, details] = await Promise.all([
      fetchProductsBulk([listing.productCode]),
      relatedProductCodes.length > 0 ? fetchProductsBulk(relatedProductCodes) : Promise.resolve([]),
      fetchProductDetails(listing.productCode),
    ]);
    liveData = mainProducts[0] ?? null;
    relatedProducts = related;
    viatorItinerary = details;
  } catch {
    // Use placeholders when API fails; later a crawl job can refresh price/rating
  }

  // When API is disabled or fails: use static summaries
  if (!liveData) {
    const staticMain = getStaticProductSummaries([listing.productCode], categorySlug)[0];
    if (staticMain) liveData = staticMain;
  }
  // Always use www.viator.com product URL (not shop.live.rc.viator.com) so booking links work
  if (liveData) {
    liveData = { ...liveData, productUrl: getViatorProductUrl(listing.productCode) };
  }
  if (relatedProducts.length === 0 && relatedProductCodes.length > 0) {
    relatedProducts = getStaticProductSummaries(relatedProductCodes, categorySlug);
  }
  // Related cards that link to Viator (no internal listing) should use www.viator.com format
  relatedProducts = relatedProducts.map((p) => ({
    ...p,
    productUrl: getViatorProductUrl(p.productCode),
  }));

  const codeToImage = new Map(relatedProducts.map((p) => [p.productCode, p.imageUrl ?? null]));
  const relatedListings = relatedListingsRaw.map((l) => ({
    listing: l,
    imageUrl: codeToImage.get(l.productCode) ?? null,
  }));

  return (
    <>
      <TourListingTemplate
        listing={listing}
        categoryTitle={categoryTitle}
        categoryHref={categoryHref}
        liveData={liveData ?? undefined}
        relatedListings={relatedListings}
        viatorItinerary={viatorItinerary?.itinerary ?? undefined}
      />
      <Footer />
    </>
  );
}
