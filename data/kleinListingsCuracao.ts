/**
 * Klein Curaçao tour listings. Only products that actually land on Klein Curaçao.
 */
import type { TourListing } from "./listings";

export const kleinCuracaoHubSlug = "klein-curacao-tours";
export const kleinDayTripsSlug = "klein-curacao-day-trips";
export const kleinYachtSlug = "klein-curacao-yacht-tours";
export const kleinPowerboatSlug = "klein-curacao-powerboat-tours";
export const kleinPrivateSlug = "klein-curacao-private-luxury";

const adventureDayTrip: TourListing = {
  slug: "klein-curacao-adventure-day-trip",
  productCode: "74296P5",
  operator: "Adventure Day Trip",
  angle: "The classic shared Klein Curaçao full day",
  seoTitle: "Klein Curaçao Adventure Day Trip from Curaçao",
  metaDescription:
    "Our pick for the classic Klein Curaçao day: full-day boat from Curaçao to the uninhabited island with snorkeling, beach time and the lighthouse. Compare and book.",
  intro:
    "If someone says “do Klein Curaçao,” this is the day they mean. You leave a Curaçao marina in the morning, cross to the uninhabited island, spend hours on white sand and in the water, and come back the same afternoon. It is a shared boat, not a private yacht — and that is why it is the default first visit: you actually land on Klein Curaçao without chartering a hull.",
  whyWeRecommend:
    "We pick this as the benchmark Klein Curaçao tour because the itinerary is the island, not a Curaçao coastline loop. Over a thousand reviews, a full-day clock, and a landing that includes snorkel time plus the chance to walk toward the lighthouse. Use it as the comparison point: if another “island tour” never names Klein Curaçao, it is a different trip. Choose this when you want the proven shared day, not a sunset sail or a Spanish Water yacht.",
  whoIsThisFor: [
    "First-time visitors who want the signature Klein Curaçao landing",
    "Snorkelers and beach lovers happy on a shared boat",
    "Cruise passengers with a full day in port",
  ],
  bestFor: [
    "The one “must-do” boat day from Curaçao",
    "Comparing shared day trips before you pay for private",
    "Guests who care that the boat actually goes to Klein Curaçao",
  ],
  inclusions: [
    "Return boat between Curaçao and Klein Curaçao",
    "Time on the island for swimming, snorkeling and beach",
    "Snorkel gear and lunch or drinks as listed on the product",
  ],
  itinerary: [
    { stop: "Marina check-in", description: "Meet the crew on Curaçao, board and get a safety briefing before the crossing." },
    { stop: "Crossing to Klein Curaçao", description: "Open-water ride to the uninhabited island — typically about an hour depending on conditions." },
    { stop: "Island time", description: "Swim, snorkel the reef and walk the beach. Optional walk toward the lighthouse if you want the heat and the photos." },
    { stop: "Lunch", description: "Eat as included — on the boat or on the sand, depending on the operator that day." },
    { stop: "Return to Curaçao", description: "Afternoon crossing back to the marina. Plan on a 7–9 hour full day." },
  ],
  highlights: [
    "Full-day Klein Curaçao landing from Curaçao",
    "Uninhabited-island beach and snorkeling",
    "Lighthouse and wreck within walking distance of the landing",
    "The shared-boat format most visitors should start with",
  ],
  faqs: [
    { question: "Does this tour go to Klein Curaçao?", answer: "Yes. This is a full-day boat to the uninhabited island, not a Curaçao coastal cruise." },
    { question: "How long is the day?", answer: "Plan on 7–9 hours including both crossings." },
    { question: "Is snorkeling included?", answer: "Most dates include snorkel gear and time in the water. Confirm on your booking." },
    { question: "Do we visit the lighthouse?", answer: "Usually as free time on the island, not a guided hike. Bring shoes and water — there is almost no shade." },
    { question: "Is this suitable for children?", answer: "Many families book it. Check age limits and whether your kids can handle a long, hot day with little shade." },
  ],
};

