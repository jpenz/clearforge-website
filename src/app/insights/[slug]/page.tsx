import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getInsight, insights, getRelatedInsights, formatDate } from "@/data/insights";
import { InsightDetailClient } from "@/components/insight-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const related = getRelatedInsights(insight.relatedSlugs);
  return <InsightDetailClient insight={insight} related={related} />;
}
