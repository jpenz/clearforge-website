import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Terms of Service — ClearForge',
  description: 'Terms and conditions governing the use of ClearForge services and website.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="dark-section py-32 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="overline">Legal</p>
          <h1 className="mt-6 text-display text-bone">Terms of Service</h1>
          <p className="mt-6 text-body-lg text-stone">Last updated: April 2026</p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-16">
          <div>
            <h2 className="text-h2">Agreement to Terms</h2>
            <p className="mt-4 text-body text-warm-gray">
              By accessing or using the ClearForge website and services, you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use our
              website or services.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Services</h2>
            <p className="mt-4 text-body text-warm-gray">
              ClearForge provides AI strategy consulting, implementation, and managed operations
              services. The specific scope, deliverables, and terms of any engagement will be
              defined in a separate statement of work or engagement letter agreed upon by both
              parties.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Intellectual Property</h2>
            <p className="mt-4 text-body text-warm-gray">
              All content on this website, including text, graphics, logos, and software, is the
              property of ClearForge or its content suppliers and is protected by intellectual
              property laws. Work product created during client engagements is governed by the terms
              of the applicable statement of work.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Confidentiality</h2>
            <p className="mt-4 text-body text-warm-gray">
              We treat all client information as confidential. We will not disclose client data,
              business processes, or engagement details without prior written consent. Case studies
              published on our website are anonymized and approved by the client before publication.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Limitation of Liability</h2>
            <p className="mt-4 text-body text-warm-gray">
              ClearForge shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use of our website or services. Our total
              liability for any claim arising out of or relating to these terms shall not exceed the
              amount paid by you to ClearForge in the twelve months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Indemnification</h2>
            <p className="mt-4 text-body text-warm-gray">
              You agree to indemnify and hold harmless ClearForge and its officers, directors,
              employees, and agents from any claims, damages, losses, or expenses arising out of
              your use of our website or services or your violation of these terms.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Governing Law</h2>
            <p className="mt-4 text-body text-warm-gray">
              These terms shall be governed by and construed in accordance with the laws of the
              State of Michigan, without regard to its conflict of law provisions. Any disputes
              arising under these terms shall be resolved in the courts located in Oakland County,
              Michigan.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Changes to Terms</h2>
            <p className="mt-4 text-body text-warm-gray">
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to this page. Your continued use of our website or services
              after changes are posted constitutes acceptance of the modified terms.
            </p>
          </div>

          <div className="border-t border-divider pt-12">
            <p className="text-body text-warm-gray">
              Questions about these terms? Contact us at{' '}
              <a
                href="mailto:james@clearforge.ai"
                className="text-brass underline underline-offset-4"
              >
                james@clearforge.ai
              </a>
              .
            </p>
            <p className="mt-4">
              <Link href="/privacy" className="text-body text-brass underline underline-offset-4">
                View Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
