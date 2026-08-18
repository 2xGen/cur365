/**
 * Viator product codes per pillar. First entries = top picks; rest = "More options".
 * Only products that land on Klein Curaçao.
 */
import { pillars } from "./pillars";

const EMPTY_CODES: string[] = [];

const KLEIN_HUB_CODES = [
  "74296P5",
  "119383P1",
  "409718P1",
  "310247P3",
  "86035P2",
  "350808P2909",
  "362410P5",
];

const KLEIN_DAY_TRIP_CODES = ["74296P5", "119383P1", "409718P1"];

const KLEIN_YACHT_CODES = ["310247P3", "362410P5"];

const KLEIN_POWERBOAT_CODES = ["86035P2"];

const KLEIN_PRIVATE_CODES = ["350808P2909", "362410P5"];

export const pillarProductCodes: Record<string, string[]> = {
  ...Object.fromEntries(pillars.map((p) => [p.slug, EMPTY_CODES])),
  "klein-curacao-tours": KLEIN_HUB_CODES,
  "klein-curacao-day-trips": KLEIN_DAY_TRIP_CODES,
  "klein-curacao-yacht-tours": KLEIN_YACHT_CODES,
  "klein-curacao-powerboat-tours": KLEIN_POWERBOAT_CODES,
  "klein-curacao-private-luxury": KLEIN_PRIVATE_CODES,
};

export function getProductCodesForPillar(pillarSlug: string): string[] {
  const codes = pillarProductCodes[pillarSlug];
  if (!codes || codes.length === 0) return [];
  return codes;
}
