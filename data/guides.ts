/**
 * Guide pages between category pages and tour listings.
 * Types live in guideSchema.ts. Content is split by pillar for maintainability.
 */
export type { GuideChecklist, GuidePage, GuidePick, GuideSection } from "./guideSchema";
export { faq } from "./guideSchema";

import type { GuidePage } from "./guideSchema";
import { dayTripGuides } from "./guidesDayTrips";
import { hubGuides } from "./guidesHub";
import { powerboatGuides } from "./guidesPowerboat";
import { privateGuides } from "./guidesPrivate";
import { yachtGuides } from "./guidesYacht";

const guides: GuidePage[] = [
  ...hubGuides,
  ...dayTripGuides,
  ...yachtGuides,
  ...powerboatGuides,
  ...privateGuides,
];

export function getGuide(categorySlug: string, guideSlug: string): GuidePage | null {
  return guides.find((g) => g.categorySlug === categorySlug && g.slug === guideSlug) ?? null;
}

export function getGuideSlugsByCategory(categorySlug: string): string[] {
  return guides.filter((g) => g.categorySlug === categorySlug).map((g) => g.slug);
}

export function getRelatedGuides(
  categorySlug: string,
  currentGuideSlug: string,
  limit: number = 3
): { slug: string; title: string }[] {
  return guides
    .filter((g) => g.categorySlug === categorySlug && g.slug !== currentGuideSlug)
    .slice(0, limit)
    .map((g) => ({ slug: g.slug, title: g.title }));
}
