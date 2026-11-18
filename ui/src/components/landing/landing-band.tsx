import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LandingBandProps {
  tone?: "base" | "lifted";
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

export function LandingBand({
  tone = "base",
  className,
  innerClassName,
  children,
}: LandingBandProps) {
  return (
    <div
      className={cn("w-full", tone === "lifted" && "border-y border-border bg-muted/70", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