const blueFinn: TourListing = {
  slug: "klein-curacao-sailing-catamaran-bluefinn",
  productCode: "119383P1",
  operator: "BlueFinn",
  angle: "Klein Curaçao on a sailing catamaran",
  seoTitle: "Klein Curaçao with Sailing Catamaran BlueFinn",
  metaDescription:
    "Our pick if you want Klein Curaçao on a sailing catamaran: more deck, a more stable crossing, BBQ lunch and a full day on the uninhabited island.",
  intro:
    "BlueFinn is the Klein Curaçao day for people who specifically want a catamaran — two hulls, more deck, a sailing feel, and a crossing that is usually kinder on the stomach than a small powerboat. You still land on Klein Curaçao. You still snorkel. You still get the white sand. The difference is the boat: this is the social, shaded, “we came for the sail and the island” version of the same destination.",
  whyWeRecommend:
    "We pick BlueFinn when the search is “Klein Curaçao catamaran,” not “any boat.” It is one of the most-reviewed Klein Curaçao products for a reason: premium open bar and BBQ-lunch positioning, a proper sailing catamaran, and an itinerary that is the island. If you get seasick easily, this is the shared boat we would rather you take than a powerboat. If you want the boat to yourselves, skip it and look at the private charters.",
  whoIsThisFor: [
    "Guests who prefer catamarans for the Klein Curaçao crossing",
    "Families and groups who want shade, deck space and a sailing day",
    "First-timers told to “take a catamaran to Klein Curaçao”",
  ],
  bestFor: [
    "Stability versus a small powerboat",
    "A social full day with lunch on a big deck",
    "Photographers who want space to shoot the island from the water",
  ],
  inclusions: [
    "Sailing catamaran to Klein Curaçao and back",
    "Snorkeling and beach time on the island",
    "Food and drinks as specified on the BlueFinn product (often BBQ and open bar)",
  ],
  itinerary: [
    { stop: "Board BlueFinn", description: "Check in at the marina and settle on the catamaran before leaving Curaçao." },
    { stop: "Sail to Klein Curaçao", description: "Crossing under sail and/or engines depending on wind — typically more stable than a speedboat." },
    { stop: "Island landing", description: "Time in the water and on the beach of the uninhabited island." },
    { stop: "Lunch on board", description: "Eat as included while you are at Klein Curaçao." },
    { stop: "Sail home", description: "Return crossing to Curaçao in the afternoon." },
  ],
  highlights: [
    "Klein Curaçao on a named sailing catamaran",
    "More stable crossing than a small powerboat",
    "Full-day island itinerary — not a sunset coast sail",
    "Strong shared-boat pick for families",
  ],
  faqs: [
    { question: "Does BlueFinn go to Klein Curaçao?", answer: "Yes. This is a full-day sailing catamaran to the uninhabited island." },
    { question: "Sailing or motors?", answer: "It is listed as a sailing catamaran. Engines are used as needed for time and weather." },
    { question: "How many people on board?", answer: "Catamarans carry more guests than a private yacht. Check the product for group size on your date." },
    { question: "Good if I get seasick?", answer: "Better than a small speedboat for most people, but the channel can still be choppy. Sit low and look at the horizon." },
    { question: "Is there shade?", answer: "Catamarans typically have a shaded cockpit plus sun decks. Bring a hat anyway — Klein Curaçao itself has little shade." },
  ],
};

