import { AssessmentPage } from "@/components/pages/assessment-page";
import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "AI Readiness & Opportunity Assessment | ClearForge",
  description:
    "One integrated assessment: readiness scoring, company and industry research, and a strategy report you can download and receive by email.",
  path: "/assessment",
  keywords: ["AI readiness assessment", "AI opportunity assessment", "AI strategy report"],
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
              { name: "Assessment", path: "/assessment" },
            ]),
          ),
        }}
      />
      <AssessmentPage />
    </>
  );
}
