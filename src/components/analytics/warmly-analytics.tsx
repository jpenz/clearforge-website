import Script from 'next/script';

export function WarmlyAnalytics({ clientId }: { clientId: string }) {
  const trimmedClientId = clientId.trim();
  if (!trimmedClientId) return null;

  return (
    <Script
      id="warmly-script-loader"
      src={`https://opps-widget.getwarmly.com/warmly.js?clientId=${encodeURIComponent(trimmedClientId)}`}
      strategy="afterInteractive"
    />
  );
}
