import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import { CaseStudiesPage } from "@/components/pages/case-studies-page";

export const metadata = createMetadata({
  title: "Case Studies | AI Consulting Outcomes Across PE and Enterprise",
  description:
    "Explore ClearForge case studies showing how strategy, AI build, and managed operations translate into measurable business results.",
  path: "/case-studies",
  keywords: ["PE portfolio AI case study", "AI consulting case studies"],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
            ]),
          ),
        }}
      />
      <CaseStudiesPage />
    </>
  );
}
