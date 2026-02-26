import { createMetadata } from "@/lib/metadata";
import { ServicesPageClient } from "@/components/pages/services-page";

export const metadata = createMetadata({
  title: "Services — AI Operating Systems for CEOs, PE Teams, and Owner-Led Businesses",
  description: "Service lines built for mid-market and lower-middle-market operators, including owner-led businesses with $2M-$15M seller earnings preparing for succession.",
  path: "/services",
});

export default function Page() {
  return <ServicesPageClient />;
}
