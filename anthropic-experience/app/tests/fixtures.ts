import type { PublicCatalog } from "../src/content/schemas";

export function cloneCatalog(catalog: PublicCatalog): PublicCatalog {
  return structuredClone(catalog);
}
