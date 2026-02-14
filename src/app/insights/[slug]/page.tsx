import { notFound } from "next/navigation";
import { insights, getInsight } from "@/data/insights";
import { InsightDetail } from "@/components/insight-detail";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
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

  return <InsightDetail insight={insight} />;
}
