import { PageFrame } from "@/components/ui/PageFrame";
import { SectionBand } from "@/components/ui/SectionBand";

interface Engagement {
  index: string;
  product: string;
  stage: string;
  price: Array<{ text: string; unit?: boolean; connector?: boolean }>;
  meta: string;
  description: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    index: "01",
    product: "Forge Diagnostic",
    stage: "Diagnose",
    price: [{ text: "2" }, { text: "wks", unit: true }],
    meta: "Fixed fee · one workflow",
    description:
      "Two weeks to map the workflow, size the opportunity, and prove the system is viable before you build.",
  },
  {
    index: "02",
    product: "Forge Sprint",
    stage: "Build",
    price: [
      { text: "10" },
      { text: "to", connector: true },
      { text: "14" },
      { text: "wks", unit: true },
    ],
    meta: "Scoped in the Diagnostic",
    description:
      "From kickoff to a live production system, built into the workflow your team already runs.",
  },
  {
    index: "03",
    product: "Forge Scale · Forge Run",
    stage: "Run",
    price: [{ text: "70" }, { text: "%", unit: true }],
    meta: "Weekly-active bar by day 90 · monthly",
    description:
      "A named operator, a weekly working cadence, and a live adoption scoreboard. After the build, managed operations run as a monthly retainer, scoped to the system.",
  },
];

function PriceFigure({ price }: { price: Engagement["price"] }) {
  return (
    <p className="tnum mt-5 text-[56px] leading-none font-light tracking-tight md:text-[84px]">
      {price.map((part, index) => {
        if (part.unit) {
          return (
            <span
              key={index}
              className="align-top text-[26px] md:text-[38px]"
            >
              {part.text}
            </span>
          );
        }
        if (part.connector) {
          return (
            <span
              key={index}
              className="text-[22px] font-normal text-ink/60 md:text-[30px]"
            >
              {" "}
              {part.text}{" "}
            </span>
          );
        }
        return <span key={index}>{part.text}</span>;
      })}
    </p>
  );
}

/**
 * Beat (b): what you get. Three rows, Diagnose then Build then Run,
 * alternating around a center hairline like ruled ledger paper.
 */
export function EngagementsSection() {
  return (
    <PageFrame id="services" aria-label="What you get">
      <SectionBand left="What you get" right="Diagnose · Build · Run" />
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-[rgba(1,11,19,0.14)] lg:block"
        />
        {ENGAGEMENTS.map((engagement, index) => {
          const alignRight = index % 2 === 0;
          const text = (
            <div
              key="text"
              className={`relative border-b border-hairline px-5 py-10 lg:border-b-0 lg:py-14 ${
                alignRight
                  ? "lg:pr-14 lg:pl-10 lg:text-right"
                  : "lg:pr-10 lg:pl-14"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-[64px] hidden size-[9px] bg-cobalt lg:block ${
                  alignRight ? "right-[-4.5px]" : "left-[-4.5px]"
                }`}
              />
              <p className="tnum text-[12px] tracking-[0.18em] text-ink/60 uppercase">
                {engagement.index} / {engagement.product}
              </p>
              <h2 className="font-display mt-2 text-[28px] md:text-[34px]">
                {engagement.stage}
              </h2>
              <PriceFigure price={engagement.price} />
              <p className="tnum mt-3 text-[12px] tracking-[0.14em] text-ink/60 uppercase">
                {engagement.meta}
              </p>
              <p
                className={`tnum mt-4 max-w-[42ch] text-[15px] leading-relaxed text-ink/80 ${
                  alignRight ? "lg:ml-auto" : ""
                }`}
              >
                {engagement.description}
              </p>
            </div>
          );
          const decoration = (
            <div
              key="decoration"
              aria-hidden="true"
              className="relative hidden overflow-hidden lg:block"
            >
              {/* Watermark numeral drawn via pseudo-content: decorative only */}
              <span
                data-num={engagement.index}
                className={`font-display tnum absolute top-10 text-[220px] leading-none text-ink/5 select-none before:content-[attr(data-num)] ${
                  alignRight ? "left-12" : "right-12"
                }`}
              />
            </div>
          );
          return (
            <div key={engagement.index} className="grid lg:grid-cols-2">
              {alignRight ? [text, decoration] : [decoration, text]}
            </div>
          );
        })}
      </div>
    </PageFrame>
  );
}
