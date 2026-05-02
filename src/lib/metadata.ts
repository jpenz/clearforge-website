import type { Metadata } from 'next';

const siteUrl = 'https://clearforge.ai';
const siteName = 'ClearForge.ai';
const titleBrandSuffix = ' | ClearForge';

export const coreKeywords = [
  'AI consulting',
  'AI strategy consulting',
  'AI agent design and build',
  'managed AI operations',
  'legacy system modernization',
  'AI marketing and revenue operations',
  'industry AI transformation',
  'AI value gap',
];

export function createMetadata({
  title,
  description,
  path = '',
  noIndex = false,
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  keywords?: string[];
}): Metadata {
  const url = `${siteUrl}${path}`;
  const mergedKeywords = [...new Set([...coreKeywords, ...keywords])];
  const normalizedTitle = title.endsWith(titleBrandSuffix)
    ? title.slice(0, -titleBrandSuffix.length)
    : title;

  return {
    title: normalizedTitle,
    description,
    keywords: mergedKeywords,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: normalizedTitle,
      description,
      url,
      siteName,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: normalizedTitle,
      description,
    },
  };
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#organization`,
  name: 'ClearForge',
  alternateName: 'ClearForge AI',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: 600,
    height: 200,
  },
  image: `${siteUrl}/og-default.png`,
  description:
    'ClearForge is an AI consulting firm that diagnoses where mid-market and growth-stage companies should win with AI, builds the production systems to execute, and operates them continuously. Forge Diagnostic, Sprint, and Scale offerings from $15K to ongoing engagements.',
  priceRange: '$15,000 - $200,000',
  founder: {
    '@type': 'Person',
    name: 'James Penz',
    jobTitle: 'Founder & Managing Partner',
    sameAs: ['https://www.linkedin.com/in/jamesrpenz/'],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'james@clearforge.ai',
    contactType: 'sales',
    areaServed: 'US',
    availableLanguage: ['en'],
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'MI',
    addressCountry: 'US',
    addressLocality: 'Sterling Heights',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  serviceType: [
    'AI Strategy Consulting',
    'AI Agent Development',
    'Custom AI Automation',
    'AI Revenue Operations',
    'PE Portfolio Value Creation',
    'Performance Improvement',
  ],
  knowsAbout: [
    'AI agents',
    'AI automation',
    'AI strategy',
    'production AI systems',
    'AI value creation',
    'AI implementation',
    'mid-market AI consulting',
  ],
  sameAs: ['https://www.linkedin.com/company/clearforge-ai/'],
};

export function industryServiceJsonLd(industry: {
  name: string;
  shortName: string;
  slug: string;
  oneLiner: string;
  hero: string;
  category: string;
  valueChain: { function: string; activities: { name: string }[] }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI Agents & Automation for ${industry.name}`,
    serviceType: `AI consulting for ${industry.name}`,
    description: industry.hero,
    category: industry.category,
    provider: {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
      name: 'ClearForge',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: {
      '@type': 'BusinessAudience',
      name: `${industry.shortName} operators (mid-market and growth-stage)`,
    },
    url: `${siteUrl}/industries/${industry.slug}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${industry.name} AI value chain`,
      itemListElement: industry.valueChain.map((fn, i) => ({
        '@type': 'OfferCatalog',
        position: i + 1,
        name: fn.function,
        numberOfItems: fn.activities.length,
        itemListElement: fn.activities.map((act, j) => ({
          '@type': 'Offer',
          position: j + 1,
          name: act.name,
          category: fn.function,
        })),
      })),
    },
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  slug?: string;
  path?: string;
}) {
  const servicePath = service.path ?? (service.slug ? `/services/${service.slug}` : '/services');

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'ClearForge',
      url: siteUrl,
    },
    url: `${siteUrl}${servicePath}`,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `${siteUrl}/insights/${article.slug}`,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ClearForge',
      url: siteUrl,
    },
  };
}
