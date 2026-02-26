import { createMetadata } from "@/lib/metadata";
import { AboutPage } from "@/components/pages/about-page";

export const metadata = createMetadata({
  title: "About ClearForge — Strategy Meets AI Engineering",
  description: "ClearForge supports CEOs, PE operating teams, and owner-led businesses with hands-on AI execution that improves operating performance and enterprise value.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
