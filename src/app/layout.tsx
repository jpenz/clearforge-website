import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { AnalyticsTracker } from '@/components/analytics/analytics-tracker';
import { Footer } from '@/components/layout/footer';
import { ForgeBar } from '@/components/layout/forge-bar';
import { Header } from '@/components/layout/header';
import { LenisProvider } from '@/components/layout/lenis-provider';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { coreKeywords, organizationJsonLd } from '@/lib/metadata';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://clearforge.ai'),
  title: {
    default: 'ClearForge — AI Strategy & Execution for Mid-Market Companies',
    template: '%s | ClearForge',
  },
  description:
    'We find where AI drives growth, build the systems, and get your people to actually use them. Strategy through production — one partner, no handoffs.',
  keywords: coreKeywords,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ClearForge',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'ClearForge — AI Strategy & Execution',
      },
    ],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og-image.webp'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <JsonLdScript data={organizationJsonLd} />
        <AnalyticsTracker />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brass focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <LenisProvider>
          <main id="main-content">{children}</main>
          <Footer />
          <ForgeBar />
        </LenisProvider>
      </body>
    </html>
  );
}
