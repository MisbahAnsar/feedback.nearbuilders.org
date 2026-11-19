import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useApiClient } from "@/app";
import { Skeleton } from "@/components";
import {
  contributionsLabel,
  DEFAULT_LEADERBOARD_PERIOD,
  leaderboardState,
} from "@/lib/leaderboard";
import { cn } from "@/lib/utils";

const TOP_COUNT = 5;

const MESSAGES = {
  empty: "No testers on the board yet. Join a round to be the first.",
  unconfigured: "The leaderboard isn't set up here yet.",
  unreachable: "The leaderboard is unavailable right now.",
  error: "Could not load the leaderboard right now.",
} as const;

export function LandingTopTesters() {
  const apiClient = useApiClient();
  const board = useQuery({
    queryKey: ["leaderboard", "all-time", TOP_COUNT],
    queryFn: () => apiClient.getLeaderboard({ period: "all-time", limit: TOP_COUNT }),
    staleTime: 60_000,
  });

  const state = board.data ? leaderboardState(board.data, board.data.data.length) : null;
  const entries = state === "ready" && board.data ? board.data.data.slice(0, TOP_COUNT) : [];
  const message = board.isError
    ? MESSAGES.error
    : state === "empty" || state === "unconfigured" || state === "unreachable"
      ? MESSAGES[state]
      : null;

  return (
    <div className="flex flex-col border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Top testers</h3>
        <span className="text-xs text-muted-foreground">All time</span>
      </div>
      {board.isPending ? (
        <div className="space-y-3 p-4" aria-busy="true">
          {[0, 1, 2].map((row) => (
            <Skeleton key={row} className="h-8 w-full" />
          ))}
        </div>
      ) : message ? (
        <p className="p-4 text-sm text-muted-foreground">{message}</p>
      ) : (
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.actor}>
              <Link
                to="/$accountId"
                params={{ accountId: entry.actor }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-accent"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center text-xs font-semibold",
                    entry.rank <= 3
                      ? "bg-brand-accent text-brand-on-accent"
                      : "border border-border text-muted-foreground",
                  )}
                >
                  {entry.rank}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-sm text-foreground">
                    {entry.actor}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {contributionsLabel(entry.eventCount)}
                  </span>
                </span>
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {entry.score}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/leaderboard"
        search={{ period: DEFAULT_LEADERBOARD_PERIOD }}
        className="mt-auto flex items-center justify-center gap-1.5 border-t border-border px-4 py-3 text-xs text-muted-foreground hover:text-foreground"
      >
        See the full leaderboard <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
