"use client";

const tourBenefits = [
  "Strategic placement in optimized tour categories",
  "Exposure on “best tours” comparison pages",
  "Dedicated tour landing page opportunities",
  "Increased bookings from high-intent visitors",
  "No extra workload to maintain listings",
];

export function PartnerSections() {
  return (
    <section
      className="relative py-20 lg:py-28 bg-white"
      aria-labelledby="partner-sections-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="partner-sections-heading"
          className="font-display font-bold text-3xl sm:text-4xl text-slate-900 text-center mb-4"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          How <span className="text-cur-blue">Cur365</span> Helps Your Business
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-14">
          We focus on what converts: tours and experiences.
        </p>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {/* Tours & Excursions — Primary */}
          <div className="bg-cyan-50 border border-cur-blue/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              Tours & <span className="text-cur-blue">Excursions</span> <span className="text-slate-500 font-normal text-sm">(Primary Focus)</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Work directly with your existing booking system or Viator listings to gain strategic exposure on a platform built exclusively around Curaçao tours.
            </p>
            <p className="text-slate-700 font-medium text-sm mb-2">What you get:</p>
            <ul className="space-y-1.5 text-slate-600 text-sm mb-6">
              {tourBenefits.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-cur-blue shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-white bg-cur-blue hover:bg-cur-blue-dark text-sm transition-colors"
            >
              Partner Your Tour
            </a>
          </div>

          {/* Restaurants — Launching Soon */}
          <div className="bg-amber-50/70 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              Restaurants & <span className="text-cur-coral">Dining</span> <span className="text-slate-500 font-normal text-sm">(Launching Soon)</span>
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Restaurant partnerships will open in Phase 2 of Cur365. We’re currently prioritizing tours and excursions to build Curaçao’s leading experience platform.
            </p>
            <p className="text-slate-600 text-sm mb-6">
              Interested in early access for restaurant partnerships? Reach out below.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-slate-700 bg-white border-2 border-slate-300 hover:border-cur-coral hover:text-cur-coral text-sm transition-colors"
            >
              Join Restaurant Waitlist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
