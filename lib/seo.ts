import type { Metadata } from "next";

export const SITE_URL = "https://cur365.com";
export const SITE_NAME = "Cur365";
export const OG_IMAGE =
  "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/Microsites%20OG/CUR365%20OG.jpg";
export const OG_IMAGE_ALT = "CUR365 – Find & book Klein Curaçao tours";

export function ogImages() {
  return [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }];
}

function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Open Graph + Twitter + canonical for a page. */
export function socialMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const url = absoluteUrl(path);
  return {
    openGraph: {
      type: "website",
      locale: "en",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    alternates: { canonical: url },
  };
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    ...socialMetadata({ title, description, path }),
  };
}
