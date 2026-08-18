import { notFound } from "next/navigation";
import { getPillarBySlug, isPillarSlug } from "@/data/pillars";
import { getProductCodesForPillar } from "@/data/pillarProducts";
import { getStaticProductSummaries } from "@/data/staticProductSummaries";
import { fetchProductsBulk } from "@/lib/viator-api";
import { PillarTemplate } from "@/components/PillarTemplate";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isPillarSlug(slug)) return {};
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};
  const title = `Book ${pillar.title} | Cur365`;
  const description = `${pillar.description} Compare options and book with free cancellation.`;
  return pageMetadata({ title, description, path: `/${slug}` });
}

export async function generateStaticParams() {
  const { pillars } = await import("@/data/pillars");
  return pillars.map((p) => ({ slug: p.slug }));
}

export default async function PillarPage({ params }: Props) {
  const { slug } = await params;
  if (!isPillarSlug(slug)) notFound();
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  let featuredProducts: Awaited<ReturnType<typeof fetchProductsBulk>> = [];
  const productCodes = getProductCodesForPillar(slug);
  if (productCodes.length > 0) {
    try {
      const fetched = await fetchProductsBulk(productCodes);
      // Reorder to match pillarProducts order (API may return in different order)
      const orderMap = new Map(productCodes.map((code, i) => [code, i]));
      featuredProducts = [...fetched].sort(
        (a, b) => (orderMap.get(a.productCode) ?? 999) - (orderMap.get(b.productCode) ?? 999)
      );
    } catch {
      // API failed; use static snapshot below
    }
  }

  // When API returns no usable data (e.g. production without key), use static snapshot
  // so production shows the same tour cards as localhost
  const hasUsableProducts =
    featuredProducts.length > 0 && featuredProducts.some((p) => p.title && p.title.trim().length > 0);
  if (!hasUsableProducts && productCodes.length > 0) {
    featuredProducts = getStaticProductSummaries(productCodes, slug);
  }
  const passToTemplate =
    featuredProducts.length > 0 && featuredProducts.some((p) => p.title && p.title.trim().length > 0)
      ? featuredProducts
      : undefined;

  return (
    <>
      <PillarTemplate
        pillar={pillar}
        featuredProducts={passToTemplate}
      />
      <Footer />
    </>
  );
}
