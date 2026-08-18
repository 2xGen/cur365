import type { MetadataRoute } from "next";
import { pillars } from "@/data/pillars";
import {
  categorySlugsWithListings,
  getTourListingsByCategory,
} from "@/data/listings";
import { getGuideSlugsByCategory } from "@/data/guides";

const SITE_URL = "https://cur365.com";

const HIDDEN_CATEGORIES: string[] = [];
const TOURS_EXCURSIONS_CATEGORIES = categorySlugsWithListings.filter(
  (s) => !HIDDEN_CATEGORIES.includes(s)
);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: base, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/best-tours-in-curacao`,
      lastModified: base,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tours-excursions`,
      lastModified: base,
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...TOURS_EXCURSIONS_CATEGORIES.map((slug) => ({
      url: `${SITE_URL}/tours-excursions?category=${encodeURIComponent(slug)}`,
      lastModified: base,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/partner`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/2xgen`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: base,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tourPages: MetadataRoute.Sitemap = [];
  for (const categorySlug of categorySlugsWithListings) {
    const listings = getTourListingsByCategory(categorySlug);
    for (const listing of listings) {
      tourPages.push({
        url: `${SITE_URL}/${categorySlug}/${listing.slug}`,
        lastModified: base,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
    const guideSlugs = getGuideSlugsByCategory(categorySlug);
    for (const guideSlug of guideSlugs) {
      tourPages.push({
        url: `${SITE_URL}/${categorySlug}/${guideSlug}`,
        lastModified: base,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...categoryPages, ...tourPages];
}
