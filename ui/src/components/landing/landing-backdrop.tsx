import type { CSSProperties } from "react";

const SIGNALS = [
  { top: "18%", duration: "7s", delay: "0s" },
  { top: "38%", duration: "9s", delay: "2.5s" },
  { top: "58%", duration: "6.5s", delay: "1.2s" },
  { top: "78%", duration: "8s", delay: "4s" },
];

export function LandingBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="landing-grid absolute inset-0" />
      <div className="landing-signals absolute inset-0">
        {SIGNALS.map((signal) => (
          <span
            key={signal.top}
            className="landing-signal"
            style={
              {
                top: signal.top,
                "--signal-duration": signal.duration,
                "--signal-delay": signal.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="landing-glow absolute top-1/2 -right-1/10 hidden size-144 -translate-y-1/2 rounded-full lg:block" />
    </div>
  );
}
