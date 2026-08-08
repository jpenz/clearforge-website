import Script from 'next/script';

type GoogleAnalyticsProps = {
  measurementId: string;
};

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  // Trim defensively: a stray newline in the env var (e.g. `echo` piped into
  // `vercel env add`) lands inside the quoted string below and makes the whole
  // inline snippet a SyntaxError, killing gtag and throwing on every page.
  const id = measurementId.trim();
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="clearforge-ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
