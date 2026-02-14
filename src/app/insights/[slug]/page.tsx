import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { insights, getInsight } from "@/data/insights";
import { InsightDetail } from "@/components/insight-detail";
import { articleJsonLd } from "@/lib/metadata";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: "article",
      publishedTime: insight.date,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    notFound();
  }

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
            })
          ),
        }}
      />
      <InsightDetail insight={insight} />
    </>
  );
}
