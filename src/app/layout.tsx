import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/data/site";

// Display face: Newsreader (the brand's proven serif; Bodoni's hairline
// strokes were hard to read at display sizes, owner call 2026-08-18).
// Variable name kept so the token layer is untouched.
const bodoni = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Founder-led AI consulting and build firm for mid-market companies, $20M to $500M revenue, and PE operating teams. Engagements start with a fixed-fee two-week diagnostic.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = (process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "").trim();
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
