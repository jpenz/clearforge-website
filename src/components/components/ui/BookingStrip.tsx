import type { ReactNode } from "react";
import { PageFrame } from "@/components/ui/PageFrame";
import { BookCallButton } from "@/components/functional/BookCallButton";

interface BookingStripProps {
  headline: ReactNode;
}

/** The closing booking strip: one line of type, one button. */
export function BookingStrip({ headline }: BookingStripProps) {
  return (
    <PageFrame bottomRule={false} aria-label="Book an intro">
      <div className="flex flex-col items-start gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10">
        <p className="font-display tnum text-[26px] leading-tight md:text-[32px]">
          {headline}
        </p>
        <BookCallButton size="lg" className="shrink-0" />
      </div>
    </PageFrame>
  );
}
