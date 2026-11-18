import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useApiClient } from "@/app";
import { LandingAudience } from "@/components/landing/landing-audience";
import { LandingBackdrop } from "@/components/landing/landing-backdrop";
import { LandingBand } from "@/components/landing/landing-band";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingLiveRounds } from "@/components/landing/landing-live-rounds";
import { LandingProof } from "@/components/landing/landing-proof";
import { LandingWhy } from "@/components/landing/landing-why";
import { computeLandingStats, liveRounds } from "@/lib/landing-stats";
import { pageHead } from "@/lib/page-title";
import { roundsQueryOptions } from "@/lib/queries/rounds";

export const Route = createFileRoute("/_public/")({
  head: () =>
    pageHead(
      undefined,
      "Project owners request testing rounds, builders sign up to test and share feedback, and contributors get credit on their NEAR Builders profile.",
    ),
  component: LandingPage,
});

const LIVE_ROUNDS_LIMIT = 5;

function LandingPage() {
  const apiClient = useApiClient();
  const open = useQuery(roundsQueryOptions(apiClient, "open"));
  const closed = useQuery(roundsQueryOptions(apiClient, "closed"));
  const stats = open.data && closed.data ? computeLandingStats(open.data, closed.data) : null;

  const openRounds = open.data ? liveRounds(open.data, LIVE_ROUNDS_LIMIT) : [];

  return (
    <div>
      <LandingBand
        className="relative overflow-hidden"
        innerClassName="relative space-y-14 pt-10 pb-16 sm:space-y-20 sm:pt-16 sm:pb-20"
      >
        <LandingBackdrop />
        <LandingHero rounds={openRounds} />
        <LandingProof stats={stats} />
      </LandingBand>
      <LandingBand tone="lifted">
        <LandingLiveRounds rounds={openRounds} isLoading={open.isPending} isError={open.isError} />
      </LandingBand>
      <LandingBand>
        <LandingWhy />
      </LandingBand>
      <LandingBand tone="lifted">
        <LandingAudience />
      </LandingBand>
      <LandingBand>
        <LandingCta />
      </LandingBand>
    </div>
  );
}
