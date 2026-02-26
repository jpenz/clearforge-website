import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "ClearForge.ai terms of service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 prose-content">
        <h1 className="text-4xl text-midnight sm:text-5xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-stone">Last updated: February 2026</p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using ClearForge.ai, you agree to these Terms of Service. If you do not agree,
          please discontinue use of the website.
        </p>

        <h2>Services</h2>
        <p>
          ClearForge provides AI consulting, engineering, and managed services. Final commercial and delivery
          terms are defined in signed service agreements.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          Website content and functionality are owned by ClearForge and protected by intellectual property laws.
          Ownership of client deliverables is defined in each engagement contract.
        </p>

        <h2>AI Readiness Scorecard</h2>
        <p>
          Scorecard outputs are informational and based on self-reported responses. They do not replace a formal,
          scoped readiness assessment.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ClearForge is not liable for indirect, incidental, or consequential
          damages arising from website use.
        </p>

        <h2>Disclaimer</h2>
        <p>
          Website content is provided &ldquo;as is&rdquo; without warranties of any kind. Past case study outcomes do not
          guarantee future performance.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of Michigan, without regard to conflict-of-law provisions.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Revisions will be posted on this page with the updated date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href="mailto:hello@clearforge.ai">hello@clearforge.ai</a>.
        </p>
      </div>
    </section>
  );
}
