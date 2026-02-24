import { createMetadata } from "@/lib/metadata";
import { CaseStudiesPage } from "@/components/pages/case-studies-page";

export const metadata = createMetadata({
  title: "Case Studies | ClearForge Results in Market",
  description:
    "Explore ClearForge case studies including a Metro Detroit services company and a Fortune 1000 industrial manufacturer.",
  path: "/case-studies",
});

export default function Page() {
  return <CaseStudiesPage />;
}
