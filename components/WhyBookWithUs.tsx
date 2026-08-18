"use client";

const points = [
  {
    title: "Best price",
    body: "We compare Klein Curaçao operators so you get great value. Book with confidence.",
    icon: "price",
  },
  {
    title: "Free cancellation",
    body: "Most tours offer free cancellation up to 24 hours before. Flexible plans.",
    icon: "cancel",
  },
  {
    title: "Verified reviews",
    body: "Real traveler reviews and ratings. Choose the Klein Curaçao boat others loved.",
    icon: "star",
  },
];

function Icon({ name }: { name: string }) {
  const c = "w-6 h-6";
  if (name === "price") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  if (name === "cancel") return <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
  return <svg className={c} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}

export function WhyBookWithUs() {
  return (
    <section
      className="py-16 lg:py-20 bg-white"
      aria-labelledby="why-book-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="why-book-heading" className="font-display font-bold text-2xl sm:text-3xl text-slate-900 text-center mb-10" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
          Why book with us
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {points.map((p) => (
            <div key={p.title} className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-aru-cyan/10 text-aru-cyan mb-4">
                <Icon name={p.icon} />
              </span>
              <h3 className="font-display font-semibold text-lg text-slate-900 mb-2" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>{p.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
