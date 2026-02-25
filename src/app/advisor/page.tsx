import { AdvisorPage } from "@/components/pages/advisor-page";
import { breadcrumbJsonLd, createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "AI Advisor | Get Your Personalized ClearForge Recommendation",
  description: "Answer five guided questions and get a personalized AI recommendation tailored to your industry, challenge, and timeline.",
  path: "/advisor",
  keywords: ["AI advisor", "AI recommendation tool", "AI strategy assessment"],
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
              { name: "AI Advisor", path: "/advisor" },
            ]),
          ),
        }}
      />
      <AdvisorPage />
    </>
  );
}
