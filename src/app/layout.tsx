import type { Metadata } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ForgeBar } from '@/components/layout/forge-bar';
import { LenisProvider } from '@/components/layout/lenis-provider';
import { coreKeywords, organizationJsonLd } from '@/lib/metadata';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'ClearForge — AI Strategy & Execution' }],
  },
  twitter: { card: 'summary_large_image', images: ['/images/og-image.png'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ForgeBar />
        </LenisProvider>
      </body>
    </html>
  );
}
