/**
 * Export Cur365 content to a single JSON file for import into TopTours or other platforms.
 *
 * Run: npm run export:curacao
 * Output: curacao-export.json (project root)
 *
 * Structure:
 * - destination: slug, name
 * - categories: pillars (slug, title, description, subPages, faqs, about, etc.)
 * - subcategories: guide pages (categorySlug, slug, title, description, picks, intro, faqs, etc.)
 * - tours: all tour listings (categorySlug, slug, productCode, operator, copy, faqs, etc.)
 * - pillarProductCodes: category -> product code order (for top picks vs more options)
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { pillars } from "../data/pillars";
import { pillarProductCodes } from "../data/pillarProducts";
import {
  categorySlugsWithListings,
  getTourListingsByCategory,
} from "../data/listings";
import { getGuide, getGuideSlugsByCategory } from "../data/guides";

const OUT_FILE = join(__dirname, "..", "curacao-export.json");

function stripUndefined<T extends object>(obj: T): T {
  const out = { ...obj } as Record<string, unknown>;
  for (const key of Object.keys(out)) {
    if (out[key] === undefined) delete out[key];
  }
  return out as T;
}

function exportCategories() {
  return pillars.map((p) =>
    stripUndefined({
      slug: p.slug,
      title: p.title,
      description: p.description,
      subPages: p.subPages,
      relatedSlugs: p.relatedSlugs,
      faqs: p.faqs,
      about: p.about,
      insiderTips: p.insiderTips,
      whatToExpect: p.whatToExpect,
      whoIsThisFor: p.whoIsThisFor,
      highlights: p.highlights,
    })
  );
}

function exportSubcategories() {
  const subcategories: Array<Record<string, unknown>> = [];
  for (const pillar of pillars) {
    const guideSlugs = getGuideSlugsByCategory(pillar.slug);
    for (const guideSlug of guideSlugs) {
      const guide = getGuide(pillar.slug, guideSlug);
      if (!guide) continue;
      subcategories.push(
        stripUndefined({
          categorySlug: guide.categorySlug,
          slug: guide.slug,
          title: guide.title,
          description: guide.description,
          intro: guide.intro,
          picks: guide.picks,
          whatToExpect: guide.whatToExpect,
          whyMorning: guide.whyMorning,
          whyBlock: guide.whyBlock,
          faqs: guide.faqs,
        })
      );
    }
  }
  return subcategories;
}

function exportTours() {
  const tours: Array<Record<string, unknown>> = [];
  for (const categorySlug of categorySlugsWithListings) {
    const listings = getTourListingsByCategory(categorySlug);
    for (const t of listings) {
      tours.push(
        stripUndefined({
          categorySlug,
          slug: t.slug,
          productCode: t.productCode,
          operator: t.operator,
          angle: t.angle,
          seoTitle: t.seoTitle,
          metaDescription: t.metaDescription,
          intro: t.intro,
          whyWeRecommend: t.whyWeRecommend,
          whoIsThisFor: t.whoIsThisFor,
          highlights: t.highlights,
          faqs: t.faqs,
          bestFor: t.bestFor,
          inclusions: t.inclusions,
          itinerary: t.itinerary,
        })
      );
    }
  }
  return tours;
}

function main() {
  const payload = {
    exportedAt: new Date().toISOString(),
    destination: { slug: "curacao", name: "Curaçao" },
    categories: exportCategories(),
    subcategories: exportSubcategories(),
    tours: exportTours(),
    pillarProductCodes,
  };

  writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2), "utf-8");
  console.log(`Wrote ${OUT_FILE}`);
  console.log(
    `  categories: ${payload.categories.length}, subcategories: ${payload.subcategories.length}, tours: ${payload.tours.length}`
  );
}

main();
