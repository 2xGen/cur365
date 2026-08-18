# Catamaran listings workflow (Option A)

One category page (`/catamaran-cruises-in-aruba`) + 10 tour listing pages (`/catamaran-cruises-in-aruba/[tour-slug]`). Each tour gets a **positioning angle** and **SEO-rich content**.

---

## Step 1: Review all 10 tours

1. Run:
   ```bash
   node scripts/fetch-all-10-catamaran.mjs
   ```
2. Open **`scripts/catamaran-10-tours-summary.json`** (or use the console output) to see:
   - Viator title, product code, rating, review count, supplier
   - Short description excerpt

Use this to decide **which angle fits each tour** (see Step 2). The order in **`data/catamaranListings.ts`** matches the category page: first 4 = top picks, next 6 = more options.

---

## Step 2: Assign slug + angle per tour

In **`data/catamaranListings.ts`**, for each of the 10 entries:

| Field | What to set |
|-------|-------------|
| **slug** | URL-friendly, unique (e.g. `jolly-pirate-afternoon-sail`, `dolphin-catamaran-snorkel`). Keep it short and readable. |
| **angle** | One clear positioning line, e.g.: "Best for families", "Luxury lagoon sail", "Snorkeling + Antilla wreck", "Brunch & mimosas morning sail", "Open bar & two snorkel stops". Shown on the category card and at the top of the listing page. |
| **productCode** | Already set — do not change (must match `data/pillarProducts.ts`). |

**Angle ideas** (match to the tour that fits best):

- Best for families / first-time snorkelers  
- Luxury option (chef, cocktails, smaller group)  
- Snorkeling focus (Antilla + reefs)  
- Morning brunch / mimosas  
- Afternoon sail with lunch  
- Open bar & two snorkel stops  
- Pirate theme / teak schooner  
- Tropical sailing + BBQ (lunch or dinner)  
- Short & sweet (2.5–3 hours)  
- Half-day (4+ hours) with Caribbean lunch  

---

## Step 3: Write SEO-rich content per listing

For each tour in **`data/catamaranListings.ts`**, fill in:

| Field | SEO guidance |
|-------|----------------|
| **seoTitle** | Optional. If set, used for `<title>` and H1; otherwise Viator title is used. Include "Aruba" and main hook (e.g. "Dolphin Catamaran Snorkel & Sail in Aruba \| Open Bar"). |
| **metaDescription** | 155–160 characters. Unique per page. Include: main benefit, location (Aruba), and a reason to click (e.g. "Two snorkel stops, open bar, and the Antilla wreck. Best catamaran snorkel in Aruba. Book with free cancellation."). |
| **intro** | 2–4 sentences. Unique copy (do not copy Viator description). Use keywords: catamaran cruise Aruba, snorkeling, Antilla shipwreck, [operator name], [duration], [inclusions]. Answer "what is this tour?" and "why Aruba?". |
| **whyWeRecommend** | Optional. 2–4 short paragraphs or bullet list: why we picked it, who it suits, what makes it stand out. |
| **whoIsThisFor** | Optional. Bullets: "Couples who want...", "Families with...", "Snorkelers looking for...". |
| **highlights** | Optional. 4–6 bullets: duration, stops, food/drinks, equipment, group size, etc. |
| **faqs** | Optional. 2–5 tour-specific Q&As (e.g. "How long is the sail?", "Is lunch included?", "Where does it depart?"). Use full sentences in answers. |

**Content tips:**

- Use natural language; avoid keyword stuffing.
- Include "Aruba", "catamaran", "snorkeling" and variants (snorkel sail, snorkel cruise) where they fit.
- Mention specific spots (Antilla wreck, Catalina Bay, Malmok) and operator name.
- Keep each listing page **distinct** so Google sees 10 different, valuable pages.

---

## After content is ready

Once slugs, angles, and content are filled in:

1. **Routing**: Add `app/[categorySlug]/[tourSlug]/page.tsx` (or similar) so `/catamaran-cruises-in-aruba/jolly-pirate-afternoon-sail` resolves.
2. **Listing template**: Page that shows angle, intro, Viator details (image, price, rating, CTA), then optional blocks (why we recommend, who it’s for, highlights, FAQs).
3. **Category page links**: Change card links from Viator to internal URLs using `slug` and `catamaranCategorySlug`.

The data file **`data/catamaranListings.ts`** is the single source for slug, angle, and all SEO copy; the app can fall back to Viator for title/image/price/reviews when needed.
