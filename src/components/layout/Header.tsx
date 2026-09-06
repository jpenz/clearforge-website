import Link from 'next/link';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { NavLinks } from '@/components/layout/NavLinks';
import { Container } from '@/components/ui/Container';
import { SITE_NAME } from '@/data/site';

/**
 * Full-bleed sticky bar on every page: deep ink at 85 percent with a
 * backdrop blur so the page shows through as it scrolls under, ghost
 * text, the cobalt button, and a ghost hairline below. Six links plus
 * one button, complete at every width: at mobile the header becomes two
 * tiers (brand + Book button, then the links in one horizontally
 * scrolling row with a right-edge fade, never a wrap) and scrolls with
 * the page, since pinning a two-tier bar on a phone viewport would cost
 * the reader a share of every screen. Nothing hides behind a hamburger.
 */
export function Header() {
  return (
    <header className="z-50 border-b border-hairline-ghost bg-[#030b13]/85 text-ghost backdrop-blur-md md:sticky md:top-0">
      <Container>
        <div className="flex h-14 items-center justify-between md:h-16">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
            <span aria-hidden="true" className="inline-block size-3.5 bg-cobalt" />
            <span className="text-[17px] font-semibold tracking-tight">{SITE_NAME}</span>
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
          className="flex items-center gap-6 overflow-x-auto pr-10 pb-3 text-[14px] font-medium whitespace-nowrap [mask-image:linear-gradient(90deg,#000_calc(100%_-_40px),transparent)] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        >
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
