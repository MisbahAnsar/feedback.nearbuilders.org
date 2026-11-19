import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { NearBranding } from "@/components/layout/near-branding";
import { DEFAULT_LEADERBOARD_PERIOD } from "@/lib/leaderboard";

const REPOSITORY_URL = "https://github.com/NEARBuilders/feedback.nearbuilders.org";

export function PublicFooter() {
  return (
    <div className="w-full border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://nearbuilders.org"
              target="_blank"
              rel="noreferrer"
              aria-label="NEAR Builders"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BrandMark />
            </a>
            <p className="inline-flex items-center gap-1.5">
              Made with
              <Heart className="size-4 fill-brand-accent text-brand-accent" aria-label="love" />
              by{" "}
              <a
                href="https://nearbuilders.org"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                NEAR Builders
              </a>
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/how-to-integrate" className="hover:text-foreground">
              How it works
            </Link>
            <Link to="/skill" className="hover:text-foreground">
              For agents
            </Link>
            <Link
              to="/leaderboard"
              search={{ period: DEFAULT_LEADERBOARD_PERIOD }}
              className="hover:text-foreground"
            >
              Leaderboard
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>
        <NearBranding />
      </div>
    </div>
  );
}
