import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BookCallButton } from '@/components/booking/book-call';
import { JsonLdScript } from '@/components/seo/json-ld-script';
import { Button } from '@/components/ui/button';
import { breadcrumbJsonLd, createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'How We Work — The ClearForge Engagement Rhythm',
  description:
    'What working with ClearForge actually looks like: the 4-week diagnostic, the production sprint, The Adoption Mile™, and the weekly rhythm that runs it all.',
  path: '/how-we-work',
});

const breadcrumbLd = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'How We Work', path: '/how-we-work' },
]);

const phases = [
  {
    marker: 'Weeks 1–4',
    name: 'Forge Diagnostic™',
    headline: 'Pick the right workflow. Honestly.',
    detail:
      'Stakeholder interviews, workflow mapping, data readiness, and a baseline you can hold us to. A named owner on your team before anything gets built. It ends in an executive readout with a go/no-go — and sometimes the honest answer is no-go.',
    outcome: 'A build plan leadership can approve — or a clear reason not to.',
  },
  {
    marker: 'Weeks 5–14',
    name: 'Forge Sprint™',
    headline: 'Build in production, not in a demo environment.',
    detail:
      'The system goes into your stack, integrated with your data and your controls. Your operator works alongside us from week one — approvals, escalations, and audit trails are designed with the people who will use them, not handed over at the end.',
    outcome: 'A working production system your team has already touched.',
  },
  {
    marker: 'Days 1–90',
    name: 'The Adoption Mile™',
    headline: 'The part most firms skip. We scope it in.',
    detail:
      'After launch: a named operator, a weekly working cadence, and a live adoption scoreboard everyone can see. We tune the workflow, retrain the models on real usage, and work the resistance points until the numbers hold.',
    outcome: '70% weekly-active usage — the bar we build to by day 90.',
  },
  {
    marker: 'Ongoing',
    name: 'Forge Scale™ — optional',
    headline: 'Keep the rhythm. Scope the next one.',
    detail:
      'Monthly performance and retraining reviews, the adoption scoreboard maintained across every live system, and the next workflow scoped from what the first one proved. Or we hand over the runbooks and leave — everything we build is yours.',
    outcome: 'Compounding value, or a clean handoff. Your call.',
  },
];

const weekRhythm = [
  {
    label: 'Scoreboard first',
    desc: 'Every week opens with the numbers — usage, throughput, exceptions — against the baseline. No narrative without data.',
  },
  {
    label: 'One working session',
    desc: 'Builders and your operator in the same room, on the live system. Decisions get made there, not in follow-up email chains.',
  },
  {
    label: 'A decision log',
    desc: 'Every tradeoff written down — what we chose, what we rejected, why. Your team inherits the reasoning, not just the code.',
  },
  {
    label: 'No status theater',
    desc: 'Every meeting ends in a decision or a demo. If a week produces neither, we tell you why and what changed.',
  },
];

const asks = [
  {
    what: 'A named workflow owner',
    why: '2–4 hours a week from the person who will run the system. Adoption starts with ownership, not training sessions.',
  },
  {
    what: 'Access to the real workflow',
    why: 'System access, sample data, and examples of stuck work — under NDA, scoped to least privilege from day one.',
  },
  {
    what: 'A decision-maker in the weekly',
    why: 'Someone who can say yes in the room. Engagements stall on approval latency more than on engineering.',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLdScript data={breadcrumbLd} />

      {/* — Hero — */}
      <section className="dark-section noise-texture relative overflow-hidden py-32 lg:py-44">
        <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">How We Work</p>
          <h1 className="mt-6 text-display max-w-3xl text-bone">
            One workflow. One owner. <span className="display-accent">A weekly rhythm.</span>
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-stone">
            No black-box delivery, no army of analysts, no report at the end. This is what the first
            ninety days actually look like — and what we need from you to make them work.
          </p>
        </div>
      </section>

      {/* — The arc — */}
      <section className="bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="overline">The Arc</p>
          <h2 className="mt-6 text-display max-w-2xl">
            From first interview to a system your team runs.
          </h2>

          <div className="mt-16">
            {phases.map((phase) => (
              <div
                key={phase.name}
                className="grid gap-6 border-t border-divider py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
              >
                <div className="lg:col-span-3">
                  <p className="metric text-sm text-brass">{phase.marker}</p>
                  <h3 className="mt-2 text-h3">{phase.name}</h3>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-h4">{phase.headline}</p>
                  <p className="mt-3 text-body text-warm-gray">{phase.detail}</p>
                </div>
                <div className="lg:col-span-3 lg:border-l lg:border-divider lg:pl-8">
                  <p className="metric text-[11px] uppercase tracking-[0.14em] text-warm-gray">
                    You leave with
                  </p>
                  <p className="mt-2 text-body-sm text-anthracite">{phase.outcome}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-divider" />
          </div>
        </div>
      </section>

      {/* — The weekly rhythm — */}
      <section className="bg-recessed py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Inside a Week</p>
              <h2 className="mt-6 text-display">
                The cadence is the <span className="display-accent">product.</span>
              </h2>
              <p className="mt-6 max-w-md text-body-lg text-warm-gray">
                Systems do not fail at launch. They fail in the quiet weeks after — when usage slips
                and nobody is watching. The rhythm is how we make sure someone always is.
              </p>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              {weekRhythm.map((item, i) => (
                <div key={item.label}>
                  <div className="py-6">
                    <h3 className="text-h4">{item.label}</h3>
                    <p className="mt-2 text-body text-warm-gray">{item.desc}</p>
                  </div>
                  {i < weekRhythm.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — What we need from you — */}
      <section className="border-t border-divider bg-parchment py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="overline">The Honest Asks</p>
              <h2 className="mt-6 text-display">What we need from you.</h2>
              <p className="mt-6 text-body text-warm-gray">
                Every failed AI rollout we have studied was missing at least one of these three. We
                will not start without them.
              </p>
            </div>
            <div className="mt-12 lg:col-span-8 lg:mt-0">
              {asks.map((ask, i) => (
                <div key={ask.what}>
                  <div className="grid gap-2 py-8 sm:grid-cols-12 sm:gap-8">
                    <div className="sm:col-span-4">
                      <p className="metric text-sm text-brass">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="mt-2 text-h4">{ask.what}</h3>
                    </div>
                    <p className="text-body text-warm-gray sm:col-span-8">{ask.why}</p>
                  </div>
                  {i < asks.length - 1 && <div className="h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* — Who does the work — */}
      <section className="bg-recessed py-24 lg:py-36">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="overline">Who Does the Work</p>
              <h2 className="mt-6 text-display">No leverage pyramid.</h2>
            </div>
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              <p className="text-body-lg text-warm-gray">
                At most firms, the partner who sold the engagement disappears after the kickoff and
                the work lands on whoever was free. Here, the person who scopes your workflow is the
                person who builds it, ships it, and sits in your weekly through The Adoption Mile™.
                You can{' '}
                <Link href="/about" className="text-brass underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass-hover">
                  meet him before you sign anything
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* — CTA — */}
      <section className="dark-section noise-texture relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
          <h2 className="text-display text-bone">See the rhythm from the inside.</h2>
          <p className="mt-6 text-body-lg text-stone">
            Thirty minutes, one workflow, an honest read on whether it is worth building.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <BookCallButton size="lg" analytics="how_we_work_book_call" />
            <Button size="lg" variant="outline-light" asChild>
              <Link href="/pricing">
                See engagements &amp; pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
