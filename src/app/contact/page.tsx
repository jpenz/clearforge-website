import { createMetadata } from "@/lib/metadata";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata = createMetadata({
  title: "Contact ClearForge — Book a Discovery Call",
  description: "30-minute discovery call. No pitch decks, no pressure. Let's talk about how AI can drive measurable results for your business.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
