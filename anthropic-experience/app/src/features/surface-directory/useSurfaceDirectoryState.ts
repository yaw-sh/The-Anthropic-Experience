import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { publicCatalog } from "../../content/catalog";

export const surfaceDimensions = [
  ["provider", "Provider"],
  ["family", "Family"],
  ["platform", "Platform"],
  ["executionContext", "Execution context"],
  ["memoryScope", "Memory scope"],
  ["toolVisibility", "Tool visibility"],
  ["stateVisibility", "State visibility"],
  ["bindingControls", "Binding controls"],
  ["verificationControls", "Verification controls"],
  ["evidenceLevel", "Evidence level"],
] as const;

export type SurfaceDimension = (typeof surfaceDimensions)[number][0];
export type CatalogSurface = (typeof publicCatalog.surfaces)[number];

type SurfaceDirectoryOptions = { fullFilters: boolean };

export function canonicalSurfaceOrdinal(surfaceId: string): number {
  return publicCatalog.surfaces.findIndex(({ id }) => id === surfaceId) + 1;
}

export function useSurfaceDirectoryState({ fullFilters }: SurfaceDirectoryOptions) {
  const [searchParams, setSearchParams] = useSearchParams();
  const serializedParams = searchParams.toString();
  const query = searchParams.get("q") ?? "";
  const filters = useMemo(() => Object.fromEntries(
    surfaceDimensions.map(([key]) => [key, searchParams.get(key) ?? ""]),
  ) as Record<SurfaceDimension, string>, [searchParams]);

  const visibleSurfaces = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const activeDimensions = fullFilters
      ? surfaceDimensions
      : surfaceDimensions.filter(([key]) => key === "family");
    return publicCatalog.surfaces.filter((surface) => {
      if (needle && !Object.values(surface).flat().join(" ").toLowerCase().includes(needle)) return false;
      return activeDimensions.every(([key]) => !filters[key] || surface[key] === filters[key]);
    });
  }, [filters, fullFilters, query]);

  const requestedSurfaceId = searchParams.get("surface");
  const selectedSurface = visibleSurfaces.find(({ id }) => id === requestedSurfaceId) ?? null;

  const updateParams = useCallback((changes: Record<string, string | null>, replace = false) => {
    const next = new URLSearchParams(serializedParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setSearchParams(next, { replace });
  }, [serializedParams, setSearchParams]);

  useEffect(() => {
    if (visibleSurfaces.length === 0 || selectedSurface) return;
    updateParams({ surface: visibleSurfaces[0].id }, true);
  }, [selectedSurface, updateParams, visibleSurfaces]);

  const setFilter = useCallback((dimension: SurfaceDimension, value: string) => {
    updateParams({ [dimension]: value || null });
  }, [updateParams]);

  return {
    fullFilters,
    search: serializedParams,
    selectedSurface,
    visibleSurfaces,
    query,
    family: filters.family,
    filters,
    setQuery: (value: string) => updateParams({ q: value || null }),
    setFamily: (value: string) => setFilter("family", value),
    setFilter,
    selectSurface: (surfaceId: string) => updateParams({ surface: surfaceId }),
  };
}
