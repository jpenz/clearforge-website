import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[96px] w-full border border-fog bg-white px-3 py-2 text-sm text-midnight placeholder:text-stone/80 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass disabled:cursor-not-allowed disabled:opacity-50 rounded-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
