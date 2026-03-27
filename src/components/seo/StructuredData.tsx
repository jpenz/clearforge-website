/**
 * StructuredData — injects a JSON-LD <script> block into the page.
 *
 * Usage (Server Component only — no 'use client' needed):
 *   <StructuredData data={organizationJsonLd} />
 */

interface StructuredDataProps {
  /** The JSON-LD object to serialize and inject */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, unknown> | Record<string, unknown>[];
  /** Optional id to differentiate multiple blocks on the same page */
  id?: string;
}

/**
 * Server Component that renders a JSON-LD structured data block.
 * All values are serialized via JSON.stringify — safe because the content
 * is generated from trusted in-repo data objects.
 */
export function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data — trusted source
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization JSON-LD block */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ClearForge',
  url: 'https://clearforge.ai',
  logo: 'https://clearforge.ai/logo.png',
  description:
    'ClearForge is an AI strategy and execution consultancy that helps mid-market companies build AI systems that drive real operational results.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@clearforge.ai',
    contactType: 'sales',
  },
  sameAs: [],
};

/** WebSite JSON-LD block */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ClearForge',
  url: 'https://clearforge.ai',
  description: 'AI Strategy & Execution for Mid-Market Companies',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://clearforge.ai/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};
