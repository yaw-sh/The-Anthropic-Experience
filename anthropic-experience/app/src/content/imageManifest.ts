import { z } from "zod";
import generatedManifest from "../generated/image-manifest.json";

const derivativeSchema = z.object({
  file: z.string().regex(/^public\/images\/derivatives\//),
  format: z.enum(["image/avif", "image/webp", "image/jpeg"]),
  height: z.number().int().positive(),
  path: z.string().regex(/^\/images\/derivatives\//),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  width: z.number().int().positive(),
});
const imageSchema = z.object({
  alt: z.string().min(12),
  derivatives: z.array(derivativeSchema).length(12),
  purpose: z.string().min(1),
  sourceFile: z.string().regex(/^\.\.\/design\/source-images\//),
  sourceHeight: z.number().int().positive(),
  sourceSha256: z.string().regex(/^[a-f0-9]{64}$/),
  sourceWidth: z.number().int().positive(),
}).superRefine((image, context) => {
  const formats = new Set(image.derivatives.map(({ format }) => format));
  if (formats.size !== 3) context.addIssue({ code: z.ZodIssueCode.custom, message: "Image formats incomplete" });
  if (image.derivatives.some(({ width }) => width > image.sourceWidth)) context.addIssue({ code: z.ZodIssueCode.custom, message: "Derivative upscales source" });
  for (const width of [480, 768, 1280, 1920]) {
    if (image.derivatives.filter((derivative) => derivative.width === width).length !== 3) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Incomplete derivative width: ${width}` });
    }
  }
});

const imageManifestSchema = z.record(z.string(), imageSchema).superRefine((manifest, context) => {
  if (Object.keys(manifest).length !== 10) context.addIssue({ code: z.ZodIssueCode.custom, message: "Expected ten supplied images" });
});

export const imageManifest = imageManifestSchema.parse(generatedManifest);
export type ImageId = keyof typeof generatedManifest;

export function imageSources(imageId: ImageId) {
  const image = imageManifest[imageId];
  const byFormat = (format: "image/avif" | "image/webp" | "image/jpeg") => image.derivatives.filter((item) => item.format === format).sort((a, b) => a.width - b.width);
  return {
    alt: image.alt,
    avif: byFormat("image/avif"),
    webp: byFormat("image/webp"),
    jpeg: byFormat("image/jpeg"),
  };
}
