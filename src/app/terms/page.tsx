import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "ClearForge.ai terms of service — the terms governing your use of our website and services.",
};

export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-forge-navy sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-text-muted">
          Last updated: February 2026
        </p>

        <div className="mt-12 space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Agreement to Terms
            </h2>
            <p className="mt-3">
              By accessing or using the ClearForge.ai website, you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Services
            </h2>
            <p className="mt-3">
              ClearForge provides AI consulting and implementation services.
              Specific service terms, deliverables, and pricing are defined in
              individual engagement agreements between ClearForge and each
              client.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website, including text, graphics, logos, and
              software, is the property of ClearForge.ai and is protected by
              intellectual property laws. You may not reproduce, distribute, or
              create derivative works from our content without prior written
              consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Use of Tools
            </h2>
            <p className="mt-3">
              Our interactive tools, including the AI Readiness Scorecard and ROI
              Calculator, are provided for informational purposes only. Results
              are estimates based on the information you provide and should not
              be considered guarantees of specific outcomes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Limitation of Liability
            </h2>
            <p className="mt-3">
              ClearForge.ai is provided &ldquo;as is&rdquo; without warranties
              of any kind. We shall not be liable for any indirect, incidental,
              or consequential damages arising from your use of the website or
              our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Governing Law
            </h2>
            <p className="mt-3">
              These terms shall be governed by and construed in accordance with
              the laws of the United States. Any disputes shall be resolved in
              the appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-forge-navy">
              Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about these terms, please contact us at{" "}
              <a
                href="mailto:legal@clearforge.ai"
                className="text-molten-amber hover:underline"
              >
                legal@clearforge.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
