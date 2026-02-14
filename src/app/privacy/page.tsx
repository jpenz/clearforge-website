import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ClearForge.ai privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-text-muted">
          Last updated: February 2026
        </p>

        <div className="mt-12 space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Information We Collect
            </h2>
            <p className="mt-3">
              We collect information you provide directly, including your name,
              email address, company name, and any messages you send through our
              contact forms. When you use our AI Readiness Scorecard or ROI
              Calculator, we collect your responses and email address if you
              choose to receive your full report.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              How We Use Your Information
            </h2>
            <p className="mt-3">
              We use the information we collect to respond to your inquiries,
              provide our consulting services, send you relevant content and
              updates (with your consent), and improve our website and tools. We
              do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Data Security
            </h2>
            <p className="mt-3">
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Cookies and Analytics
            </h2>
            <p className="mt-3">
              We may use cookies and similar technologies to analyze trends,
              administer the website, and gather demographic information. You can
              control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Your Rights
            </h2>
            <p className="mt-3">
              You have the right to access, correct, or delete your personal
              information. You may also opt out of marketing communications at
              any time. To exercise these rights, please contact us at{" "}
              <a
                href="mailto:privacy@clearforge.ai"
                className="text-blue hover:underline"
              >
                privacy@clearforge.ai
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this privacy policy from time to time. We will notify
              you of any changes by posting the new policy on this page and
              updating the &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary">
              Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this privacy policy, please contact us
              at{" "}
              <a
                href="mailto:privacy@clearforge.ai"
                className="text-blue hover:underline"
              >
                privacy@clearforge.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
