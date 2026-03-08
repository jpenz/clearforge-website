import { createMetadata, breadcrumbJsonLd } from "@/lib/metadata";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata = createMetadata({
  title: "Contact ClearForge | Book a Strategy + AI Discovery Call",
  description:
    "Book a working discovery call with ClearForge to assess where AI can create measurable value in your business.",
  path: "/contact",
  keywords: ["AI consulting discovery call", "AI strategy session"],
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
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
      <ContactPage />
    </>
  );
}
