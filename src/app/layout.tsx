import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clearforge.ai"),
  title: {
    default: "ClearForge.ai — Strategy that ships. AI that performs.",
    template: "%s | ClearForge.ai",
  },
  description:
    "ClearForge helps CEOs, PE operating partners, and owner-led companies turn AI into measurable operating performance, including businesses in the $2M-$15M seller-earnings range.",
  openGraph: { type: "website", locale: "en_US", siteName: "ClearForge.ai" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-midnight"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
