import type { Metadata } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clearforge.ai"),
  title: {
    default: "ClearForge.ai — Strategy that ships. AI that performs.",
    template: "%s | ClearForge.ai",
  },
  description:
    "ClearForge combines management consulting rigor with hands-on AI engineering to deliver measurable results for mid-market companies and PE portfolio companies.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ClearForge.ai",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSerif.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-full bg-molten-amber px-4 py-2 text-sm font-medium text-forge-navy transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
