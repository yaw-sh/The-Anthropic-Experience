import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { publicCatalog } from "../../content/catalog";
import { EvidenceDrawer } from "../evidence-drawer/EvidenceDrawer";

export function EvidenceRoom() {
  const [query, setQuery] = useState("");
  const [params, setParams] = useSearchParams();
  const receiptId = params.get("receipt");
  const claimId = params.get("claim");
  const normalized = query.trim().toLowerCase();
  const sources = publicCatalog.sources.filter((source) => Object.values(source).join(" ").toLowerCase().includes(normalized));
  const claims = publicCatalog.claims.filter((claim) => [claim.id, claim.text, claim.status].join(" ").toLowerCase().includes(normalized));

  return (
    <main id="main-content" className="page-shell evidence-room">
      <p className="kicker">CLAIMS / SOURCES / LIMITATIONS</p><h1>Evidence Room</h1>
      <p className="version-chip">Correction version {publicCatalog.correctionVersion}</p>
      <label className="search-field">Search evidence<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <section aria-labelledby="sources-title"><h2 id="sources-title">Sources</h2><ul className="record-grid">{sources.map((source) => {
        const backlinks = publicCatalog.scenes.filter((scene) => scene.sourceIds.includes(source.id));
        return <li key={source.id} className="record-card"><p className="state-chip">{source.classification}</p><h3>{source.label}</h3><p>{source.summary}</p><p><strong>Public hash</strong> <code>{source.publicHash}</code></p><p><strong>Limitation</strong> {source.limitation}</p>{backlinks.slice(0, 1).map((scene) => <Link key={scene.id} to={`/?scene=${scene.id}`}>Scene backlink</Link>)}</li>;
      })}</ul></section>
      <section aria-labelledby="claims-title"><h2 id="claims-title">Claims</h2><ul className="record-grid">{claims.map((claim) => {
        const scene = publicCatalog.scenes.find((item) => item.claimIds.includes(claim.id) || item.titleClaimId === claim.id);
        return <li key={claim.id} className="record-card"><p className="state-chip">{claim.status}</p><h3>{claim.id}</h3><p>{claim.text}</p><p>Sources: {claim.sourceIds.join(", ")}</p>{scene && <Link to={`/?scene=${scene.id}`}>Scene backlink</Link>}</li>;
      })}</ul></section>
      {receiptId && <EvidenceDrawer receiptId={receiptId} claimId={claimId} onClose={() => { const next = new URLSearchParams(params); next.delete("receipt"); next.delete("claim"); setParams(next); }} />}
    </main>
  );
}
