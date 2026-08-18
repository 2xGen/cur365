/**
 * Static snapshot of Viator-style product data for category "Popular choices" cards.
 * Used when the Viator API is unavailable (e.g. production without key or API failure)
 * so production shows the same tour cards as localhost.
 *
 * Shape matches ViatorProductSummary (title, fromPriceDisplay, rating, reviewCount, etc.).
 * productUrl: internal link when we have a listing; else from dump (productUrl) or getCategoryBookUrl().
 */
import type { ViatorProductSummary } from "@/lib/viator-api";
import { getListingByProductCode } from "@/data/listings";
import { getCategoryBookUrl, getViatorProductBookUrl } from "@/lib/booking";

/** Viator API snapshot: run `node scripts/dump-static-product-summaries.mjs` locally (with VIATOR_API_KEY in .env.local) to fill this file. Images and prices are taken from Viator only via this dump—no placeholders. Production then shows Viator titles, prices, ratings, and images without calling the API at runtime. */
import generatedStatic from "./staticProductSummariesGenerated.json";

const generatedByCode = generatedStatic as Record<
  string,
  { title: string; fromPriceDisplay: string; rating: number; reviewCount: number; imageUrl: string | null; freeCancellation: boolean; productUrl?: string | null }
>;

/**
 * Returns the Viator booking URL for a product in www.viator.com format (not shop.live.rc.viator.com).
 * Use for "View options & book" on single tour pages and anywhere we need a product booking link.
 */
export function getViatorProductUrl(productCode: string): string {
  return getViatorProductBookUrl(productCode);
}

/** Static card data per product code (fallback when no generated snapshot). */
const staticByCode: Record<
  string,
  {
    title: string;
    fromPriceDisplay: string;
    rating: number;
    reviewCount: number;
    imageUrl?: string | null;
    freeCancellation?: boolean;
  }
