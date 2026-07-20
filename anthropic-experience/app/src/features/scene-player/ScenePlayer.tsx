import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { publicCatalog, resolveAcceptedClaim, type CatalogScene } from "../../content/catalog";
import { getStageLayoutsForScene, type StageLayout } from "../../content/stageLayouts";
import type { ExperienceMode } from "../../content/schemas";
import { OutputPile } from "../output-pile/OutputPile";
import { ReleaseScoreboard } from "../release-scoreboard/ReleaseScoreboard";
import { SceneMechanic } from "../scene-mechanic/SceneMechanic";
import { ResponsiveSceneStage, type CatalogStageControl } from "../scene-stage/ResponsiveSceneStage";

type ScenePlayerProps = {
  scene: CatalogScene;
  mode: ExperienceMode;
  active?: boolean;
  onOpenReceipt: (receiptId: string, claimId?: string) => void;
};

type Representation = NonNullable<CatalogScene["comparator"]>["representations"][number];

function RepresentationVisual({ representation }: { representation: Representation }) {
  const src = representation.imagePath;
  const alt = resolveAcceptedClaim(representation.labelClaimId).text;
  return <figure>
    {src && <img src={src} alt={alt} loading="lazy" />}
    <figcaption>
      <strong>{alt}</strong>
      <span>{resolveAcceptedClaim(representation.captionClaimId).text}</span>
      <small>{resolveAcceptedClaim(representation.architectureClaimId).text} · {resolveAcceptedClaim(representation.fidelityClaimId).text}</small>
    </figcaption>
  </figure>;
}

function BeforeAfter({ representations }: NonNullable<CatalogScene["comparator"]>) {
  const [position, setPosition] = useState(50);
  const [open, setOpen] = useState(false);
  const [beforeId, setBeforeId] = useState(representations[0].id);
  const [afterId, setAfterId] = useState(representations.at(-1)!.id);
  const openButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const before = representations.find(({ id }) => id === beforeId) ?? representations[0];
  const after = representations.find(({ id }) => id === afterId) ?? representations.at(-1)!;
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const close = dialog.current?.querySelector<HTMLButtonElement>("button");
    close?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, input, a[href]') ?? []);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable.at(-1)!;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.removeEventListener("keydown", keydown); previous?.focus(); };
  }, [open]);
  const visual = (
    <div className="visual-comparator" style={{ "--comparison": `${position}%` } as React.CSSProperties}>
      <RepresentationVisual representation={before} />
      <RepresentationVisual representation={after} />
    </div>
  );
  return (
    <section className="comparator" role="group" aria-label="Visual comparator">
      <h3 id="comparator-title">Review-state comparator</h3>
      <div className="comparator__selectors">
        <label>Left representation<select value={beforeId} onChange={(event) => setBeforeId(event.target.value)}>{representations.map((representation) => <option key={representation.id} value={representation.id}>{resolveAcceptedClaim(representation.labelClaimId).text}</option>)}</select></label>
        <label>Right representation<select value={afterId} onChange={(event) => setAfterId(event.target.value)}>{representations.map((representation) => <option key={representation.id} value={representation.id}>{resolveAcceptedClaim(representation.labelClaimId).text}</option>)}</select></label>
      </div>
      {visual}
      <label>Comparison position
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowUp") {
              event.preventDefault();
              setPosition((value) => Math.min(100, value + 1));
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
              event.preventDefault();
              setPosition((value) => Math.max(0, value - 1));
            }
          }}
        />
      </label>
      <button ref={openButton} type="button" onClick={() => setOpen(true)}>Open full screen</button>
      {open && <div className="comparison-dialog-backdrop"><div ref={dialog} role="dialog" aria-modal="true" aria-label="Visual comparison" className="comparison-dialog"><button type="button" onClick={() => setOpen(false)}>Close comparison</button>{visual}</div></div>}
    </section>
  );
}

