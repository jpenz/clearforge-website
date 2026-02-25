import type { Metadata } from "next";

const siteUrl = "https://clearforge.ai";
const siteName = "ClearForge.ai";

export const coreKeywords = [
  "AI consulting",
  "AI strategy consulting",
  "AI agent design and build",
  "managed AI operations",
  "legacy system modernization",
  "AI marketing and revenue operations",
  "industry AI transformation",
  "AI value gap",
];

export function createMetadata({
  title,
  description,
  path = "",
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

  return {
    title,
    description,
    keywords: mergedKeywords,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ClearForge",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "ClearForge is a strategy and AI consulting firm that diagnoses where businesses should win, builds the AI systems to execute, and operates them continuously.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@clearforge.ai",
    contactType: "sales",
  },
  sameAs: [],
};

export function serviceJsonLd(service: {
  title: string;
  description: string;
  slug?: string;
  path?: string;
}) {
  const servicePath = service.path ?? (service.slug ? `/services/${service.slug}` : "/services");

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "ClearForge",
      url: siteUrl,
    },
    url: `${siteUrl}${servicePath}`,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
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
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${siteUrl}/insights/${article.slug}`,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ClearForge",
      url: siteUrl,
    },
  };
}
