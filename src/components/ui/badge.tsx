import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-blue bg-blue text-white",
        secondary: "border-border-subtle bg-bg-card text-text-primary",
        outline: "border-border-subtle bg-transparent text-text-muted",
        brass: "border-blue/35 bg-blue/8 text-blue",
        navy: "border-text-primary/20 bg-text-primary/5 text-text-primary",
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