const mermaid: TourListing = {
  slug: "klein-curacao-mermaid-boat-trips-full-day",
  productCode: "409718P1",
  operator: "Mermaid Boat Trips",
  angle: "Full-day Klein Curaçao with a named local operator",
  seoTitle: "Boat Trip to Klein Curaçao with Mermaid Boat Trips – Full Day",
  metaDescription:
    "Our pick for comparing a named Klein Curaçao operator: Mermaid’s full-day boat to the uninhabited island with beach, snorkeling and a complete island day.",
  intro:
    "Mermaid is the Klein Curaçao day you book when you want a specific operator, not a generic “adventure day” brand. Same island, same problem (no ferry), different boat, lunch and crew personality. We keep it on Cur365 so you can compare reviews and vibe against the adventure day trip and BlueFinn instead of guessing from a marketplace title.",
  whyWeRecommend:
    "We pick Mermaid as the third shared Klein Curaçao option because operator quality is the real variable once you have decided on a full-day island landing. Hundreds of reviews, a dedicated Klein Curaçao run, and a schedule built for hours on the sand — not a half-day snorkel off Willemstad. Read recent comments on crowding and lunch, then choose between Mermaid, the adventure day and BlueFinn. All three go to Klein Curaçao. None of them are a sunset cruise.",
  whoIsThisFor: [
    "Travelers who compare operators, not just boat types",
    "Guests who want a full-day Klein Curaçao boat, not a half-day coastal snorkel",
    "Anyone who prefers a named local boat trip",
  ],
  bestFor: [
    "Side-by-side comparison with other shared Klein Curaçao days",
    "A complete uninhabited-island itinerary",
    "Cruise and hotel guests who need a clear full-day clock",
  ],
  inclusions: [
    "Full-day boat to Klein Curaçao",
    "Time on the island and in the water",
    "Meals, drinks and snorkel gear as listed for Mermaid",
  ],
  itinerary: [
    { stop: "Meet Mermaid", description: "Check in at the stated marina or pickup on Curaçao." },
    { stop: "Outbound crossing", description: "Boat to Klein Curaçao — the uninhabited island, not a local bay." },
    { stop: "Island", description: "Swim, snorkel, beach and optional lighthouse walk." },
    { stop: "Meal", description: "Lunch as included on this product." },
    { stop: "Return", description: "Afternoon boat back to Curaçao." },
  ],
  highlights: [
    "Operator-specific full-day Klein Curaçao trip",
    "Lands on the uninhabited island",
    "Easy comparison with other shared day trips",
    "Snorkel and beach focused",
  ],
  faqs: [
    { question: "Does Mermaid go to Klein Curaçao?", answer: "Yes. This is a full-day boat trip to the uninhabited island." },
    { question: "Is this the same as every other Klein Curaçao day trip?", answer: "The island is the same. Boat, lunch, group size and crew differ — that is why we list operators separately." },
    { question: "How full is the boat?", answer: "Varies by date. Read recent reviews and the product’s group description." },
    { question: "Pickup included?", answer: "Some Klein Curaçao boats include hotel pickup; others meet at the marina. Check the listing for your date." },
    { question: "What if the weather is bad?", answer: "Operators cancel or reschedule unsafe crossings. Use a product with a clear cancellation policy." },
  ],
};

