"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
}

const MotionLink = motion(Link);

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-[#c1121f] shadow-sm hover:shadow-md",
  secondary:
    "bg-secondary text-white hover:bg-[#222] shadow-sm hover:shadow-md",
  outline:
    "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
  ghost:
    "text-foreground hover:bg-muted",
};

const sizeStyles: Record<Size, string> = {
  sm:  "px-4 py-2 text-sm font-semibold tracking-wide",
  md:  "px-6 py-3 text-sm font-bold tracking-wider",
  lg:  "px-8 py-4 text-base font-bold tracking-widest",
  xl:  "px-10 py-5 text-lg font-bold tracking-widest",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  href,
  ...props
}: ButtonProps) {
  const shouldReduce = useReducedMotion();

  const sharedClassName = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-none uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    (disabled || loading) && "opacity-50 cursor-not-allowed",
    className
  );

  const motionProps = {
    whileHover: shouldReduce ? {} : { scale: 1.02 },
    whileTap: shouldReduce ? {} : { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  const inner = (
    <>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </span>
      )}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
    </>
  );

  if (href) {
    return (
      <MotionLink href={href} className={sharedClassName} {...motionProps}>
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      className={sharedClassName}
      disabled={disabled || loading}
      {...motionProps}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {inner}
    </motion.button>
  );
}
