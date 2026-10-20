import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/data/site';

// Display face: Newsreader (the brand's proven serif; Bodoni's hairline
// strokes were hard to read at display sizes, owner call 2026-08-18).
// Variable name kept so the token layer is untouched.
//
// Both faces are the Google Fonts files, self-hosted after
// scripts/subset-fonts.py clips each weight axis to the weights the site
// renders and keeps ASCII plus the punctuation in use. These preloaded files
// are about half the size of Google's; the rest of Latin sits in -ext files
// declared in globals.css, fetched only when a page renders such a character.
// A new weight outside these ranges renders at the nearest end: widen the
// range in the script and rerun it.
const bodoni = localFont({
  src: [
    { path: './fonts/newsreader-roman.woff2', weight: '400 500', style: 'normal' },
    { path: './fonts/newsreader-italic.woff2', weight: '300 500', style: 'italic' },
  ],
  variable: '--font-bodoni',
  adjustFontFallback: 'Times New Roman',
  declarations: [
    { prop: 'font-family', value: 'Newsreader' },
    {
      prop: 'unicode-range',
      value:
        'U+0020-007E, U+00A0, U+00A9, U+00AE, U+00B0, U+00B7, U+00D7, U+2010-2011, U+2013-2014, U+2018-2019, U+201C-201D, U+2022, U+2026, U+2032-2033, U+20AC, U+2122, U+2190-2193, U+2212, U+2248, U+2264-2265',
    },
  ],
});

const hanken = localFont({
  src: './fonts/hanken-grotesk.woff2',
  weight: '300 700',
  variable: '--font-hanken',
  declarations: [
    { prop: 'font-family', value: 'Hanken Grotesk' },
    {
      prop: 'unicode-range',
      value:
        'U+0020-007E, U+00A0, U+00A9, U+00AE, U+00B0, U+00B7, U+00D7, U+2010-2011, U+2013-2014, U+2018-2019, U+201C-201D, U+2022, U+2026, U+2032-2033, U+20AC, U+2122, U+2190-2193, U+2212, U+2248, U+2264-2265',
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'We find the jobs in your company that AI can do, build the AI to do them, and stay until your people use it. For companies with $20 million to $500 million in yearly sales, and the private equity firms that own them. It starts with a two-week review at one fixed price.',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const gaId = (
    process.env.NEXT_PUBLIC_GA_ID ??
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ??
    ''
  ).trim();
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-cobalt focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