const paradiseBeachHouse: TourListing = {
  slug: "klein-curacao-paradise-beach-house",
  productCode: "310247P3",
  operator: "Paradise Beach House",
  angle: "Klein Curaçao with an exclusive beach house on the sand",
  seoTitle: "Klein Curaçao Paradise All-In Day Trip and Exclusive Beach House",
  metaDescription:
    "Our pick for a yacht-style Klein Curaçao day: you still land on the uninhabited island, plus an exclusive beach house for shade and a real base on the sand.",
  intro:
    "This is Klein Curaçao for people who will not dump bags on open sand next to every other catamaran. You still cross from Curaçao. You still get the reef and that turquoise shelf. The difference is the landing: an exclusive beach house so you have shade, a place to sit, and a day that feels closer to a private island than a packed excursion. It is the yacht-category Klein Curaçao product — and it does go to the island.",
  whyWeRecommend:
    "We pick the beach-house day when the brief is “Klein Curaçao, but comfortable.” Shade on that island is scarce; a house is the actual upgrade, not a fancier hull photo. It is not a Curaçao sunset sail and it is not a Spanish Water yacht. If you want the boat entirely to yourselves, compare the private full-day and the 38ft charter. If you want the island plus a base on the sand, this is the Cur365 yacht pick.",
  whoIsThisFor: [
    "Couples and small groups who want Klein Curaçao with shade and exclusivity",
    "Guests who will pay more to avoid a crowded beach landing",
    "Photo-focused trips that need a styled setup on the island",
  ],
  bestFor: [
    "Proposal, birthday or “make Klein Curaçao feel private” days",
    "Travelers who burn in the sun and need a real shade base",
    "The step up from a standard shared catamaran landing",
  ],
  inclusions: [
    "Boat to Klein Curaçao and back",
    "Exclusive beach house / all-in island setup as described",
    "Food, drinks and snorkel time as listed",
  ],
  itinerary: [
    { stop: "Board on Curaçao", description: "Leave on the assigned yacht-style boat for the Klein Curaçao crossing." },
    { stop: "Arrive Klein Curaçao", description: "Landing with access to the exclusive beach house — you are on the uninhabited island." },
    { stop: "Beach house base", description: "Shade, lunch and downtime without fighting for umbrellas." },
    { stop: "Water time", description: "Snorkel and swim off the island’s reef." },
    { stop: "Return", description: "Sail or motor back to Curaçao the same afternoon. This is a day-use house, not an overnight." },
  ],
  highlights: [
    "Exclusive beach house on Klein Curaçao",
    "Full island day — not a coastal sunset",
    "Premium alternative to a bare shared landing",
    "Yacht-category Klein Curaçao experience",
  ],
  faqs: [
    { question: "Does this go to Klein Curaçao?", answer: "Yes. It is a full-day trip to the uninhabited island with a beach house on the sand." },
    { question: "Is the beach house overnight?", answer: "No. Day-use only. You return to Curaçao the same afternoon." },
    { question: "Is this a private boat?", answer: "Not necessarily. The exclusivity is often the house. Read whether the boat is shared or private on your date." },
    { question: "Why is this more expensive than a catamaran ticket?", answer: "You are paying for shade, a dedicated island base and a more exclusive landing — scarce on Klein Curaçao." },
    { question: "Can we walk to the lighthouse?", answer: "Usually yes during free time. Use the house as your water and rest stop — the walk is hot and unshaded." },
  ],
};

const powerboat: TourListing = {
  slug: "klein-curacao-powerboat-adventure",
  productCode: "86035P2",
  operator: "Powerboat Adventure",
  angle: "Faster Klein Curaçao crossing on a powerboat",
  seoTitle: "Klein Curaçao Powerboat Adventure from Curaçao",
  metaDescription:
    "Our pick for a faster Klein Curaçao day: powerboat crossing, more spray, more hours on the uninhabited island. Not a catamaran sail.",
  intro:
    "The powerboat is Klein Curaçao for people who want the island without a long, slow sail. You still leave Curaçao. You still land on Klein Curaçao. You get a quicker, bumpier crossing, a smaller-boat atmosphere and more of the day spent on the sand instead of on a catamaran deck. If you love speedboats, this is the product. If you hate chop, take BlueFinn.",
  whyWeRecommend:
    "We pick the powerboat when the goal is hours on Klein Curaçao, not a brunch sail. A shorter crossing is the feature — useful if the lighthouse walk is non-negotiable. It is still an uninhabited-island landing, which is why it belongs on Cur365. We would not list a Curaçao sunset catamaran here. Take tablets if you get seasick; this hull slams in a lumpy channel.",
  whoIsThisFor: [
    "Travelers who prefer powerboats to sailing catamarans",
    "Guests who want a shorter crossing and more time on Klein Curaçao",
    "Smaller groups who like a more adventurous ride",
  ],
  bestFor: [
    "Maximising time on the island and at the lighthouse",
    "Repeat visitors who already did a catamaran",
    "Anyone who searched “Klein Curaçao powerboat”",
  ],
  inclusions: [
    "Powerboat to Klein Curaçao and back",
    "Time on the island for swim and snorkel",
    "Safety briefing, life jackets and crew",
  ],
  itinerary: [
    { stop: "Briefing on Curaçao", description: "Life jackets and how the boat will run before you leave for Klein Curaçao." },
    { stop: "Fast crossing", description: "Shorter, sportier ride than a catamaran — expect spray." },
    { stop: "Klein Curaçao", description: "Beach, snorkel, optional lighthouse on the uninhabited island." },
    { stop: "Break", description: "Lunch or snacks if included." },
    { stop: "Return ride", description: "Powerboat back to Curaçao; afternoon chop is possible." },
  ],
  highlights: [
    "Dedicated Klein Curaçao powerboat — lands on the island",
    "Faster than a sailing catamaran",
    "Adventure feel — spray and speed",
    "More hours on Klein Curaçao for the walk and the reef",
  ],
  faqs: [
    { question: "Does the powerboat go to Klein Curaçao?", answer: "Yes. This is a Klein Curaçao landing, not a local bay hop." },
    { question: "How fast is the crossing?", answer: "Often around 45 minutes each way, depending on seas — faster than most catamarans." },
    { question: "Will I get wet?", answer: "Yes. Expect spray. Dry bag for electronics." },
    { question: "Better than a catamaran?", answer: "Better if you want speed and island time. Worse if you want a stable, social sail with a big buffet deck." },
    { question: "Kids allowed?", answer: "Check minimum age. The ride is more intense than a catamaran." },
  ],
};

