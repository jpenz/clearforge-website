import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-violet text-snow",
        secondary: "border-transparent bg-zinc-800 text-zinc-400",
        outline: "border-zinc-700 text-zinc-400",
        amber: "border-transparent bg-violet/10 text-violet",
        navy: "border-transparent bg-obsidian/10 text-snow",
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
