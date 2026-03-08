import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import { AboutPage } from "@/components/pages/about-page";

export const metadata = createMetadata({
  title: "About ClearForge | Strategy + AI Consulting and Engineering Team",
  description:
    "Meet ClearForge, a strategy + AI consulting firm that combines consulting rigor with engineering and managed AI operations.",
  path: "/about",
  keywords: ["AI strategy consulting firm", "consulting and engineering team"],
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
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
      <AboutPage />
    </>
  );
}
