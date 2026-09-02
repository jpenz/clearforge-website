import type { Faq } from '@/data/faqs';
import { PRICING_TIERS } from '@/data/pricing';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/data/site';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    slogan: SITE_TAGLINE,
    description:
      'Founder-led AI consulting and build firm for mid-market companies, $20M to $500M revenue, and PE operating teams.',
    founder: {
      '@type': 'Person',
      name: 'James Penz',
      sameAs: ['https://www.linkedin.com/in/jamespenz/'],
    },
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
