import type { Metadata } from "next";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { BookingInline } from "@/components/functional/BookingInline";
import { ContactForm } from "@/components/functional/ContactForm";

export const metadata: Metadata = {
  title: "Book a 30-min intro",
  description:
    "Pick a time. We will look at one workflow together and tell you what we would build. 30 minutes, no preparation needed.",
};

export default function ContactPage() {
  return (
    <>
      {/* Intro band + title */}
      <PageFrame aria-label="Book an intro">
        <SectionBand left="Book" right="30 minutes · No preparation needed" />
        <div className="px-5 pt-10 pb-10 md:px-10 md:pt-16 md:pb-14">
          <h1 className="font-display text-[38px] leading-[1.1] font-medium tracking-[-0.01em] md:text-[56px] md:leading-[1.08]">
            Book a <em className="tnum text-cobalt italic">30-min intro.</em>
          </h1>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink/80">
            Pick a time. We will look at one workflow together and tell you
            what we would build.
          </p>
        </div>
      </PageFrame>

      {/* BookingInline: the embedded calendar is the primary surface */}
      <PageFrame id="booking" aria-label="Scheduling calendar">
        <div className="px-5 py-8 md:px-10 md:py-12">
          <div className="border border-ink bg-white">
            <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:px-6">
              <span className="text-[11px] tracking-[0.18em] text-ink/60 uppercase">
                BookingInline · Embedded calendar · light theme
              </span>
              <span className="text-[11px] tracking-[0.14em] text-ink/60 uppercase">
                Month view
              </span>
            </div>
            <BookingInline />
          </div>
        </div>
      </PageFrame>

      {/* Fallback form */}
      <PageFrame aria-label="Message form">
        <SectionBand left="Prefer to write first?" right="4 fields · Fallback form" />
        <div className="grid lg:grid-cols-[420px_1fr]">
          <div className="flex flex-col border-b border-hairline px-5 py-8 md:px-10 md:py-12 lg:border-r lg:border-b-0">
            <h2 className="font-display max-w-[14ch] text-[28px] leading-[1.2] font-medium md:text-[34px]">
              Send a short{" "}
              <em className="text-cobalt italic">note instead.</em>
            </h2>
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-ink/80">
              Two sentences about the workflow is enough. We will take it from
              there.
            </p>
            <p className="mt-auto pt-6 text-[13px] text-ink/70 md:pt-10">
              Replies come from the founder.
            </p>
          </div>
          <ContactForm />
        </div>
      </PageFrame>

      {/* Closing booking strip */}
      <PageFrame bottomRule={false} aria-label="Next step">
        <SectionBand left="Next step" right="Fixed price · 2 weeks" />
        <div className="flex flex-col items-start gap-8 px-5 py-10 md:px-10 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h2 className="font-display text-[30px] leading-[1.1] font-medium md:text-[40px]">
            Start with the <span className="tnum">$15K</span>{" "}
            <em className="text-cobalt italic">Diagnostic.</em>
          </h2>
          <BookCallButton size="lg" className="shrink-0 whitespace-nowrap" />
        </div>
      </PageFrame>
    </>
  );
}
