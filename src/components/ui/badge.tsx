import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-molten-amber focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-molten-amber text-forge-navy",
        secondary: "border-transparent bg-bg-elevated text-text-secondary",
        outline: "border-border-medium text-text-secondary",
        amber: "border-transparent bg-molten-amber/10 text-molten-amber",
        navy: "border-transparent bg-forge-navy/10 text-forge-navy",
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
