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
        <h1 className="text-3xl font-bold text-slate-navy sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: February 2025</p>

        <h2>Agreement to Terms</h2>
        <p>By accessing or using the ClearForge.ai website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the website.</p>

        <h2>Services</h2>
        <p>ClearForge provides AI consulting, engineering, and managed services. Specific terms for each engagement are governed by individual service agreements. The information on this website is for general informational purposes and does not constitute a binding offer.</p>

        <h2>Intellectual Property</h2>
        <p>The content, features, and functionality of this website are owned by ClearForge and are protected by copyright, trademark, and other intellectual property laws. Client deliverables are governed by individual service agreements.</p>

        <h2>AI Readiness Scorecard</h2>
        <p>The AI Readiness Scorecard is provided for informational purposes only. Results are based on self-reported data and should not be considered a definitive assessment. For a comprehensive evaluation, we recommend a formal AI Readiness Audit.</p>

        <h2>Limitation of Liability</h2>
        <p>ClearForge shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or services.</p>

        <h2>Disclaimer</h2>
        <p>The website and its content are provided &ldquo;as is&rdquo; without warranty of any kind. Past results described in case studies do not guarantee future performance.</p>

        <h2>Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of the State of Michigan, without regard to its conflict of law provisions.</p>

        <h2>Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. We will provide notice of any material changes by posting the updated terms on this page.</p>

        <h2>Contact</h2>
        <p>For questions about these terms, contact us at <a href="mailto:hello@clearforge.ai" className="text-teal hover:text-teal-light">hello@clearforge.ai</a>.</p>
      </div>
    </section>
  );
}
