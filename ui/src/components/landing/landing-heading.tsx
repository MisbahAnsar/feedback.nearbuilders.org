import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LandingHeadingProps {
  id: string;
  eyebrow: string;
  children: ReactNode;
  description?: string;
  className?: string;
}

export function LandingHighlight({ children }: { children: ReactNode }) {
  return <span className="text-brand-accent-strong">{children}</span>;
}

export function LandingHeading({
  id,
  eyebrow,
  children,
  description,
  className,
}: LandingHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-3xs font-medium uppercase tracking-6 text-muted-foreground">{eyebrow}</p>
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{description}</p>
      )}
    </div>
  );
}
