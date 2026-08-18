/**
 * Viator Partner API – fetch product details for featured tour cards.
 * Uses POST /products/bulk (requires Full-access Affiliate or higher).
 *
 * Env (server-side):
 * - VIATOR_API_KEY: your partner API key (required for live data).
 * - VIATOR_USE_LIVE_API: set to "true" to enable live API calls. When unset or not "true", no
 *   requests are made (site uses static/generated data). Re-enable later by setting this in Vercel.
 * - VIATOR_API_BASE_URL: optional. Default is production.
 *   - Production: https://api.viator.com/partner (default)
 *   - Sandbox:    https://api.sandbox.viator.com/partner
 *   If your key is from the sandbox, set VIATOR_API_BASE_URL to the sandbox URL in Vercel.
 */

/** When false, fetchProductsBulk and fetchProductDetails return empty/null without calling Viator. Set VIATOR_USE_LIVE_API=true to enable. */
const USE_LIVE_VIATOR_API = process.env.VIATOR_USE_LIVE_API === "true";

const VIATOR_BASE =
  process.env.VIATOR_API_BASE_URL ?? "https://api.viator.com/partner";

export interface ViatorProductSummary {
  productCode: string;
  title: string;
  productUrl: string;
  fromPriceDisplay: string;
  /** Numeric "from" price when available (for structured data). */
  fromPrice?: number;
  reviewCount: number;
  rating: number;
  imageUrl: string | null;
  /** Free cancellation if available */
  freeCancellation: boolean;
}

