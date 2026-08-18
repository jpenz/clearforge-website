"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";

/** The five primary links with an active-route underline cue. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "py-2.5 transition-colors",
              active
                ? "font-semibold text-cobalt underline decoration-2 underline-offset-8"
                : "hover:text-cobalt",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
