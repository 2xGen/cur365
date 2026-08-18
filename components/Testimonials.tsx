"use client";

const offerings = [
  {
    title: "Top Tours & Excursions",
    description:
      "Curated Klein Curaçao day trips, yachts, powerboats and private charters—so travelers find the right boat and book with confidence.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "text-cur-blue",
    border: "border-cur-blue/20",
    bg: "bg-cyan-50",
  },
  {
    title: "Tour Comparisons & Guides",
    description:
      "We help travelers choose the right Klein Curaçao boat, not just any tour. Catamaran vs powerboat, shared vs private, beach-house vs packed landing—clear comparisons and honest itineraries.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    color: "text-cur-coral",
    border: "border-cur-coral/20",
    bg: "bg-amber-50",
  },
  {
    title: "Online Concierge",
    description:
      "Trip planning support and curated itineraries so guests make the most of their time in Curaçao.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: "text-cur-blue",
    border: "border-cur-blue/20",
    bg: "bg-cyan-50",
  },
  {
    title: "Built for Local Tour Operators",
    description:
      "A focused platform that increases visibility for Curaçao’s tour operators—without adding complexity to your day-to-day.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m10.5-18v18m-18-9h19.5M3.75 9h15M3.75 12h15m-12 4.5h15m-12 4.5h15" />
      </svg>
    ),
    color: "text-cur-coral",
    border: "border-cur-coral/20",
    bg: "bg-amber-50",
  },
];

export function Testimonials() {
  return (
    <section
      className="py-20 lg:py-28 bg-slate-50/80"
      aria-labelledby="what-we-offer-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="what-we-offer-heading"
          className="font-display font-bold text-3xl sm:text-4xl text-slate-900 text-center mb-4"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          What We <span className="text-cur-coral">Offer</span> Travelers
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-14">
          Cur365 is designed to become the most trusted source for booking Klein Curaçao tours from Curaçao.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {offerings.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} border ${item.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className={`${item.color} mb-4`}>{item.icon}</div>
              <h3 className="font-semibold text-slate-900 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
