import Link from "next/link";
import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";
import { BookCallButton } from "@/components/functional/BookCallButton";

export default function NotFound() {
  return (
    <PageFrame bottomRule={false} aria-label="Page not found">
      <SectionBand left="Error" right="404 · Page not found" />
      <div className="px-5 pt-12 pb-16 md:px-10 md:pt-20 md:pb-24">
        <p className="tnum text-[96px] leading-none font-light tracking-tight md:text-[160px]">
          404
        </p>
        <h1 className="font-display mt-8 max-w-[24ch] text-[28px] leading-[1.15] font-medium md:text-[40px]">
          This page does not exist.{" "}
          <em className="text-cobalt italic">The rest of the site does.</em>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="group text-[15px] font-semibold text-cobalt"
          >
            Back to the homepage{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            >
              →
            </span>
          </Link>
          <BookCallButton variant="quiet" />
        </div>
      </div>
    </PageFrame>
  );
}