export function ScenePlayer({ scene, mode, active = false, onOpenReceipt }: ScenePlayerProps) {
  const [attemptFourOpen, setAttemptFourOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedStageControl, setSelectedStageControl] = useState<Record<string, string>>({});
  const [paperworkOpen, setPaperworkOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const layouts = getStageLayoutsForScene(scene.id).filter(({ id }) => id !== "directory-wheel");
  const claims = scene.claimIds.map(resolveAcceptedClaim);
  const title = resolveAcceptedClaim(scene.titleClaimId);
  const receipt = publicCatalog.receipts.find(({ id }) => id === scene.receiptId);
  const roastClaim = resolveAcceptedClaim(scene.roastClaimId);
  const transcriptClaim = resolveAcceptedClaim(scene.transcriptClaimId);
  const transcriptSource = publicCatalog.sources.find(({ id }) => id === transcriptClaim.sourceIds[0]);
  const limitation = resolveAcceptedClaim(scene.limitationClaimId);
  const renderedSceneClaimIds = [
    scene.titleClaimId,
    scene.interactionClaimId,
    scene.roastClaimId,
    ...scene.claimIds,
    ...scene.metrics.flatMap(({ labelClaimId, valueClaimId }) => [labelClaimId, valueClaimId]),
    ...scene.fileRows.flatMap(({ nameClaimId, bytesClaimId }) => [nameClaimId, bytesClaimId]),
    ...(scene.attemptFour ? [
      scene.attemptFour.repositoryStateClaimId,
      scene.attemptFour.headlineClaimId,
      scene.attemptFour.subheadClaimId,
      scene.attemptFour.receiptClaimId,
      ...scene.attemptFour.metricRows.flatMap(({ labelClaimId, valueClaimId }) => [labelClaimId, valueClaimId]),
    ] : []),
  ];
  const hasLimitedEvidence = renderedSceneClaimIds.some((claimId) =>
    publicCatalog.claims.some((claim) => claim.id === claimId && claim.status === "limited"),
  );

  const controlFor = (controlId: string) => publicCatalog.stageControls.find(({ id }) => id === controlId)!;
  const selectedFor = (layout: StageLayout) => {
    const selectedId = selectedStageControl[layout.id] ?? layout.slots[0]?.controlId;
    return selectedId ? controlFor(selectedId) : null;
  };
  const activateControl = (layout: StageLayout, control: CatalogStageControl) => {
    setSelectedStageControl((current) => ({ ...current, [layout.id]: control.id }));
    if (control.action === "filter") {
      const next = new URLSearchParams(searchParams);
      next.set("family", control.value);
      setSearchParams(next);
    }
    if (control.id === "paperwork-reveal") setPaperworkOpen((value) => !value);
  };
  const renderStageControl = (layout: StageLayout, control: CatalogStageControl) => {
    const label = resolveAcceptedClaim(control.labelClaimId).text;
    if (control.id === "return-to-directory") {
      const preserved = new URLSearchParams(searchParams);
      return <Link className="responsive-scene-stage__control" to={{ pathname: "/", search: preserved.toString() ? `?${preserved}` : "", hash: "#main-content" }}>{label}</Link>;
    }
    const selected = selectedFor(layout)?.id === control.id;
    return (
      <button
        className="responsive-scene-stage__control"
        type="button"
        aria-pressed={layout.kind === "static" ? undefined : selected}
        aria-expanded={control.id === "paperwork-reveal" ? paperworkOpen : undefined}
        onClick={() => activateControl(layout, control)}
      >
        {label}
      </button>
    );
  };
  const stageCompanion = (layout: StageLayout) => {
    const control = selectedFor(layout);
    const detail = control ? resolveAcceptedClaim(control.detailClaimId) : null;
    if (layout.kind === "static") return null;
    if (layout.kind === "families") return (
      <section className="stage-detail" aria-label="Surface family detail">
        <h3>{control ? resolveAcceptedClaim(control.labelClaimId).text : "Surface families"}</h3>
        {detail && <p>{detail.text}</p>}
        <Link to={`/surfaces${searchParams.toString() ? `?${searchParams}` : ""}`}>Open filtered surface directory</Link>
      </section>
    );
    if (layout.kind === "capabilities") return (
      <section className="stage-detail" aria-label="Capability inventory detail">
        <h3>{control && resolveAcceptedClaim(control.labelClaimId).text}</h3>
        {detail && <p>{detail.text}</p>}
        {control && <button type="button" onClick={() => onOpenReceipt(control.receiptId, control.detailClaimId)}>Open receipt</button>}
      </section>
    );
    if (layout.kind === "authorization") return (
      <section className="stage-detail" aria-label="Authorization chain detail">
        <p className="kicker">METHOD STAGE · NO HISTORICAL PASS/FAIL ASSERTED</p>
        <h3>{control && resolveAcceptedClaim(control.labelClaimId).text}</h3>
        {detail && <p>{detail.text}</p>}
        {control && <button type="button" onClick={() => onOpenReceipt(control.receiptId, control.detailClaimId)}>Open method receipt</button>}
      </section>
    );
    if (layout.kind === "thesis") return (
      <section className="stage-detail" aria-label="Thesis framework detail">
        <p className="stage-detail__sequence">Available → Inspected → Recognized → Later binding opportunity → Behavior → Verified outcome</p>
        <h3>{control && resolveAcceptedClaim(control.labelClaimId).text}</h3>
        {detail && <p>{detail.text}</p>}
      </section>
    );
    if (layout.kind === "responsibilities") return (
      <section className="stage-detail" aria-label="Operator responsibility detail">
        <h3>{control && resolveAcceptedClaim(control.labelClaimId).text}</h3>
        {detail && <p>{detail.text}</p>}
        {control && <button type="button" onClick={() => onOpenReceipt(control.receiptId, control.detailClaimId)}>Open responsibility evidence</button>}
      </section>
    );
    if (layout.kind === "paperwork") return (
      <section className="stage-detail" aria-label="Paperwork output detail" data-revealed={paperworkOpen}>
        {detail && <p>{detail.text}</p>}
        <OutputPile outputIds={scene.outputIds} idPrefix={scene.id} />
        {paperworkOpen && <div className="task-reveal" role="status"><h3>Requested task state: Phase 0</h3><p>The acceptance state remains unchanged.</p></div>}
      </section>
    );
    if (layout.kind === "evidence") return (
      (() => {
        const source = control ? publicCatalog.sources.find(({ id }) => id === control.sourceId) : null;
        const stageReceipt = control ? publicCatalog.receipts.find(({ id }) => id === control.receiptId) : null;
        return <section className="stage-detail" aria-label="Evidence Room detail">
          <h3>{control && resolveAcceptedClaim(control.labelClaimId).text}</h3>
          {detail && <p>{detail.text}</p>}
          {source && <p><strong>Source</strong> {source.label} · {source.classification}. <strong>Limitation</strong> {source.limitation}</p>}
          {stageReceipt && <p><strong>Receipt</strong> {stageReceipt.title}. {stageReceipt.summary}</p>}
          <Link to="/evidence">Open Evidence Room</Link>
        </section>;
      })()
    );
    if (layout.kind === "finale") return <ReleaseScoreboard />;
    return null;
  };

  return (
    <article
      id={`scene-${scene.id}`}
      className={`scene ${active ? "scene--active" : ""}`}
      data-testid="guided-section"
      data-scene-id={scene.id}
      aria-labelledby={`scene-title-${scene.id}`}
    >
      <p className="kicker">{scene.eyebrow} · {scene.navLabel}</p>
      <h2 id={`scene-title-${scene.id}`}>{title.text}</h2>
      {hasLimitedEvidence && (
        <p className="scene__evidence-status" role="note">
          <strong>LIMITED EVIDENCE</strong> · This scene includes authored synthesis or exact values that the linked generalized event does not independently establish. Open the receipt for the binding and limitation.
        </p>
      )}
      {layouts.map((layout) => (
        <ResponsiveSceneStage
          key={layout.id}
          layout={layout}
          renderControl={(control) => renderStageControl(layout, control)}
          companion={stageCompanion(layout)}
        />
      ))}
      {claims.map((item) => <div data-testid="factual-line" className="scene__factual-line" key={item.id}><p id={`factual-${item.id}`} className="scene__claim">{item.text}</p><button type="button" onClick={() => onOpenReceipt(item.receiptId, item.id)} aria-label="Open evidence" aria-describedby={`factual-${item.id}`}>Open evidence</button></div>)}
      <p className="scene__interaction"><strong>Interaction</strong> {resolveAcceptedClaim(scene.interactionClaimId).text}</p>
      {layouts.length === 0 && <SceneMechanic scene={scene} />}
      {scene.id === "build-missing-layer" && <Link className="mechanic-link" to="/harness">Build a governed contract in the harness</Link>}

      {scene.metrics.length > 0 && (
        <ul className="metric-board" aria-label={`${scene.navLabel} metrics`}>
          {scene.metrics.map((row) => (
            <li key={`${row.labelClaimId}-${row.valueClaimId}`}>
              <span>{resolveAcceptedClaim(row.labelClaimId).text}</span>
              <strong>{resolveAcceptedClaim(row.valueClaimId).text}</strong>
              <button type="button" onClick={() => onOpenReceipt(resolveAcceptedClaim(row.valueClaimId).receiptId, row.valueClaimId)}>Receipt</button>
            </li>
          ))}
        </ul>
      )}

      {scene.fileRows.length > 0 && (
        <section className="file-stack" aria-label="Fourteen-file review pack">
          <h3>14 files · blueprint delivered: 0</h3>
          <ol>
            {scene.fileRows.map((row, index) => {
              const name = resolveAcceptedClaim(row.nameClaimId);
              const bytes = resolveAcceptedClaim(row.bytesClaimId);
              const open = selectedFile === name.id;
              return <li key={name.id} style={{ "--file-index": index } as React.CSSProperties}>
                <button type="button" aria-expanded={open} onClick={() => setSelectedFile(open ? null : name.id)}>{name.text} <small>{bytes.text}</small></button>
                {open && <div className="file-stack__detail"><p>{name.text} · {bytes.text}</p><button type="button" onClick={() => onOpenReceipt(row.receiptId, name.id)}>Open file receipt</button></div>}
              </li>;
            })}
          </ol>
        </section>
      )}

      {scene.attemptFour && (
        <section className="attempt-four" aria-label="Attempt Four">
          <div className="attempt-four__repository">
            <p className="kicker">{resolveAcceptedClaim(scene.attemptFour.repositoryStateClaimId).text}</p>
            <button type="button" disabled>{resolveAcceptedClaim(scene.attemptFour.commitButtonClaimId).text}</button>
          </div>
          <button type="button" onClick={() => setAttemptFourOpen(true)} aria-expanded={attemptFourOpen}>
            {resolveAcceptedClaim(scene.attemptFour.printButtonClaimId).text}
          </button>
          {attemptFourOpen && (
            <div className="attempt-four__report">
              <p className="attempt-four__report-title">{resolveAcceptedClaim(scene.attemptFour.reportTitleClaimId).text}</p>
              <h3>{resolveAcceptedClaim(scene.attemptFour.headlineClaimId).text}</h3>
              <p>{resolveAcceptedClaim(scene.attemptFour.subheadClaimId).text}</p>
              <p className="attempt-four__receipt">{resolveAcceptedClaim(scene.attemptFour.receiptClaimId).text}</p>
              <ul className="metric-board">
                {scene.attemptFour.metricRows.map((row) => (
                  <li key={`${row.labelClaimId}-${row.valueClaimId}`}>
                    <span>{resolveAcceptedClaim(row.labelClaimId).text}</span>
                    <strong>{resolveAcceptedClaim(row.valueClaimId).text}</strong>
                  </li>
                ))}
              </ul>
              <p className="attempt-four__callback">{resolveAcceptedClaim(scene.attemptFour.callbackClaimId).text}</p>
            </div>
          )}
        </section>
      )}

      {scene.ledger.length > 0 && (
        <dl className="request-ledger" aria-label={`${scene.navLabel} requested versus produced`}>
          {scene.ledger.map((row) => (
            <div key={`${row.requestedClaimId}-${row.producedClaimId}`}>
              <dt>Requested</dt><dd>{resolveAcceptedClaim(row.requestedClaimId).text}</dd>
              <dt>Produced</dt><dd>{resolveAcceptedClaim(row.producedClaimId).text}</dd>
            </div>
          ))}
        </dl>
      )}

      {mode === "roast" && <section data-testid="scene-mode-panel" className="mode-panel mode-panel--roast"><p>{roastClaim.text}</p><button type="button" onClick={() => onOpenReceipt(scene.receiptId)}>Open evidence</button></section>}
      {mode === "receipts" && receipt && (
        <div data-testid="scene-mode-panel" className="mode-panel"><p>{receipt.summary}</p><button type="button" onClick={() => onOpenReceipt(receipt.id)}>Open {receipt.title}</button></div>
      )}
      {mode === "transcript" && (
        <blockquote data-testid="scene-mode-panel" className="mode-panel transcript-fragment"><p>{transcriptClaim.text}</p><cite>{transcriptSource?.label} · participant ###-PII-### · generalized, not verbatim</cite><button type="button" onClick={() => onOpenReceipt(scene.receiptId)}>Open evidence</button></blockquote>
      )}

      {scene.comparator && <BeforeAfter {...scene.comparator} />}
      <details className="scene__limitations"><summary>Limitations</summary><p>{limitation.text}</p></details>
    </article>
  );
}