> = {
  // Klein Curaçao (fallback when generated snapshot missing)
  "74296P5": { title: "Klein Curaçao Adventure Day Trip", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "119383P1": { title: "Klein Curaçao with Sailing Catamaran BlueFinn", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "409718P1": { title: "Boat Trip to Klein Curaçao with Mermaid Boat Trips – Full Day", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "310247P3": { title: "Klein Curaçao Paradise All-In Day Trip and Exclusive Beach House", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2f/46/40/9d/caption.jpg", freeCancellation: true },
  "331642P3": { title: "Sunset Tour with Luxury Catamaran Yacht", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2f/16/c1/fc/caption.jpg", freeCancellation: true },
  "86035P2": { title: "Klein Curaçao Powerboat Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "168364P2": { title: "Luxury Private Boat Tour in Beautiful Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "292081P2": { title: "Spanish Water Yacht Cruise and Shipwreck Snorkel", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "350808P2909": { title: "Full-Day Private Boat Trip to Klein Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "362410P5": { title: "Exclusive 38ft Yacht Charter Experience in Klein Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  // Curaçao airport transfers (fallback when generated snapshot missing)
  "3154P14": { title: "Airport Transfer in Curaçao – Shared or Private", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "350808P1144": { title: "Curaçao Airport (CUR) to Island Hotels – Round-Trip Private Transfer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "350808P824": { title: "Santa Catalina to Curaçao Airport (CUR) – Departure Private Transfer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "5548634P7": { title: "Curaçao Airport Transfer – Private & Reliable Service", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "32767P12": { title: "Curaçao Airport Transfer – Standard Service", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "87205P101": { title: "Private Vehicle Transfer from Curaçao City/Blue Bay to Airport", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  // Curaçao sunset (fallback when generated snapshot missing)
  "5590478P8": { title: "Curaçao ClearBoat Sunset Cruise – Glass-Bottom Experience", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "168364P2": { title: "Luxury Private Boat Tour in Beautiful Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "168364P3": { title: "Romantic Private Sunset Cruise for 2 in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "5596745P3": { title: "Sunset Sip and Paint Overlooking Curaçao’s Iconic Skyline", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  // Curaçao catamaran (fallback when generated snapshot missing)
  "74296P5": { title: "Klein Curaçao Adventure Day Trip", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "331642P3": { title: "Sunset Tour with Luxury Catamaran Yacht", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "119383P1": { title: "Klein Curaçao with Sailing Catamaran BlueFinn", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "74296P6": { title: "Romantic Sunset Sail", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "74296P4": { title: "Irie Half-Day Snorkel and Lunch Sail", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "119383P4": { title: "Sunset Sailing Trip in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "6278P9": { title: "Curaçao Speedboat Beach and Snorkel Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "74296P8": { title: "West Coast Beaches, BBQ, and Blue Room Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "331642P2": { title: "Luxury Catamaran Yacht to Klein Curaçao – All-Inclusive", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  // Curaçao snorkeling (fallback when generated snapshot missing)
  "331642P6": { title: "Snorkel Trip on a Catamaran Yacht – All-Inclusive Experience", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "87314P3": { title: "Flamingos and Snorkeling with Sea Turtles", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "112644P3": { title: "Snorkel Tour in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "123932P4": { title: "Guided Snorkel Tour at Blue Bay House Reef", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "333322P2": { title: "Sea TREK Curaçao – Underwater Walking Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "110433P23": { title: "Private Tour – Snorkelling with Sea Turtles", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "333322P13": { title: "Sea TREK & SNUBA Combo – Walk and Dive the Ocean", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "5495564P1": { title: "Curaçao Seabob Tours – Playa Piscado", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "333322P15": { title: "Sublue Underwater Scooter – Explore the Reef", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "138282P1": { title: "Aquafari Tour in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  // Catamaran (first 4 = top picks – real data so production matches localhost)
  "119085P1": {
    title: "Dolphin Catamaran Snorkel and Sail with Open Bar",
    fromPriceDisplay: "Price from $44",
    rating: 4.7,
    reviewCount: 2382,
    imageUrl: null,
    freeCancellation: true,
  },
  "2785MORSNORKEL": {
    title: "Half-Day Snorkel Sail Tour with Caribbean Lunch",
    fromPriceDisplay: "Price from $85",
    rating: 4.8,
    reviewCount: 720,
    imageUrl: null,
    freeCancellation: true,
  },
  "6593P7": {
    title: "Luxury Lagoon Cruise with Onboard Chef and Signature Cocktails",
    fromPriceDisplay: "Price from $149",
    rating: 4.8,
    reviewCount: 248,
    imageUrl: null,
    freeCancellation: true,
  },
  "8936P1": {
    title: "Arusun Catamaran Sail with Snorkeling in Aruba",
    fromPriceDisplay: "Price from $35",
    rating: 4.8,
    reviewCount: 2449,
    imageUrl: null,
    freeCancellation: true,
  },
  // Catamaran more options
  "444239P8": {
    title: "Tropical Sailing Experience with BBQ Lunch or BBQ Dinner in Aruba",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "47607P3": {
    title: "Premium Catamaran Morning Sail: Snorkeling, Mimosas and Brunch",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "47607P2": {
    title: "Premium Catamaran Afternoon Sail: Snorkeling and Lunch",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "37387P3": {
    title: "Aruba Jolly Pirate Afternoon Sail with Snorkeling",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "2785AFTSNORKEL": {
    title: "Antilla Shipwreck and Catalina Bay Snorkel Sail",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "6593P8": {
    title: "Iconic Aruba Sail and Snorkel Experience",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  // Sunset and dinner (first 4)
  "2785DINNER": {
    title: "Aruba Dinner Cruise by Catamaran",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "8936P5": {
    title: "Aruba Sunset Sail – The Arusun Catamaran",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "245508": {
    title: "Palm Pleasure Sunset Sail",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "119085P2": {
    title: "Catamaran Dolphin Sunset Cruise in Aruba",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  // Sunset more
  "6593DINNER": {
    title: "Aruba Sunset Cruise and Seaside Dinner",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "47607P4": {
    title: "Aruba Happy Hour Sunset Sail",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "6593P10": {
    title: "Aruba Sunset Sail Experience",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "2785SUNSET": {
    title: "Aruba Sunset Catamaran Cruise",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "37387P2": {
    title: "Sunset Pirate Cruise in Aruba",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  "6593P14": {
    title: "Havanas Sunset Cruise",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
  },
  // Snorkeling
  "325347P2": { title: "Discover Scuba Diving on Aruba's Reef", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "186518P5": { title: "Discover Snorkeling Mangel Halto", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "325347P3": { title: "Turtle Spotting Snorkeling Excursion", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5567676P3": { title: "Aruba Turtle Spotting Snorkeling Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // ATV
  "6841P7": { title: "Natural Pool and Cave Explorer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "6687ATV": { title: "Aruba ATV Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "137607P10": { title: "Aruba ATV Tours Single and Double Seater 4-Hour Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "47774P3": { title: "Aruba's Secret Beach and Cave Pool UTV and ATV Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Island sightseeing
  "6593P16": { title: "Aruba Natural Wonders Jeep Tour Caves and Natural Pool", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "7389P1": { title: "Aruba Island Sightseeing Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "137607P19": { title: "Aruba Private Luxury Jeep Tours", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "441143P1": { title: "National Park Safari Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Curaçao island tours (fallback when generated snapshot missing)
  "110433P26": {
    title: "Get to Know, Feel and Taste the Culture of Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "430221P1": {
    title: "Introduction to Curaçao – Guided Island Overview",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "3154P12": {
    title: "Complete Island Tour of Curaçao – Full Day",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "32767P1": {
    title: "Eco Tour and Beach in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "332330P1": {
    title: "Beach Hopping Curaçao – Classic Multi-Beach Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "110433P13": {
    title: "All-Inclusive West Coast Beach Hopping and Snorkeling with Turtles",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "354906P2": {
    title: "Curaçao Downtown Amazing London Bus Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "436959P5": {
    title: "TukTuks Adventure Fun Tour in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "436959P9": {
    title: "Moke My Day Adventure – Self-Drive Island Fun",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "209782P1": {
    title: "Beach Hopping Curaçao – UTV/Buggy Private Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  // Curaçao beach tours (fallback when generated snapshot missing)
  "32767P17": {
    title: "Curaçao West Countryside and Beach Day Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "354906P3": {
    title: "Hato Cave, Flamingo and Beach Tour in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "32767P1": {
    title: "Eco Tour and Beach – Nature and Relaxation in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "310247P3": {
    title: "Klein Curaçao Paradise All-In Day Trip with Exclusive Beach House",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "74296P5": {
    title: "Klein Curaçao Adventure Day Trip",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5608624P9": {
    title: "Curaçao Full-Day Adventure – Caves, Turtles, Beach and Flamingos",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "430221P1": {
    title: "Introduction to Curaçao – Guided Island Overview",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "362410P8": {
    title: "Off-Road ATV Adventure Tour in Westpoint Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "354906P1": {
    title: "Green Escape West Tour – Curaçao Beaches and Nature",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  // Photoshoots
  "5628877P6": { title: "Aruba Golden Hour Beach Photoshoot", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5616292P5": { title: "Family Couple and Engagement Photography", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "474314P1": { title: "Clear Kayak Shoot LUX", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5563642P1": { title: "Professional Sunset Photoshoot", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Horseback
  "7927P1": { title: "Small Group Beach Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "14261P1": { title: "Natural Pool Horseback Riding", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "13835P20": { title: "Sunset Rock Formation Countryside and Beach", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "7927P13": { title: "Ecological and Beach Horseback Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Romantic
  "6593P11": { title: "Exclusive Dinner Cruise", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5493518P1": { title: "Eagle Beach Romantic Sunset Picnic Cabana", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5493518P2": { title: "Beach Romantic Sunset Photoshoot Picnic Cabana", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Private & luxury
  "171319P1": { title: "VIP Airport Hosting Arrival", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "171319P2": { title: "VIP Airport Hosting Departure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "6687P7": { title: "VIP Luxury SUV Airport Transfer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "5492822P1": { title: "Private Round Trip Airport Transfer", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Airport transfers (Aruba) — fallback until you run dump; run `node scripts/dump-static-product-summaries.mjs` for Viator images & live prices
  "12431P5": { title: "Private Airport Transportation Services", fromPriceDisplay: "Price from $45", rating: 0, reviewCount: 0, imageUrl: null },
  "2455AUAAPTRND": { title: "Roundtrip Aruba Airport Transfer", fromPriceDisplay: "Price from $75", rating: 0, reviewCount: 0, imageUrl: null },
  "332620P2": { title: "Private Transfers", fromPriceDisplay: "Price from $40", rating: 0, reviewCount: 0, imageUrl: null },
  "242476P1": { title: "AyCaramba Transfer and Private Tour Aruba", fromPriceDisplay: "Price from $120", rating: 0, reviewCount: 0, imageUrl: null },
  "3046AUAAPTRND": { title: "Roundtrip Aruba Airport Private Transfer", fromPriceDisplay: "Price from $80", rating: 0, reviewCount: 0, imageUrl: null },
  "5597840P1": { title: "Aruba Private Airport Transfer", fromPriceDisplay: "Price from $42", rating: 0, reviewCount: 0, imageUrl: null },
  "7389P5": { title: "One-Way Private Airport Transfer", fromPriceDisplay: "Price from $38", rating: 0, reviewCount: 0, imageUrl: null },
  "5568850P2": { title: "Private Airport Transfers", fromPriceDisplay: "Price from $40", rating: 0, reviewCount: 0, imageUrl: null },
  // Curaçao private tours (fallback when generated snapshot missing)
  "22051P5": {
    title: "Curacao Beach Hopping Private Jeep/SUV 4x4 Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5487918P1": {
    title: "VIP Tour at Curacao – Customize Your Own Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "348602P2": {
    title: "3-Hour Roundtrip East – Private Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "439923P2": {
    title: "The Ultimate Beach Tour – Private Experiences Curacao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "422823P1": {
    title: "Curacao Unfiltered – A Local Guided Journey Beyond the Beaches",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "434399P1": {
    title: "Curacao Private Food Excursion",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "174976P3": {
    title: "Curacao Island Travel – Private Island Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  // Curaçao food tours (fallback when generated snapshot missing)
  "5634184P1": {
    title: "Discover Curaçao's Culinary Archive with a Local",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "348602P5": {
    title: "Foodie Tour Curaçao – 3 Hours",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "428996P2": {
    title: "Local Gourmet Bites and Wine Tasting Night Activity in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "45756P2": {
    title: "Curaçao Liqueur Distillery Tour and Tasting",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "61851P13": {
    title: "Curaçao East Side Tour and Liqueur Tasting",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5608022P1": {
    title: "Private Wine Tasting Boat Tour on Spanish Water, Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5608022P4": {
    title: "Captain’s Reserve Wine Tasting Boat Tour – Exclusive Experience",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5608022P6": {
    title: "Private Spanish Water Boat Tour with Charcuterie and Drinks",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "189147P13": {
    title: "Mojito Masterclass at a Mixology Club in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  // Curaçao cultural tours (fallback when generated snapshot missing)
  "110433P24": {
    title: "Curaçao Walking Tours – Culture, History and City Intro",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "32767P32": {
    title: "Curaçao Private Full Island Tour with Local Guide",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5608624P6": {
    title: "The Curaçao Taste – City Sights, Chobolobo Tour and Mambo Beach",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "74296P9": {
    title: "Curaçao City Highlights – Cultural Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5616169P1": {
    title: "Willemstad Authentic Food Tour – Culture and Flavour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5596775P5": {
    title: "The Black History Tour – Curaçao’s Untold Story",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "222222P253": {
    title: "Willemstad’s Harbour History – Self-Guided Audio Walking Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5621426P1": {
    title: "Curaçao Walking Tour – Culture, History and Art Exploration",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  // Curaçao water sports (fallback when generated snapshot missing)
  "5590478P5": {
    title: "Glass-Bottom Boat Tour with Snorkel at Daaibooi, Porto Mari and Cas Abao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "5533428P1": {
    title: "Private Curaçao Jet Ski Adventure with Free Action Video",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "119383P16": {
    title: "Jet Ski Adventure at Piscadera Bay in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "119383P15": {
    title: "Jet Ski Adventure at Jan Thiel in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "405234P5": {
    title: "Private Sunset Water Bike Experience on the Ocean in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "214628P4": {
    title: "Wakeboard, Kneeboard and Water-Ski Session in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "400174P1": {
    title: "Dushi Views Bamboo Raft Photoshoot Experience in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "400174P3": {
    title: "Bamboo Raft Photoshoot with Free Videos, Shots and Cocktails in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "112644P4": {
    title: "PADI Open Water Course in Curaçao",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "333322P2": {
    title: "Sea TREK Curaçao – Underwater Walking Tour",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  "168364P1": {
    title: "Explore Curacao on Private Sailing Yacht Galaxie",
    fromPriceDisplay: "Price from (see options)",
    rating: 0,
    reviewCount: 0,
    imageUrl: null,
    freeCancellation: true,
  },
  // Sea Glass Island (Aruba) — fallback until dump
  "419440P1": { title: "Sea Glass Island Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "122173P3": { title: "Kayak Tour to Seaglass Island", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "358117P3": { title: "Sea Glass Island and Clear Kayak Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "300281P10": { title: "Sea Glass Island Kayak Tour Afternoon", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "358117P10": { title: "Sea Glass Island Tour By Boat", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "300281P7": { title: "Sea Glass Island Kayak Sunset Snorkeling Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "300281P12": { title: "Sea Glass Island Kayak Tour Morning Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Water sports (Aruba) — fallback until dump
  "119085P5": { title: "Water Skiing and Wakeboarding", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "137607P22": { title: "Aruba Jet Ski Rental", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "119085P3": { title: "Flyboarding and Jetovator 30 min", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "119085P4": { title: "Jet Ski Waverunner Rental", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "102406P1": { title: "Parasailing", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "119085P6": { title: "Tube Ride 15 minutes", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  "8936P2": { title: "Aruba Parasailing Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null },
  // Curaçao nightlife (fallback when generated snapshot missing)
  "332330P2": { title: "Party Bus and City Lights Night Tour in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "255954P3": { title: "Curaçao Tropical Paradise and a Taste of Rum", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "32767P21": { title: "Curaçao Saturday Night Fever – Karaoke and Bar Hops", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "32767P20": { title: "The Ultimate Curaçao Night Adventure – Bars, Hop and Bites", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "331642P3": { title: "Sunset Tour with Luxury Catamaran Yacht in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "255954P8": { title: "Sunset Royale Party Ride in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "110433P29": { title: "Curaçao Highlights by Night Tour", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "119383P17": { title: "Punda Vibes City Tour in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "119383P4": { title: "Sunset Sailing Trip in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "381408P4": { title: "Sunset Sailing Cruise with Drinks and Bites in Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  // Klein Curaçao — last-write wins so images are not overwritten by older Curaçao/Aruba duplicates above
  "74296P5": { title: "Klein Curaçao Adventure Day Trip", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "119383P1": { title: "Klein Curaçao with Sailing Catamaran BlueFinn", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "409718P1": { title: "Boat Trip to Klein Curaçao with Mermaid Boat Trips – Full Day", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "310247P3": { title: "Klein Curaçao Paradise All-In Day Trip and Exclusive Beach House", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2f/46/40/9d/caption.jpg", freeCancellation: true },
  "331642P3": { title: "Sunset Tour with Luxury Catamaran Yacht", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: "https://dynamic-media.tacdn.com/media/photo-o/2f/16/c1/fc/caption.jpg", freeCancellation: true },
  "86035P2": { title: "Klein Curaçao Powerboat Adventure", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "168364P2": { title: "Luxury Private Boat Tour in Beautiful Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "292081P2": { title: "Spanish Water Yacht Cruise and Shipwreck Snorkel", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "350808P2909": { title: "Full-Day Private Boat Trip to Klein Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
  "362410P5": { title: "Exclusive 38ft Yacht Charter Experience in Klein Curaçao", fromPriceDisplay: "Price from (see options)", rating: 0, reviewCount: 0, imageUrl: null, freeCancellation: true },
};

/**
 * Returns static product summaries for the given product codes and category.
 * Used when the Viator API returns no data so production shows the same cards as localhost.
 * Builds productUrl: internal link when we have a listing; else Viator product URL from dump (productUrl) or category URL.
 */
export function getStaticProductSummaries(
  productCodes: string[],
  categorySlug: string
): ViatorProductSummary[] {
  const out: ViatorProductSummary[] = [];
  const categoryBookUrl = getCategoryBookUrl(categorySlug);
  for (const code of productCodes) {
    const generated = generatedByCode[code];
    const fallback = staticByCode[code];
    const data = generated ?? fallback;
    if (!data) continue;
    const listing = getListingByProductCode(categorySlug, code);
    const title = listing?.seoTitle ?? data.title;
    const productUrl = listing
      ? `/${categorySlug}/${listing.slug}`
      : getViatorProductBookUrl(code);
    out.push({
      productCode: code,
      title,
      productUrl,
      fromPriceDisplay: data.fromPriceDisplay,
      reviewCount: data.reviewCount,
      rating: data.rating,
      imageUrl: data.imageUrl ?? null,
      freeCancellation: data.freeCancellation ?? false,
    });
  }
  return out;
}