const privateFullDay: TourListing = {
  slug: "full-day-private-boat-trip-klein-curacao",
  productCode: "350808P2909",
  operator: "Private Klein Curaçao charter",
  angle: "Your own boat, dedicated to Klein Curaçao",
  seoTitle: "Full-Day Private Boat Trip to Klein Curaçao",
  metaDescription:
    "Our pick for a private Klein Curaçao day: the boat is yours, the destination is the uninhabited island — snorkel, beach and lighthouse on your schedule.",
  intro:
    "This is the private product whose title tells the truth: a full-day boat booked to go to Klein Curaçao. You are not hoping the captain “maybe” runs offshore. You share the day only with your group, you can linger at the wreck or skip the lighthouse, and you are not tied to a 40-person catamaran timetable.",
  whyWeRecommend:
    "We pick this when the search is “private boat to Klein Curaçao,” not “luxury boat somewhere in Curaçao.” Destination is in the name. That matters: too many private yachts stay in Spanish Water or along the coast. Cur365 only lists Klein Curaçao landings in this category. Split the hull among a group and the per-person price can make sense; two people will usually be cheaper on a shared catamaran.",
  whoIsThisFor: [
    "Families and friends who want Klein Curaçao privately",
    "Couples willing to pay for the boat to themselves",
    "Guests who need flexible time on the island",
  ],
  bestFor: [
    "The clearest private Klein Curaçao search intent",
    "Groups splitting a charter",
    "Anyone who does not want a packed shared landing",
  ],
  inclusions: [
    "Private boat and crew for a full day to Klein Curaçao",
    "Island time — snorkel, beach, lighthouse as you choose",
    "Fuel, gear and food as specified on the product",
  ],
  itinerary: [
    { stop: "Private briefing", description: "Tell the captain what you care about: wreck, lighthouse, quiet beach. You are going to Klein Curaçao." },
    { stop: "Private crossing", description: "Your boat to the uninhabited island." },
    { stop: "Your landing", description: "Snorkel and beach without a tour-group whistle." },
    { stop: "Lunch", description: "On board or ashore as arranged." },
    { stop: "Private return", description: "Leave when you are ready within the charter window and daylight/safety." },
  ],
  highlights: [
    "Dedicated private Klein Curaçao full day",
    "Your group only on the boat",
    "Flexible island itinerary",
    "The luxury alternative to shared catamarans — still the same island",
  ],
  faqs: [
    { question: "Is this definitely Klein Curaçao?", answer: "Yes. The product is a full-day private boat trip to Klein Curaçao, not a local-bay cruise." },
    { question: "How many guests?", answer: "Limited by the vessel. See capacity on the listing." },
    { question: "What’s included?", answer: "Boat and crew for the day; food, drinks and snorkel gear depend on the package." },
    { question: "Can we stay later?", answer: "Within booked hours and daylight. Captains will not run a dangerous night return." },
    { question: "Worth it vs a catamaran?", answer: "If privacy and pace matter, yes. If you only need to set foot on the island once, a shared day trip is enough." },
  ],
};

