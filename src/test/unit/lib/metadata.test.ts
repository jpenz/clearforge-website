/**
 * metadata.test.ts
 *
 * Unit tests for the metadata and JSON-LD helper library (lib/metadata.ts).
 *
 * Acceptance criteria covered:
 *  AC7 — Any page in the site must have <title>, <meta name='description'>, canonical
 *         <link>, OG tags (og:title, og:description, og:image, og:url, og:type), and
 *         Twitter Card meta tags, all populated with page-specific values.
 *  AC8 — Home page JSON-LD: Organization or WebSite schema is valid and error-free.
 *
 * These unit tests validate the *output* of the helpers that generate that metadata,
 * not the rendering layer.  If the helpers return the right shape, the Next.js
 * metadata export will produce the right HTML.
 */

import { describe, expect, it } from 'vitest';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  coreKeywords,
  createMetadata,
  faqJsonLd,
  organizationJsonLd,
  serviceJsonLd,
} from '@/lib/metadata';

// ── createMetadata() ─────────────────────────────────────────────────────────

describe('createMetadata() — title', () => {
  it('Given a page title, when createMetadata is called, then the title field matches', () => {
    const meta = createMetadata({
      title: 'Test Page',
      description: 'A test description',
      path: '/test',
    });
    expect(meta.title).toBe('Test Page');
  });

  it('Given a long title, when createMetadata is called, then it is preserved as-is', () => {
    const longTitle = 'ClearForge — AI Strategy & Execution for Mid-Market Companies';
    const meta = createMetadata({ title: longTitle, description: 'desc', path: '/' });
    expect(meta.title).toBe(longTitle);
  });
});

describe('createMetadata() — description', () => {
  it('Given a description, when createMetadata is called, then the description field matches', () => {
    const description = 'We help mid-market companies deploy AI that drives real results.';
    const meta = createMetadata({ title: 'Title', description, path: '/' });
    expect(meta.description).toBe(description);
  });
});

describe('createMetadata() — canonical URL (AC7)', () => {
  it('Given path "/", when createMetadata is called, then canonical URL points to site root', () => {
    const meta = createMetadata({ title: 'Home', description: 'desc', path: '' });
    expect(meta.alternates?.canonical).toContain('clearforge.ai');
  });

  it('Given path "/about", when createMetadata is called, then canonical URL contains /about', () => {
    const meta = createMetadata({ title: 'About', description: 'desc', path: '/about' });
    const canonical = meta.alternates?.canonical as string;
    expect(canonical).toContain('/about');
  });

  it('Given path "/services/custom-ai-agents", when createMetadata is called, then canonical URL includes full path', () => {
    const path = '/services/custom-ai-agents';
    const meta = createMetadata({ title: 'Custom AI Agents', description: 'desc', path });
    const canonical = meta.alternates?.canonical as string;
    expect(canonical).toContain(path);
  });

  it('canonical URL is a fully-qualified HTTPS URL', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/contact' });
    const canonical = meta.alternates?.canonical as string;
    expect(canonical).toMatch(/^https:\/\//);
  });
});

describe('createMetadata() — Open Graph tags (AC7)', () => {
  it('Given page metadata, when createMetadata is called, then og:title is populated', () => {
    const meta = createMetadata({ title: 'OG Title Test', description: 'desc', path: '/test' });
    expect(meta.openGraph?.title).toBe('OG Title Test');
  });

  it('og:description is populated with the page description', () => {
    const desc = 'Open graph description for the test page.';
    const meta = createMetadata({ title: 'T', description: desc, path: '/test' });
    expect(meta.openGraph?.description).toBe(desc);
  });

  it('og:url is a fully-qualified URL containing the page path', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/services' });
    const ogUrl = meta.openGraph?.url as string;
    expect(ogUrl).toMatch(/^https:\/\//);
    expect(ogUrl).toContain('/services');
  });

  it('og:type is set to "website"', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/' });
    expect(meta.openGraph?.type).toBe('website');
  });

  it('og:siteName is present and non-empty', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/' });
    expect(meta.openGraph?.siteName).toBeTruthy();
    expect((meta.openGraph?.siteName as string).length).toBeGreaterThan(0);
  });

  it('og:locale is "en_US"', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/' });
    expect(meta.openGraph?.locale).toBe('en_US');
  });
});

