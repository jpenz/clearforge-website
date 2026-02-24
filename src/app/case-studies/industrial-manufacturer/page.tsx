import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import { IndustrialManufacturerPage } from "@/components/pages/industrial-manufacturer-page";

export const metadata = createMetadata({
  title: "Case Study | Fortune 1000 Manufacturer AI Sales Intelligence",
  description:
    "How a Fortune 1000 industrial manufacturer used ClearForge strategy and AI implementation to unify sales intelligence across 16 divisions.",
  path: "/case-studies/industrial-manufacturer",
  keywords: ["Fortune 1000 AI consulting", "industrial AI strategy"],
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
              { name: "Industrial Manufacturer", path: "/case-studies/industrial-manufacturer" },
            ]),
          ),
        }}
      />
      <IndustrialManufacturerPage />
    </>
  );
}
