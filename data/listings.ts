/**
 * Unified tour listings for category pages.
 */
import { pillars } from "./pillars";
import {
  kleinCuracaoHubSlug,
  kleinDayTripsSlug,
  kleinYachtSlug,
  kleinPowerboatSlug,
  kleinPrivateSlug,
  kleinHubListings,
  kleinDayTripListings,
  kleinYachtListings,
  kleinPowerboatListings,
  kleinPrivateListings,
} from "./kleinListingsCuracao";

export interface TourListing {
  slug: string;
  productCode: string;
  operator: string;
  angle: string;
  seoTitle?: string;
  metaDescription: string;
  intro: string;
  whyWeRecommend?: string | string[];
  whoIsThisFor?: string | string[];
  highlights?: string[];
  faqs?: { question: string; answer: string }[];
  bestFor?: string[];
  inclusions?: string[];
  itinerary?: { stop: string; description: string }[];
}

const CATEGORY_SLUGS = pillars.map((p) => p.slug);

const listingMap: Record<string, TourListing[]> = {
  ...Object.fromEntries(CATEGORY_SLUGS.map((slug) => [slug, []])),
  [kleinCuracaoHubSlug]: kleinHubListings,
  [kleinDayTripsSlug]: kleinDayTripListings,
  [kleinYachtSlug]: kleinYachtListings,
  [kleinPowerboatSlug]: kleinPowerboatListings,
  [kleinPrivateSlug]: kleinPrivateListings,
};

export const categorySlugsWithListings: string[] = CATEGORY_SLUGS;

export function getTourListing(categorySlug: string, tourSlug: string): TourListing | null {
  const listings = listingMap[categorySlug];
  if (!listings) return null;
  return listings.find((l) => l.slug === tourSlug) ?? null;
}

export function getTourListingsByCategory(categorySlug: string): TourListing[] {
  return listingMap[categorySlug] ?? [];
}

export function getListingByProductCode(categorySlug: string, productCode: string): TourListing | null {
  const listings = listingMap[categorySlug];
  if (!listings) return null;
  return listings.find((l) => l.productCode === productCode) ?? null;
}
