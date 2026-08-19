import type { Faq } from "@/data/faqs";

interface FaqAccordionProps {
  items: Faq[];
  /** Index of the item rendered open by default. Pass -1 for all closed. */
  defaultOpenIndex?: number;
}

/**
 * Native details/summary accordion with the + to x cue.
 * Fully readable without JavaScript.
 */
export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  return (
    <div>
      {items.map((item, index) => (
        <details
          key={item.question}
          className="faq border-b border-hairline last:border-b-0"
          open={index === defaultOpenIndex}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4">
            <span className="text-[15px] font-semibold">{item.question}</span>
            <span
              aria-hidden="true"
              className="faq-plus text-[20px] leading-none font-light text-cobalt"
            >
              +
            </span>
          </summary>
          <p className="tnum max-w-[60ch] pb-5 text-[14px] leading-relaxed text-ink/75">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
