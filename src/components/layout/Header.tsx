import Link from 'next/link';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { NavLinks } from '@/components/layout/NavLinks';
import { Container } from '@/components/ui/Container';
import { SITE_NAME } from '@/data/site';

/**
 * Full-bleed sticky bar on every page and every width: deep ink at 85
 * percent with a backdrop blur so the page shows through as it scrolls
 * under, ghost text, the cobalt button, and a ghost hairline below. Six
 * links plus one button, complete at every width: at mobile the header is
 * two tiers (brand + Book button at 56px, then the links in one 36px
 * horizontally scrolling row with a right-edge fade, never a wrap), 92px
 * in all, so it stays under a quarter of a phone viewport. Nothing hides
 * behind a hamburger.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline-ghost bg-[#030b13]/85 text-ghost backdrop-blur-md">
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
          className="flex h-9 items-center gap-6 overflow-x-auto pr-10 text-[14px] font-medium whitespace-nowrap [mask-image:linear-gradient(90deg,#000_calc(100%_-_40px),transparent)] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        >
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
