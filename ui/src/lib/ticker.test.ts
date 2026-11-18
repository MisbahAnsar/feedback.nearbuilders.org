import { describe, expect, it } from "vitest";
import { TICKER_DURATION_MS, tickerValue } from "./ticker";

describe("tickerValue", () => {
  it("starts at zero and ends on the target", () => {
    expect(tickerValue(72, 0)).toBe(0);
    expect(tickerValue(72, TICKER_DURATION_MS)).toBe(72);
  });

  it("never passes the target", () => {
    expect(tickerValue(72, TICKER_DURATION_MS * 5)).toBe(72);
  });

  it("only moves forward", () => {
    const steps = [0, 200, 400, 600, 800, 1000, 1200].map((ms) => tickerValue(100, ms));
    expect(steps).toEqual([...steps].sort((a, b) => a - b));
  });

  it("eases out, so most of the count lands early", () => {
    expect(tickerValue(100, TICKER_DURATION_MS / 2)).toBeGreaterThan(50);
  });

  it("returns zero for an empty or negative target", () => {
    expect(tickerValue(0, 600)).toBe(0);
    expect(tickerValue(-5, 600)).toBe(0);
  });
});
