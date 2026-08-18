import type { Faq } from "@/data/faqs";
import { PRICING_TIERS } from "@/data/pricing";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/data/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    slogan: SITE_TAGLINE,
    description:
      "Founder-led AI consulting and build firm for mid-market companies, $20M to $500M revenue, and PE operating teams.",
    founder: {
      "@type": "Person",
      name: "James Penz",
    },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Offer/PriceSpecification for the published tiers, server-rendered. */
export function pricingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${SITE_NAME} published pricing`,
    url: `${SITE_URL}/pricing`,
    itemListElement: PRICING_TIERS.filter((tier) => tier.minPrice != null).map(
      (tier) => ({
        "@type": "Offer",
        name: tier.name,
        description: tier.subtitle,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: tier.minPrice,
          ...(tier.maxPrice != null ? { maxPrice: tier.maxPrice } : {}),
        },
        seller: { "@id": `${SITE_URL}/#organization` },
      }),
    ),
  };
}

export function JsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
