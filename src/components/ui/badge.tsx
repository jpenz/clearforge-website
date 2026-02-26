import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 rounded-none",
  {
    variants: {
      variant: {
        default: "border-midnight bg-midnight text-white",
        secondary: "border-fog bg-ivory text-midnight",
        outline: "border-fog bg-transparent text-stone",
        brass: "border-brass/35 bg-brass/8 text-brass",
        navy: "border-midnight/30 bg-midnight/8 text-midnight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
