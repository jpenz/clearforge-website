import type { Faq } from '@/data/faqs';
import { PRICING_TIERS } from '@/data/pricing';
import {
  FOUNDER_EMAIL,
  SHOW_FOUNDER_IDENTITY,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from '@/data/site';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: 'Clearforge AI LLC',
    alternateName: ['ClearForge AI', 'Clearforge AI'],
    url: SITE_URL,
    email: FOUNDER_EMAIL,
    slogan: SITE_TAGLINE,
    areaServed: { '@type': 'Country', name: 'United States' },
    audience: [
      {
        '@type': 'BusinessAudience',
        name: 'Private equity firms and their portfolio companies',
      },
      {
        '@type': 'BusinessAudience',
        name: 'Mid-market companies with $20 million to $500 million in revenue',
      },
    ],
    knowsAbout: [
      'AI value creation in private equity',
      'AI opportunity assessment',
      'Commercial and performance due diligence',
      'AI business case and ROI measurement',
      'AI agent development',
      'Forward-deployed engineering',
      'AI adoption and change management',
      'Managed AI operations',
    ],
    description:
      'We find the jobs in your company that AI can do, build the AI to do them, and stay until your people use it. For companies with $20 million to $500 million in yearly sales, and the private equity firms that own them.',
    // The founder entity is omitted while the identity is hidden: structured
    // data must never assert what the page does not show.
    ...(SHOW_FOUNDER_IDENTITY
      ? {
          founder: {
            '@type': 'Person',
            name: 'James Penz',
            sameAs: ['https://www.linkedin.com/in/jamespenz/'],
          },
        }
      : {}),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * OfferCatalog of named engagements. Prices are deliberately absent:
 * unpublished by owner decision 2026-08-20, so no price may appear in
 * structured data either.
 */
export function pricingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${SITE_NAME} engagements`,
    url: `${SITE_URL}/pricing`,
    itemListElement: PRICING_TIERS.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      description: tier.subtitle,
      // No price fields: pricing is scoped in the Diagnostic and is not
      // published, so the schema must not advertise a number the page does
      // not show. Emitting one would put a figure into AI answers and search
      // results that no visitor can verify on the site.
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE_URL}/#organization` },
    })),
  };
}

export function JsonLdScriptProps(data: object) {
  // Escape the sequences that could break out of the <script> element.
  // Author-controlled data today, but this keeps it safe if dynamic values
  // ever flow in (a "</script>" or "<!--" inside a string would otherwise
  // terminate the tag).
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: json },
  } as const;
}

/**
 * Founder entity. For a founder-led firm the person IS the brand, so a
 * standalone Person node with credentials gives answer engines something to
 * attribute expertise to when they summarize "who is ClearForge".
 *
 * Emit this ONLY when SHOW_FOUNDER_IDENTITY is true. Its single call site on
 * /about is guarded, because structured data must never assert an identity
 * the page itself does not show.
 */
export function founderJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'James Penz',
    jobTitle: 'Founder',
    description:
      "Founder of ClearForge. Previously in Bain and Company's AI and Automation practice, with earlier work at EY and Capgemini. Builds AI systems into mid-market and PE-backed operations.",
    url: `${SITE_URL}/about`,
    sameAs: ['https://www.linkedin.com/in/jamespenz/'],
    worksFor: { '@id': `${SITE_URL}/#organization` },
    knowsAbout: [
      'AI strategy',
      'AI implementation',
      'AI adoption',
      'Agentic AI systems',
      'Private equity value creation',
      'Mid-market operations',
    ],
  };
}

/**
 * Service catalog for /services. Names each engagement as a distinct Service
 * so an answer engine can cite what we actually sell, not infer it from prose.
 */
export function servicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} services`,
    url: `${SITE_URL}/services`,
    itemListElement: PRICING_TIERS.map((tier, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: tier.name,
        description: tier.subtitle,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'US',
        audience: {
          '@type': 'BusinessAudience',
          name: 'Mid-market companies and private equity operating teams',
        },
      },
    })),
  };
}

/** Article structured data for an insights page. The firm is the author while the founder identity is hidden. */
export function articleJsonLd(args: {
  slug: string;
  headline: string;
  description: string;
  section: string;
  published?: string;
  updated?: string;
}) {
  const url = `${SITE_URL}/insights/${args.slug}`;
  const org = { '@id': `${SITE_URL}/#organization` };
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    articleSection: args.section,
    url,
    mainEntityOfPage: url,
    ...(args.published ? { datePublished: args.published } : {}),
    ...(args.updated || args.published ? { dateModified: args.updated ?? args.published } : {}),
    author: SHOW_FOUNDER_IDENTITY
      ? { '@type': 'Person', name: 'James Penz', url: `${SITE_URL}/about` }
      : { '@type': 'Organization', name: SITE_NAME, ...org },
    publisher: { '@type': 'Organization', name: SITE_NAME, ...org },
  };
}

/** Breadcrumb trail, from the home page down. */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
