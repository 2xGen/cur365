"use client";

const categories = [
  "Klein Curaçao day trips",
  "Sailing catamaran tours",
  "Yacht and beach-house days",
  "Powerboat adventures",
  "Private and luxury charters",
  "Lighthouse and wreck snorkeling",
  "Snorkeling and wreck stops",
  "Cruise-passenger full days",
  "How to get to Klein Curaçao",
];

export function FindBestTours() {
  return (
    <section
      id="tours"
      className="relative py-20 lg:py-28 bg-slate-50/80 bg-section-gradient"
      aria-labelledby="find-tours-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="find-tours-heading"
          className="font-display font-bold text-3xl sm:text-4xl text-slate-900 text-center mb-4"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Find the Best <span className="text-cur-coral">Klein Curaçao</span> Tours
        </h2>
        <p className="text-slate-600 text-center max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
          Whether you want a shared catamaran day trip, a faster powerboat, an exclusive beach-house landing or a private yacht, Cur365 compares the boats that actually land on Klein Curaçao.
        </p>
        <p className="text-slate-600 text-center max-w-3xl mx-auto mb-14">
          Klein Curaçao has no ferry. Every visit is a boat tour from Curaçao. We organise those tours by style so you can compare crossing time, group size, lunch and price:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {categories.map((name, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:shadow-md transition-shadow text-slate-700 font-medium"
            >
              {name}
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mt-10">
          Each category highlights well-booked Klein Curaçao experiences so you can compare options and book with free cancellation on most tours.
        </p>
      </div>
    </section>
  );
}
