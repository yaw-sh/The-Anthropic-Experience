import { useState } from "react";
import { publicCatalog, resolveAcceptedClaim } from "../../content/catalog";

export function OutputPile({ outputIds, idPrefix = "standalone" }: { outputIds?: readonly string[]; idPrefix?: string }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const outputs = (outputIds
    ? publicCatalog.outputs.filter(({ id }) => outputIds.includes(id))
    : [...publicCatalog.outputs]).sort((left, right) => left.order - right.order);
  const selectedOutput = publicCatalog.outputs.find(({ id }) => id === selectedId);
  const selectedDetail = selectedOutput
    ? resolveAcceptedClaim(selectedOutput.detailClaimId)
    : null;
  const pileNote = resolveAcceptedClaim(publicCatalog.outputPile.noteClaimId);

  return (
    <section className="output-pile-wrap" aria-label={`Output pile for ${idPrefix}`}>
      <div className="output-pile" aria-label="Substituted outputs">
        <h3 id={`output-pile-title-${idPrefix}`}>The output pile</h3>
        {outputs.map((output, index) => {
          const label = resolveAcceptedClaim(output.labelClaimId);
          return (
            <button
              className="output-card"
              style={{ "--pile-index": index } as React.CSSProperties}
              type="button"
              key={output.id}
              aria-describedby={`output-pile-note-${idPrefix}`}
              aria-pressed={selectedId === output.id}
              aria-controls={`output-detail-${idPrefix}`}
              onClick={() => setSelectedId(output.id)}
            >
              {label.text}
            </button>
          );
        })}
        <p id={`output-pile-note-${idPrefix}`}>{pileNote.text}</p>
      </div>
      <p id={`output-detail-${idPrefix}`} className="output-detail" role="status" aria-live="polite">
        {selectedDetail?.text ?? resolveAcceptedClaim("claim-output-prompt").text}
      </p>
      <ol className="visually-hidden" aria-label="Output inventory">
        {outputs.map((output) => {
          const label = resolveAcceptedClaim(output.labelClaimId);
          return <li key={output.id}>{label.text}. Type: {output.fileType}. Source: {output.sourceId}. Requested: {String(output.requested)}. Advanced acceptance: {String(output.advancedAcceptance)}. Receipt: {output.receiptId}.</li>;
        })}
      </ol>
    </section>
  );
}
