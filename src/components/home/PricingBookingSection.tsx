import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { BookingInline } from "@/components/functional/BookingInline";
import { HOME_FAQS } from "@/data/faqs";

const PRICE_ROWS = [
  {
    label: "Forge Diagnostic",
    description: "Fixed price, 2 weeks",
    price: "$15K",
  },
  {
    label: "Eval and Reliability Audit",
    description: "For AI systems you already built",
    price: "$15K",
  },
  {
    label: "Forge Sprint",
    description: "10 to 14 weeks to a live system",
    price: "from $75K",
  },
  {
    label: "Forge Scale",
    description: "The Adoption Mile, monthly",
    price: "$5K to $15K",
  },
  {
    label: "Forge Run",
    description: "Managed operations, per system",
    price: "$2.5K to $7.5K",
  },
];

/**
 * Beat (e): price anchor plus booking band, with the FAQ accordion
 * below for AI-search visibility.
 */
export function PricingBookingSection() {
  return (
    <PageFrame id="book" aria-label="Pricing and booking" bottomRule={false}>
      <SectionBand left="Pricing and booking" right="Start at $15K" />
      <div className="grid lg:grid-cols-[1fr_460px]">
        <div className="border-hairline lg:border-r">
          <div className="border-b border-hairline px-5 pt-8 pb-8 md:px-10 md:pt-12 md:pb-10">
            <h2 className="font-display max-w-[22ch] text-[30px] leading-[1.1] md:text-[44px]">
              The first step costs <span className="tnum">$15K.</span> Every
              price after it is published.
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
          <div className="mt-8 grow border border-hairline-strong">
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <span className="text-[10px] tracking-[0.16em] text-ink/60 uppercase">
                Book inline
              </span>
              <span className="text-[10px] tracking-[0.16em] text-ink/60 uppercase">
                Month view
              </span>
            </div>
            <BookingInline />
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
