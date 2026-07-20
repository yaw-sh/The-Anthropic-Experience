import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { publicCatalog } from "../../content/catalog";

type EvidenceDrawerProps = {
  receiptId: string;
  claimId?: string | null;
  onClose: () => void;
};

export function EvidenceDrawer({ receiptId, claimId, onClose }: EvidenceDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const receipt = publicCatalog.receipts.find(({ id }) => id === receiptId);
  const requestedClaim = publicCatalog.claims.find(({ id }) => id === claimId && (id === receipt?.excerptClaimId || receiptId === publicCatalog.claims.find((item) => item.id === id)?.receiptId));
  const excerpt = requestedClaim ?? publicCatalog.claims.find(({ id }) => id === receipt?.excerptClaimId);
  const source = publicCatalog.sources.find(({ id }) => id === excerpt?.sourceIds[0]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  if (!receipt || !source) return null;
  const corrections = receipt.correctionClaimIds.map((claimId) => publicCatalog.claims.find(({ id }) => id === claimId)).filter(Boolean);
  const binding = excerpt?.evidenceBindings[0];
  const formattedRanges = binding?.sourceRanges
    .map(({ sourceSlotId, start, end }) => `${sourceSlotId}:${start}-${end}`)
    .join(", ");

  return (
    <div className="drawer-backdrop" role="presentation">
      <div
        className="evidence-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-title"
        ref={dialogRef}
      >
        <button
          className="drawer-close"
          type="button"
          onClick={onClose}
          ref={closeRef}
          aria-label="Close evidence"
        >
          Close ×
        </button>
        <p className="kicker">{source.classification}</p>
        <h2 id="evidence-title">{receipt.title}</h2>
        <p>{receipt.summary}</p>
        <div className="source-note">
          <strong>{source.label}</strong>
          <dl className="evidence-metadata">
            <div><dt>Public location</dt><dd><code>{source.publicPath}</code></dd></div>
            <div><dt>Public hash</dt><dd><code>{source.publicHash}</code></dd></div>
            <div><dt>Fidelity</dt><dd>{source.fidelity}</dd></div>
            <div><dt>Claim state</dt><dd>{excerpt?.status ?? "unknown"}</dd></div>
            <div><dt>Limitation</dt><dd>{excerpt?.limitation ?? source.limitation}</dd></div>
            {binding && <div><dt>Exact event</dt><dd><code>{binding.eventId}</code></dd></div>}
            {binding && <div><dt>Source ranges</dt><dd><code>{formattedRanges}</code></dd></div>}
          </dl>
          <h3>{source.fidelity === "generalized" ? "Generalized summary" : "Public-safe excerpt"}</h3>
          <p>{excerpt?.text ?? source.summary}</p>
          <h3>Correction history</h3>
          {corrections.map((correction) => <p key={correction!.id}>{correction!.text}</p>)}
          <a href={`/${source.publicPath.replace(/^public\//, "")}`}>Open public source file</a>
          {binding && <Link to={`/transcripts/${binding.transcriptId}?event=${binding.eventId}`}>Open exact transcript event</Link>}
          <Link to={`/?scene=${receipt.sceneId}&mode=receipts&receipt=${receipt.id}&claim=${excerpt?.id ?? ""}`}>Back to scene</Link>
        </div>
      </div>
    </div>
  );
}
