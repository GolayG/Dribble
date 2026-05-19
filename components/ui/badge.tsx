import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-muted text-muted-foreground",
  primary:  "bg-primary text-white",
  success:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning:  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  outline:  "border border-border text-muted-foreground bg-transparent",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
