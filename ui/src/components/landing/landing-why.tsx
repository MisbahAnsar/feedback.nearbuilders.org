import type { ReactNode } from "react";
import { LandingHeading, LandingHighlight } from "@/components/landing/landing-heading";
import {
  AgentVisual,
  CreditVisual,
  JoinVisual,
  PrivacyVisual,
  RoundVisual,
  WinnersVisual,
} from "@/components/landing/landing-visuals";
import { cn } from "@/lib/utils";

interface Tile {
  key: string;
  title: string;
  body: string;
  visual: ReactNode;
  className?: string;
}

const TILES: Tile[] = [
  {
    key: "round",
    title: "A project requests a round",
    body: "Describe what to test, pick the feedback formats you want, and open the round for signups.",
    visual: <RoundVisual />,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    key: "join",
    title: "Builders sign up and test",
    body: "Builders join, try the product, and submit written notes, a recorded session or GitHub issues.",
    visual: <JoinVisual />,
  },
  {
    key: "private",
    title: "Private when you need it",
    body: "Rounds are private by default: feedback is readable only by your team and each author.",
    visual: <PrivacyVisual />,
  },
  {
    key: "winners",
    title: "Winners get recognised",
    body: "Mark the best contributors as winners, ranked, right on the participants list.",
    visual: <WinnersVisual />,
  },
  {
    key: "credit",
    title: "Credit that lasts",
    body: "Every round closes with a durable record that shows on each builder's NEAR Builders profile.",
    visual: <CreditVisual />,
  },
  {
    key: "agent",
    title: "Review with an agent",
    body: "Connect an agent over MCP with an organization key to cluster feedback and suggest what to resolve.",
    visual: <AgentVisual />,
  },
];

export function LandingWhy() {
  return (
    <section className="space-y-8" aria-labelledby="why-feedback">
      <LandingHeading
        id="why-feedback"
        eyebrow="Why feedback rounds"
        description="Real testers, a private inbox, and a record of who helped. Everything a round needs, in one place."
      >
        How a <LandingHighlight>round</LandingHighlight> works
      </LandingHeading>
      <div className="grid gap-4 lg:grid-cols-3">
        {TILES.map(({ key, title, body, visual, className }) => (
          <article
            key={key}
            className={cn("flex flex-col border border-border bg-card", className)}
          >
            {visual}
            <div className="space-y-1 border-t border-border p-5">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
