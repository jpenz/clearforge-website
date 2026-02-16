import { notFound, redirect } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { CaseStudyDetail } from "@/components/case-study-detail";

export function generateStaticParams() {
  return caseStudies
    .filter((cs) => cs.slug !== "industrial-manufacturer")
    .map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return createMetadata({
    title: cs.title,
    description: cs.excerpt,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "industrial-manufacturer") {
    redirect("/case-studies/industrial-manufacturer");
  }

  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return <CaseStudyDetail cs={cs} />;
}