const yacht38: TourListing = {
  slug: "exclusive-38ft-yacht-charter-klein-curacao",
  productCode: "362410P5",
  operator: "38ft yacht charter",
  angle: "Charter a 38ft yacht for Klein Curaçao",
  seoTitle: "Exclusive 38ft Yacht Charter Experience in Klein Curaçao",
  metaDescription:
    "Our pick for a Klein Curaçao yacht charter: exclusive 38ft yacht, uninhabited island day, snorkeling and beach — you book the boat, not a ticket.",
  intro:
    "An exclusive 38ft yacht charter is Klein Curaçao at yacht scale: small enough to feel private, big enough for a proper day on the water. You are not buying a seat on BlueFinn. You are chartering the yacht for the Klein Curaçao run. That is the product to open if your search was “private yacht Klein Curaçao.”",
  whyWeRecommend:
    "We pick the 38ft charter when “yacht” has to mean the boat is yours and the GPS still goes to Klein Curaçao. It sits next to the full-day private boat as a vessel-type choice — yacht profile versus a generic private hull — not as a coastal sunset. Capacity is the spec: match your headcount to the certificate so it stays exclusive. Crew runs the boat; you do not need yacht experience.",
  whoIsThisFor: [
    "Groups that fit a 38ft yacht",
    "Guests who want a yacht charter to Klein Curaçao, not a catamaran ticket",
    "Celebrations and family charters to the uninhabited island",
  ],
  bestFor: [
    "Exclusive Klein Curaçao yacht days",
    "Photo-heavy trips with a real yacht profile",
    "Comparing 38ft charters with a larger private boat",
  ],
  inclusions: [
    "Exclusive 38ft yacht for the Klein Curaçao experience",
    "Crew, crossing and island time",
    "Onboard amenities as listed for this charter",
  ],
  itinerary: [
    { stop: "Charter start", description: "Meet at the yacht on Curaçao, walk through safety and the day’s Klein Curaçao plan." },
    { stop: "Run to Klein Curaçao", description: "38ft yacht crossing to the uninhabited island." },
    { stop: "Island", description: "Snorkel, beach, lighthouse on your charter clock." },
    { stop: "Yacht time", description: "Swim platform, shade, drinks — still Klein Curaçao, not a local lagoon substitute." },
    { stop: "Charter end", description: "Return to Curaçao the same day." },
  ],
  highlights: [
    "Exclusive 38ft yacht to Klein Curaçao",
    "Charter pricing — the boat is yours",
    "Yacht look and feel on the uninhabited-island day",
    "Top private-luxury Klein Curaçao option",
  ],
  faqs: [
    { question: "Does it go to Klein Curaçao?", answer: "Yes. This is positioned as a Klein Curaçao yacht charter experience, not a Curaçao-coast sunset." },
    { question: "How many people on a 38ft yacht?", answer: "Often around 8–12 depending on the boat’s certificate. The listing has the limit." },
    { question: "Is it really exclusive?", answer: "Yes — you charter the yacht rather than buying individual tickets." },
    { question: "What’s the difference vs a full-day private boat?", answer: "Vessel type and size. 38ft is a specific yacht charter; the other private boat may be a different hull and capacity." },
    { question: "Do we need yacht experience?", answer: "No. The crew runs the boat." },
  ],
};

export const kleinHubListings: TourListing[] = [
  adventureDayTrip,
  blueFinn,
  mermaid,
  paradiseBeachHouse,
  powerboat,
  privateFullDay,
  yacht38,
];

export const kleinDayTripListings: TourListing[] = [adventureDayTrip, blueFinn, mermaid];

export const kleinYachtListings: TourListing[] = [paradiseBeachHouse, yacht38];

export const kleinPowerboatListings: TourListing[] = [powerboat];

export const kleinPrivateListings: TourListing[] = [privateFullDay, yacht38];
