import Link from "next/link";
import { NavLinks } from "@/components/layout/NavLinks";
import { BookCallButton } from "@/components/functional/BookCallButton";
import { SITE_NAME } from "@/data/site";

/**
 * White bar with a 1px solid ink bottom rule. Five links plus one button,
 * complete at every width: at mobile the header becomes two tiers
 * (brand + Book button, then the five links in a wrapping row).
 * Nothing hides behind a hamburger.
 */
export function Header() {
  return (
    <header className="border-b border-ink bg-white">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label={`${SITE_NAME} home`}
          >
            <span aria-hidden="true" className="inline-block size-3.5 bg-cobalt" />
            <span className="text-[17px] font-semibold tracking-tight">
              {SITE_NAME}
            </span>
          </Link>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 text-[14px] font-medium md:flex"
          >
            <NavLinks />
          </nav>
          <BookCallButton size="sm" />
        </div>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-5 gap-y-1 pb-3 text-[14px] font-medium md:hidden"
        >
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
