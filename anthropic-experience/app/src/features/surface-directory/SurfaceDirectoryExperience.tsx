import { Link } from "react-router-dom";
import { publicCatalog, resolveAcceptedClaim } from "../../content/catalog";
import { imageManifest, imageSources } from "../../content/imageManifest";
import { getStageLayout } from "../../content/stageLayouts";
import { SurfacePassport } from "./SurfacePassport";
import { SurfaceTicketDirectory } from "./SurfaceTicketDirectory";
import { SurfaceWheel } from "./SurfaceWheel";
import { canonicalSurfaceOrdinal, surfaceDimensions, useSurfaceDirectoryState } from "./useSurfaceDirectoryState";

export function SurfaceDirectoryExperience({ fullFilters }: { fullFilters: boolean }) {
  const state = useSurfaceDirectoryState({ fullFilters });
  const hero = imageManifest.heroBigTopAlt;
  const sources = imageSources("heroBigTopAlt");
  const large = sources.jpeg.at(-1)!;
  const srcSet = (items: typeof sources.jpeg) => items.map(({ path, width }) => `${path} ${width}w`).join(", ");
  const displayedDimensions = fullFilters ? surfaceDimensions : surfaceDimensions.filter(([key]) => key === "family");
  const directoryLayout = getStageLayout("directory-wheel");
  if (!directoryLayout) throw new Error("Directory stage layout is missing");
  const wheelSlot = directoryLayout.slots.find(({ controlId }) => controlId === "surface-wheel-control")!;
  const ticketSlots = new Map(directoryLayout.slots.map((stageSlot) => [stageSlot.controlId, stageSlot]));

  return (
    <section
      id={fullFilters ? undefined : "main-content"}
      className={`surface-experience ${fullFilters ? "surface-experience--full" : "surface-experience--home"}`}
      aria-labelledby="surface-experience-title"
    >
      <div className="surface-experience__heading">
        <p className="kicker">DIRECTORY FIRST · ONE SHARED STATE</p>
        <h1 id="surface-experience-title">{fullFilters ? "Surface Atlas" : "THE ANTHROPIC EXPERIENCE"}</h1>
        {!fullFilters && <h2>Choose the surface that forgot the other surface</h2>}
        <p>One account does not imply one memory, tool state, repository view, execution environment, or definition of done.</p>
        <p className="surface-experience__count">{state.visibleSurfaces.length} surfaces</p>
      </div>

      <div className="surface-directory-stage">
        <picture data-stage-image-id={directoryLayout.imageId}>
          <source type="image/avif" srcSet={srcSet(sources.avif)} sizes="100vw" />
          <source type="image/webp" srcSet={srcSet(sources.webp)} sizes="100vw" />
          <img className="surface-directory-stage__art" src={large.path} srcSet={srcSet(sources.jpeg)} width={large.width} height={large.height} sizes="100vw" alt={hero.alt} {...{ fetchpriority: "high" }} />
        </picture>
        <SurfaceWheel
          surfaces={state.visibleSurfaces}
          selectedSurfaceId={state.selectedSurface?.id ?? null}
          directoryStateKey={state.search}
          onSelect={state.selectSurface}
          stageSlot={wheelSlot}
        />
        <SurfaceTicketDirectory surfaces={state.visibleSurfaces} selectedSurfaceId={state.selectedSurface?.id ?? null} onSelect={state.selectSurface} stageSlots={ticketSlots} />
      </div>

      {!fullFilters && (
        <Link className="surface-experience__atlas-link" to={`/surfaces${state.search ? `?${state.search}` : ""}`}>Open full surface atlas</Link>
      )}

      <div className="surface-filters" aria-label="Surface filters">
        <label className="search-field">Search surfaces
          <input type="search" value={state.query} onChange={(event) => state.setQuery(event.target.value)} />
        </label>
        {displayedDimensions.map(([key, label]) => {
          const options = [...new Set(publicCatalog.surfaces.map((surface) => surface[key]))].sort();
          return (
            <label key={key}>{label}
              <select value={state.filters[key]} onChange={(event) => state.setFilter(key, event.target.value)}>
                <option value="">All</option>
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          );
        })}
      </div>

      {state.visibleSurfaces.length === 0 ? (
        <p className="surface-empty" role="status">No matching surfaces.</p>
      ) : (
        <SurfacePassport surface={state.selectedSurface} />
      )}

      {fullFilters && state.visibleSurfaces.length > 0 && (
        <section className="surface-directory" aria-label="Surface directory">
          <ul>{state.visibleSurfaces.map((surface) => (
            <li key={surface.id} className="surface-card">
              <h2><button type="button" aria-pressed={state.selectedSurface?.id === surface.id} onClick={() => state.selectSurface(surface.id)}>{String(canonicalSurfaceOrdinal(surface.id)).padStart(2, "0")} · {surface.label}</button></h2>
              <p>{resolveAcceptedClaim(surface.descriptionClaimId).text}</p>
              <dl>{surfaceDimensions.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{surface[key]}</dd></div>)}</dl>
            </li>
          ))}</ul>
        </section>
      )}
    </section>
  );
}
