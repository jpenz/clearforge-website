import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getInsight, insights } from "@/data/insights";
import { InsightDetail } from "@/components/insight-detail";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return createMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  return <InsightDetail insight={insight} />;
}
