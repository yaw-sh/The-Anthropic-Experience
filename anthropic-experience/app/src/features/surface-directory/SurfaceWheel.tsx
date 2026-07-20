import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { CatalogSurface } from "./useSurfaceDirectoryState";
import { canonicalSurfaceOrdinal } from "./useSurfaceDirectoryState";
import { landingRotation, wheelGradient } from "./wheelMath";
import type { StageSlot } from "../../content/stageLayouts";

const SPIN_DURATION_MS = 1200;

type SurfaceWheelProps = {
  surfaces: readonly CatalogSurface[];
  selectedSurfaceId: string | null;
  directoryStateKey: string;
  onSelect: (surfaceId: string) => void;
  stageSlot: StageSlot;
};

export function SurfaceWheel({ surfaces, selectedSurfaceId, directoryStateKey, onSelect, stageSlot }: SurfaceWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [announcement, setAnnouncement] = useState("Wheel ready.");
  const selectedIndex = surfaces.findIndex(({ id }) => id === selectedSurfaceId);
  const [focusIndex, setFocusIndex] = useState(Math.max(0, selectedIndex));
  const segments = useRef<Array<HTMLButtonElement | null>>([]);
  const timer = useRef<number | null>(null);
  const previousDirectoryStateKey = useRef(directoryStateKey);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    setFocusIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [selectedIndex, surfaces]);

  useEffect(() => {
    if (previousDirectoryStateKey.current === directoryStateKey) return;
    previousDirectoryStateKey.current = directoryStateKey;
    if (timer.current === null) return;
    window.clearTimeout(timer.current);
    timer.current = null;
    setSpinning(false);
    setAnnouncement("Spin canceled because the directory changed.");
  }, [directoryStateKey]);

  const moveFocus = (nextIndex: number) => {
    if (surfaces.length === 0) return;
    const wrapped = (nextIndex + surfaces.length) % surfaces.length;
    setFocusIndex(wrapped);
    segments.current[wrapped]?.focus();
  };

  const handleSegmentKey = (event: KeyboardEvent<HTMLButtonElement>, index: number, surface: CatalogSurface) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      moveFocus(index + 1);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      moveFocus(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(surfaces.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(surface.id);
    }
  };

  const spin = () => {
    if (spinning || surfaces.length === 0) return;
    const winnerIndex = Math.min(surfaces.length - 1, Math.floor(Math.random() * surfaces.length));
    const winner = surfaces[winnerIndex];
    const nextRotation = landingRotation(rotation, winnerIndex, surfaces.length);
    const finish = () => {
      timer.current = null;
      onSelect(winner.id);
      setSpinning(false);
      setAnnouncement(`Selected ${String(canonicalSurfaceOrdinal(winner.id)).padStart(2, "0")} · ${winner.label}.`);
    };

    setRotation(nextRotation);
    setSpinning(true);
    setAnnouncement("Spinning.");
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) finish();
    else timer.current = window.setTimeout(finish, SPIN_DURATION_MS);
  };

  const segmentAngle = surfaces.length > 0 ? 360 / surfaces.length : 360;
  const background = surfaces.length > 0 ? wheelGradient(surfaces.length) : "#d7c7a8";

  return (
    <div
      className="surface-wheel"
      data-stage-control-id={stageSlot.controlId}
      style={{
        "--stage-x": `${stageSlot.x}%`,
        "--stage-y": `${stageSlot.y}%`,
        "--stage-width": `${stageSlot.width}%`,
        "--stage-height": `${stageSlot.height}%`,
      } as CSSProperties}
    >
      <div className="surface-wheel__face-shell" aria-hidden="true">
        <span className="surface-wheel__pointer" />
      </div>
      <div
        className="surface-wheel__rotor"
        style={{ "--wheel-rotation": `${rotation}deg` } as CSSProperties}
      >
        <div className="surface-wheel__face" style={{ background }} aria-hidden="true">
          <span className="surface-wheel__hub">SURFACES</span>
        </div>
        <div className="surface-wheel__segments" role="radiogroup" aria-label="Surface wheel segments">
          {surfaces.map((surface, index) => (
            <button
              className="surface-wheel__segment"
              key={surface.id}
              ref={(node) => { segments.current[index] = node; }}
              type="button"
              role="radio"
              aria-checked={surface.id === selectedSurfaceId}
              aria-label={`Wheel segment ${String(canonicalSurfaceOrdinal(surface.id)).padStart(2, "0")} · ${surface.label}`}
              tabIndex={index === focusIndex ? 0 : -1}
              style={{
                "--segment-angle": `${index * segmentAngle + segmentAngle / 2}deg`,
                "--segment-x": `${50 + Math.sin(((index * segmentAngle + segmentAngle / 2) * Math.PI) / 180) * 35}%`,
                "--segment-y": `${50 - Math.cos(((index * segmentAngle + segmentAngle / 2) * Math.PI) / 180) * 35}%`,
              } as CSSProperties}
              onClick={() => onSelect(surface.id)}
              onKeyDown={(event) => handleSegmentKey(event, index, surface)}
              onFocus={(event) => event.currentTarget.scrollIntoView?.({ block: "nearest", inline: "center" })}
            >
              <span
                className="surface-wheel__segment-content"
                style={{ "--counter-rotation": `${-rotation}deg` } as CSSProperties}
              >
                <span>{String(canonicalSurfaceOrdinal(surface.id)).padStart(2, "0")}</span>
                <strong>{surface.label}</strong>
              </span>
            </button>
          ))}
        </div>
      </div>
      <button className="surface-wheel__spin" type="button" onClick={spin} disabled={spinning || surfaces.length === 0}>
        {spinning ? "Spinning…" : "Spin"}
      </button>
      <p className="surface-wheel__announcement" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
}
