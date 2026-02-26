import { notFound } from "next/navigation";
import { createMetadata, faqJsonLd, articleJsonLd } from "@/lib/metadata";
import { getInsight, insights, getRelatedInsights } from "@/data/insights";
import { InsightDetailClient } from "@/components/insight-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.seo.title,
    description: insight.seo.description,
    path: `/insights/${slug}`,
    keywords: insight.seo.keywords,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const related = getRelatedInsights(insight.relatedSlugs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: insight.title,
              description: insight.excerpt,
              slug: insight.slug,
              date: insight.date,
              author: insight.author.name,
            }),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(insight.faqs)) }} />
      <InsightDetailClient insight={insight} related={related} />
    </>
  );
}
