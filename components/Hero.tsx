"use client";

export function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden bg-white"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-dots-subtle pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-cur-blue font-medium text-sm uppercase tracking-widest opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            Book Klein Curaçao tours from Curaçao
          </p>
          <h1
            className="mt-3 font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 tracking-tight opacity-0 animate-fade-in-up"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif", animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <span className="text-cur-coral">Cur</span>
            <span className="text-cur-blue">365</span>
            <br />
            <span className="block mt-2 text-3xl sm:text-4xl md:text-5xl font-medium text-slate-700 tracking-wide" style={{ fontFamily: "var(--font-tagline), Georgia, serif" }}>
              Find &amp; book Klein Curaçao tours
            </span>
          </h1>
          <p
            className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            Day trips, yachts, powerboats and private charters to the uninhabited island. Compare boats that actually land on Klein Curaçao.
          </p>
          <div
            className="mt-10 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <a
              href="#top-picks"
              className="btn-lift inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-cur-coral hover:bg-cur-coral-dark shadow-lg shadow-cur-coral/20 min-w-[220px]"
            >
              Find Klein Curaçao tours
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
