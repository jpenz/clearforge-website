"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps { links: { href: string; label: string }[] }

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="inline-flex h-10 w-10 items-center justify-center text-slate-500 hover:text-slate-navy" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <div className={cn("fixed inset-0 top-[72px] z-40 bg-white transition-all duration-300 lg:hidden", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-0 p-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-gray-200 px-2 py-4 text-lg font-medium text-slate-700 transition-colors hover:text-slate-navy" style={{ fontFamily: "var(--font-inter)" }}>{link.label}</Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Button variant="outline" asChild><Link href="/scorecard" onClick={() => setOpen(false)}>Take AI Scorecard</Link></Button>
            <Button asChild><Link href="/contact" onClick={() => setOpen(false)}>Book a Call</Link></Button>
          </div>
        </nav>
      </div>
    </>
  );
}
