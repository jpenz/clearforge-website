import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[100] -translate-y-full rounded-lg bg-blue px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
