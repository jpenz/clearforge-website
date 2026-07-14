import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { formatDate, insights } from '@/data/insights';
import { articleJsonLd, breadcrumbJsonLd, createMetadata, faqJsonLd } from '@/lib/metadata';

function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

function cleanInlineText(text: string) {
  return text.replace(/\*\*/g, '');
}

function slugifyHeading(heading: string) {
  return (
    heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'section'
  );
}

function renderMarkdownBlocks(markdown: string) {
  const blocks: ReactNode[] = [];
  const paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listType: 'ordered' | 'unordered' | null = null;
  let tableLines: string[] = [];
  let blockIndex = 0;

  const flushTable = () => {
    if (tableLines.length === 0) return;
    const rows = tableLines
      .map((line) =>
        line
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split('|')
          .map((cell) => cell.trim()),
      )
      .filter((cells) => !cells.every((c) => /^:?-{2,}:?$/.test(c)));
    const [header, ...body] = rows;
    if (header) {
      blocks.push(
        <div key={`table-${blockIndex}`} className="my-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-anthracite/20">
                {header.map((cell) => (
                  <th
                    key={cell}
                    className="py-3 pr-6 text-xs font-semibold uppercase tracking-[0.08em] text-anthracite"
                  >
                    {cleanInlineText(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((cells) => (
                <tr key={cells.join('|')} className="border-b border-divider align-top">
                  {cells.map((cell, ci) => (
                    <td
                      key={`${cell}-${ci}`}
                      className={`py-3 pr-6 text-body-sm leading-relaxed ${ci === 0 ? 'font-medium text-anthracite' : 'text-warm-gray'}`}
                    >
                      {cleanInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      blockIndex += 1;
    }
    tableLines = [];
  };

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    blocks.push(
      <p key={`p-${blockIndex}`} className="text-body text-warm-gray mb-4 leading-relaxed">
        {cleanInlineText(paragraphLines.join(' '))}
      </p>,
    );
    blockIndex += 1;
    paragraphLines.length = 0;
  };

  const flushList = () => {
    if (listItems.length === 0 || !listType) return;

    const ListTag = listType === 'ordered' ? 'ol' : 'ul';
    blocks.push(
      <ListTag
        key={`list-${blockIndex}`}
        className={`my-6 space-y-3 pl-6 text-body text-warm-gray leading-relaxed ${listType === 'ordered' ? 'list-decimal' : 'list-disc'} marker:text-brass`}
      >
        {listItems.map((item) => (
          <li key={item}>{cleanInlineText(item)}</li>
        ))}
      </ListTag>,
    );
    blockIndex += 1;
    listItems = [];
    listType = null;
  };

  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();

    if (trimmed.startsWith('|')) {
      flushParagraph();
      flushList();
      tableLines.push(trimmed);
      continue;
    }
    flushTable();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push(
        <h3 key={`h3-${blockIndex}`} className="text-h3 mt-8 mb-4">
          {cleanInlineText(trimmed.slice(4))}
        </h3>,
      );
      blockIndex += 1;
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType !== 'ordered') {
        flushList();
        listType = 'ordered';
      }
      listItems.push(orderedMatch[1] ?? '');
      continue;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      if (listType !== 'unordered') {
        flushList();
        listType = 'unordered';
      }
      listItems.push(trimmed.slice(2));
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushTable();

  return blocks;
}

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seo.title,
    description: insight.seo.description,
    path: `/insights/${slug}`,
    keywords: insight.seo.keywords,
    type: 'article',
    publishedTime: insight.date,
    modifiedTime: insight.dateModified ?? insight.date,
    authors: [insight.author.name],
  });
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = insight.relatedSlugs.map((s) => getInsight(s)).filter(Boolean);

  /* Split the markdown body into sections by ## headings. Anything BEFORE
     the first ## is the article lede — rendering it as a section turned the
     TL;DR paragraph into a giant fake heading (and a TOC entry). */
  const bodyStartsWithHeading = /^## /.test(insight.body.trimStart());
  const rawPieces = insight.body.split(/^## /m).filter(Boolean);
  const intro = bodyStartsWithHeading ? '' : (rawPieces.shift() ?? '').trim();
  const sections = rawPieces.map((section, index) => {
    const lines = section.split('\n');
    const heading = lines[0]?.trim() || `Section ${index + 1}`;
    return {
      id: `${slugifyHeading(heading)}-${index + 1}`,
      heading,
      body: lines.slice(1).join('\n').trim(),
    };
  });

  /* Schema.org structured data for AEO/GEO citation lift */
  const articleLd = articleJsonLd({
    title: insight.title,
    description: insight.excerpt,
    slug: insight.slug,
    date: insight.date,
    author: insight.author.name,
    keywords: insight.seo.keywords,
    section: insight.category,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: insight.title, path: `/insights/${insight.slug}` },
  ]);
  const faqLd = insight.faqs.length > 0 ? faqJsonLd(insight.faqs) : null;

  return (
    <>
      <JsonLdScript data={articleLd} />
      <JsonLdScript data={breadcrumbLd} />
      {faqLd && <JsonLdScript data={faqLd} />}
      {/* ── Hero ── */}
      <section className="dark-section py-32 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="whitespace-nowrap text-body-sm font-medium text-brass-light">
              {insight.category}
            </span>
            <time className="whitespace-nowrap text-body-sm text-stone" dateTime={insight.date}>
              {formatDate(insight.date)}
            </time>
            <span className="whitespace-nowrap text-body-sm text-stone">
              {insight.readingTime} min read
            </span>
          </div>
          <h1 className="mt-6 text-display text-bone">{insight.title}</h1>
          <p className="mt-6 text-body-lg text-stone">{insight.excerpt}</p>
          <div className="mt-8 flex items-center gap-4 border-t border-bone/20 pt-8">
            <div>
              <p className="text-body-sm font-medium text-bone">{insight.author.name}</p>
              <p className="text-body-sm text-stone">{insight.author.role}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-bone/15 pt-5">
            <p className="text-body-sm leading-relaxed text-stone">
              Editorial standard: ClearForge insights separate original operating frameworks from
              externally sourced claims. We avoid unsupported ROI, savings, payback, and benchmark
              claims unless the evidence is visible.
            </p>
          </div>
        </div>
      </section>

      {/* ── Article Roadmap ── */}
      {sections.length > 0 && (
        <section className="border-y border-divider bg-warm-white py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
              <div>
                <p className="overline">In This Brief</p>
                <h2 className="mt-4 text-h3">Use the article like an operating memo.</h2>
                <p className="mt-3 text-body-sm leading-relaxed text-warm-gray">
                  Start with the section closest to your decision, then use the FAQ for the
                  plain-English answer.
                </p>
              </div>
              <div className="grid gap-px overflow-hidden border border-divider bg-divider sm:grid-cols-2">
                {sections.slice(0, 6).map((section, index) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex min-h-20 gap-4 bg-warm-white p-4 transition-colors hover:bg-parchment"
                  >
                    <span className="metric text-xs text-brass">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold leading-snug text-anthracite transition-colors group-hover:text-brass">
                      {section.heading}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="prose-forge space-y-12">
            {intro && <div className="space-y-4">{renderMarkdownBlocks(intro)}</div>}
            {sections.map((section) => (
              <div key={section.id}>
                <h2 id={section.id} className="scroll-mt-28 text-h2 mb-6">
                  {section.heading}
                </h2>
                {renderMarkdownBlocks(section.body)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {insight.faqs.length > 0 && (
        <section className="border-t border-divider bg-parchment py-24 lg:py-40">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <p className="overline">FAQ</p>
            <h2 className="mt-6 text-display">Common questions.</h2>
            <div className="mt-12">
              {insight.faqs.map((faq, i) => (
                <div key={faq.question}>
                  <div className="py-8">
                    <h3 className="text-h4">{faq.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">{faq.answer}</p>
                  </div>
                  {i < insight.faqs.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="bg-warm-white py-24 lg:py-40">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <p className="overline">Related Reading</p>
            <div className="mt-12 grid gap-0">
              {related.map((r) =>
                r ? (
                  <Link
                    key={r.slug}
                    href={`/insights/${r.slug}`}
                    className="group block border-t border-divider py-8 transition-colors hover:bg-parchment"
                  >
                    <span className="text-body-sm font-medium text-brass">{r.category}</span>
                    <h3 className="mt-2 font-display text-[1.4rem] font-medium leading-snug tracking-[-0.01em] transition-colors group-hover:text-brass">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-body text-warm-gray">{r.excerpt}</p>
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── light band; the global footer band supplies the dark close */}
      <section className="border-t border-divider bg-recessed py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display">Ready to test this against your workflow?</h2>
          <p className="mt-6 text-body-lg text-warm-gray">
            Take the scorecard, then map where the value sits before you commit to a build.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/scorecard">
                Take the scorecard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/discover">Map the Workflow</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