/** Raw bulk response item – we only type what we use; API schema may use other field names */
interface ViatorBulkItem {
  status?: string;
  productCode?: string;
  title?: string;
  productUrl?: string;
  pricingInfo?: {
    summary?: string;
    priceFrom?: number;
    fromPrice?: number;
    currency?: string;
    recommendedRetailPrice?: number;
    minPrice?: number;
    ageBands?: Array<{ recommendedRetailPrice?: number; price?: number; [key: string]: unknown }>;
    [key: string]: unknown;
  };
  reviews?: {
    totalReviews?: number;
    averageRating?: number;
    combinedAverageRating?: number;
    [key: string]: unknown;
  };
  images?: Array<{
    isCover?: boolean;
    /** Viator: array of { url, width, height }; other APIs may use object with large/medium/small */
    variants?: Array<{ url?: string; width?: number; height?: number }> | Record<string, { url?: string }>;
    url?: string;
    imageUrl?: string;
    photoVersions?: Array<{ url?: string; width?: number; height?: number; [key: string]: unknown }>;
    [key: string]: unknown;
  }>;
  cancellationPolicy?: {
    type?: string;
    description?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

type ImageCandidate = { url: string; width?: number; height?: number };

function pixelArea(c: ImageCandidate): number {
  const w = c.width ?? 0;
  const h = c.height ?? 0;
  return w * h || w || h || 0;
}

/** Try to get a higher-res version of a CDN image URL (common Viator/TripAdvisor patterns) */
function tryUpscaleImageUrl(url: string, targetSize: number = 1024): string {
  if (!url || typeof url !== "string") return url;
  let out = url;
  // Path segments like /200x200/ or /200/ or -200x200- or _200_
  out = out.replace(/\/(\d{2,4})x(\d{2,4})\//g, `/${targetSize}x${Math.round((targetSize * 3) / 4)}/`);
  out = out.replace(/\/(\d{2,4})\/(?=[^/]*$)/g, `/${targetSize}/`);
  out = out.replace(/-(\d{2,4})x(\d{2,4})-/g, `-${targetSize}x${Math.round((targetSize * 3) / 4)}-`);
  out = out.replace(/_(\d{2,4})x(\d{2,4})_/g, `_${targetSize}x${Math.round((targetSize * 3) / 4)}_`);
  // Query params ?w=200&h=200 or ?width=200
  out = out.replace(/([?&])(w|width)=(\d+)/gi, (_, p, k) => `${p}${k}=${targetSize}`);
  out = out.replace(/([?&])h(eight)?=(\d+)/gi, (_, p) => `${p}h=${Math.round((targetSize * 3) / 4)}`);
  return out;
}

/** Prefer cover image and highest-res variant (Viator: images[].isCover + variants[] with 720x480, etc.) */
function getFirstImageUrl(images: ViatorBulkItem["images"]): string | null {
  if (!images?.length) return null;

  // 1) Prefer image with isCover: true (main/hero), else first image
  const img = images.find((i) => (i as { isCover?: boolean }).isCover === true) ?? images[0];
  if (!img || typeof img !== "object") return null;

  const variants = img.variants;

  // 2) Viator: variants is an array of { url, width, height } – pick largest (e.g. 720x480, 674x446)
  if (Array.isArray(variants) && variants.length > 0) {
    const withUrl = variants
      .map((v) => ({ url: v.url, width: v.width, height: v.height } as ImageCandidate))
      .filter((v): v is ImageCandidate => typeof v.url === "string" && v.url.length > 0);
    if (withUrl.length > 0) {
      const best = withUrl.reduce((a, b) => (pixelArea(b) > pixelArea(a) ? b : a));
      return best.url;
    }
  }

  // 3) Legacy: variants as object (large/medium/small)
  const variantsObj = variants && !Array.isArray(variants) ? (variants as Record<string, { url?: string }>) : null;
  if (variantsObj) {
    const order = ["large", "xlarge", "hero", "cover", "main", "medium", "small", "thumbnail"];
    for (const key of order) {
      const u = variantsObj[key]?.url;
      if (typeof u === "string" && u.length > 0) return u;
    }
  }

  // 4) photoVersions array
  const photoVersions = (img as { photoVersions?: Array<{ url?: string; width?: number; height?: number }> }).photoVersions;
  if (Array.isArray(photoVersions) && photoVersions.length > 0) {
    const withSize = photoVersions
      .map((p) => ({ url: p.url, width: p.width, height: p.height } as ImageCandidate))
      .filter((p): p is ImageCandidate => typeof p.url === "string" && p.url.length > 0);
    if (withSize.length > 0) {
      const best = withSize.reduce((a, b) => (pixelArea(b) > pixelArea(a) ? b : a));
      return best.url;
    }
  }

  // 5) Direct url / imageUrl – upscale if small (e.g. TripAdvisor path contains dimensions)
  const directUrl = (img as { url?: string }).url ?? (img as { imageUrl?: string }).imageUrl;
  if (typeof directUrl === "string" && directUrl.length > 0) return tryUpscaleImageUrl(directUrl);

  const deep = findFirstUrl(img);
  return deep ? tryUpscaleImageUrl(deep) : null;
}

function findFirstUrl(obj: unknown): string | null {
  if (obj === null || typeof obj !== "object") return null;
  const record = obj as Record<string, unknown>;
  if (typeof record.url === "string" && record.url.length > 0) return record.url;
  for (const key of Object.keys(record)) {
    const v = record[key];
    if (typeof v === "string" && key.toLowerCase().includes("url") && v.length > 0) return v;
    if (Array.isArray(v) && v.length > 0) {
      const inFirst = findFirstUrl(v[0]);
      if (inFirst) return inFirst;
    }
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const nested = findFirstUrl(v);
      if (nested) return nested;
    }
  }
  return null;
}

function mapBulkItemToSummary(item: ViatorBulkItem): ViatorProductSummary | null {
  if (item.status !== "ACTIVE" || !item.productCode || !item.productUrl) return null;

  const pricing = item.pricingInfo ?? {};
  let priceFrom: number | undefined =
    typeof pricing.priceFrom === "number"
      ? pricing.priceFrom
      : typeof (pricing as { fromPrice?: number }).fromPrice === "number"
        ? (pricing as { fromPrice: number }).fromPrice
        : undefined;
  if (priceFrom === undefined && typeof pricing.recommendedRetailPrice === "number")
    priceFrom = pricing.recommendedRetailPrice;
  if (priceFrom === undefined && typeof pricing.minPrice === "number") priceFrom = pricing.minPrice;
  if (priceFrom === undefined && Array.isArray(pricing.ageBands) && pricing.ageBands.length > 0) {
    const prices = pricing.ageBands
      .map(
        (b) =>
          (b as { recommendedRetailPrice?: number }).recommendedRetailPrice ??
          (b as { price?: number }).price
      )
      .filter((n): n is number => typeof n === "number");
    if (prices.length > 0) priceFrom = Math.min(...prices);
  }
  const currency = (pricing.currency as string) ?? "USD";
  const currencySymbol = currency === "USD" ? "$" : `${currency} `;
  let fromPriceDisplay: string;
  if (typeof priceFrom === "number") {
    fromPriceDisplay = `Price from ${currencySymbol}${Math.round(priceFrom)}`;
  } else if (typeof pricing.summary === "string" && pricing.summary.trim()) {
    const s = pricing.summary.trim();
    fromPriceDisplay = /^(from\s+)?\$?\d+/i.test(s) ? `Price from ${s.replace(/^from\s+/i, "").trim()}` : s;
  } else {
    fromPriceDisplay = "Price from (see options)";
  }

  const totalReviews = Number(item.reviews?.totalReviews) || 0;
  const averageRating =
    Number(item.reviews?.averageRating) ||
    Number(item.reviews?.combinedAverageRating) ||
    0;
  const firstImage = getFirstImageUrl(item.images);
  const policyText =
    String(item.cancellationPolicy?.type ?? "") +
    String(item.cancellationPolicy?.description ?? "");
  const freeCancellation = policyText.toUpperCase().includes("FREE");

  return {
    productCode: item.productCode,
    title: item.title ?? "Tour",
    productUrl: item.productUrl,
    fromPriceDisplay,
    ...(typeof priceFrom === "number" && { fromPrice: priceFrom }),
    reviewCount: totalReviews,
    rating: averageRating,
    imageUrl: firstImage ?? null,
    freeCancellation,
  };
}

/** Response from POST /availability/schedules/bulk – we only read productCode and pricingDetails */
interface SchedulesBulkResponse {
  availabilitySchedules?: Array<{
    productCode?: string;
    bookableItems?: Array<{
      seasons?: Array<{
        pricingRecords?: Array<{
          pricingDetails?: Array<{
            price?: { original?: { recommendedRetailPrice?: number } };
            [key: string]: unknown;
          }>;
          [key: string]: unknown;
        }>;
      }>;
    }>;
  }>;
}

/** Fetch "from" price per product from availability schedules (recommendedRetailPrice). */
async function fetchPricesFromSchedules(
  productCodes: string[]
): Promise<Map<string, number>> {
  const apiKey = process.env.VIATOR_API_KEY;
  if (!apiKey || productCodes.length === 0) return new Map();

  const url = `${VIATOR_BASE}/availability/schedules/bulk`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": apiKey,
    },
    body: JSON.stringify({ productCodes }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return new Map();

  const data = (await res.json()) as SchedulesBulkResponse;
  const list = data?.availabilitySchedules ?? [];
  const map = new Map<string, number>();

  for (const schedule of list) {
    const code = schedule.productCode;
    if (!code) continue;
    let minPrice: number | null = null;
    for (const item of schedule.bookableItems ?? []) {
      for (const season of item.seasons ?? []) {
        for (const record of season.pricingRecords ?? []) {
          for (const detail of record.pricingDetails ?? []) {
            const rrp = detail.price?.original?.recommendedRetailPrice;
            if (typeof rrp === "number" && rrp > 0) {
              if (minPrice === null || rrp < minPrice) minPrice = rrp;
            }
          }
        }
      }
    }
    if (minPrice !== null) map.set(code, minPrice);
  }
  return map;
}

/** Itinerary step for display (from Viator or local listing) */
export interface ItineraryStep {
  stop: string;
  description: string;
}

/** Result of fetching a single product for itinerary (and optional future fields) */
export interface ViatorProductDetails {
  itinerary: ItineraryStep[];
}

/** Raw itinerary item from Viator single-product API */
interface ViatorItineraryItem {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

/**
 * Fetch a single product's details (e.g. itinerary) via GET /products/{productCode}.
 * Used on tour detail pages to show Viator's itinerary instead of self-made copy.
 * Returns null if the product is inactive, missing itinerary, or the request fails.
 */
export async function fetchProductDetails(
  productCode: string
): Promise<ViatorProductDetails | null> {
  if (!USE_LIVE_VIATOR_API || !productCode) return null;
  const apiKey = process.env.VIATOR_API_KEY;
  if (!apiKey) return null;

  const url = `${VIATOR_BASE}/products/${productCode}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": apiKey,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    status?: string;
    itinerary?: {
      itineraryItems?: ViatorItineraryItem[];
    };
  };

  if (data.status !== "ACTIVE" || !data.itinerary?.itineraryItems?.length)
    return null;

  const itinerary: ItineraryStep[] = data.itinerary.itineraryItems
    .map((item, i) => {
      const desc = typeof item.description === "string" ? item.description.trim() : "";
      const stop =
        typeof item.title === "string" && item.title.trim()
          ? item.title.trim()
          : `Stop ${i + 1}`;
      return { stop, description: desc };
    })
    .filter((step) => step.description.length > 0);

  if (itinerary.length === 0) return null;

  return { itinerary };
}

/**
 * Fetch full product details for the given product codes (max 500 per request).
 * Also fetches availability schedules to get "from" price (recommendedRetailPrice) when product content has no price.
 * Returns only ACTIVE products; invalid or inactive are skipped.
 * Use productUrl as-is for affiliate attribution.
 */
export async function fetchProductsBulk(
  productCodes: string[]
): Promise<ViatorProductSummary[]> {
  if (!USE_LIVE_VIATOR_API || productCodes.length === 0) return [];
  const apiKey = process.env.VIATOR_API_KEY;
  if (!apiKey) return [];

  const url = `${VIATOR_BASE}/products/bulk`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": apiKey,
    },
    body: JSON.stringify({ productCodes }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as ViatorBulkItem[];
  if (!Array.isArray(data)) return [];

  const out: ViatorProductSummary[] = [];
  for (const item of data) {
    const summary = mapBulkItemToSummary(item);
    if (summary) out.push(summary);
  }

  const priceMap = await fetchPricesFromSchedules(productCodes);
  for (const summary of out) {
    const fromPrice = priceMap.get(summary.productCode);
    if (typeof fromPrice === "number") {
      summary.fromPriceDisplay = `Price from $${Math.round(fromPrice)}`;
      summary.fromPrice = fromPrice;
    }
  }

  return out;
}
