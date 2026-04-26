import type { MetadataRoute } from 'next';

/**
 * robots.txt — allow major search bots and AI crawlers.
 * AI crawlers are opted in to enable citation in ChatGPT/Claude/Perplexity
 * answers, which now drive a meaningful share of B2B research traffic.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'Googlebot', allow: '/', disallow: ['/api/', '/_next/'] },
      { userAgent: 'Bingbot', allow: '/', disallow: ['/api/', '/_next/'] },
      { userAgent: 'DuckDuckBot', allow: '/', disallow: ['/api/', '/_next/'] },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Claude-Web', allow: '/', disallow: ['/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Applebot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'meta-externalagent', allow: '/', disallow: ['/api/'] },
      { userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] },
    ],
    sitemap: 'https://clearforge.ai/sitemap.xml',
    host: 'https://clearforge.ai',
  };
}
