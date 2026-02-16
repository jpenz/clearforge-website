import { createMetadata } from "@/lib/metadata";
import { AboutPageClient } from "@/components/pages/about-page";

export const metadata = createMetadata({
  title: "About",
  description:
    "ClearForge combines management consulting rigor with hands-on AI engineering. We build what we recommend.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
