import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-teal text-white",
        secondary: "border-transparent bg-surface text-text-secondary",
        outline: "border-border text-text-secondary",
        amber: "border-transparent bg-amber/10 text-amber-hover",
        navy: "border-transparent bg-navy text-white",
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
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
