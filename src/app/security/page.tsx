import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BookCallButton } from '@/components/booking/book-call';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Security & Data Handling | ClearForge',
  description:
    'How ClearForge handles your data: least-privilege access, your environment first, no model training on your data, human-in-the-loop controls, and clean offboarding.',
  path: '/security',
});

const breadcrumbLd = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Security', path: '/security' },
]);

const principles = [
  {
    title: 'Your environment first',
    detail:
      'Wherever possible, systems are built inside your cloud accounts, your tenant, your repositories. We hold credentials you grant, scoped to the workflow — and you can revoke them at any time.',
  },
  {
    title: 'Least-privilege access',
    detail:
      'We ask for the minimum access the workflow needs, named per system and per person. No shared logins, no standing admin rights, no access that outlives its purpose.',
  },
  {
    title: 'No training on your data',
    detail:
      'Production systems use enterprise API tiers from model providers such as Anthropic and OpenAI, whose terms exclude API data from model training. Your data prompts the model; it does not teach it.',
  },
  {
    title: 'Human-in-the-loop by design',
    detail:
      'Agents act within controls your team defines: approval gates on consequential actions, escalation paths for exceptions, and audit trails on every run. Autonomy is earned per workflow, never assumed.',
  },
  {
    title: 'Encryption as table stakes',
    detail:
      'Data encrypted in transit (TLS 1.2+) and at rest across every system we deploy or operate. Secrets live in managed vaults, never in code or documents.',
  },
  {
    title: 'Clean offboarding',
    detail:
      'When an engagement ends: access revoked, credentials rotated, working copies deleted, and everything — code, documentation, runbooks, decision logs — handed over. You own it all.',
  },
];

const lifecycle = [
  {
    stage: 'Before we start',
    detail:
      'Mutual NDA as standard. A data processing agreement when personal data is in scope. Access is scoped in writing before anything is granted.',
  },
  {
    stage: 'During the engagement',
    detail:
      'Work happens against your systems under the access you granted. Sample data used for development stays within the engagement environment. We keep a written log of what we can touch and why.',
  },
  {
    stage: 'After launch',
    detail:
      'The system runs in your environment under your controls. Our operational access during The Adoption Mile™ is read-and-tune, reviewed with your owner, and wound down as your team takes over.',
  },
];

const faq = [
  {
    question: 'Are you SOC 2 certified?',
    answer:
      'ClearForge is a senior-led boutique, not a certified data center — and we do not claim otherwise. Our engagement controls are built to align with SOC 2 principles (access management, encryption, change control, incident response), the heavyweight infrastructure lives with certified providers you already trust, and we complete security questionnaires and reviews with your IT team as part of scoping.',
  },
  {
    question: 'Which AI providers touch our data?',
    answer:
      'Only the ones scoped for your build, under enterprise API terms that exclude training on your data. Model choice is part of the diagnostic — including deploying within your existing cloud agreements (AWS Bedrock, Azure OpenAI, Google Vertex) when that is where your governance already lives.',
  },
  {
    question: 'Can our IT and security team review before we commit?',
    answer:
      'Yes — we would rather answer hard questions before the build than after. Security review is a standard part of the Forge Diagnostic, and your team keeps veto power over every access grant.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLdScript data={breadcrumbLd} />

      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-44">
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">Security &amp; Data Handling</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            Your data stays <span className="display-accent">yours.</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            AI in production means AI touching real systems and real data. Here is exactly how we
            handle that — in plain English, before your security team asks.
          </p>
        </div>
      </section>

      {/* — Principles — */}
      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">The Principles</p>
          <h2 className="mt-6 text-display max-w-2xl">Six rules every engagement runs on.</h2>
          <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div key={p.title} className="border-t border-divider pt-6">
                <p className="metric text-sm text-brass">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-h4">{p.title}</h3>
                <p className="mt-2 text-body-sm text-warm-gray">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — Lifecycle — */}
      <section className="bg-recessed py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">The Data Lifecycle</p>
              <h2 className="mt-6 text-display">Scoped in writing, start to finish.</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              {lifecycle.map((item, i) => (
                <div key={item.stage}>
                  <div className="grid gap-2 py-8 sm:grid-cols-12 sm:gap-8">
                    <h3 className="text-h4 sm:col-span-4">{item.stage}</h3>
                    <p className="text-body text-warm-gray sm:col-span-8">{item.detail}</p>
                  </div>
                  {i < lifecycle.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — Straight answers — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">Straight Answers</p>
              <h2 className="mt-6 text-display">What security teams ask us.</h2>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              {faq.map((item, i) => (
                <div key={item.question}>
                  <div className="py-8">
                    <h3 className="text-h4">{item.question}</h3>
                    <p className="mt-3 text-body text-warm-gray">{item.answer}</p>
                  </div>
                  {i < faq.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">Bring your security team to the first call.</h2>
          <p className="mt-6 text-body-lg text-stone">
            Seriously — we would rather answer the hard questions on day one. Or write to{' '}
            <a
              href="mailto:james@clearforge.ai"
              className="text-brass-light transition-colors hover:text-bone"
            >
              james@clearforge.ai
            </a>{' '}
            and we will respond within one business day.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <BookCallButton size="lg" analytics="security_book_call" />
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/how-we-work">
                See how we work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
