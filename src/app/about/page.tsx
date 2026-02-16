import { createMetadata } from "@/lib/metadata";
import { AboutPage } from "@/components/pages/about-page";

export const metadata = createMetadata({
  title: "About ClearForge — Strategy Meets AI Engineering",
  description: "ClearForge combines strategy consulting rigor with hands-on AI engineering. We close the gap between AI strategy and AI execution.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
