import { useState } from "react";
import { Link } from "react-router-dom";
import { resolveAcceptedClaim, type CatalogScene } from "../../content/catalog";
import { getSceneMechanic } from "../../content/sceneInteractions";

export function SceneMechanic({ scene }: { scene: CatalogScene }) {
  const mechanic = getSceneMechanic(scene.id);
  const [step, setStep] = useState(0);
  const [alternate, setAlternate] = useState(false);
  if (!mechanic) return null;
  const maxStep = mechanic.kind === "printer" ? mechanic.labels.length : Math.max(mechanic.labels.length, mechanic.claimIds.length);
  const advance = () => setStep((current) => Math.min(maxStep, current + 1));
  const activeClaims = mechanic.claimIds.slice(0, Math.max(0, Math.min(step, mechanic.claimIds.length)));

  return (
    <section className={`scene-mechanic scene-mechanic--${mechanic.kind}`} role="group" aria-label={mechanic.label}>
      <h3>{mechanic.label}</h3>
      {mechanic.kind === "printer" && (
        <>
          <output className="word-printer" role="status">{mechanic.labels.slice(0, step).join(" ")}</output>
          <button type="button" onClick={advance} disabled={step >= mechanic.labels.length}>Print next word</button>
          <button type="button" onClick={() => setStep(mechanic.labels.length)}>Print all eight words</button>
        </>
      )}
      {mechanic.kind === "surface-selector" && (
        <Link className="mechanic-link" to="/surfaces">Open shared surface directory</Link>
      )}
      {mechanic.kind === "layer-stack" && (
        <>
          <ol className="layer-stack">{mechanic.labels.slice(0, step + 1).map((label, index) => <li key={label} style={{ "--layer": index } as React.CSSProperties}>{label}</li>)}</ol>
          <button type="button" onClick={advance} disabled={step >= mechanic.labels.length - 1}>Pull apart next layer</button>
        </>
      )}
      {mechanic.kind === "gates" && (
        <>
          <ol className="gate-row">{mechanic.labels.map((label, index) => <li key={label} data-open={index < step}>{label} <strong>{index < step ? "OPEN" : "CLOSED"}</strong></li>)}</ol>
          <button type="button" onClick={advance} disabled={step >= mechanic.labels.length}>Test next gate</button>
        </>
      )}
      {mechanic.kind === "lights" && (
        <>
          <ul className="light-grid">{mechanic.labels.map((label, index) => <li key={label} data-lit={index < step}><span aria-hidden="true" />{label} <strong>{index < step ? "INTERVENTION RECORDED" : "NOT YET RECORDED"}</strong></li>)}</ul>
          <button type="button" onClick={advance} disabled={step >= mechanic.labels.length}>Reveal next intervention</button>
        </>
      )}
      {mechanic.kind === "input-reveal" && (
        <>
          <ul className="mechanic-chips">{mechanic.labels.map((label) => <li key={label}>{label}</li>)}</ul>
          <div className="task-reveal" data-covered={!alternate}><p>{resolveAcceptedClaim(mechanic.claimIds[1]).text}</p></div>
          <button type="button" onClick={() => setAlternate((value) => !value)}>{alternate ? "Restore output pile" : "Move output pile aside"}</button>
        </>
      )}
      {mechanic.kind === "counters" && (
        <>
          {step > 0 && <ul className="counter-strip">{scene.metrics.map((row) => <li key={row.labelClaimId}><span>{resolveAcceptedClaim(row.labelClaimId).text}</span><strong>{resolveAcceptedClaim(row.valueClaimId).text}</strong></li>)}</ul>}
          <button type="button" onClick={() => setStep(1)} disabled={step > 0}>Reveal conflicting counters</button>
        </>
      )}
      {mechanic.kind === "export-simulation" && (
        <>
          <p className="simulation-state" role="status">{step === 0 ? resolveAcceptedClaim(mechanic.claimIds[0]).text : step === 1 ? resolveAcceptedClaim(mechanic.claimIds[1]).text : resolveAcceptedClaim(mechanic.claimIds[2]).text}</p>
          <button type="button" onClick={advance} disabled={step >= 2}>{step === 0 ? "Run export-only simulation" : "Stop at correction"}</button>
        </>
      )}
      {mechanic.kind === "branch-collapse" && (
        <>
          <div className="branch-grid" aria-live="polite">{Array.from({ length: alternate ? 1 : 15 }, (_, index) => <span key={index}>branch-{String(index + 1).padStart(2, "0")}</span>)}</div>
          <button type="button" onClick={() => setAlternate(false)}>Multiply branches</button>
          <button type="button" onClick={() => setAlternate(true)}>Collapse to one</button>
        </>
      )}
      {mechanic.kind === "manual-advance" && (
        <>
          <div className="manual-stage" data-blackout={alternate}>{step > 0 ? <p>{resolveAcceptedClaim(mechanic.claimIds[Math.min(step - 1, mechanic.claimIds.length - 1)]).text}</p> : <p>Ready.</p>}</div>
          <button type="button" onClick={advance} disabled={step >= mechanic.claimIds.length}>Advance transcript</button>
          <button type="button" onClick={() => setAlternate((value) => !value)}>Blackout stage</button>
        </>
      )}
      {mechanic.kind === "handoff-compare" && (
        <>
          <div className="comparison-grid">{mechanic.claimIds.slice(0, alternate ? 3 : 2).map((claimId, index) => <section key={claimId}><h4>{index < 2 ? "Handoff intent" : "Later deliverable"}</h4><p>{resolveAcceptedClaim(claimId).text}</p></section>)}</div>
          <button type="button" onClick={() => setAlternate(true)}>Open later deliverable</button>
        </>
      )}
      {mechanic.kind === "correction-reveal" && (
        <>
          <ol className="correction-list">{activeClaims.map((claimId) => <li key={claimId}>{resolveAcceptedClaim(claimId).text}</li>)}</ol>
          <button type="button" onClick={advance} disabled={step >= mechanic.claimIds.length}>Reveal next correction</button>
        </>
      )}
      {mechanic.kind === "provider-replay" && (
        <>
          <div className="provider-replay">{mechanic.labels.slice(0, 2).map((provider) => <section key={provider}><h4>{provider}</h4><ol>{mechanic.labels.slice(2).map((gate, index) => <li key={gate} data-open={index < step}>{gate} <strong>{index < step ? "STEP SHOWN" : "QUEUED"}</strong></li>)}</ol></section>)}</div>
          <button type="button" onClick={advance} disabled={step >= 4}>Replay next gate</button>
        </>
      )}
      {activeClaims.length > 0 && !["correction-reveal", "manual-advance", "handoff-compare"].includes(mechanic.kind) && (
        <p className="mechanic-receipt">{resolveAcceptedClaim(activeClaims.at(-1)!).text}</p>
      )}
    </section>
  );
}
