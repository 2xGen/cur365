/**
 * Fetch all 10 catamaran product codes via POST /products/bulk and output a summary
 * so you can assign each tour a "sub category" angle and plan SEO content.
 * Run: node scripts/fetch-all-10-catamaran.mjs
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
      process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
}

const apiKey = process.env.VIATOR_API_KEY;
const base = process.env.VIATOR_API_BASE_URL || "https://api.sandbox.viator.com/partner";

// Order matches category page: 1–4 = top picks, 5–10 = more options (pillarProducts.ts)
const productCodes = [
  "119085P1", "2785MORSNORKEL", "6593P7", "8936P1",
  "444239P8", "47607P3", "47607P2", "37387P3", "2785AFTSNORKEL", "6593P8",
];

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

if (!res.ok) {
  console.error("API error", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const rawList = Array.isArray(data) ? data : [];
// Reorder to match category page (pillarProducts): 1–4 top picks, 5–10 more options
const codeToIndex = Object.fromEntries(productCodes.map((c, i) => [c, i]));
const list = rawList
  .slice()
  .sort((a, b) => (codeToIndex[a.productCode] ?? 99) - (codeToIndex[b.productCode] ?? 99));

// 1) Save full API response so we can see all fields (duration, inclusions, etc.)
const fullResponsePath = path.join(root, "scripts", "catamaran-10-tours-full-response.json");
fs.writeFileSync(fullResponsePath, JSON.stringify(list, null, 2), "utf8");

// 2) Summary JSON (unchanged)
const summary = list.map((p, i) => ({
  index: i + 1,
  productCode: p.productCode,
  title: p.title || "(no title)",
  descriptionExcerpt: (p.description || "").slice(0, 180) + "...",
  reviewCount: p.reviews?.totalReviews ?? 0,
  rating: p.reviews?.combinedAverageRating ?? 0,
  supplier: p.supplier?.name ?? "",
}));
const summaryPath = path.join(root, "scripts", "catamaran-10-tours-summary.json");
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf8");

// 3) Detail sheet: full description + any duration/inclusions for sub-category decisions
function get(obj, ...keys) {
  let cur = obj;
  for (const k of keys) {
    cur = cur?.[k];
    if (cur === undefined || cur === null) return undefined;
  }
  return cur;
}
function asList(val) {
  if (Array.isArray(val)) {
    return val
      .map((x) => {
        if (typeof x === "string") return x;
        return x?.otherDescription ?? x?.description ?? x?.typeDescription ?? x?.text ?? (x && typeof x === "object" ? JSON.stringify(x) : "");
      })
      .filter(Boolean);
  }
  if (typeof val === "string") return [val];
  return [];
}

const mdLines = [
  "# Catamaran tours – detail sheet for sub-category / angle",
  "",
  "Use this to decide slug + angle for each tour. Order matches category page: 1–4 = top picks, 5–10 = more options.",
  "",
  "---",
  "",
];

list.forEach((p, i) => {
  const num = i + 1;
  const title = p.title || "(no title)";
  const code = p.productCode || "";
  const supplier = p.supplier?.name ?? "";
  const rating = get(p, "reviews", "combinedAverageRating") ?? get(p, "reviews", "averageRating") ?? "";
  const reviews = get(p, "reviews", "totalReviews") ?? "";
  const description = typeof p.description === "string" ? p.description : "";
  const duration = get(p, "duration", "durationText") ?? get(p, "duration") ?? get(p, "durationUnits") ?? "";
  const inclusions = asList(get(p, "inclusions", "included") ?? get(p, "included") ?? get(p, "inclusions"));
  const highlights = asList(get(p, "highlights") ?? get(p, "itinerary"));

  mdLines.push(`## ${num}. ${title}`);
  mdLines.push("");
  mdLines.push(`| | |`);
  mdLines.push(`|---:||---|`);
  mdLines.push(`| **productCode** | \`${code}\` |`);
  mdLines.push(`| **Supplier** | ${supplier} |`);
  mdLines.push(`| **Rating** | ${rating} · ${reviews} reviews |`);
  if (duration) mdLines.push(`| **Duration** | ${typeof duration === "object" ? JSON.stringify(duration) : duration} |`);
  mdLines.push("");
  mdLines.push("### Description");
  mdLines.push("");
  mdLines.push(description || "(No description from API)");
  mdLines.push("");
  if (inclusions.length > 0) {
    mdLines.push("### Inclusions");
    mdLines.push("");
    inclusions.forEach((line) => mdLines.push(`- ${line}`));
    mdLines.push("");
  }
  if (highlights.length > 0) {
    mdLines.push("### Highlights / itinerary");
    mdLines.push("");
    highlights.forEach((line) => mdLines.push(`- ${line}`));
    mdLines.push("");
  }
  mdLines.push("---");
  mdLines.push("");
});

const detailPath = path.join(root, "scripts", "catamaran-10-tours-detail-sheet.md");
fs.writeFileSync(detailPath, mdLines.join("\n"), "utf8");

console.log("Fetched", list.length, "tours.");
console.log("  Summary:     ", summaryPath);
console.log("  Full JSON:   ", fullResponsePath);
console.log("  Detail sheet:", detailPath);
console.log("\nOpen the DETAIL SHEET (markdown) to read full descriptions and decide sub-category/angle for each tour.");
console.log("\n--- Quick list ---\n");
summary.forEach((s) => {
  console.log(`${s.index}. ${s.title} (${s.productCode})`);
});
