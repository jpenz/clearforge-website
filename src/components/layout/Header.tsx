import Link from 'next/link';
import { BookCallButton } from '@/components/functional/BookCallButton';
import { NavLinks } from '@/components/layout/NavLinks';
import { Container } from '@/components/ui/Container';
import { SITE_NAME } from '@/data/site';

/**
 * Full-bleed sticky bar on every page and every width. The bar is the same
 * ink as the dark bands: at 85 percent over the ghost body it composited to
 * a neutral gray strip (measured 40,46,54 against a 9,22,41 hero), so it is
 * near-solid now and the navy tint survives; the backdrop blur stays, and
 * it only does visible work once a band scrolls under it. Ghost text, the
 * cobalt button, a ghost hairline below. Six links plus one button,
 * complete at every width: at mobile the header is two tiers (brand + Book
 * button, then the six links wrapped over two rows, nothing clipped and
 * nothing behind a hamburger).
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline-ghost bg-[#030b13]/95 text-ghost backdrop-blur-md">
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
          className="flex flex-wrap items-center gap-x-6 gap-y-0 pb-2 text-[14px] font-medium md:hidden"
        >
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
