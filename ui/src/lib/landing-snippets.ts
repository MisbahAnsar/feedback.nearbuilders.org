export const FEEDBACK_ORIGIN = "https://feedback.nearbuilders.org";

export const CODE_SAMPLES = [
  {
    value: "button",
    label: "Add the button",
    code: `<script src="${FEEDBACK_ORIGIN}/embed.js" data-project="your-project-slug" defer></script>`,
  },
  {
    value: "mcp",
    label: "Review over MCP",
    code: `curl -X POST ${FEEDBACK_ORIGIN}/api/mcp \\
  -H "x-api-key: $ORG_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`,
  },
  {
    value: "rest",
    label: "Read over REST",
    code: `curl "${FEEDBACK_ORIGIN}/api/rounds/$ROUND_ID/feedback?status=unresolved&limit=100" \\
  -H "x-api-key: $ORG_KEY"`,
  },
] as const;
