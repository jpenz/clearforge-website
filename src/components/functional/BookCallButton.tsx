"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CAL_LINK, CAL_NAMESPACE, CTA_LABEL } from "@/data/site";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "link" | "quiet";
type Size = "sm" | "md" | "lg";

interface BookCallButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  solid: "bg-cobalt text-white hover:bg-cobalt-press",
  outline: "border border-hairline-strong text-ink hover:border-ink",
  link: "text-cobalt underline underline-offset-4 hover:text-cobalt-press",
  quiet: "underline underline-offset-4 hover:text-cobalt",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[14px]",
  md: "px-5 py-2.5 text-[13px]",
  lg: "px-7 py-4 text-[15px]",
};

const isBoxed = (variant: Variant) => variant === "solid" || variant === "outline";

/**
 * The canonical booking button. Opens the Cal.com scheduling modal.
 * Label is always exactly "Book a 30-min intro".
 */
export function BookCallButton({
  variant = "solid",
  size = "sm",
  className,
}: BookCallButtonProps) {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { theme: "light", layout: "month_view" });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace={CAL_NAMESPACE}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"light"}'
      className={cn(
        "inline-block cursor-pointer text-center font-semibold transition-colors",
        isBoxed(variant) && sizeClasses[size],
        !isBoxed(variant) && "text-[13px]",
        variantClasses[variant],
        className,
      )}
    >
      {CTA_LABEL}
    </button>
  );
}
