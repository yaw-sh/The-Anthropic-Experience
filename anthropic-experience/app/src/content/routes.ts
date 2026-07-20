export const requiredRoutes = [
  "/",
  "/surfaces",
  "/cases/claude-github",
  "/cases/claude-build",
  "/cases/branch-cleanup",
  "/cases/chatgpt-pro",
  "/harness",
  "/transcripts",
  "/transcripts/phase-00-access-and-request",
  "/transcripts/phase-04-master-blueprint-handoff",
  "/evidence",
  "/method",
  "/corrections",
  "/about",
] as const;

export const primaryRouteLinks = [
  ["/", "Journey"],
  ["/surfaces", "Surfaces"],
  ["/transcripts", "Transcripts"],
  ["/harness", "Harness"],
  ["/evidence", "Evidence"],
  ["/method", "Method"],
  ["/corrections", "Corrections"],
  ["/about", "About"],
] as const;