describe('createMetadata() — Twitter Card tags (AC7)', () => {
  it('Twitter card type is "summary_large_image"', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/' });
    expect(meta.twitter?.card).toBe('summary_large_image');
  });

  it('Twitter title matches the page title', () => {
    const meta = createMetadata({ title: 'Twitter Title', description: 'd', path: '/' });
    expect(meta.twitter?.title).toBe('Twitter Title');
  });

  it('Twitter description matches the page description', () => {
    const desc = 'Twitter description text.';
    const meta = createMetadata({ title: 'T', description: desc, path: '/' });
    expect(meta.twitter?.description).toBe(desc);
  });
});

describe('createMetadata() — keywords', () => {
  it('Given no extra keywords, when createMetadata is called, then coreKeywords are present', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/' });
    const keywords = meta.keywords as string[];
    for (const kw of coreKeywords) {
      expect(keywords).toContain(kw);
    }
  });

  it('Given page-specific keywords, they are merged with coreKeywords (no duplicates)', () => {
    const pageKeywords = ['custom keyword one', 'custom keyword two'];
    const meta = createMetadata({ title: 'T', description: 'd', path: '/', keywords: pageKeywords });
    const keywords = meta.keywords as string[];
    // No duplicates
    expect(keywords.length).toBe(new Set(keywords).size);
    // Page keywords present
    for (const kw of pageKeywords) {
      expect(keywords).toContain(kw);
    }
    // Core keywords present
    for (const kw of coreKeywords) {
      expect(keywords).toContain(kw);
    }
  });

  it('Duplicate keywords between core and page-specific are deduplicated', () => {
    const dup = coreKeywords[0];
    const meta = createMetadata({ title: 'T', description: 'd', path: '/', keywords: [dup] });
    const keywords = meta.keywords as string[];
    const count = keywords.filter((k) => k === dup).length;
    expect(count).toBe(1);
  });
});

describe('createMetadata() — noIndex', () => {
  it('Given noIndex=false (default), then robots meta is not set to noindex', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/' });
    // robots should be undefined or allow indexing
    if (meta.robots) {
      const robots = meta.robots as { index?: boolean; follow?: boolean };
      expect(robots.index).not.toBe(false);
    } else {
      expect(meta.robots).toBeUndefined();
    }
  });

  it('Given noIndex=true, then robots meta disallows indexing', () => {
    const meta = createMetadata({ title: 'T', description: 'd', path: '/private', noIndex: true });
    const robots = meta.robots as { index: boolean; follow: boolean };
    expect(robots.index).toBe(false);
    expect(robots.follow).toBe(false);
  });
});

// ── organizationJsonLd (AC8) ─────────────────────────────────────────────────

