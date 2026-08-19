import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // 2 years, ready for preload submission once the apex is verified
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // We embed Cal.com; nothing embeds us
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    // Ported from the V11 config (proven against this exact Cal.com + GA
    // stack in production). Nonce-based CSP stays a future upgrade; Next
    // needs 'unsafe-inline' for hydration and styles.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      process.env.NODE_ENV === "production"
        ? "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://app.cal.com https://cal.com"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://app.cal.com https://cal.com",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://app.cal.com https://api.cal.com https://cal.com",
      "img-src 'self' data: blob: https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://app.cal.com https://cal.com",
      "frame-src 'self' https://app.cal.com https://cal.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    // 301s for URLs consolidated in the V12 redesign (KOMBAI_BRIEF.md appendix)
    return [
      { source: "/operating-model", destination: "/services", permanent: true },
      { source: "/use-cases", destination: "/services", permanent: true },
      { source: "/how-we-work", destination: "/services", permanent: true },
      { source: "/private-equity", destination: "/services", permanent: true },
      { source: "/pe", destination: "/services", permanent: true },
      { source: "/quiz", destination: "/scorecard", permanent: true },
      { source: "/scorecard/results", destination: "/scorecard", permanent: true },
      { source: "/tools", destination: "/discover", permanent: true },
      { source: "/forge-intelligence", destination: "/discover", permanent: true },
      // Legacy V11 library URLs (indexed in GSC) onto their V12 homes
      { source: "/case-studies", destination: "/proof", permanent: true },
      {
        source: "/case-studies/industrial-manufacturer",
        destination: "/proof/industrial-conglomerate",
        permanent: true,
      },
      {
        source: "/case-studies/home-services-turnaround",
        destination: "/proof/services-firm",
        permanent: true,
      },
      {
        source: "/case-studies/pe-portfolio-diagnostic-plan",
        destination: "/proof/pe-portfolio-diagnostic",
        permanent: true,
      },
      { source: "/blueprints", destination: "/proof", permanent: true },
      { source: "/blueprints/:slug", destination: "/proof", permanent: true },
      { source: "/services/:slug", destination: "/services", permanent: true },
      { source: "/use-cases/:slug", destination: "/services", permanent: true },
      { source: "/security", destination: "/services", permanent: true },
      {
        // V12 preview slug that was consolidated onto the indexed legacy slug
        source: "/industries/industrial-manufacturing",
        destination: "/industries/manufacturing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
