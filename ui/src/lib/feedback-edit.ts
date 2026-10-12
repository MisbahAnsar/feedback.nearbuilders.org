import { FEEDBACK_TEXT_MAX, feedbackTextLength, hasUnuploadedImage } from "./feedback-body";

const EDITOR_HYDRATION_MS = 500;

export function isOwnFeedback(authorAccountId: string, currentAccountIds: string[]): boolean {
  return currentAccountIds.includes(authorAccountId);
}

export function canSaveFeedbackEdit(input: {
  draft: string;
  format: string;
  pendingUploads: number;
  isPending: boolean;
}): boolean {
  if (input.isPending || input.pendingUploads > 0) return false;
  if (!input.draft.trim()) return false;
  if (input.format !== "written") return true;
  return feedbackTextLength(input.draft) <= FEEDBACK_TEXT_MAX && !hasUnuploadedImage(input.draft);
}

export function applyFeedbackEditDraft(
  current: string,
  next: string,
  original: string,
  openedAt: number,
  now = Date.now(),
): string {
  if (now - openedAt >= EDITOR_HYDRATION_MS) return next;
  if (!next.trim() && original.trim()) return current;
  if (hasUnuploadedImage(next) && !hasUnuploadedImage(original) && current === original) {
    return current;
  }
  return next;
}
