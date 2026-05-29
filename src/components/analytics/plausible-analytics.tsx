import Script from 'next/script';

type PlausibleAnalyticsProps = {
  domain: string;
};

export function PlausibleAnalytics({ domain }: PlausibleAnalyticsProps) {
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.tagged-events.outbound-links.js"
      strategy="afterInteractive"
    />
  );
}
