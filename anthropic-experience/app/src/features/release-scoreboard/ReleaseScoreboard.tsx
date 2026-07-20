import { publicCatalog, resolveAcceptedClaim } from "../../content/catalog";

export function ReleaseScoreboard() {
  const headline = resolveAcceptedClaim(publicCatalog.releaseFacts[0].claimId);
  return (
    <section className="release-scoreboard" aria-label="Release scoreboard">
      <div><p className="kicker">RELEASE SCOREBOARD</p><h2>{headline.text}</h2></div>
      <ul>
        {publicCatalog.releaseFacts.map((fact) => (
          <li key={fact.id} data-status={fact.status}>
            <strong>{fact.label}</strong>
            <span><b>{fact.status === "verified" ? "VERIFIED" : "PENDING"}</b> · {resolveAcceptedClaim(fact.claimId).text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
