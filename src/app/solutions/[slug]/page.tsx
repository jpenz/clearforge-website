import { notFound } from "next/navigation";
import { SolutionDetailPage } from "@/components/pages/solution-detail-page";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, serviceJsonLd } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return createMetadata({
    title: `${solution.title} | ClearForge`,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
    keywords: [solution.shortTitle, "AI transformation consulting"],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Solutions", path: "/solutions" },
              { name: solution.title, path: `/solutions/${solution.slug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              title: solution.title,
              description: solution.summary,
              path: `/solutions/${solution.slug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(solution.faqs)) }}
      />
      <SolutionDetailPage solution={solution} />
    </>
  );
}
