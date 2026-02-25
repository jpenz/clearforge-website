import { notFound } from "next/navigation";
import { IndustryDetailPage } from "@/components/pages/industry-detail-page";
import { deepIndustries, getIndustryBySlug } from "@/data/industries";
import { breadcrumbJsonLd, createMetadata } from "@/lib/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return deepIndustries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return createMetadata({
    title: `${industry.name} AI Strategy | ClearForge`,
    description: industry.hero,
    path: `/industries/${industry.slug}`,
    keywords: [industry.name, "industry AI strategy"],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: industry.name, path: `/industries/${industry.slug}` },
            ]),
          ),
        }}
      />
      <IndustryDetailPage industry={industry} />
    </>
  );
}