describe('organizationJsonLd — Organization schema (AC8)', () => {
  it('has @context set to "https://schema.org"', () => {
    expect(organizationJsonLd['@context']).toBe('https://schema.org');
  });

  it('has @type set to "Organization"', () => {
    expect(organizationJsonLd['@type']).toBe('Organization');
  });

  it('name is "ClearForge"', () => {
    expect(organizationJsonLd.name).toBe('ClearForge');
  });

  it('url is a valid HTTPS URL', () => {
    expect(organizationJsonLd.url).toMatch(/^https:\/\//);
  });

  it('logo is a fully-qualified HTTPS URL', () => {
    expect(organizationJsonLd.logo).toMatch(/^https:\/\//);
  });

  it('description is non-empty', () => {
    expect(organizationJsonLd.description.length).toBeGreaterThan(0);
  });

  it('contactPoint has a valid email and contactType', () => {
    expect(organizationJsonLd.contactPoint.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(organizationJsonLd.contactPoint.contactType.length).toBeGreaterThan(0);
  });

  it('contactPoint @type is "ContactPoint"', () => {
    expect(organizationJsonLd.contactPoint['@type']).toBe('ContactPoint');
  });

  it('sameAs is an array (even if empty)', () => {
    expect(Array.isArray(organizationJsonLd.sameAs)).toBe(true);
  });

  it('all required Organization schema fields are present', () => {
    const required = ['@context', '@type', 'name', 'url', 'logo', 'description', 'contactPoint'];
    for (const field of required) {
      expect(organizationJsonLd).toHaveProperty(field);
    }
  });
});

// ── serviceJsonLd() ──────────────────────────────────────────────────────────

describe('serviceJsonLd() — Service schema', () => {
  const baseService = {
    title: 'Custom AI Agents',
    description: 'We build custom AI agents for your business.',
    slug: 'custom-ai-agents',
  };

  it('has @context set to "https://schema.org"', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has @type set to "Service"', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema['@type']).toBe('Service');
  });

  it('name matches the service title', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema.name).toBe(baseService.title);
  });

  it('description matches the service description', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema.description).toBe(baseService.description);
  });

  it('url contains the service slug as path segment', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema.url).toContain(`/services/${baseService.slug}`);
  });

  it('url is a fully-qualified HTTPS URL', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema.url).toMatch(/^https:\/\//);
  });

  it('provider @type is "Organization" with name "ClearForge"', () => {
    const schema = serviceJsonLd(baseService);
    expect(schema.provider['@type']).toBe('Organization');
    expect(schema.provider.name).toBe('ClearForge');
  });

  it('Given a path override, url uses the explicit path instead of slug', () => {
    const schema = serviceJsonLd({ ...baseService, path: '/custom-path' });
    expect(schema.url).toContain('/custom-path');
  });

  it('Given no slug and no path, url falls back to /services', () => {
    const schema = serviceJsonLd({ title: 'T', description: 'd' });
    expect(schema.url).toContain('/services');
  });
});

// ── faqJsonLd() ──────────────────────────────────────────────────────────────

describe('faqJsonLd() — FAQPage schema', () => {
  const faqs = [
    { question: 'What is ClearForge?', answer: 'An AI consulting firm.' },
    { question: 'How long does it take?', answer: 'Typically 4-16 weeks.' },
  ];

  it('has @context set to "https://schema.org"', () => {
    const schema = faqJsonLd(faqs);
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has @type set to "FAQPage"', () => {
    const schema = faqJsonLd(faqs);
    expect(schema['@type']).toBe('FAQPage');
  });

  it('mainEntity has one entry per FAQ', () => {
    const schema = faqJsonLd(faqs);
    expect(schema.mainEntity).toHaveLength(faqs.length);
  });

  it('each mainEntity entry has @type "Question"', () => {
    const schema = faqJsonLd(faqs);
    for (const item of schema.mainEntity) {
      expect(item['@type']).toBe('Question');
    }
  });

  it('each Question has a non-empty name matching the question text', () => {
    const schema = faqJsonLd(faqs);
    for (let i = 0; i < faqs.length; i++) {
      expect(schema.mainEntity[i].name).toBe(faqs[i].question);
    }
  });

  it('each Question has an acceptedAnswer with @type "Answer"', () => {
    const schema = faqJsonLd(faqs);
    for (const item of schema.mainEntity) {
      expect(item.acceptedAnswer['@type']).toBe('Answer');
      expect(item.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });

  it('acceptedAnswer text matches the answer text', () => {
    const schema = faqJsonLd(faqs);
    for (let i = 0; i < faqs.length; i++) {
      expect(schema.mainEntity[i].acceptedAnswer.text).toBe(faqs[i].answer);
    }
  });

  it('Given an empty FAQ array, mainEntity is empty', () => {
    const schema = faqJsonLd([]);
    expect(schema.mainEntity).toHaveLength(0);
  });

  it('Given a single FAQ, mainEntity has exactly one entry', () => {
    const schema = faqJsonLd([{ question: 'Q?', answer: 'A.' }]);
    expect(schema.mainEntity).toHaveLength(1);
  });
});

// ── breadcrumbJsonLd() ───────────────────────────────────────────────────────

describe('breadcrumbJsonLd() — BreadcrumbList schema', () => {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Custom AI Agents', path: '/services/custom-ai-agents' },
  ];

  it('has @context set to "https://schema.org"', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has @type set to "BreadcrumbList"', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    expect(schema['@type']).toBe('BreadcrumbList');
  });

  it('itemListElement has one entry per breadcrumb', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    expect(schema.itemListElement).toHaveLength(breadcrumbs.length);
  });

  it('positions start at 1 and increment by 1', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    schema.itemListElement.forEach((item, index) => {
      expect(item.position).toBe(index + 1);
    });
  });

  it('each ListItem @type is "ListItem"', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    for (const item of schema.itemListElement) {
      expect(item['@type']).toBe('ListItem');
    }
  });

  it('each item name matches the breadcrumb name', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    for (let i = 0; i < breadcrumbs.length; i++) {
      expect(schema.itemListElement[i].name).toBe(breadcrumbs[i].name);
    }
  });

  it('each item URL is a fully-qualified HTTPS URL containing the path', () => {
    const schema = breadcrumbJsonLd(breadcrumbs);
    for (let i = 0; i < breadcrumbs.length; i++) {
      expect(schema.itemListElement[i].item).toMatch(/^https:\/\//);
      expect(schema.itemListElement[i].item).toContain(breadcrumbs[i].path);
    }
  });

  it('Given a single breadcrumb, position is 1', () => {
    const schema = breadcrumbJsonLd([{ name: 'Home', path: '/' }]);
    expect(schema.itemListElement[0].position).toBe(1);
  });
});

