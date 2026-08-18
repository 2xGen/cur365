/**
 * Featured / top-pick tours for homepage fallback.
 */
export interface FeaturedTour {
  id: string;
  title: string;
  fromPrice: string;
  fromPriceLabel?: string;
  categorySlug?: string;
}

export const featuredTours: FeaturedTour[] = [
  { id: "74296P5", title: "Klein Curaçao Adventure Day Trip", fromPrice: "0", fromPriceLabel: "Price from (see options)", categorySlug: "klein-curacao-day-trips" },
  { id: "119383P1", title: "Klein Curaçao Sailing Catamaran BlueFinn", fromPrice: "0", fromPriceLabel: "Price from (see options)", categorySlug: "klein-curacao-day-trips" },
  { id: "409718P1", title: "Klein Curaçao with Mermaid Boat Trips", fromPrice: "0", fromPriceLabel: "Price from (see options)", categorySlug: "klein-curacao-day-trips" },
  { id: "310247P3", title: "Klein Curaçao Paradise Beach House Day", fromPrice: "0", fromPriceLabel: "Price from (see options)", categorySlug: "klein-curacao-yacht-tours" },
  { id: "86035P2", title: "Klein Curaçao Powerboat Adventure", fromPrice: "0", fromPriceLabel: "Price from (see options)", categorySlug: "klein-curacao-powerboat-tours" },
  { id: "350808P2909", title: "Private Full-Day Boat to Klein Curaçao", fromPrice: "0", fromPriceLabel: "Price from (see options)", categorySlug: "klein-curacao-private-luxury" },
];
