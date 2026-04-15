import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent clickjacking — no framing by third parties
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Block MIME-type sniffing attacks
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer info sent to third-party sites
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Force HTTPS for 2 years, include subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Restrict browser features/APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Content Security Policy — tightened for Next.js App Router + Supabase
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires 'unsafe-inline' for styles; nonce-based CSP is a future upgrade
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Allow scripts from self + Next.js inline scripts (required for hydration)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // API connections: Supabase, Resend webhook, self
      "connect-src 'self' https://*.supabase.co https://api.resend.com https://api.anthropic.com https://api.perplexity.ai",
      // Images: self + data URIs + Supabase storage
      "img-src 'self' data: blob: https://*.supabase.co",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  // Block XSS in older browsers
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Harden: prevent exposing Next.js version in response headers
  poweredByHeader: false,

  // Strict mode for React — catches double-render bugs in dev
  reactStrictMode: true,

  // Allow dev resources (HMR, /_next/image proxy, etc.) to be requested from
  // these hosts. Without this Next.js 16 blocks them as cross-origin and the
  // page partially loads on iPad / LAN devices.
  allowedDevOrigins: [
    "100.120.34.122", // tailscale (iPad)
    "192.168.68.65",  // local LAN
    "192.168.68.71",  // local LAN (alt)
    "localhost",
  ],

  // Next.js 16 requires all non-default quality values to be whitelisted.
  // 65 is used for decorative atmospheric bg images on industry hero sections.
  images: {
    qualities: [65, 75],
  },
};

export default nextConfig;