// ── articleJsonLd() ──────────────────────────────────────────────────────────

describe('articleJsonLd() — Article schema', () => {
  const article = {
    title: 'How AI Transforms Mid-Market Manufacturing',
    description: 'A deep dive into AI adoption patterns.',
    slug: 'ai-transforms-manufacturing',
    date: '2025-01-15',
    author: 'James Penz',
  };

  it('has @context set to "https://schema.org"', () => {
    const schema = articleJsonLd(article);
    expect(schema['@context']).toBe('https://schema.org');
  });

  it('has @type set to "Article"', () => {
    const schema = articleJsonLd(article);
    expect(schema['@type']).toBe('Article');
  });

  it('headline matches the article title', () => {
    const schema = articleJsonLd(article);
    expect(schema.headline).toBe(article.title);
  });

  it('description matches the article description', () => {
    const schema = articleJsonLd(article);
    expect(schema.description).toBe(article.description);
  });

  it('url contains /insights/ and the article slug', () => {
    const schema = articleJsonLd(article);
    expect(schema.url).toContain('/insights/');
    expect(schema.url).toContain(article.slug);
  });

  it('url is a fully-qualified HTTPS URL', () => {
    const schema = articleJsonLd(article);
    expect(schema.url).toMatch(/^https:\/\//);
  });

  it('datePublished matches the article date', () => {
    const schema = articleJsonLd(article);
    expect(schema.datePublished).toBe(article.date);
  });

  it('author @type is "Person" with the correct name', () => {
    const schema = articleJsonLd(article);
    expect(schema.author['@type']).toBe('Person');
    expect(schema.author.name).toBe(article.author);
  });

  it('publisher @type is "Organization" with name "ClearForge"', () => {
    const schema = articleJsonLd(article);
    expect(schema.publisher['@type']).toBe('Organization');
    expect(schema.publisher.name).toBe('ClearForge');
  });

  it('publisher url is a valid HTTPS URL', () => {
    const schema = articleJsonLd(article);
    expect(schema.publisher.url).toMatch(/^https:\/\//);
  });
});

// ── coreKeywords ─────────────────────────────────────────────────────────────

describe('coreKeywords', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(coreKeywords)).toBe(true);
    expect(coreKeywords.length).toBeGreaterThan(0);
  });

  it('all keywords are non-empty strings', () => {
    for (const kw of coreKeywords) {
      expect(typeof kw).toBe('string');
      expect(kw.trim().length).toBeGreaterThan(0);
    }
  });

  it('keywords are unique', () => {
    expect(new Set(coreKeywords).size).toBe(coreKeywords.length);
  });
});
