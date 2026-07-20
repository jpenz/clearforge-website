import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Privacy Policy — ClearForge',
  description: 'How ClearForge collects, uses, and protects your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="dark-section py-32 lg:py-48">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="overline">Legal</p>
          <h1 className="mt-6 text-display text-bone">Privacy Policy</h1>
          <p className="mt-6 text-body-lg text-stone">Last updated: July 15, 2026</p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-parchment py-24 lg:py-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 space-y-16">
          <div>
            <h2 className="text-h2">Information We Collect</h2>
            <p className="mt-4 text-body text-warm-gray">
              We collect information you provide directly to us, such as when you fill out a contact
              form, take the ClearForge Diagnostic, or communicate with us via email. This may
              include your name, email address, company name, job title, and any other information
              you choose to provide.
            </p>
            <p className="mt-4 text-body text-warm-gray">
              We automatically collect certain information when you visit our website, including
              your IP address, browser type, operating system, referring URLs, and information about
              how you interact with our site.
            </p>
            <p className="mt-4 text-body text-warm-gray">
              We may also collect website analytics events such as page views, campaign parameters,
              landing pages, scroll depth, button clicks, form submissions, and time-on-page signals
              so we can understand which content is useful and improve the site experience.
            </p>
            <p className="mt-4 text-body text-warm-gray">
              <strong className="text-anthracite">AI diagnostic tools.</strong> When you enter a
              company website address into Forge Intelligence™ (on our homepage or at /discover), we
              fetch publicly available pages from that address and process the extracted text with
              AI model providers to generate your diagnostic.
            </p>
            <p className="mt-4 text-body text-warm-gray">
              We store the inputs you provide — the URL and, for the full report, your name, work
              email, and company — together with the generated output, so we can deliver the report
              and follow up. We never fetch anything behind a login, and we rate-limit the tools to
              prevent abuse.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Service Providers We Use</h2>
            <p className="mt-4 text-body text-warm-gray">
              We share information only with the service providers that run this site, each bound by
              its own terms limiting use of your data:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                'Vercel — website hosting and delivery',
                'Supabase — secure storage of form and diagnostic submissions',
                'Anthropic and Perplexity — AI processing for the diagnostic tools, under enterprise API terms that exclude your data from model training',
                'Resend — transactional email delivery',
                'Cal.com — meeting scheduling when you book a call (processes the details you enter there under its own privacy policy)',
                'Google Analytics and Plausible — website analytics',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-warm-gray">
                  <span
                    aria-hidden="true"
                    className="metric mt-0.5 shrink-0 select-none text-[13px] text-brass"
                  >
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-body text-warm-gray">
              We do not sell your personal information, and we do not use your information to train
              AI models.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Data Retention &amp; Your Rights</h2>
            <p className="mt-4 text-body text-warm-gray">
              We keep submissions for as long as needed to respond to you and operate the business,
              and we delete or anonymize them when no longer required. You can request a copy of the
              information we hold about you, ask us to correct it, or ask us to delete it at any
              time by emailing{' '}
              <a
                href="mailto:james@clearforge.ai"
                className="text-brass underline decoration-brass/40 underline-offset-4 hover:text-brass-hover transition-colors"
              >
                james@clearforge.ai
              </a>
              . We respond within one business day.
            </p>
          </div>

          <div>
            <h2 className="text-h2">How We Use Your Information</h2>
            <ul className="mt-4 space-y-3">
              {[
                'To respond to your inquiries and provide requested services',
                'To send you information about our services that may interest you',
                'To improve and optimize our website and services',
                'To comply with legal obligations',
                'To protect our rights, privacy, safety, or property',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-warm-gray">
                  <span
                    aria-hidden="true"
                    className="metric mt-0.5 shrink-0 select-none text-[13px] text-brass"
                  >
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h2">Information Sharing</h2>
            <p className="mt-4 text-body text-warm-gray">
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information with trusted service providers who assist us in operating our
              website, conducting our business, or serving you, so long as those parties agree to
              keep this information confidential.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Data Security</h2>
            <p className="mt-4 text-body text-warm-gray">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Cookies</h2>
            <p className="mt-4 text-body text-warm-gray">
              We use cookies and similar tracking technologies to track activity on our website and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
            <p className="mt-4 text-body text-warm-gray">
              We may use privacy-conscious analytics tools, Google Analytics, first-party event
              tracking, and local or session storage to connect visits with campaign attribution and
              website conversion activity. These tools help us measure performance; they do not
              change the services we provide.
            </p>
          </div>

          <div>
            <h2 className="text-h2">Your Rights</h2>
            <p className="mt-4 text-body text-warm-gray">
              You have the right to access, correct, or delete your personal information. You may
              also opt out of receiving marketing communications from us at any time. To exercise
              these rights, contact us at{' '}
              <a
                href="mailto:james@clearforge.ai"
                className="text-brass underline underline-offset-4"
              >
                james@clearforge.ai
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-h2">Changes to This Policy</h2>
            <p className="mt-4 text-body text-warm-gray">
              We may update this privacy policy from time to time. We will notify you of any changes
              by posting the new policy on this page and updating the &quot;last updated&quot; date.
            </p>
          </div>

          <div className="border-t border-divider pt-12">
            <p className="text-body text-warm-gray">
              Questions about this policy? Contact us at{' '}
              <a
                href="mailto:james@clearforge.ai"
                className="text-brass underline underline-offset-4"
              >
                james@clearforge.ai
              </a>
              .
            </p>
            <p className="mt-4">
              <Link href="/terms" className="text-body text-brass underline underline-offset-4">
                View Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
