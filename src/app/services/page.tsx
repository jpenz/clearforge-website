import { createMetadata } from "@/lib/metadata";
import { ServicesPage } from "@/components/pages/services-page";

export const metadata = createMetadata({
  title: "Services | AI Marketing Agent, Strategy, Build, and Managed AI",
  description:
    "ClearForge service lines include AI Marketing Agent, AI Strategy & Market Intelligence, AI Design & Build, AI Agent Retainer, and Managed AI Services.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
