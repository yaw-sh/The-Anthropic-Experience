import { Link } from "react-router-dom";
import { resolveAcceptedClaim } from "../../content/catalog";
import { canonicalSurfaceOrdinal, surfaceDimensions, type CatalogSurface } from "./useSurfaceDirectoryState";

export function SurfacePassport({ surface }: { surface: CatalogSurface | null }) {
  if (!surface) return null;
  return (
    <section className="surface-passport" aria-label="Surface passport">
      <p className="kicker">SELECTED PASSPORT · {String(canonicalSurfaceOrdinal(surface.id)).padStart(2, "0")}</p>
      <h2>{surface.label}</h2>
      <p>{resolveAcceptedClaim(surface.descriptionClaimId).text}</p>
      {surface.passportClaimIds.map((claimId) => <p key={claimId}>{resolveAcceptedClaim(claimId).text}</p>)}
      <dl>
        {surfaceDimensions.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{surface[key]}</dd></div>)}
      </dl>
      <p><strong>Source</strong> {surface.sourceIds.join(", ")}</p>
      <Link className="surface-passport__receipt" to={`/evidence?receipt=${surface.receiptId}&claim=${surface.descriptionClaimId}`}>Open surface receipt</Link>
    </section>
  );
}
