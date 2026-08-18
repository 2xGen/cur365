/**
 * One-off: fetch all products from Viator API and write staticProductSummariesGenerated.json
 * so production can show real titles, prices, ratings, and images without calling the API.
 *
 * Run (from project root, with VIATOR_API_KEY in .env.local):
 *   node scripts/dump-static-product-summaries.mjs
 *
 * Uses production API by default. For sandbox: VIATOR_API_BASE_URL=https://api.sandbox.viator.com/partner
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Load .env.local
const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8").replace(/\r\n/g, "\n");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) {
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  }
}

const apiKey = process.env.VIATOR_API_KEY;
const base = process.env.VIATOR_API_BASE_URL || "https://api.viator.com/partner";

if (!apiKey) {
  console.error("Missing VIATOR_API_KEY in .env.local");
  process.exit(1);
}

// Collect all product codes from pillarProducts.ts
const pillarPath = path.join(root, "data", "pillarProducts.ts");
const pillarContent = fs.readFileSync(pillarPath, "utf8");
const codeMatches = pillarContent.matchAll(/"([A-Za-z0-9]+)"\s*(?:,|\/\/)/g);
const allCodes = [...new Set([...codeMatches].map((m) => m[1]))].filter(
  (c) => c.length >= 4 && /\d/.test(c) && !["Record", "string", "length"].includes(c)
);
console.log("Product codes to fetch:", allCodes.length);

const BATCH = 50;
const out = {};

function getFirstImageUrl(images) {
  if (!images?.length) return null;
  const img = images.find((i) => i.isCover === true) ?? images[0];
  if (!img) return null;
  const variants = img.variants;
  if (Array.isArray(variants) && variants.length > 0) {
    const withUrl = variants.filter((v) => typeof v?.url === "string");
    if (withUrl.length > 0) {
      const best = withUrl.reduce((a, b) => {
        const areaA = (a.width || 0) * (a.height || 0);
        const areaB = (b.width || 0) * (b.height || 0);
        return areaB > areaA ? b : a;
      });
      return best.url;
    }
  }
  if (img.url) return img.url;
  if (img.imageUrl) return img.imageUrl;
  return null;
}

for (let i = 0; i < allCodes.length; i += BATCH) {
  const batch = allCodes.slice(i, i + BATCH);
  const url = `${base}/products/bulk`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "exp-api-key": apiKey,
    },
    body: JSON.stringify({ productCodes: batch }),
  });
  if (!res.ok) {
    console.error("Bulk API error:", res.status, await res.text());
    process.exit(1);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    console.error("Unexpected bulk response");
    process.exit(1);
  }
  for (const item of data) {
    if (item.status !== "ACTIVE" || !item.productCode || !item.productUrl) continue;
    const pricing = item.pricingInfo ?? {};
    // Use Viator's product-level "from price": prefer summary (e.g. "From $31.00"), then priceFrom/fromPrice (not schedule min)
    let fromPriceDisplay;
    if (typeof pricing.summary === "string" && pricing.summary.trim()) {
      fromPriceDisplay = pricing.summary.trim();
      if (!/^(from\s+)?\$?\d+/i.test(fromPriceDisplay)) fromPriceDisplay = `Price from ${fromPriceDisplay}`;
    } else {
      let priceFrom =
        typeof pricing.priceFrom === "number"
          ? pricing.priceFrom
          : typeof pricing.fromPrice === "number"
            ? pricing.fromPrice
            : pricing.recommendedRetailPrice ?? pricing.minPrice;
      if (priceFrom === undefined && Array.isArray(pricing.ageBands) && pricing.ageBands.length > 0) {
        const prices = pricing.ageBands
          .map((b) => b.recommendedRetailPrice ?? b.price)
          .filter((n) => typeof n === "number");
        if (prices.length > 0) priceFrom = Math.min(...prices);
      }
      const currency = pricing.currency ?? "USD";
      const sym = currency === "USD" ? "$" : `${currency} `;
      if (typeof priceFrom === "number") {
        fromPriceDisplay = `Price from ${sym}${Math.round(priceFrom)}`;
      } else {
        fromPriceDisplay = "Price from (see options)";
      }
    }
    const totalReviews = Number(item.reviews?.totalReviews) || 0;
    const averageRating =
      Number(item.reviews?.averageRating) || Number(item.reviews?.combinedAverageRating) || 0;
    const imageUrl = getFirstImageUrl(item.images);
    const policyText = String(item.cancellationPolicy?.type ?? "") + String(item.cancellationPolicy?.description ?? "");
    const freeCancellation = /free/i.test(policyText);
    out[item.productCode] = {
      title: item.title ?? "Tour",
      fromPriceDisplay,
      rating: averageRating,
      reviewCount: totalReviews,
      imageUrl: imageUrl || null,
      freeCancellation,
      productUrl: item.productUrl || null,
    };
  }
  console.log("Fetched batch", Math.floor(i / BATCH) + 1, "/", Math.ceil(allCodes.length / BATCH));
}

// Override with schedule summary.fromPrice when present (Viator's official "from price", not min of all bands)
const schedUrl = `${base}/availability/schedules/bulk`;
const schedRes = await fetch(schedUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=2.0",
    "Accept-Language": "en-US",
    "exp-api-key": apiKey,
  },
  body: JSON.stringify({ productCodes: allCodes }),
});
if (schedRes.ok) {
  const schedData = await schedRes.json();
  const list = schedData?.availabilitySchedules ?? [];
  for (const schedule of list) {
    const code = schedule.productCode;
    if (!code || !out[code]) continue;
    const current = out[code].fromPriceDisplay || "";
    const hasProductPrice =
      current && !current.includes("(see options)") && /\d/.test(current);
    if (hasProductPrice) continue;
    const fromPrice = schedule.summary?.fromPrice;
    if (typeof fromPrice === "number" && fromPrice > 0) {
      const currency = schedule.currency ?? "USD";
      const sym = currency === "USD" ? "$" : `${currency} `;
      out[code].fromPriceDisplay = `Price from ${sym}${Math.round(fromPrice)}`;
    }
  }
  console.log("Applied schedule summary.fromPrice for", list.length, "products");
}

const outPath = path.join(root, "data", "staticProductSummariesGenerated.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log("Wrote", outPath, "with", Object.keys(out).length, "products");
