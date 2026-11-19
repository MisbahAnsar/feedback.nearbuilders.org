export const TICKER_DURATION_MS = 1200;

export function tickerValue(target: number, elapsedMs: number, durationMs = TICKER_DURATION_MS) {
  if (target <= 0 || elapsedMs <= 0) return 0;
  const progress = Math.min(elapsedMs / durationMs, 1);
  const eased = 1 - (1 - progress) ** 3;
  return Math.round(target * eased);
}
