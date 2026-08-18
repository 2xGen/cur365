"use client";

const features = [
  {
    title: "Only Klein Curaçao",
    body: "A specialized platform for Klein Curaçao boat tours from Curaçao — not a generic island directory.",
    icon: "pin",
  },
  {
    title: "Trusted resource",
    body: "A structured, easy-to-use place to compare Klein Curaçao day trips, yachts, powerboats and private charters.",
    icon: "check",
  },
  {
    title: "Search intent first",
    body: "We connect you with the experiences you're actually searching for, without the noise.",
    icon: "search",
  },
];

function FeatureIcon({ icon }: { icon: string }) {
  const c = "w-6 h-6";
  if (icon === "pin") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  if (icon === "check") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
}

export function PlatformFocused() {
  return (
    <section
      className="py-20 lg:py-28 bg-slate-100"
      aria-labelledby="platform-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="platform-heading"
          className="font-display font-bold text-3xl sm:text-4xl text-slate-900 text-center mb-14"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          A platform <span className="text-aru-orange">focused</span> on Klein Curaçao
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-8 text-center transition-all duration-300 hover:border-aru-orange/50 hover:bg-orange-50/30 hover:shadow-lg"
            >
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-aru-orange/10 text-aru-orange mb-5">
                <FeatureIcon icon={f.icon} />
              </span>
              <h3 className="font-display font-semibold text-lg text-slate-900 mb-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
