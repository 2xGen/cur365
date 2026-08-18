import type { Metadata } from "next";
import { Outfit, DM_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { CookieConsentProvider } from "@/components/CookieConsentContext";
import { ConsentAnalytics } from "@/components/ConsentAnalytics";
import { OG_IMAGE, SITE_URL, ogImages } from "@/lib/seo";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-tagline",
  display: "swap",
});

const defaultTitle = "Cur365 – Klein Curaçao Tours from Curaçao | Day Trips, Yachts, Powerboats";
const defaultDescription =
  "The Klein Curaçao experts. Compare and book day trips, yachts, powerboats and private charters that land on the uninhabited island — with free cancellation on most tours.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cur365",
  url: SITE_URL,
  logo: OG_IMAGE,
  description: defaultDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cur365",
  url: SITE_URL,
  description: defaultDescription,
  publisher: { "@type": "Organization", name: "Cur365", url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/klein-curacao-tours?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en",
    url: SITE_URL,
    siteName: "Cur365",
    title: defaultTitle,
    description: defaultDescription,
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen">
        <CookieConsentProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <Header />
          {children}
          <ConsentAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
