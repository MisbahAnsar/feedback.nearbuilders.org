import { Check, Lock, X } from "lucide-react";
import type { ReactNode } from "react";

function VisualFrame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-48 flex-1 items-center justify-center overflow-hidden bg-muted/50 p-5"
    >
      <div className="landing-dots absolute inset-0" />
      <div className="relative w-full max-w-sm">{children}</div>
      <p className="absolute bottom-2 left-3 text-3xs uppercase tracking-6 text-muted-foreground">
        {caption}
      </p>
    </div>
  );
}

function Initials({ children }: { children: string }) {
  return (
    <span className="flex size-6 items-center justify-center border border-border bg-muted text-3xs font-medium text-foreground">
      {children}
    </span>
  );
}

function Rank({ rank }: { rank: number }) {
  return (
    <span
      className={
        rank === 1
          ? "flex size-6 shrink-0 items-center justify-center bg-brand-accent text-xs font-semibold text-brand-on-accent"
          : "flex size-6 shrink-0 items-center justify-center border border-border text-xs font-semibold text-muted-foreground"
      }
    >
      {rank}
    </span>
  );
}

const INBOX = [
  { text: "The checkout button does nothing", status: "unresolved" },
  { text: "Love the new onboarding steps", status: "resolved" },
  { text: "Typo on the welcome screen", status: "resolved" },
  { text: "Same bug as the checkout one", status: "dismissed" },
];

export function RoundVisual() {
  return (
    <VisualFrame caption="Example round">
      <div className="space-y-4">
        <div className="space-y-3 border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-3xs text-muted-foreground">your-project</span>
            <span className="inline-flex items-center gap-1.5 text-3xs text-foreground">
              <span className="size-1.5 bg-brand-accent" />
              Open
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground">Try the new onboarding flow</p>
          <div className="flex flex-wrap gap-1.5">
            {["written", "recorded", "issues"].map((format) => (
              <span
                key={format}
                className="border border-border px-2 py-0.5 text-3xs text-muted-foreground"
              >
                {format}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex -space-x-px">
              {["AL", "BO", "CY"].map((initials) => (
                <Initials key={initials}>{initials}</Initials>
              ))}
            </div>
            <span className="bg-brand-accent px-2 py-1 text-3xs font-medium text-brand-on-accent">
              Join round
            </span>
          </div>
        </div>
        <div className="border border-border bg-card">
          <p className="border-b border-border px-3 py-2 text-3xs font-medium uppercase tracking-6 text-muted-foreground">
            Feedback inbox
          </p>
          <ul className="divide-y divide-border">
            {INBOX.map(({ text, status }) => (
              <li key={text} className="flex items-center justify-between gap-3 px-3 py-2 text-xs">
                <span className="truncate text-foreground">{text}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-3xs text-muted-foreground">
                  {status === "unresolved" && <span className="size-1.5 bg-brand-accent" />}
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </VisualFrame>
  );
}

export function JoinVisual() {
  return (
    <VisualFrame caption="Open to join">
      <ul className="space-y-2">
        {["No application queue", "No slot limit", "Leave any time before it closes"].map(
          (line) => (
            <li
              key={line}
              className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs text-foreground"
            >
              <Check className="size-3.5 text-brand-accent-strong" />
              {line}
            </li>
          ),
        )}
      </ul>
    </VisualFrame>
  );
}

const ACCESS = [
  { label: "Your team", note: "reads everything", allowed: true },
  { label: "Each author", note: "their own feedback", allowed: true },
  { label: "Everyone else", note: "no access", allowed: false },
];

export function PrivacyVisual() {
  return (
    <VisualFrame caption="Private round">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-foreground">
          <Lock className="size-3.5" />
          Private by default
        </div>
        <ul className="space-y-1.5">
          {ACCESS.map(({ label, note, allowed }) => (
            <li
              key={label}
              className="flex items-center gap-2 border border-border bg-card px-3 py-2 text-xs"
            >
              {allowed ? (
                <Check className="size-3.5 text-brand-accent-strong" />
              ) : (
                <X className="size-3.5 text-muted-foreground" />
              )}
              <span className="font-medium text-foreground">{label}</span>
              <span className="text-muted-foreground">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </VisualFrame>
  );
}

export function WinnersVisual() {
  return (
    <VisualFrame caption="Example winners">
      <ul className="space-y-1.5">
        {["alice.near", "bob.near", "carol.near"].map((account, index) => (
          <li
            key={account}
            className="flex items-center gap-3 border border-border bg-card px-3 py-2"
          >
            <Rank rank={index + 1} />
            <span className="font-mono text-xs text-foreground">{account}</span>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}

export function CreditVisual() {
  return (
    <VisualFrame caption="Example profile">
      <div className="space-y-3 border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <Initials>AL</Initials>
          <div>
            <p className="font-mono text-xs text-foreground">alice.near</p>
            <p className="text-3xs text-muted-foreground">Credited testers</p>
          </div>
        </div>
        <ul className="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
          {["Onboarding flow", "Checkout beta"].map((round) => (
            <li key={round} className="flex items-center gap-2">
              <Check className="size-3.5 text-brand-accent-strong" />
              {round}
            </li>
          ))}
        </ul>
      </div>
    </VisualFrame>
  );
}

export function AgentVisual() {
  return (
    <VisualFrame caption="Agent review">
      <div className="space-y-1 border border-border bg-card p-3 font-mono text-3xs leading-relaxed text-muted-foreground">
        <p>
          <span className="text-brand-accent-strong">POST</span> /api/mcp
        </p>
        <p>x-api-key: org_…</p>
        <p className="pt-1 text-foreground">suggest: resolve, dismiss or star</p>
        <p>you approve each one in the inbox</p>
      </div>
    </VisualFrame>
  );
}
