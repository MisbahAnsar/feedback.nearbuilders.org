import { Link } from "@tanstack/react-router";
import { Button } from "@/components";
import { LandingHighlight } from "@/components/landing/landing-heading";

export function LandingCta() {
  return (
    <section className="space-y-5 border border-border bg-card px-6 py-12 text-center sm:py-16">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Ready to get <LandingHighlight>real feedback</LandingHighlight>?
      </h2>
      <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
        Sign in with your NEAR wallet to request a round, or join one as a tester.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          asChild
          size="lg"
          className="bg-brand-accent text-brand-on-accent hover:bg-brand-accent/90"
        >
          <Link to="/manage/new">request a round</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/rounds">browse open rounds</Link>
        </Button>
      </div>
    </section>
  );
}
