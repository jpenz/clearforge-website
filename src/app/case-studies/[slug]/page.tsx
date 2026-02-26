import { notFound, redirect } from "next/navigation";
import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import { getCaseStudy, caseStudies } from "@/data/case-studies";
import { CaseStudyDetailClient } from "@/components/case-study-detail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return createMetadata({
    title: `Case Study: ${cs.title}`,
    description: cs.excerpt,
    path: `/case-studies/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // industrial-manufacturer has its own dedicated page
  if (slug === "industrial-manufacturer") {
    redirect("/case-studies/industrial-manufacturer");
  }
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: cs.title, path: `/case-studies/${slug}` },
            ]),
          ),
        }}
      />
      <CaseStudyDetailClient caseStudy={cs} />
    </>
  );
}
