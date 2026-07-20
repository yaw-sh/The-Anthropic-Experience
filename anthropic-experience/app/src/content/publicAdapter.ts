import { z } from "zod";

const sha256 = z.string().regex(/^[a-f0-9]{64}$/);
const speaker = z.enum(["operator", "assistant", "system", "tool"]);

export const publicSourceRangeSchema = z.object({
  start: z.number().int().positive(),
  end: z.number().int().positive(),
  sourceRole: speaker,
  sourceRoleStart: z.number().int().positive(),
  sourceRoleEnd: z.number().int().positive(),
  sourceSlotId: z.string().min(1),
}).superRefine((range, context) => {
  if (range.end < range.start || range.sourceRoleEnd < range.sourceRoleStart) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Source range end precedes start" });
  }
});

export const publicTranscriptEventSchema = z.object({
  approvedForPublic: z.literal(true),
  fidelity: z.literal("generalized"),
  verbatim: z.literal(false),
  id: z.string().min(1),
  transcriptId: z.string().min(1),
  index: z.number().int().positive(),
  speaker,
  text: z.string().min(1),
  sourceSlotId: z.string().min(1),
  sourceRanges: z.array(publicSourceRangeSchema).min(1),
  tags: z.array(z.string().min(1)).min(1),
  redactions: z.array(z.union([z.string(), z.record(z.unknown())])),
});

export const publicTranscriptSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  id: z.string().min(1),
  title: z.string().min(1),
  fidelity: z.literal("generalized"),
  verbatim: z.literal(false),
  generalizationNotice: z.string().min(1),
  events: z.array(publicTranscriptEventSchema).min(1),
  /** Attached by the build-time loader after hashing the exact public file bytes. */
  publicHash: sha256,
}).superRefine((transcript, context) => {
  const indexes = transcript.events.map(({ index }) => index);
  if (indexes.some((index, offset) => index !== offset + 1)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Transcript event indexes must be contiguous" });
  }
  for (const event of transcript.events) {
    if (event.transcriptId !== transcript.id) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Event transcript mismatch: ${event.id}` });
    }
    if (event.sourceRanges.some((range) => range.sourceSlotId !== event.sourceSlotId || range.sourceRole !== event.speaker)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Event source binding mismatch: ${event.id}` });
    }
  }
});

const transcriptMetadataSchema = z.object({
  eventCount: z.number().int().positive(),
  fidelity: z.literal("generalized"),
  verbatim: z.literal(false),
  id: z.string().min(1),
  phase: z.string().min(1),
  path: z.string().regex(/^transcripts\/[a-z0-9-]+\.json$/),
  publicHash: sha256,
  title: z.string().min(1),
});

export const publicEvidenceCatalogSchema = z.object({
  schemaVersion: z.literal("1.0.0"),
  contentModel: z.literal("generalized-public-process"),
  generalizationNotice: z.string().min(1),
  allowedSpeakers: z.array(speaker).length(4),
  transcripts: z.array(transcriptMetadataSchema).min(1),
});

const evidenceBundleSchema = z.object({
  catalog: publicEvidenceCatalogSchema,
  transcripts: z.array(publicTranscriptSchema).min(1),
});

export type PublicSourceRange = z.infer<typeof publicSourceRangeSchema>;
export type PublicTranscriptEvent = z.infer<typeof publicTranscriptEventSchema>;
export type PublicTranscript = z.infer<typeof publicTranscriptSchema>;
export type PublicEvidenceCatalog = z.infer<typeof publicEvidenceCatalogSchema>;

export type NormalizedEvidenceBundle = {
  schemaVersion: "1.0.0";
  contentModel: "generalized-public-process";
  generalizationNotice: string;
  transcripts: PublicTranscript[];
  events: PublicTranscriptEvent[];
};

export function validateEvidenceBundle(input: unknown): NormalizedEvidenceBundle {
  const parsed = evidenceBundleSchema.parse(input);
  const byId = new Map(parsed.transcripts.map((transcript) => [transcript.id, transcript]));
  for (const metadata of parsed.catalog.transcripts) {
    const transcript = byId.get(metadata.id);
    if (!transcript) throw new Error(`Missing transcript file: ${metadata.path}`);
    if (metadata.phase !== transcript.id || metadata.title !== transcript.title) {
      throw new Error(`Transcript metadata drift: ${metadata.id}`);
    }
    if (metadata.eventCount !== transcript.events.length) {
      throw new Error(`Transcript event count mismatch: ${metadata.id}`);
    }
    if (metadata.publicHash !== transcript.publicHash) {
      throw new Error(`Transcript public hash mismatch: ${metadata.id}`);
    }
  }
  if (byId.size !== parsed.catalog.transcripts.length) throw new Error("Unlisted transcript file");
  return {
    schemaVersion: parsed.catalog.schemaVersion,
    contentModel: parsed.catalog.contentModel,
    generalizationNotice: parsed.catalog.generalizationNotice,
    transcripts: parsed.transcripts,
    events: parsed.transcripts.flatMap(({ events }) => events),
  };
}

/** Public compatibility name for callers; it validates only the locked evidence/public interface. */
export const validateSharedCatalog = validateEvidenceBundle;
