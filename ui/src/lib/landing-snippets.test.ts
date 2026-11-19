import { describe, expect, it } from "vitest";
import { CODE_SAMPLES, FEEDBACK_ORIGIN } from "./landing-snippets";

const sample = (value: string) => CODE_SAMPLES.find((item) => item.value === value)?.code ?? "";

describe("landing code samples", () => {
  it("has a tab for each way to use the service", () => {
    expect(CODE_SAMPLES.map((item) => item.value)).toEqual(["button", "mcp", "rest"]);
  });

  it("points the button snippet at embed.js with a project slug", () => {
    expect(sample("button")).toContain(`${FEEDBACK_ORIGIN}/embed.js`);
    expect(sample("button")).toContain("data-project=");
  });

  it("uses the documented MCP endpoint, auth header and accept header", () => {
    const mcp = sample("mcp");
    expect(mcp).toContain(`${FEEDBACK_ORIGIN}/api/mcp`);
    expect(mcp).toContain("x-api-key:");
    expect(mcp).toContain("Accept: application/json, text/event-stream");
  });

  it("reads unresolved feedback from the documented REST path", () => {
    expect(sample("rest")).toContain("/api/rounds/$ROUND_ID/feedback?status=unresolved");
  });

  it("never embeds a real key", () => {
    for (const item of CODE_SAMPLES) expect(item.code).not.toMatch(/org_[A-Za-z0-9]{6,}/);
  });
});
