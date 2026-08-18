export interface SubPage {
  label: string;
  href: string;
}

export interface Pillar {
  slug: string;
  title: string;
  description: string;
  subPages: SubPage[];
  relatedSlugs: string[];
  faqs: { question: string; answer: string }[];
  about?: string;
  insiderTips?: string[];
  whatToExpect?: string[];
  whoIsThisFor?: string | string[];
  highlights?: string[];
}

const NEW_CATEGORY_SLUGS = [
  "klein-curacao-tours",
  "klein-curacao-day-trips",
  "klein-curacao-yacht-tours",
  "klein-curacao-powerboat-tours",
  "klein-curacao-private-luxury",
] as const;

export type PillarSlug = (typeof NEW_CATEGORY_SLUGS)[number];

export function isPillarSlug(slug: string): slug is PillarSlug {
  return (NEW_CATEGORY_SLUGS as readonly string[]).includes(slug);
}

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}

export function getRelatedPillars(pillar: Pillar): Pillar[] {
  return pillar.relatedSlugs
    .map((slug) => getPillarBySlug(slug))
    .filter((p): p is Pillar => p !== undefined);
}

export const pillars: Pillar[] = [
  {
    slug: "klein-curacao-tours",
    title: "Klein Curaçao Tours",
    description:
      "Book the best Klein Curaçao tours from Curaçao. Compare catamaran day trips, yachts, powerboats and private charters that actually land on the uninhabited island — then book with free cancellation.",
    subPages: [
      { label: "How to get to Klein Curaçao", href: "/klein-curacao-tours/how-to-get-to-klein-curacao" },
      { label: "Best Klein Curaçao day trips", href: "/klein-curacao-tours/best-klein-curacao-day-trips" },
      { label: "Snorkeling and beaches", href: "/klein-curacao-tours/klein-curacao-snorkeling-and-beaches" },
      { label: "Yacht and catamaran trips", href: "/klein-curacao-tours/klein-curacao-yacht-and-catamaran" },
      { label: "Private charters", href: "/klein-curacao-tours/klein-curacao-private-charters" },
      { label: "Lighthouse, wreck and history", href: "/klein-curacao-tours/klein-curacao-lighthouse-and-shipwreck" },
    ],
    relatedSlugs: [
      "klein-curacao-day-trips",
      "klein-curacao-yacht-tours",
      "klein-curacao-powerboat-tours",
      "klein-curacao-private-luxury",
    ],
    about:
      "Klein Curaçao is the uninhabited island eight miles off Curaçao’s southeast coast — a strip of white sand, turquoise water, a historic lighthouse and the rusting hull of the oil tanker Maria Bianca Guidesman. There is no ferry. The only way to go is on a Klein Curaçao tour: a full-day catamaran, a faster powerboat, a private yacht, or an exclusive beach-house day. Cur365 is built around that trip. We compare operators, boat types, inclusions and group size so you can book the Klein Curaçao experience that actually matches how you want to spend the day — not a generic island tour that never leaves the mainland.",
    insiderTips: [
      "Book Klein Curaçao tours several days ahead in high season — popular catamarans and private yachts fill early.",
      "The crossing is typically 45–90 minutes depending on boat type. Powerboats are faster; catamarans are more stable and social.",
      "There is little shade and no shops on the island. Tours that include lunch, drinks, umbrellas or a beach house are worth the extra cost.",
      "Morning departures usually mean calmer seas and more time on the island. Check the return time if you have a dinner or cruise all-aboard.",
    ],
    whatToExpect: [
      "Check-in at a marina or pickup point on Curaçao, usually early morning for a full-day trip.",
      "A safety briefing and sail or ride of about 45–90 minutes across open water to Klein Curaçao.",
      "Time on the island: swimming, snorkeling the reef or wreck, walking to the lighthouse, and lunch on the beach or boat.",
      "A return crossing in the afternoon. Total duration is typically 7–9 hours for a full day.",
    ],
    whoIsThisFor: [
      "First-time visitors who want the one Curaçao day that feels like a different island.",
      "Snorkelers and beach lovers who want white sand and clearer water than the mainland bays.",
      "Couples and groups who want a yacht, catamaran or private charter instead of a crowded ferry-style boat.",
      "Cruise passengers with a full day in port who can fit a 7–9 hour Klein Curaçao excursion.",
    ],
    highlights: [
      "Uninhabited island day trips from Curaçao — catamaran, yacht or powerboat",
      "Snorkeling, white-sand beach, lighthouse and shipwreck in one outing",
      "Shared, exclusive beach-house and fully private charter options",
      "Compare operators and book with free cancellation on most tours",
    ],
    faqs: [
      {
        question: "How do you get to Klein Curaçao?",
        answer:
          "There is no public ferry. You book a Klein Curaçao tour from Curaçao — typically a catamaran, sailing yacht, powerboat or private charter. The crossing takes about 45–90 minutes depending on the boat.",
      },
      {
        question: "How long is a Klein Curaçao day trip?",
        answer:
          "Most full-day tours run 7–9 hours including the crossings. You usually leave in the morning and return mid-to-late afternoon. Powerboat trips can be slightly shorter on the water; private charters can stretch the day.",
      },
      {
        question: "Is Klein Curaçao worth it?",
        answer:
          "If you want a remote beach, snorkeling and a real “uninhabited island” day, yes. It is the standout boat trip from Curaçao. If you only have a half day or get seasick easily, a mainland beach or short snorkel sail may be a better fit.",
      },
      {
        question: "What should I bring on a Klein Curaçao tour?",
        answer:
          "Swimwear, reef-safe sunscreen, a hat, towel, and a dry bag for phone and wallet. There is little shade and no shops. Many tours include lunch, drinks and snorkel gear — check inclusions so you do not double-pack.",
      },
      {
        question: "Can you stay overnight on Klein Curaçao?",
        answer:
          "Almost all visits are day trips. There is no hotel. A few exclusive products include a beach house for the day, not an overnight stay. Plan to return to Curaçao the same afternoon.",
      },
      {
        question: "Is Klein Curaçao good for cruise passengers?",
        answer:
          "Yes if you have a full day in port. Confirm the tour’s return time against all-aboard. Shared catamarans are the most common cruise-friendly option; private charters cost more but give you control of timing.",
      },
    ],
  },
  {
    slug: "klein-curacao-day-trips",
    title: "Klein Curaçao Day Trips",
    description:
      "Compare Klein Curaçao day trips from Curaçao. Full-day catamaran and boat tours with snorkeling, beach time, lunch and the lighthouse — book the classic uninhabited-island excursion.",
    subPages: [
      { label: "Catamaran day trips", href: "/klein-curacao-day-trips/catamaran-day-trips" },
      { label: "Full-day boat trips", href: "/klein-curacao-day-trips/full-day-boat-trips" },
      { label: "What to pack for Klein Curaçao", href: "/klein-curacao-day-trips/what-to-pack" },
      { label: "Snorkeling on Klein Curaçao day trips", href: "/klein-curacao-day-trips/snorkeling-on-day-trips" },
      { label: "Cruise passenger day trips", href: "/klein-curacao-day-trips/cruise-passenger-day-trips" },
      { label: "Shared vs smaller-group day trips", href: "/klein-curacao-day-trips/shared-vs-small-group" },
    ],
    relatedSlugs: ["klein-curacao-tours", "klein-curacao-yacht-tours", "klein-curacao-powerboat-tours"],
    about:
      "A Klein Curaçao day trip is the classic way to see the island: leave Curaçao in the morning on a catamaran or tour boat, spend hours on white sand and in the water, and sail back in the afternoon. Shared day trips are the best value if you want snorkeling, lunch and the lighthouse without chartering a whole yacht. Compare inclusions — open bar, BBQ, snorkel gear, and time on the island — so you know what you are paying for.",
    insiderTips: [
      "Catamarans are more stable on the crossing; they are the default choice for first-timers and families.",
      "Ask whether lunch is a buffet on board or a beach BBQ — both work, but the vibe is different.",
      "If you want more space on the sand, look for tours that mention a beach house, umbrellas or a quieter landing.",
      "Seasickness is more likely on the way back if the wind picks up. Sit mid-ship and look at the horizon.",
    ],
    whatToExpect: [
      "Early check-in at the marina; briefing and boarding.",
      "Open-water crossing to Klein Curaçao (about 60–90 minutes on a catamaran).",
      "Beach time, snorkeling and a walk to the lighthouse or wreck if included.",
      "Lunch and drinks as listed on your tour.",
      "Return sail to Curaçao in the afternoon.",
    ],
    whoIsThisFor: [
      "First-time visitors booking the one “must-do” boat day from Curaçao.",
      "Families and groups who want a shared, social catamaran rather than a private charter.",
      "Snorkelers who want reef and wreck time without arranging their own boat.",
      "Cruise guests with a full day who want a proven, timed itinerary.",
    ],
    highlights: [
      "Full-day Klein Curaçao catamaran and boat tours",
      "Snorkeling, beach, lunch and lighthouse in one itinerary",
      "Shared boats — the most popular way to visit",
      "Compare BlueFinn, adventure day trips and Mermaid-style full days",
    ],
    faqs: [
      {
        question: "What is included on a typical Klein Curaçao day trip?",
        answer:
          "Most include the boat, crew, snorkel gear, lunch and drinks. Some add open bar, a beach BBQ or extra time at the wreck. Always read the inclusions for your date.",
      },
      {
        question: "How early do Klein Curaçao day trips leave?",
        answer:
          "Usually between 7:00 and 9:00 a.m. from a marina on Curaçao. Your confirmation lists the exact check-in time.",
      },
      {
        question: "Are Klein Curaçao day trips suitable for children?",
        answer:
          "Many catamaran day trips welcome families. Check minimum ages, whether life jackets are provided, and how long the crossing is. Very young children can find a full day long and hot.",
      },
      {
        question: "Will I get seasick on a Klein Curaçao day trip?",
        answer:
          "The channel can be choppy. Catamarans are generally more comfortable than small boats. Take motion-sickness tablets if you are prone to it, and stay on deck with a view of the horizon.",
      },
      {
        question: "Do day trips visit the lighthouse?",
        answer:
          "Most give you free time to walk to the Klein Curaçao lighthouse. It is a hot, unshaded walk — bring water and shoes, not just flip-flops.",
      },
      {
        question: "Can I book a Klein Curaçao day trip last minute?",
        answer:
          "Sometimes, but popular boats sell out. In high season, book at least a few days ahead. Many operators offer free cancellation within their cutoff.",
      },
    ],
  },
  {
    slug: "klein-curacao-yacht-tours",
    title: "Klein Curaçao Yacht Tours",
    description:
      "Klein Curaçao yacht tours from Curaçao. Exclusive beach-house days and 38ft yacht charters that land on the uninhabited island. Compare space, inclusions and book.",
    subPages: [
      { label: "Exclusive beach-house yacht days", href: "/klein-curacao-yacht-tours/exclusive-beach-house-days" },
      { label: "Luxury yacht charters", href: "/klein-curacao-yacht-tours/luxury-catamaran-yachts" },
      { label: "Yacht vs shared catamaran", href: "/klein-curacao-yacht-tours/yacht-vs-shared-catamaran" },
      { label: "What a yacht day includes", href: "/klein-curacao-yacht-tours/what-a-yacht-day-includes" },
      { label: "Best for couples and small groups", href: "/klein-curacao-yacht-tours/couples-and-small-groups" },
      { label: "Photos and beach-house setup", href: "/klein-curacao-yacht-tours/photos-and-beach-house" },
    ],
    relatedSlugs: ["klein-curacao-tours", "klein-curacao-private-luxury", "klein-curacao-day-trips"],
    about:
      "Klein Curaçao yacht tours sit above the standard shared day trip. Think more deck space, a stronger “luxury boat” feel, and — on some products — an exclusive beach house on the island so you are not competing for the same patch of sand as every catamaran. If you want Klein Curaçao to feel like a private island day rather than a packed excursion, start here and compare yacht-style boats with fully private charters.",
    insiderTips: [
      "“Yacht” on Viator can mean a luxury catamaran or a motor yacht — read the vessel description.",
      "A beach house on Klein Curaçao is rare and books out; treat it as a different product from a shared beach landing.",
      "For a true yacht-to-yourself day, look at the exclusive 38ft charter as well as the beach-house landing.",
    ],
    whatToExpect: [
      "Boarding a larger or more exclusive vessel than a standard tour boat.",
      "A crossing to Klein Curaçao — these yacht products land on the uninhabited island.",
      "More space on deck, often better food and drink service, and a calmer group size.",
      "On beach-house days: a dedicated setup on the sand with shade and a more exclusive landing.",
    ],
    whoIsThisFor: [
      "Couples and small groups who want Klein Curaçao with more comfort than a packed catamaran.",
      "Guests celebrating a birthday, anniversary or proposal who want a yacht-day feel.",
      "Travelers who value a beach house or exclusive landing on Klein Curaçao.",
      "Anyone comparing yacht-style days with fully private charters.",
    ],
    highlights: [
      "Luxury catamaran and yacht-style Klein Curaçao days",
      "Exclusive beach-house option on the island",
      "More space and a premium onboard experience",
      "Clear step up from standard shared day trips",
    ],
    faqs: [
      {
        question: "Do Klein Curaçao yacht tours go to the island?",
        answer:
          "Yes — the yacht products on Cur365 are Klein Curaçao landings: the exclusive beach-house day and the 38ft yacht charter. We do not list Curaçao-coast sunset sails here.",
      },
      {
        question: "What is the Klein Curaçao beach-house day?",
        answer:
          "A premium full-day product that pairs a boat trip with exclusive use of a beach house on Klein Curaçao — shade, a base on the sand, and a more private feel than a shared beach landing.",
      },
      {
        question: "Is a yacht tour the same as a private charter?",
        answer:
          "Not always. Yacht-style tours can still be shared or small-group. A private charter means the boat is yours. Compare both categories if you want the boat to yourself.",
      },
      {
        question: "Are yacht tours worth the extra cost?",
        answer:
          "If you care about space, service and a less crowded landing, yes. If you mainly want to set foot on Klein Curaçao and snorkel, a well-reviewed shared day trip is enough.",
      },
      {
        question: "Yacht day or private charter?",
        answer:
          "The beach-house day is a premium Klein Curaçao landing (the boat may still be small-group). The 38ft is a yacht you charter. Compare both if you want more than a packed catamaran.",
      },
    ],
  },
  {
    slug: "klein-curacao-powerboat-tours",
    title: "Klein Curaçao Powerboat Tours",
    description:
      "Klein Curaçao powerboat tours from Curaçao. Faster crossings, more spray and a high-energy way to reach the uninhabited island. Compare powerboat adventures and book.",
    subPages: [
      { label: "Powerboat vs catamaran", href: "/klein-curacao-powerboat-tours/powerboat-vs-catamaran" },
      { label: "Who powerboats are for", href: "/klein-curacao-powerboat-tours/who-powerboats-are-for" },
      { label: "Seasickness and the crossing", href: "/klein-curacao-powerboat-tours/seasickness-and-the-crossing" },
      { label: "Time on the island", href: "/klein-curacao-powerboat-tours/time-on-the-island" },
      { label: "What to wear on a powerboat", href: "/klein-curacao-powerboat-tours/what-to-wear" },
      { label: "Booking a Klein Curaçao powerboat", href: "/klein-curacao-powerboat-tours/how-to-book" },
    ],
    relatedSlugs: ["klein-curacao-tours", "klein-curacao-day-trips", "klein-curacao-private-luxury"],
    about:
      "A Klein Curaçao powerboat tour trades the slow catamaran sail for speed. You get a shorter crossing, more wind and spray, and a smaller-boat feel. It is the right call if you want to maximise time on the island or simply prefer a faster, more adventurous ride. It is the wrong call if you want a stable, social sail with a big sun deck and open bar as the main event.",
    insiderTips: [
      "Powerboats feel every wave. If you get seasick, a catamaran is usually kinder.",
      "Hold on, wear a strap for glasses, and do not bring loose hats.",
      "Faster crossing means more hours on Klein Curaçao — useful if the lighthouse walk matters to you.",
      "Confirm whether snorkel stops are on the island reef, the wreck, or both.",
    ],
    whatToExpect: [
      "Safety briefing and life jackets on a smaller, faster boat.",
      "A quicker, bumpier crossing than a catamaran.",
      "Landing or anchoring at Klein Curaçao for beach and snorkel time.",
      "Return ride that can feel sportier if the afternoon wind is up.",
    ],
    whoIsThisFor: [
      "Adrenaline-leaning travelers who enjoy speedboats more than sailing.",
      "Guests who want a shorter crossing and more time on Klein Curaçao.",
      "Smaller groups who prefer a less crowded boat.",
      "Anyone who has already done a catamaran and wants a different way back to the island.",
    ],
    highlights: [
      "Faster Klein Curaçao crossing than a catamaran",
      "Powerboat adventure feel — spray, speed, smaller group",
      "More island time for snorkeling and the lighthouse",
      "A distinct alternative to shared sailing day trips",
    ],
    faqs: [
      {
        question: "How long is the powerboat ride to Klein Curaçao?",
        answer:
          "Often around 45 minutes each way, depending on sea state and the specific boat — shorter than most catamarans. Confirm on your product.",
      },
      {
        question: "Is a Klein Curaçao powerboat suitable for beginners?",
        answer:
          "You do not drive the boat; the crew does. You need to be comfortable with speed, spray and a bumpier ride. First-timers who dislike rough water should choose a catamaran.",
      },
      {
        question: "Powerboat or catamaran for Klein Curaçao?",
        answer:
          "Catamaran: stability, space, social vibe, lunch on a big deck. Powerboat: speed, smaller group, more time on the island. Pick based on comfort, not just price.",
      },
      {
        question: "Can children go on a Klein Curaçao powerboat?",
        answer:
          "Some operators set minimum ages or heights. The ride is more intense than a catamaran. Check the listing before booking with kids.",
      },
      {
        question: "Will I stay dry?",
        answer:
          "Unlikely. Expect spray. Wear swimwear or quick-dry clothes and protect phones in a dry bag.",
      },
    ],
  },
  {
    slug: "klein-curacao-private-luxury",
    title: "Klein Curaçao Private and Luxury Tours",
    description:
      "Private Klein Curaçao boat trips and luxury yacht charters from Curaçao. Full-day private boats and exclusive 38ft yachts that land on the uninhabited island. Compare and book.",
    subPages: [
      { label: "Full-day private Klein Curaçao boats", href: "/klein-curacao-private-luxury/full-day-private-boats" },
      { label: "Exclusive yacht charters", href: "/klein-curacao-private-luxury/exclusive-yacht-charters" },
      { label: "Full-day vs 38ft yacht", href: "/klein-curacao-private-luxury/luxury-private-boat-days" },
      { label: "Private vs shared Klein Curaçao", href: "/klein-curacao-private-luxury/private-vs-shared" },
      { label: "Wreck and lighthouse on a private day", href: "/klein-curacao-private-luxury/spanish-water-and-wreck" },
      { label: "Who should book a private charter", href: "/klein-curacao-private-luxury/who-should-book-private" },
    ],
    relatedSlugs: ["klein-curacao-tours", "klein-curacao-yacht-tours", "klein-curacao-day-trips"],
    about:
      "Private and luxury Klein Curaçao options mean the boat is yours. You set the pace, choose how long to snorkel, and avoid a 50-person catamaran playlist. Products here are a full-day private boat dedicated to Klein Curaçao, and an exclusive 38ft yacht charter to the same island. This is the category for proposals, family charters and anyone who wants Klein Curaçao without sharing the day.",
    insiderTips: [
      "Private charters are priced per boat, not always per person — split the cost in a group of 6–10 and it can rival “premium shared” per head.",
      "Confirm fuel, food, crew and snorkel gear are included so the quote is real.",
      "Tell the captain if the lighthouse walk or wreck snorkel is a must — private days can prioritise it.",
    ],
    whatToExpect: [
      "A planning chat or briefing on itinerary, sea conditions and your priorities.",
      "Your own vessel and crew for the day (or the exclusive charter window).",
      "Flexible time at Klein Curaçao for snorkel, beach and the lighthouse.",
      "Return on your schedule within the booked hours and weather limits.",
    ],
    whoIsThisFor: [
      "Families and friend groups who want the boat to themselves.",
      "Couples booking a once-in-a-trip Klein Curaçao day.",
      "Guests who need flexible timing around a cruise or event.",
      "Travelers who have done a shared catamaran and want the upgrade.",
    ],
    highlights: [
      "Full-day private boat to Klein Curaçao",
      "Exclusive 38ft yacht charter on Klein Curaçao",
      "Your pace, your playlist, your snorkel stops",
    ],
    faqs: [
      {
        question: "How much is a private Klein Curaçao boat?",
        answer:
          "Private days cost more than a shared ticket but are priced per boat. Split among a group and the per-person price can be reasonable. Check current quotes on each product.",
      },
      {
        question: "Do these private tours go to Klein Curaçao?",
        answer:
          "Yes. Cur365 only lists private products whose itinerary is Klein Curaçao — a full-day private boat and an exclusive 38ft yacht charter. We do not list Spanish Water or coastal-only yachts here.",
      },
      {
        question: "How many people can join a private charter?",
        answer:
          "It depends on the vessel — often 6–12 for a 38ft yacht, more on larger boats. The listing states capacity.",
      },
      {
        question: "Is food included on private Klein Curaçao charters?",
        answer:
          "Some include catering; others are BYO or a catering add-on. Read inclusions and ask if you need a specific menu.",
      },
      {
        question: "Can we change the route on the day?",
        answer:
          "Within weather, time and safety limits, yes — that is the point of private. Captains will not run unsafe crossings.",
      },
      {
        question: "Private charter or exclusive beach-house day?",
        answer:
          "Private charter = your boat. Beach-house day = premium landing and shade on the island, which may still be a small-group product. Choose boat privacy vs island exclusivity — or look for products that combine both.",
      },
    ],
  },
];
