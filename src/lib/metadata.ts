import type { Metadata } from 'next';

const siteUrl = 'https://clearforge.ai';
const siteName = 'ClearForge.ai';
const titleBrandSuffix = ' | ClearForge';
const defaultOgImage = {
  url: `${siteUrl}/images/og-image.webp`,
  width: 1200,
  height: 630,
  alt: 'ClearForge custom AI strategy and build systems',
};

export const coreKeywords = [
  'AI consulting',
  'AI strategy consulting',
  'AI agent design and build',
  'managed AI operations',
  'legacy system modernization',
  'AI marketing and revenue operations',
  'industry AI systems',
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
    category: 'AI strategy and build consulting',
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

export const founderPersonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#james-penz`,
  name: 'James Penz',
  jobTitle: 'Founder & Managing Partner',
  url: `${siteUrl}/about`,
  sameAs: ['https://www.linkedin.com/in/jamesrpenz/'],
  worksFor: {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: 'ClearForge',
  },
  knowsAbout: [
    'AI transformation strategy',
    'business process automation',
    'AI operating models',
    'private equity value creation',
    'revenue operations',
    'enterprise AI governance',
  ],
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
    'ClearForge helps business leaders set AI ambition, map the value chain, build custom AI workflows, and train teams to operate them.',
  publisher: {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: 'ClearForge',
  },
};

export const clearForgeMethodJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${siteUrl}/#clearforge-method`,
  name: 'The ClearForge Method',
  description:
    'A senior-led method for selecting the AI workflows worth changing, building production systems around them, training the team, and reviewing performance after launch.',
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#organization`,
    name: 'ClearForge',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Diagnose the value chain',
      text: 'Map the operating value chain, identify workflow constraints, and select the opportunities with a measurable baseline and accountable owner.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Design the operating model',
      text: 'Define workflow boundaries, data paths, review rules, exception handling, adoption routines, and the performance dashboard before engineering starts.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Build the production system',
      text: 'Ship custom AI workflows, agents, integrations, controls, and dashboards around the client systems people already use.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Train the team',
      text: 'Prepare leaders and frontline users to operate the new workflow, review exceptions, and make better decisions with the system.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Measure and improve',
      text: 'Run a recurring measurement cadence for usage, quality, cycle time, cost, revenue, service, and the next wave of value.',
    },
  ],
};

export const clearForgeProfilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/about#profile`,
  url: `${siteUrl}/about`,
  name: 'About ClearForge',
  dateModified: '2026-05-03',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'ClearForge',
    description:
      'ClearForge is an AI strategy-and-build firm that diagnoses operating constraints, builds production AI workflows, and trains teams to run them.',
    founder: { '@id': `${siteUrl}/#james-penz` },
  },
  mentions: [{ '@id': `${siteUrl}/#james-penz` }, { '@id': `${siteUrl}/#clearforge-method` }],
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
  dateModified?: string;
  author: string;
  keywords?: string[];
  section?: string;
}) {
  const url = `${siteUrl}/insights/${article.slug}`;
  const isFounderAuthored = article.author === 'James Penz';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    datePublished: article.date,
    dateModified: article.dateModified ?? article.date,
    image: defaultOgImage.url,
    articleSection: article.section,
    keywords: article.keywords,
    author: {
      '@type': 'Person',
      ...(isFounderAuthored ? { '@id': `${siteUrl}/#james-penz`, url: `${siteUrl}/about` } : {}),
      name: article.author,
    },
    publisher: {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
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
      { '@type': 'Thing', name: 'custom AI systems' },
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
