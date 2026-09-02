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

/** OfferCatalog of named engagements (prices unpublished by owner decision 2026-08-20). */
export function pricingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${SITE_NAME} published pricing`,
    url: `${SITE_URL}/pricing`,
    itemListElement: PRICING_TIERS.map((tier) => ({
      '@type': 'Offer',
      name: tier.name,
      description: tier.subtitle,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        minPrice: tier.minPrice,
        ...(tier.maxPrice != null ? { maxPrice: tier.maxPrice } : {}),
      },
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
