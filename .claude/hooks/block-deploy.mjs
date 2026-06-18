let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  let cmd = "";
  try {
    cmd = (JSON.parse(input || "{}").tool_input || {}).command || "";
  } catch {}
  if (
    /(git\s+push|git\s+merge|git\s+reset\s+--hard|vercel\b|npm\s+publish|netlify\s+deploy)/i.test(
      cmd,
    )
  ) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "PreToolUse",
          permissionDecision: "deny",
          permissionDecisionReason:
            "BLOCKED: LOCAL-ONLY project. No push/merge/deploy/reset --hard.",
        },
      }),
    );
  }
  process.exit(0);
});
