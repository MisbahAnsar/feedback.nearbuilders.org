import { describe, expect, it } from "vitest";
import { applyFeedbackEditDraft, canSaveFeedbackEdit, isOwnFeedback } from "./feedback-edit";

describe("isOwnFeedback", () => {
  it("matches any linked wallet, not only the active one", () => {
    expect(isOwnFeedback("ballzz.near", ["misbaahansari.near"])).toBe(false);
    expect(isOwnFeedback("ballzz.near", ["misbaahansari.near", "ballzz.near"])).toBe(true);
  });
});

describe("canSaveFeedbackEdit", () => {
  it("allows saving already-submitted written feedback", () => {
    expect(
      canSaveFeedbackEdit({
        draft: "The onboarding flow dropped me after wallet connect.",
        format: "written",
        pendingUploads: 0,
        isPending: false,
      }),
    ).toBe(true);
  });

  it("blocks an empty draft, a pending upload, or an in-flight save", () => {
    const base = {
      draft: "keep me",
      format: "written" as const,
      pendingUploads: 0,
      isPending: false,
    };
    expect(canSaveFeedbackEdit({ ...base, draft: "   " })).toBe(false);
    expect(canSaveFeedbackEdit({ ...base, pendingUploads: 1 })).toBe(false);
    expect(canSaveFeedbackEdit({ ...base, isPending: true })).toBe(false);
  });

  it("blocks written drafts that still embed file data", () => {
    expect(
      canSaveFeedbackEdit({
        draft: "shot\n\n![x](data:image/png;base64,abcd)",
        format: "written",
        pendingUploads: 0,
        isPending: false,
      }),
    ).toBe(false);
  });
});

describe("applyFeedbackEditDraft", () => {
  const original = "Submitted writeup from ballzz.near.";

  it("keeps the submitted body when the editor hydrates with an empty doc", () => {
    expect(applyFeedbackEditDraft(original, "", original, 1_000, 1_100)).toBe(original);
  });

  it("keeps the submitted body when hydration rewrites stored images as file data", () => {
    const next = `${original}\n\n![shot](blob:https://localhost/1)`;
    expect(applyFeedbackEditDraft(original, next, original, 1_000, 1_100)).toBe(original);
  });

  it("accepts a real edit after the hydration window", () => {
    expect(applyFeedbackEditDraft(original, "changed", original, 1_000, 1_600)).toBe("changed");
  });
});
