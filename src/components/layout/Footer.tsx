import Link from "next/link";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { FOOTER_COLUMNS, SITE_NAME, SITE_TAGLINE } from "@/data/site";

/**
 * The columned footer, dark bookend of every page: brand block, four
 * sitemap columns (the only nav path to /discover), and a numbers bar.
 */
export function Footer() {
  return (
    <footer className="cf-dark-band relative overflow-hidden border-t border-ink">
      <div aria-hidden="true" className="cf-aurora-b" />
      <div className="relative mx-auto max-w-[1360px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]">
          <div className="max-w-[320px] md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block size-3 bg-cobalt"
              />
              <span className="text-[15px] font-semibold">{SITE_NAME}</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-ghost/70">
              {SITE_TAGLINE}. Founder-led, for mid-market companies and PE
              operating teams.
            </p>
            <p className="tnum mt-3 text-[14px] leading-relaxed text-ghost/70">
              Engagements start with a{" "}
              <span className="font-semibold text-ghost">fixed-fee</span>{" "}
              diagnostic.
            </p>
            <BookCallButton size="md" className="mt-6" />
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={`Footer: ${column.title}`}>
              <p className="text-[11px] tracking-[0.18em] text-ghost/55 uppercase">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px] font-medium">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-cobalt"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-hairline-ghost pt-5 text-[12px] text-ghost/55 md:flex-row md:items-center md:justify-between">
          <p className="tnum">
            © 2026 {SITE_NAME}
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            <Link href="/privacy" className="hover:text-ghost">
              Privacy
            </Link>
            <span aria-hidden="true" className="px-2">
              ·
            </span>
            <Link href="/terms" className="hover:text-ghost">
              Terms
            </Link>
          </p>
          <p className="tnum">
            10 to 14 weeks from kickoff to a live production system
          </p>
        </div>
      </div>
    </footer>
  );
}
