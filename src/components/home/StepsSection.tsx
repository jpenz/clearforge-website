import { BookCallButton } from '@/components/functional/BookCallButton';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { PageFrame } from '@/components/ui/PageFrame';
import { SectionBand } from '@/components/ui/SectionBand';

/**
 * The four steps in plain words, the same four stages as the catalog
 * (Diagnose, Build, Adopt, Run) without the product names, which stay on
 * /services and /pricing. This one band replaces the old services band,
 * the 70 percent band and the engagement table, which said the same
 * things three times under two sets of names.
 */
const STEPS = [
  {
    number: '1',
    name: 'Find it',
    time: '2 weeks',
    detail:
      'We study your business and list the jobs AI could take on, ranked by what each is worth. If nothing is worth building, we tell you.',
    price: 'One fixed price, agreed before we start.',
  },
  {
    number: '2',
    name: 'Build it',
    time: '10 to 14 weeks',
    detail: 'We build the AI to work with the email and software your team already uses.',
    price: 'Priced in step 1, before you commit.',
  },
  {
    number: '3',
    name: 'Get your team using it',
    time: 'First 90 days',
    detail:
      'One person from our side meets your team every week. Our goal: 7 of every 10 people using it every week by day 90.',
    price: 'A monthly fee.',
  },
  {
    number: '4',
    name: 'Keep it running',
    time: 'Every month',
    detail:
      'We check its work every day, keep it up to date, and report each month what it cost and what it brought in.',
    price: 'A monthly fee.',
  },
];

export function StepsSection() {
  return (
    <PageFrame id="services" aria-label="How it works">
      <SectionBand left="How it works" right="From first look to everyday use" />
      <div className="px-5 pt-10 md:px-10 md:pt-14">
        <h2 className="font-display max-w-[36ch] text-balance text-[clamp(28px,2.6vw,46px)] leading-[1.12] font-medium">
          Four steps. <em className="text-cobalt italic">You decide after each one.</em>
        </h2>
        <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed text-ink/80">
          About six to seven months from the first look to a system your team uses every week.
        </p>
      </div>
      <ol className="mt-8 grid border-t border-hairline md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li
            key={step.number}
            className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:odd:border-r lg:border-r lg:border-b-0 lg:py-10 lg:last:border-r-0"
          >
            <p className="font-display tnum text-[clamp(44px,3.6vw,64px)] leading-none font-medium text-cobalt">
              {step.number}
            </p>
            <h3 className="mt-4 text-[22px] leading-tight font-semibold">{step.name}</h3>
            <p className="tnum mt-1 text-[13px] tracking-[0.14em] text-ink/70 uppercase">
              {step.time}
            </p>
            <p className="mt-4 grow text-[16px] leading-relaxed text-ink/80">{step.detail}</p>
            <p className="mt-6 border-t border-hairline pt-4 text-[14px] text-ink/70">
              {step.price}
            </p>
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-5 border-t border-hairline px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-3">
          <ArrowLink href="/services">See each step in detail</ArrowLink>
          <ArrowLink href="/private-equity" size="sm">
            Own several companies? How this runs across a portfolio
          </ArrowLink>
        </div>
        <BookCallButton size="lg" />
      </div>
    </PageFrame>
  );
}
