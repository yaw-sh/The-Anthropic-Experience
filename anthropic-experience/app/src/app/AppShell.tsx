import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { publicCatalog, resolveAcceptedClaim } from "../content/catalog";
import { EvidenceRoom } from "../features/evidence-room/EvidenceRoom";
import { GuidedExperience } from "../features/guided-experience/GuidedExperience";
import { HarnessBuilder } from "../features/harness-builder/HarnessBuilder";
import { SurfaceAtlas } from "../features/surface-atlas/SurfaceAtlas";
import { TranscriptDetail, TranscriptTheater } from "../features/transcript-theater/TranscriptTheater";
import { StatusRail } from "../features/status-rail/StatusRail";
import { taskOperations } from "../content/taskOperations";
import { primaryRouteLinks } from "../content/routes";

function CasePage() {
  const { caseSlug = "" } = useParams();
  const scenes = publicCatalog.scenes.filter(({ caseSlugs }) =>
    caseSlugs.includes(caseSlug as (typeof caseSlugs)[number]),
  );
  if (scenes.length === 0) return <Navigate to="/" replace />;
  return (
    <main className="page-shell">
      <p className="kicker">CASE / {caseSlug}</p>
      <h1>{scenes[0].navLabel}</h1>
      <p className="page-lede">{resolveAcceptedClaim("claim-case-shared").text}</p>
      <div className="case-scenes">
        {scenes.map((scene) => (
          <article key={scene.id} className="record-card">
            <h2>{resolveAcceptedClaim(scene.titleClaimId).text}</h2>
            {scene.claimIds.map((claimId) => <p key={claimId}>{resolveAcceptedClaim(claimId).text}</p>)}
            <Link to={`/?mode=receipts&scene=${scene.id}&receipt=${scene.receiptId}`}>Open scene receipt</Link>
          </article>
        ))}
      </div>
    </main>
  );
}

function InfoPage({ pageId }: { pageId: "method" | "corrections" | "about" }) {
  const page = publicCatalog.pages.find(({ id }) => id === pageId)!;
  return (
    <main className="page-shell prose-page">
      <p className="kicker">PUBLIC RECORD</p>
      <h1>{page.title}</h1>
      {page.claimIds.map((claimId) => <p key={claimId}>{resolveAcceptedClaim(claimId).text}</p>)}
      {pageId === "corrections" && <p className="version-chip">Version {publicCatalog.correctionVersion}</p>}
    </main>
  );
}

export function AppShell() {
  return (
    <div className="experience-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="site-nav" aria-label="Primary">
        <Link className="site-nav__brand" to="/">THE ANTHROPIC EXPERIENCE</Link>
        <div>{primaryRouteLinks.slice(1).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div>
      </nav>
      <StatusRail operations={taskOperations} />
      <Routes>
        <Route path="/" element={<GuidedExperience />} />
        <Route path="/surfaces" element={<SurfaceAtlas />} />
        <Route path="/cases/:caseSlug" element={<CasePage />} />
        <Route path="/harness" element={<HarnessBuilder />} />
        <Route path="/transcripts" element={<TranscriptTheater />} />
        <Route path="/transcripts/:transcriptId" element={<TranscriptDetail />} />
        <Route path="/evidence" element={<EvidenceRoom />} />
        <Route path="/method" element={<InfoPage pageId="method" />} />
        <Route path="/corrections" element={<InfoPage pageId="corrections" />} />
        <Route path="/about" element={<InfoPage pageId="about" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer">
        <span>THE ANTHROPIC EXPERIENCE · PUBLIC-SAFE REVIEW CUT</span>
        <Link to="/?scene=finale#scene-finale">Generated release status</Link>
      </footer>
    </div>
  );
}
