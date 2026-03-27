'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  links: { href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text-muted hover:text-text-primary active:bg-white/5"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 bg-bg-deep/98 backdrop-blur-md lg:hidden animate-fade-in">
          <nav aria-label="Mobile navigation" className="flex flex-col p-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border-subtle px-2 py-5 text-lg font-medium text-text-secondary transition-colors hover:text-text-primary active:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8">
              <Button className="w-full h-12 text-base" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Request a Proposal
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
