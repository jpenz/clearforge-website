import type { Metadata } from 'next';

const siteUrl = 'https://clearforge.ai';
const siteName = 'ClearForge.ai';
const titleBrandSuffix = ' | ClearForge';
const defaultOgImage = {
  url: `${siteUrl}/images/og-image.webp`,
  width: 1200,
  height: 630,
  alt: 'ClearForge AI transformation systems',
};

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
    authors: [{ name: 'ClearForge' }],
    creator: 'ClearForge',
    publisher: 'ClearForge',
    category: 'AI transformation consulting',
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
      images: [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: normalizedTitle,
      description,
      images: [defaultOgImage.url],
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

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'ClearForge',
  alternateName: 'ClearForge.ai',
  url: siteUrl,
  inLanguage: 'en-US',
  description:
    'ClearForge helps business leaders set AI ambition, map the value chain, build custom agentic workflows, and train teams to operate them.',
  publisher: {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: 'ClearForge',
  },
};

export const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteUrl}/#site-navigation`,
  name: 'ClearForge primary pages',
  itemListElement: [
    { name: 'AI Operating Model', path: '/operating-model' },
    { name: 'Services', path: '/services' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'Industries', path: '/industries' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'AI Value Map', path: '/discover' },
  ].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: `${siteUrl}${item.path}`,
  })),
};

export const aiTransformationOfferCatalogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${siteUrl}/#ai-transformation-offers`,
  name: 'ClearForge AI Transformation Services',
  itemListElement: [
    {
      name: 'AI Strategy and Growth Diagnosis',
      description:
        'Executive AI ambition, value-chain mapping, business case development, and prioritized implementation roadmap.',
    },
    {
      name: 'Custom AI Agent Design and Build',
      description:
        'Production agents, workflows, integrations, dashboards, and human-in-the-loop controls built around the client operating model.',
    },
    {
      name: 'Managed AI Operations',
      description:
        'Ongoing adoption, quality monitoring, model improvement, KPI review, and optimization after launch.',
    },
    {
      name: 'AI Revenue Operations',
      description:
        'AI sales intelligence, pipeline acceleration, account prioritization, playbooks, and commercial performance analytics.',
    },
    {
      name: 'Private Equity AI Value Creation',
      description:
        'Portfolio diagnostics, repeatable AI plays, EBITDA-linked automation opportunities, and operating cadence for PE teams.',
    },
  ].map((offer, index) => ({
    '@type': 'Offer',
    position: index + 1,
    itemOffered: {
      '@type': 'Service',
      name: offer.name,
      description: offer.description,
      provider: { '@id': `${siteUrl}/#organization` },
    },
  })),
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

export function caseStudyJsonLd(study: {
  slug: string;
  title: string;
  excerpt: string;
  industry: string;
  service: string;
  heroMetric: string;
  heroMetricLabel: string;
  outcomes: { metric: string; description: string }[];
}) {
  const url = `${siteUrl}/case-studies/${study.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#case-study`,
    headline: study.title,
    description: study.excerpt,
    url,
    mainEntityOfPage: url,
    articleSection: 'Case Study',
    inLanguage: 'en-US',
    image: defaultOgImage.url,
    author: {
      '@type': 'Person',
      name: 'James Penz',
    },
    publisher: {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
      name: 'ClearForge',
    },
    about: [
      { '@type': 'Thing', name: study.industry },
      { '@type': 'Thing', name: study.service },
      { '@type': 'Thing', name: 'custom AI transformation' },
    ],
    mentions: [
      {
        '@type': 'QuantitativeValue',
        name: study.heroMetricLabel,
        value: study.heroMetric,
      },
      ...study.outcomes.map((outcome) => ({
        '@type': 'Thing',
        name: `${outcome.metric}: ${outcome.description}`,
      })),
    ],
  };
}
