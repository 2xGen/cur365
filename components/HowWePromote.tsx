"use client";

const benefits = [
  {
    title: "SEO & Content Exposure",
    description:
      "We create Klein Curaçao category pages and comparison guides targeting searches like “Klein Curaçao tours,” “Klein Curaçao day trip,” “Klein Curaçao yacht,” and “Klein Curaçao powerboat.”",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    color: "text-cur-coral",
    bg: "bg-amber-50",
    border: "border-cur-coral/20",
  },
  {
    title: "Strategic Placement",
    description:
      "Your tour appears in curated categories, featured recommendations, and high-visibility comparison pages across the site.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l7.5-4.314m-7.5 4.314l7.5 4.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186m0 0l-7.5-4.314m7.5 4.314l-7.5-4.314" />
      </svg>
    ),
    color: "text-cur-blue",
    bg: "bg-cyan-50",
    border: "border-cur-blue/20",
  },
  {
    title: "Direct Booking Integration",
    description:
      "We drive bookings through your Viator listings or approved booking channels—exposure without added complexity.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    color: "text-cur-coral",
    bg: "bg-amber-50",
    border: "border-cur-coral/20",
  },
  {
    title: "Email & Trip Planning Promotion",
    description:
      "Your tours are featured in curated itineraries, planning guides, and subscriber updates—keeping you top of mind during trip planning.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: "text-cur-blue",
    bg: "bg-cyan-50",
    border: "border-cur-blue/20",
  },
];

export function HowWePromote() {
  return (
    <section
      id="partner"
      className="relative py-20 lg:py-28 bg-slate-50/80 bg-section-gradient"
      aria-labelledby="how-we-promote-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="how-we-promote-heading"
          className="font-display font-bold text-3xl sm:text-4xl text-slate-900 text-center mb-2"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          Partner <span className="text-cur-coral">With Us</span>
        </h2>
        <h3 className="font-display font-semibold text-xl sm:text-2xl text-slate-800 text-center mb-4" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
          How We Promote Tour Businesses
        </h3>
        <p className="text-slate-600 text-center max-w-3xl mx-auto mb-4 text-lg leading-relaxed">
          Cur365 is built on the success of <strong className="text-slate-800">CuraçaoBuddies</strong>. With 4+ years of experience and more than 10,000 monthly visitors, we understand what travelers search for—and what they book.
        </p>
        <p className="text-slate-600 text-center max-w-3xl mx-auto mb-14">
          Cur365 is the next evolution: a platform fully focused on <strong className="text-slate-800">Klein Curaçao tours from Curaçao</strong>.
        </p>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 font-medium">
          Here’s how we help you get found and booked:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((item, i) => (
            <div
              key={i}
              className={`${item.bg} border ${item.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}
            >
              <div className={`${item.color} mb-4`}>{item.icon}</div>
              <h4 className="font-semibold text-slate-900 text-lg mb-2">{item.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
