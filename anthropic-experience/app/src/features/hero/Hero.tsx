import { publicCatalog, resolveAcceptedClaim } from "../../content/catalog";

export function Hero() {
  const badgeClaim = resolveAcceptedClaim(publicCatalog.hero.badgeClaimId);
  const premiseClaim = resolveAcceptedClaim(publicCatalog.hero.premiseClaimId);
  return (
    <header className="hero">
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__copy">
        <p className="kicker">{badgeClaim.text}</p>
        <p className="hero__intro-title">Attempt three: the requested browser product.</p>
        <p className="hero__premise">{premiseClaim.text}</p>
        <button
          className="hero__jump"
          type="button"
          onClick={() =>
            document.getElementById("guided-content")?.scrollIntoView?.({ block: "start" })
          }
        >
          Enter the review
        </button>
      </div>
    </header>
  );
}
