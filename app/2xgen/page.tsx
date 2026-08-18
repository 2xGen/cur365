import Link from "next/link";
import type { Metadata } from "next";

const DEFAULT_OG_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/cur365/cur365%20tours%20and%20excursions%20in%20curacao.png";

export const metadata: Metadata = {
  title: "2xGen LLC – Next-gen digital platforms",
  description:
    "2xGen builds and operates digital platforms: Tyo365, Prg365, Aru365, Lon365, Cur365, TopTours.ai, ArubaBuddies, FactuurBaas, OneHappyFinance, AruList, and more.",
  openGraph: {
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Cur365 – Tours and excursions in Curaçao" }],
  },
};

const platforms = [
  {
    name: "Tyo365",
    description: "Best tours and experiences in Tokyo – compare, browse, and book",
    url: "https://tyo365.com",
    domain: "tyo365.com",
  },
  {
    name: "Prg365",
    description: "Best tours and experiences in Prague – compare, browse, and book",
    url: "https://prg365.com",
    domain: "prg365.com",
  },
  {
    name: "Lon365",
    description: "Best tours and experiences in London – compare, browse, and book",
    url: "https://lon365.com",
    domain: "lon365.com",
  },
  {
    name: "Aru365",
    description: "Best tours and experiences in Aruba – compare, browse, and book",
    url: "https://aru365.com",
    domain: "aru365.com",
  },
  {
    name: "Cur365",
    description: "Best tours and experiences in Curaçao – compare, browse, and book",
    url: "https://cur365.com",
    domain: "cur365.com",
  },
  {
    name: "TopTours.ai",
    description: "AI-powered discovery for global travel experiences",
    url: "https://toptours.ai",
    domain: "toptours.ai",
  },
  {
    name: "ArubaBuddies.com",
    description: "Curated local trip planning & itineraries",
    url: "https://arubabuddies.com",
    domain: "arubabuddies.com",
  },
  {
    name: "FactuurBaas",
    description: "Streamlined invoicing for freelancers & small businesses",
    url: "https://factuurbaas.nl",
    domain: "factuurbaas.nl",
  },
  {
    name: "OneHappyFinance",
    description: "Transparent, actionable financial information for the Caribbean",
    url: "https://onehappyfinance.com",
    domain: "onehappyfinance.com",
  },
  {
    name: "AruList",
    description: "Community-driven marketplace supporting sustainable second-hand commerce",
    url: "https://arulist.com",
    domain: "arulist.com",
  },
  {
    name: "TOF Sports",
    description: "Digital and physical ecosystem for youth tennis & padel development",
    url: "https://tofsports.nl",
    domain: "tofsports.nl",
  },
  {
    name: "MyGoProfile",
    description: "AI-driven local profile management for businesses",
    url: "https://mygoprofile.com",
    domain: "mygoprofile.com",
  },
];

export default function TwoXGenPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-cur-coral transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cur365
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-3xl">
        <h1
          className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mb-6"
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          <span className="text-cur-coral">2x</span>Gen
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-12">
          2xGen builds and operates digital platforms that combine strategic positioning, scalable architecture, and measurable impact.
        </p>
        <div className="space-y-8">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="font-semibold text-slate-900 text-xl mb-1">{p.name}</h2>
              <p className="text-slate-600 text-sm mb-4">{p.description} ({p.domain})</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cur-blue font-medium hover:text-cur-blue-dark transition-colors"
              >
                Visit {p.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        <p className="mt-14 text-slate-600 leading-relaxed border-t border-slate-200 pt-10">
          Each platform reflects our philosophy: strategic positioning, compounding digital leverage, and long-term impact.
        </p>
      </div>
    </main>
  );
}
