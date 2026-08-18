/**
 * Fetch one Viator product via GET /products/{product-code} and output full JSON.
 * Run: node scripts/fetch-viator-single-product.mjs [productCode]
 * Example: node scripts/fetch-viator-single-product.mjs 37387P3
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
const productCode = process.argv[2] || "37387P3"; // Jolly Pirate afternoon sail

if (!apiKey) {
  console.error("Missing VIATOR_API_KEY in .env.local");
  process.exit(1);
}

const url = `${base}/products/${productCode}`;
const res = await fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json;version=2.0",
    "Accept-Language": "en-US",
    "exp-api-key": apiKey,
  },
});

console.log("Status:", res.status);
const data = await res.json();

if (!res.ok) {
  console.log("Error:", JSON.stringify(data, null, 2));
  process.exit(1);
}

// Write full response to a file for inspection
const outPath = path.join(root, "scripts", "viator-single-product-response.json");
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
console.log("Full response written to:", outPath);

// Also print key fields for slug/title decisions
console.log("\n--- Key fields for listing page ---");
console.log("productCode:", data.productCode);
console.log("title:", data.title);
console.log("description (first 300 chars):", (data.description || "").slice(0, 300));
if (data.productOptions?.length) {
  console.log("productOptions count:", data.productOptions.length);
  console.log("first option title:", data.productOptions[0]?.title);
}
