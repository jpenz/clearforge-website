import { createMetadata } from "@/lib/metadata";
import { ContactPageClient } from "@/components/pages/contact-page";

export const metadata = createMetadata({
  title: "Contact ClearForge — Book a Discovery Call",
  description: "Book a 30-minute discovery call for CEOs, PE operators, and owner-led businesses. We assess AI opportunities tied to operating value and transition readiness.",
  path: "/contact",
});

export default function Page() {
  return <ContactPageClient />;
}
