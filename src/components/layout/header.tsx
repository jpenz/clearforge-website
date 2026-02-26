"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/services", label: "Services" },
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
        "fixed top-0 left-0 right-0 z-50 border-b border-border-subtle transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-xl" : "bg-white/90 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="inline-flex items-end gap-0.5" aria-label="ClearForge home">
          <span
            className="text-[1.3rem] font-semibold leading-none tracking-[-0.02em] text-text-primary"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            ClearForge
          </span>
          <span className="text-[1.15rem] leading-none text-blue">.ai</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-card hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/assessment">AI Assessment</Link>
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
