import { createMetadata } from "@/lib/metadata";
import { ContactPageClient } from "@/components/pages/contact-page";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Book a 30-minute discovery call with ClearForge. No pitch decks, no pressure — just a straightforward conversation about your business.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
