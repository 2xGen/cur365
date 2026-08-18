/**
 * Booking / Viator affiliate URLs.
 * Use www.viator.com format (not shop.live.rc.viator.com) so links work reliably.
 *
 * - NEXT_PUBLIC_VIATOR_CURACAO_URL: category/destination link (e.g. https://www.viator.com/Curacao/d725)
 * - NEXT_PUBLIC_VIATOR_MCID: affiliate mcid (default 42383)
 * - NEXT_PUBLIC_VIATOR_PID: affiliate pid (default P00276441)
 */
const VIATOR_CURACAO_DEFAULT = "https://www.viator.com/Curacao/d725";
const VIATOR_CURACAO_URL =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_VIATOR_CURACAO_URL
    ? process.env.NEXT_PUBLIC_VIATOR_CURACAO_URL
    : VIATOR_CURACAO_DEFAULT;

const VIATOR_MCID = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_VIATOR_MCID
  ? process.env.NEXT_PUBLIC_VIATOR_MCID
  : "42383";
const VIATOR_PID = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_VIATOR_PID
  ? process.env.NEXT_PUBLIC_VIATOR_PID
  : "P00276441";

export function getBookToursUrl(): string {
  return VIATOR_CURACAO_URL;
}

/** URL for "See options & book" when no specific product (category/destination page). */
export function getCategoryBookUrl(_categorySlug?: string): string {
  return VIATOR_CURACAO_URL;
}

/**
 * Viator product booking URL in www.viator.com format (reliable; avoids shop.live.rc.viator.com 500s).
 * Format: https://www.viator.com/Curacao/d725-ttd/p-{productCode}?mcid=...&pid=...&medium=api&api_version=2.0&campaign=cur
 * campaign=cur lets you attribute traffic from this site in Viator reporting.
 */
export function getViatorProductBookUrl(productCode: string): string {
  const params = new URLSearchParams({
    mcid: VIATOR_MCID,
    pid: VIATOR_PID,
    medium: "api",
    api_version: "2.0",
    campaign: "cur",
  });
  return `https://www.viator.com/Curacao/d725-ttd/p-${productCode}?${params.toString()}`;
}
