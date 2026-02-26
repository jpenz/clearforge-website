"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-fog transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm" : "bg-white"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="inline-flex items-end gap-0.5" aria-label="ClearForge home">
          <span
            className="text-[1.45rem] leading-none text-midnight"
            style={{ fontFamily: "var(--font-libre-bodoni)" }}
          >
            ClearForge
          </span>
          <span className="text-[1.2rem] leading-none text-brass">.ai</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-[0.82rem] font-semibold uppercase tracking-[0.11em] text-stone transition-colors hover:text-midnight"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/scorecard">AI Scorecard</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/contact">Book a Call</Link>
          </Button>
        </div>

        <div className="flex items-center lg:hidden">
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
