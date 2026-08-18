/**
 * One-off: call Viator POST /products/bulk and log response (to inspect pricingInfo etc.).
 * Loads .env.local from project root. Run: node scripts/fetch-viator-bulk.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env.local");
const cwdEnv = path.join(process.cwd(), ".env.local");
const toLoad = fs.existsSync(envPath) ? envPath : cwdEnv;

if (toLoad && fs.existsSync(toLoad)) {
  const content = fs.readFileSync(toLoad, "utf8").replace(/\r\n/g, "\n");
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
const base = process.env.VIATOR_API_BASE_URL || "https://api.sandbox.viator.com/partner";

if (!apiKey) {
  console.error("Missing VIATOR_API_KEY in .env.local");
  process.exit(1);
}

const productCodes = ["119085P1", "2785MORSNORKEL"];
const url = `${base}/products/bulk`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=2.0",
    "Accept-Language": "en-US",
    "exp-api-key": apiKey,
  },
  body: JSON.stringify({ productCodes }),
});

console.log("Status:", res.status);
const data = await res.json();

if (!res.ok) {
  console.log("Error body:", JSON.stringify(data, null, 2));
  process.exit(1);
}

// Log first product's keys and full pricingInfo + reviews so we can see structure
const first = Array.isArray(data) ? data[0] : data;
if (first) {
  console.log("\n--- First product keys:", Object.keys(first));
  console.log("\n--- pricingInfo (full):", JSON.stringify(first.pricingInfo, null, 2));
  console.log("\n--- reviews:", JSON.stringify(first.reviews, null, 2));
  console.log("\n--- productCode:", first.productCode);
  console.log("\n--- title:", first.title);
}

// Also call availability/schedules/bulk to get pricing (recommendedRetailPrice lives there)
const schedulesUrl = `${base}/availability/schedules/bulk`;
const schedRes = await fetch(schedulesUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json;version=2.0",
    "Accept-Language": "en-US",
    "exp-api-key": apiKey,
  },
  body: JSON.stringify({ productCodes }),
});
console.log("\n--- Schedules bulk status:", schedRes.status);
if (schedRes.ok) {
  const schedData = await schedRes.json();
  const list = schedData?.availabilitySchedules ?? (Array.isArray(schedData) ? schedData : []);
  const first = list[0];
  console.log("--- Schedules count:", list.length);
  if (first) {
    const pr = first.bookableItems?.[0]?.seasons?.[0]?.pricingRecords?.[0];
    console.log("--- First productCode:", first.productCode);
    console.log("--- First pricingRecord keys:", pr ? Object.keys(pr) : "none");
    console.log("--- First pricingRecord:", JSON.stringify(pr, null, 2));
    const withPrice = JSON.stringify(list).match(/"recommendedRetailPrice"\s*:\s*(\d+)/);
    if (withPrice) console.log("--- Sample recommendedRetailPrice:", withPrice[0]);
  }
} else {
  const err = await schedRes.text();
  console.log("--- Schedules error:", err.slice(0, 800));
}
