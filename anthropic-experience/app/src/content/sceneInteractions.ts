import { z } from "zod";

const sceneMechanicSchema = z.object({
  sceneId: z.string().min(1),
  kind: z.enum([
    "printer", "surface-selector", "layer-stack", "gates", "lights", "input-reveal",
    "counters", "export-simulation", "branch-collapse", "manual-advance", "handoff-compare",
    "correction-reveal", "provider-replay",
  ]),
  label: z.string().min(1),
  labels: z.array(z.string().min(1)).min(1),
  claimIds: z.array(z.string().min(1)).min(1),
});

export type SceneMechanic = z.infer<typeof sceneMechanicSchema>;

export const sceneMechanics = z.array(sceneMechanicSchema).parse([
  { sceneId: "eight-words", kind: "printer", label: "Eight-word printer", labels: ["Unpack", "archive", "place", "files", "in", "repository", "commit", "them"], claimIds: ["claim-eight-words-body-1"] },
  { sceneId: "audit-needs-audit", kind: "counters", label: "Audit counters", labels: ["Reveal conflicting counters"], claimIds: ["claim-audit-needs-audit-body-1", "claim-audit-needs-audit-body-2", "claim-audit-needs-audit-body-3"] },
  { sceneId: "export-only", kind: "export-simulation", label: "Export-only simulation", labels: ["Run export-only simulation", "Stop at correction"], claimIds: ["claim-export-only-body-1", "claim-export-only-body-2", "claim-export-only-body-3"] },
  { sceneId: "branch-cleanup", kind: "branch-collapse", label: "Branch collapse", labels: ["Multiply branches", "Collapse to one"], claimIds: ["claim-branch-cleanup-body-1", "claim-branch-cleanup-body-2", "claim-branch-cleanup-body-3"] },
  { sceneId: "hands-off", kind: "manual-advance", label: "Manual advance", labels: ["Advance transcript", "Blackout stage"], claimIds: ["claim-hands-off-body-1", "claim-hands-off-body-2"] },
  { sceneId: "handoff-understood", kind: "handoff-compare", label: "Handoff comparison", labels: ["Open handoff", "Open later deliverable"], claimIds: ["claim-handoff-understood-body-1", "claim-handoff-understood-body-2", "claim-handoff-understood-body-3"] },
  { sceneId: "correction-loop", kind: "correction-reveal", label: "Correction reveal", labels: ["Reveal next correction"], claimIds: ["claim-correction-loop-body-1", "claim-correction-loop-body-2", "claim-correction-loop-body-3"] },
  { sceneId: "mechanism-logos", kind: "provider-replay", label: "Mechanism replay", labels: ["Claude path", "ChatGPT Pro path", "Availability", "Inspection", "Binding", "Verification"], claimIds: ["claim-mechanism-logos-body-1", "claim-mechanism-logos-body-2", "claim-mechanism-logos-body-3"] },
]);

export function getSceneMechanic(sceneId: string) {
  return sceneMechanics.find((mechanic) => mechanic.sceneId === sceneId) ?? null;
}
