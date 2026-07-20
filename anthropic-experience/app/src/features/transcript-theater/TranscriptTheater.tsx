import { useEffect, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { publicCatalog, resolveAcceptedClaim } from "../../content/catalog";

function FidelityBanner() {
  return <p className="fidelity-banner" role="note">{resolveAcceptedClaim("claim-transcript-notice").text}</p>;
}

function formatRanges(sourceRanges: (typeof publicCatalog.transcripts)[number]["events"][number]["sourceRanges"]) {
  return sourceRanges.map(({ sourceSlotId, start, end }) => `${sourceSlotId}:${start}-${end}`).join(" · ");
}

export function TranscriptTheater() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const allTags = [...new Set(publicCatalog.transcripts.flatMap((transcript) => [...transcript.tags, ...transcript.events.flatMap((event) => event.tags)]))].sort();
  const visible = publicCatalog.transcripts.filter((transcript) => {
    const haystack = [
      transcript.title,
      transcript.publicHash,
      ...transcript.tags,
      ...transcript.events.flatMap((event) => [event.id, ...event.tags, formatRanges(event.sourceRanges), resolveAcceptedClaim(event.textClaimId).text]),
    ].join(" ").toLowerCase();
    const tagged = !tag || transcript.tags.includes(tag) || transcript.events.some((event) => event.tags.includes(tag));
    return tagged && haystack.includes(query.trim().toLowerCase());
  });
  return (
    <main id="main-content" className="page-shell">
      <p className="kicker">GENERALIZED SUMMARY LIBRARY</p><h1>Transcript Theater</h1><FidelityBanner />
      <label className="search-field">Search transcripts<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <label>Tag filter<select value={tag} onChange={(event) => setTag(event.target.value)}><option value="">All tags</option>{allTags.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
      <ul className="record-grid">{visible.map((transcript) => (
        <li key={transcript.id} className="record-card">
          <h2><Link to={`/transcripts/${transcript.id}?event=${transcript.events[0].id}`}>{transcript.title}</Link></h2>
          <p>{transcript.tags.map((item) => `#${item}`).join(" ")}</p>
          <p>{formatRanges(transcript.events[0].sourceRanges)}</p>
          <p>{transcript.events.length} stable event anchors · generalized · not verbatim</p>
        </li>
      ))}</ul>
    </main>
  );
}

function Comparison({ kind, transcript }: { kind: string; transcript: (typeof publicCatalog.transcripts)[number] }) {
  const all = publicCatalog.transcripts.flatMap(({ events }) => events);
  const pick = (tag: string, fallback: number) => all.find((event) => event.tags.includes(tag)) ?? all[fallback];
  let left = pick("instruction", 0);
  let right = transcript.events.find((event) => event.index > left.index) ?? pick("operation", 1);
  let leftLabel = "Instruction";
  let rightLabel = "Next recorded action";
  if (kind === "handoff-deliverable") {
    const handoff = publicCatalog.transcripts.find(({ id }) => id === "phase-04-master-blueprint-handoff")!;
    left = handoff.events.find((event) => event.tags.includes("instruction") && event.index >= 5) ?? handoff.events[0];
    right = handoff.events.find((event) => event.tags.includes("completion")) ?? handoff.events[1];
    leftLabel = "Handoff request";
    rightLabel = "Recorded deliverable";
  } else if (kind === "admission-next") {
    left = pick("admission", 0);
    const transcriptWithAdmission = publicCatalog.transcripts.find(({ events }) => events.some(({ id }) => id === left.id))!;
    right = transcriptWithAdmission.events.find((event) => event.index > left.index) ?? pick("completion", 1);
    leftLabel = "Admission";
    rightLabel = "Next action";
  }
  return <div className="comparison-grid" data-testid="event-comparison">
    <section><h2>{leftLabel}</h2><p>{resolveAcceptedClaim(left.textClaimId).text}</p><small>{left.id}</small></section>
    <section><h2>{rightLabel}</h2><p>{resolveAcceptedClaim(right.textClaimId).text}</p><small>{right.id}</small></section>
  </div>;
}

export function TranscriptDetail() {
  const { transcriptId } = useParams();
  const [searchParams] = useSearchParams();
  const [comparison, setComparison] = useState("instruction-action");
  const transcript = publicCatalog.transcripts.find(({ id }) => id === transcriptId);
  const requestedEventId = searchParams.get("event");
  const addressedEventId = transcript?.events.some(({ id }) => id === requestedEventId) ? requestedEventId : null;
  useEffect(() => {
    if (!addressedEventId) return;
    const event = document.getElementById(addressedEventId);
    event?.focus({ preventScroll: true });
    event?.scrollIntoView?.({ block: "start" });
  }, [addressedEventId]);
  if (!transcript) return <Navigate to="/transcripts" replace />;
  return (
    <main id="main-content" className="page-shell">
      <p className="kicker">TRANSCRIPT / {transcript.id}</p><h1>{transcript.title}</h1><FidelityBanner />
      <p className="transcript-fidelity"><strong>Fidelity:</strong> generalized · <strong>Verbatim:</strong> false · <strong>Public hash:</strong> <code>{transcript.publicHash}</code></p>
      <label>Comparison<select value={comparison} onChange={(event) => setComparison(event.target.value)}><option value="instruction-action">Instruction / next action</option><option value="handoff-deliverable">Handoff / deliverable</option><option value="admission-next">Admission / next action</option></select></label>
      <Comparison kind={comparison} transcript={transcript} />
      <div className="transcript-events">{transcript.events.map((event) => (
        <article id={event.id} key={event.id} className="transcript-event" tabIndex={-1} aria-current={addressedEventId === event.id ? "true" : undefined}>
          <p className="anchor-label">Stable anchor · {event.id} · {event.role} · #{event.tags.join(" #")} · {formatRanges(event.sourceRanges)}</p>
          <p>{resolveAcceptedClaim(event.textClaimId).text}</p>
          <p><strong>Fidelity:</strong> {event.fidelity} · <strong>Verbatim:</strong> {String(event.verbatim)}</p>
          <Link to={`/evidence?receipt=${event.receiptId}&claim=${event.textClaimId}`}>Open linked receipt</Link>
        </article>
      ))}</div>
    </main>
  );
}
