import { IndustriesPage } from "@/components/pages/industries-page";
import { breadcrumbJsonLd, createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Industries | AI Strategy and Implementation by Vertical",
  description: "See how ClearForge applies AI strategy and execution across manufacturing, professional services, financial services, and PE portfolios.",
  path: "/industries",
  keywords: ["AI in manufacturing", "AI consulting industries"],
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
              { name: "Industries", path: "/industries" },
            ]),
          ),
        }}
      />
      <IndustriesPage />
    </>
  );
}
