import type { Metadata } from "next";
import { ContactPageClient } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Discovery Call",
  description:
    "Get in touch with ClearForge. Book a free 30-minute discovery call or send us a message. We respond within 24 hours.",
  openGraph: {
    title: "Contact Us — Book a Free Discovery Call",
    description:
      "Get in touch with ClearForge. Book a free 30-minute discovery call or send us a message. We respond within 24 hours.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
