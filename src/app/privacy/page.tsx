import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "ClearForge.ai privacy policy. How we collect, use, and protect your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 prose-content">
        <h1 className="text-4xl text-midnight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stone">Last updated: February 2026</p>

        <h2>Information We Collect</h2>
        <p>
          When you interact with ClearForge.ai, we may collect information you provide directly, including
          your name, email address, company information, and message content when you submit forms.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use collected information to respond to inquiries, deliver services, improve the website,
          and communicate relevant updates. We do not sell personal information.
        </p>

        <h2>Data Security</h2>
        <p>
          We maintain technical and organizational safeguards designed to protect personal data from
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Cookies</h2>
        <p>
          We use essential cookies for core functionality and may use analytics cookies for performance
          insights. You can control cookies through your browser settings.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may rely on third-party service providers for analytics, communications, and infrastructure.
          Those providers operate under their own privacy terms.
        </p>

        <h2>Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your personal data and can opt out of communications.
          For requests, contact <a href="mailto:hello@clearforge.ai">hello@clearforge.ai</a>.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may revise this policy periodically. Material changes will be published on this page with an
          updated revision date.
        </p>
      </div>
    </section>
  );
}
