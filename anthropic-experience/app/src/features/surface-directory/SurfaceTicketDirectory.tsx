import { type CSSProperties } from "react";
import type { CatalogSurface } from "./useSurfaceDirectoryState";
import { canonicalSurfaceOrdinal } from "./useSurfaceDirectoryState";
import type { StageSlot } from "../../content/stageLayouts";

type SurfaceTicketDirectoryProps = {
  surfaces: readonly CatalogSurface[];
  selectedSurfaceId: string | null;
  onSelect: (surfaceId: string) => void;
  stageSlots: ReadonlyMap<string, StageSlot>;
};

const ticketLabel = (surface: CatalogSurface) =>
  `${String(canonicalSurfaceOrdinal(surface.id)).padStart(2, "0")} · ${surface.label}`;

export function SurfaceTicketDirectory({ surfaces, selectedSurfaceId, onSelect, stageSlots }: SurfaceTicketDirectoryProps) {
  return (
    <div className="surface-ticket-directory" aria-label="Surface tickets">
      {surfaces.map((surface) => {
        const controlId = `surface-ticket-${surface.id.replace(/^surface-/, "")}`;
        const stageSlot = stageSlots.get(controlId);
        if (!stageSlot) throw new Error(`Missing directory ticket slot: ${controlId}`);
        return (
          <button
            className="surface-ticket"
            key={surface.id}
            type="button"
            data-stage-control-id={controlId}
            aria-pressed={surface.id === selectedSurfaceId}
            aria-label={`Ticket ${ticketLabel(surface)}`}
            style={{
              "--stage-x": `${stageSlot.x}%`,
              "--stage-y": `${stageSlot.y}%`,
              "--stage-width": `${stageSlot.width}%`,
              "--stage-height": `${stageSlot.height}%`,
            } as CSSProperties}
            onClick={() => onSelect(surface.id)}
            onFocus={(event) => event.currentTarget.scrollIntoView?.({ block: "nearest", inline: "center" })}
          >
            <span>{String(canonicalSurfaceOrdinal(surface.id)).padStart(2, "0")}</span>
            <strong>{surface.label}</strong>
            <small>{surface.family} · {surface.platform}</small>
          </button>
        );
      })}
    </div>
  );
}
