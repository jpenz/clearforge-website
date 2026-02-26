import { SolutionsPage } from "@/components/pages/solutions-page";
import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "AI Solutions Journey | Understand, Build, Operate",
  description: "Explore ClearForge solutions by journey stage: AI Strategy, AI Agents, Legacy Modernization, Managed AI Operations, and Revenue Operations.",
  path: "/solutions",
  keywords: ["AI solutions", "AI implementation roadmap", "managed AI operations"],
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
              { name: "Solutions", path: "/solutions" },
            ]),
          ),
        }}
      />
      <SolutionsPage />
    </>
  );
}
