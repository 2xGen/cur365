import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions | Cur365",
  description:
    "Terms and conditions for using Cur365. We are an affiliate platform; we do not process bookings or personal data. Bookings are made with Viator.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <h1
              className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              Terms and Conditions
            </h1>
            <p className="mt-2 text-slate-500 text-sm">Last updated: March 2026</p>

            <div className="mt-10 prose prose-slate max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. About Cur365</h2>
                <p className="text-slate-600 leading-relaxed">
                  Cur365 is an informational and affiliate website that helps visitors discover and compare Klein Curaçao
                  tours from Curaçao. We are owned and operated by 2xGen LLC. We do not offer user accounts or sign-up
                  functionality. We do not collect or process your personal information for account purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. We do not handle bookings</h2>
                <p className="text-slate-600 leading-relaxed">
                  All tours and experiences shown on Cur365 are offered by third-party operators. When you choose to
                  book, you are redirected to our affiliate partner Viator (or the relevant operator’s booking channel).
                  We do not process, store, or handle any bookings ourselves. Any booking you make is subject to the
                  terms and policies of the booking provider (e.g. Viator and the tour operator).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Affiliate relationship</h2>
                <p className="text-slate-600 leading-relaxed">
                  We are an official Viator affiliate partner. The tours displayed on Cur365 are sourced from Viator’s
                  catalogue. We may earn a commission when you book through links on our site, at no extra cost to you.
                  This does not affect how we present or recommend tours. Our affiliate status does not make us the
                  seller or provider of any tour; the contract for the experience is between you and the operator or
                  Viator.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. No liability for tours or experiences</h2>
                <p className="text-slate-600 leading-relaxed">
                  We are not a tour operator and do not run any tours or experiences. We are not responsible for: the
                  quality, safety, or conduct of any tour or activity; any injury, loss, or damage you may suffer
                  during or in connection with a tour; cancellations, no-shows, or changes made by operators or Viator;
                  or any disputes between you and the operator or booking provider. All such matters are solely between
                  you and the relevant operator or Viator. We encourage you to read the operator’s and Viator’s terms
                  and cancellation policies before booking.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Use of the website</h2>
                <p className="text-slate-600 leading-relaxed">
                  You may use Cur365 for personal, non-commercial purposes to browse and find information about Klein
                  Curaçao tours. You may not scrape, copy, or misuse our content or systems. We strive to keep information
                  accurate but do not guarantee that all content is error-free or up to date at all times.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">6. Cookies and analytics</h2>
                <p className="text-slate-600 leading-relaxed">
                  Cur365 uses essential cookies so the site can function (for example remembering your cookie choice).
                  If you click Accept all, we also load Vercel Analytics to count page views. That script is not loaded
                  until you consent. Analytics is used to understand which pages are visited; it is not used for
                  advertising. You can switch to essential-only cookies at any time via Cookie preference in the footer.
                  Bookings are handled by Viator; their cookies and privacy policy apply once you leave Cur365.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">7. Contact</h2>
                <p className="text-slate-600 leading-relaxed">
                  For questions about these terms or about Cur365, you can contact us at{" "}
                  <a href="mailto:matthijs@2xgen.com" className="text-cur-blue hover:underline">
                    matthijs@2xgen.com
                  </a>
                  .
                </p>
              </section>
            </div>

            <p className="mt-10">
              <Link href="/" className="text-cur-blue hover:text-cur-blue-dark font-medium">
                ← Back to home
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
