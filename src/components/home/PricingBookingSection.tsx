import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { HOME_FAQS } from "@/data/faqs";

const PRICE_ROWS = [
  {
    label: "Forge Diagnostic",
    description: "Fixed fee, 2 weeks",
    price: "The first step",
  },
  {
    label: "Eval and Reliability Audit",
    description: "For AI systems you already built",
    price: "Fixed fee, 2 weeks",
  },
  {
    label: "Forge Sprint",
    description: "10 to 14 weeks to a live system",
    price: "Scoped in the Diagnostic",
  },
  {
    label: "Forge Scale",
    description: "The Adoption Mile",
    price: "Monthly retainer",
  },
  {
    label: "Forge Run",
    description: "Managed operations",
    price: "Monthly, per system",
  },
];

/**
 * Beat (e): price anchor plus booking band, with the FAQ accordion
 * below for AI-search visibility.
 */
export function PricingBookingSection() {
  return (
    <PageFrame id="book" aria-label="Pricing and booking" bottomRule={false}>
      <SectionBand left="Engagement and booking" right="Fixed-fee start" />
      <div className="grid lg:grid-cols-[1fr_460px]">
        <div className="border-hairline lg:border-r">
          <div className="border-b border-hairline px-5 pt-8 pb-8 md:px-10 md:pt-12 md:pb-10">
            <h2 className="font-display max-w-[22ch] text-[30px] leading-[1.1] md:text-[44px]">
              The first step is a fixed-fee diagnostic. Everything after it
              is scoped before you commit.
            </h2>
            <div className="mt-8 border-t border-hairline text-[14px]">
              {PRICE_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="grid items-baseline gap-1 border-b border-hairline py-3 md:grid-cols-[200px_1fr_auto] md:gap-4"
                >
                  <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                    {row.label}
                  </span>
                  <span className="tnum text-ink/70">{row.description}</span>
                  <span className="tnum text-[16px] font-semibold">
                    {row.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-5 py-8 md:px-10">
            <p className="mb-2 text-[11px] tracking-[0.18em] text-ink/60 uppercase">
              Common questions
            </p>
            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>

        <div className="flex flex-col border-t border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-t-0">
          <p className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
            Book
          </p>
          <h3 className="font-display mt-3 max-w-[16ch] text-[28px] leading-tight md:text-[32px]">
            30 minutes with the founder.
          </h3>
          <BookCallButton size="lg" className="mt-6 self-start" />
          <ul className="mt-8 space-y-3 border-t border-hairline pt-6 text-[14px] leading-relaxed text-ink/70">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[7px] size-[6px] shrink-0 bg-cobalt" />
              We look at one workflow together, live.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[7px] size-[6px] shrink-0 bg-cobalt" />
              You leave knowing what we would build and how it gets adopted.
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[7px] size-[6px] shrink-0 bg-cobalt" />
              No preparation needed. MS Teams, 30 minutes.
            </li>
          </ul>
          <p className="mt-6 text-[13px] text-ink/60">
            Prefer a calendar view first?{" "}
            <a href="/contact" className="text-cobalt underline underline-offset-4">
              Pick a time on the booking page.
            </a>
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
