"use client";

const guides = [
  { name: "How to Get to Klein Curaçao", icon: "chart" },
  { name: "Best Klein Curaçao Day Trips", icon: "mask" },
  { name: "Catamaran vs Powerboat", icon: "jeep" },
  { name: "Yacht and Beach-House Days", icon: "sun" },
  { name: "Private vs Shared Klein Curaçao", icon: "scale" },
  { name: "Sunset After a Klein Curaçao Day", icon: "list" },
];

function GuideIcon({ icon }: { icon: string }) {
  const c = "w-5 h-5 text-aru-cyan";
  if (icon === "chart") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>;
  if (icon === "mask") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
  if (icon === "jeep") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-4 2v6m-3-6v6h6v-6m4 0v6h2v-4a2 2 0 00-2-2h-2v6" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 10V8a2 2 0 012-2h12a2 2 0 012 2v2M4 10h16v8H4v-8z" /></svg>;
  if (icon === "sun") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
  if (icon === "scale") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-3 9" /></svg>;
  return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
}

export function ComparisonsGuides() {
  return (
    <section
      className="py-20 lg:py-28 bg-white"
      aria-labelledby="comparisons-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id="comparisons-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-slate-900"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
          >
            Smart <span className="text-aru-cyan">comparisons</span> &amp; guides
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            In-depth guides to help you choose the right experience for your style, group, and budget.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {guides.map((g, i) => (
            <div
              key={g.name}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-aru-cyan/30 hover:-translate-y-0.5"
            >
              <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-aru-cyan/10 text-aru-cyan flex items-center justify-center">
                <GuideIcon icon={g.icon} />
              </span>
              <span className="font-medium text-slate-800">{g.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
