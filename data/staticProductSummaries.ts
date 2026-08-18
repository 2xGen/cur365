/**
 * Static snapshot of Viator-style product data for tour cards.
 * Used when the Viator API is unavailable so production still shows titles and prices.
 *
 * Live images, ratings and prices come from staticProductSummariesGenerated.json
 * (regenerate with `node scripts/dump-static-product-summaries.mjs`).
 * This fallback object is only the seven Klein Curaçao landings — unique keys required for `next build`.
 */
import type { ViatorProductSummary } from "@/lib/viator-api";
import { getListingByProductCode } from "@/data/listings";
import { getViatorProductBookUrl } from "@/lib/booking";

import generatedStatic from "./staticProductSummariesGenerated.json";

const generatedByCode = generatedStatic as Record<
  string,
  {
    title: string;
    fromPriceDisplay: string;
    rating: number;
    reviewCount: number;
    imageUrl: string | null;
    freeCancellation: boolean;
    productUrl?: string | null;
  }
>;

export function getViatorProductUrl(productCode: string): string {
  return getViatorProductBookUrl(productCode);
}

/** Fallback when a code is missing from the generated snapshot. */
const staticByCode: Record<
  string,
  {
    title: string;
    fromPriceDisplay: string;
    rating: number;
    reviewCount: number;
    imageUrl?: string | null;
    freeCancellation?: boolean;
  }
> = {
  "74296P5": {
    title: "Klein Curaçao Adventure Day Trip",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "119383P1": {
    title: "Klein Curaçao with Sailing Catamaran BlueFinn",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "409718P1": {
    title: "Boat Trip to Klein Curaçao with Mermaid Boat Trips – Full Day",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "310247P3": {
    title: "Klein Curaçao Paradise All-In Day Trip and Exclusive Beach House",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2f/46/40/9d/caption.jpg",
    freeCancellation: true,
  },
  "86035P2": {
    title: "Klein Curaçao Powerboat Adventure",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "350808P2909": {
    title: "Full-Day Private Boat Trip to Klein Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "362410P5": {
    title: "Exclusive 38ft Yacht Charter Experience in Klein Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
};

export function getStaticProductSummaries(
  productCodes: string[],
  categorySlug: string
): ViatorProductSummary[] {
  const out: ViatorProductSummary[] = [];
  for (const code of productCodes) {
    const generated = generatedByCode[code];
    const fallback = staticByCode[code];
    const data = generated ?? fallback;
    if (!data) continue;
    const listing = getListingByProductCode(categorySlug, code);
    const title = listing?.seoTitle ?? data.title;
    const productUrl = listing
      ? `/${categorySlug}/${listing.slug}`
      : getViatorProductBookUrl(code);
    out.push({
      productCode: code,
      title,
      productUrl,
      fromPriceDisplay: data.fromPriceDisplay,
      reviewCount: data.reviewCount,
      rating: data.rating,
      imageUrl: data.imageUrl ?? null,
      freeCancellation: data.freeCancellation ?? false,
    });
  }
  return out;
}
