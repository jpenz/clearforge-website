import { HowWeWorkPage } from "@/components/pages/how-we-work-page";
import { howWeWorkFaqs } from "@/data/how-we-work";
import { breadcrumbJsonLd, createMetadata, faqJsonLd } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "How We Work | ClearForge Engagement Models",
  description: "Learn ClearForge engagement models: AI Strategy Sprint, Transformation Design, AI Implementation, and Managed AI Advisory.",
  path: "/how-we-work",
  keywords: ["AI consulting engagement model", "AI implementation partner"],
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
              { name: "How We Work", path: "/how-we-work" },
            ]),
          ),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(howWeWorkFaqs)) }} />
      <HowWeWorkPage />
    </>
  );
}
