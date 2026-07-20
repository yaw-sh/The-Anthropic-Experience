import { useState } from "react";
import { Link } from "react-router-dom";
import type { TaskOperation } from "../../content/taskOperations";
import { resolveAcceptedClaim } from "../../content/catalog";

export function StatusRail({ operations }: { operations: TaskOperation[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <aside className="status-rail" aria-label="Task operations" data-expanded={expanded}>
      <button className="status-rail__disclosure" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>Task operations</button>
      <p className="status-rail__title">FIVE OPERATIONS</p>
      <ol id="task-operation-list">
        {operations.map((operation) => {
          const claim = resolveAcceptedClaim(operation.claimId);
          return <li key={operation.id} data-status={operation.status}>
            <span className="status-rail__marker" aria-hidden="true" />
            <span>
              <strong>{operation.label}</strong>
              <em className="status-rail__status">{operation.statusLabel}</em>
              <small>{claim.text}</small>
              <Link aria-label={`${operation.label} evidence`} to={`/?scene=${operation.sceneId}&mode=receipts&receipt=${operation.receiptId}`}>Receipt</Link>
            </span>
          </li>;
        })}
      </ol>
    </aside>
  );
}
