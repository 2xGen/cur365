# Implementation prompt for prg365 (Prague)

Use this as a prompt/spec when implementing the same features on **prg365** (Prague). Replace Aruba/Prague-specific strings and use **campaign=prg** for Viator URLs.

---

## 1. `/tours-excursions` page

- **Route:** `app/tours-excursions/page.tsx` (or equivalent path in prg365).
- **Behavior:**
  - Server-rendered page that lists **all tours** from all categories.
  - **Category filter:** Dropdown (client component) that sets `?category=<slug>`. Use the same category slugs as your pillar/category pages. Filter the list by `category` when the param is present.
  - **Sort:** Dropdown for `?sort=price_asc | price_desc | rating_asc | rating_desc`. Same line as “Showing X tours…” text. Parse price from your `fromPriceDisplay` (e.g. “Price from $44” → 44) for sorting.
  - **Pagination:** Max **21 items per page**. Use `?page=1`, `?page=2`, etc. Prev/Next links that preserve `category` and `sort`.
- **SEO:**
  - **Default (no category):** Title/description for “Tours & Excursions in Prague” (or your destination), canonical `https://prg365.com/tours-excursions`.
  - **With category:** `generateMetadata` so that `?category=<slug>` gets a dedicated title (e.g. “{Pillar title} | Tours & Excursions | Prg365”), description (from pillar, trimmed to ~160 chars), and **canonical** `https://prg365.com/tours-excursions?category=<slug>`.
  - Add **ItemList** JSON-LD for the current page (name, description, url, numberOfItems, itemListElement with position).
- **Sitemap:** Add `/tours-excursions` and one URL per category: `/tours-excursions?category=<slug>` so category views are indexable.
- **Nav:** Add an “All tours” (or similar) link in the header pointing to `/tours-excursions`, and mark it active when on that route.

**Dependencies:** Two client components used by the page:
- **ToursCategoryFilter:** Dropdown that reads `category` from URL and navigates on change (e.g. `router.push('/tours-excursions?category=' + value)`).
- **ToursSortSelect:** Dropdown that reads `sort` from URL and updates it on change.

Data: Build a flat list of all tours (from your category/listings data + static product summaries), then filter by `category`, sort by `sort`, then slice for the current `page`.

---

## 2. Campaign URL (Viator) – use `campaign=prg`

- In the file that builds Viator product booking URLs (e.g. `lib/booking.ts` or equivalent), add (or set) the **campaign** query parameter to **`prg`** so Prague traffic is attributed separately in Viator.
- Example:  
  `https://www.viator.com/Prague/.../p-{productCode}?mcid=...&pid=...&medium=api&api_version=2.0&campaign=prg`

---

## 3. Footer – “More destinations” (other 365 brands)

- In the footer, under the brand tagline (e.g. “Everything Prague. 365 Days a Year.”), add a line:
  - **Label:** “More destinations:”
  - **Links** (city names as label): London (lon365.com), Tokyo (tyo365.com), **Aruba** (aru365.com), Curaçao (cur365.com).
- Same structure as Aru365: small text, list with “·” separators, links open in new tab with `rel="noopener noreferrer"`.

---

## 4. “View all tours” on best-tours page and homepage

- **Best-tours page** (e.g. `app/best-tours-in-prague/page.tsx` or your equivalent): Below the “Top picks” (or main listing) section, add a primary CTA button/link:
  - **Label:** “View all tours”
  - **URL:** `/tours-excursions`
  - Style it as a clear button (e.g. rounded, solid background) so it stands out.

- **Homepage:** In the section that shows “Top picks” or featured tours, add the same “View all tours” button/link below the grid, pointing to `/tours-excursions`.

---

## Checklist for prg365

- [ ] `/tours-excursions` page with category filter, sort (price + rating), pagination (21 per page)
- [ ] Dynamic metadata + canonical per category for `/tours-excursions?category=<slug>`
- [ ] ItemList schema and sitemap entries for `/tours-excursions` and each category
- [ ] “All tours” in header → `/tours-excursions`
- [ ] Viator booking URLs use `campaign=prg`
- [ ] Footer “More destinations” with London, Tokyo, Aruba, Curaçao
- [ ] “View all tours” button on best-tours page and homepage → `/tours-excursions`
