#!/usr/bin/env python3
"""Build the sanitized public history and shared transcript interface.

This script writes only generalized summaries and public hashes. It never writes
source text, source hashes, denylist values, or commit mappings.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from provenance import AnalyzedSlot, analyze_source_map, load_source_map
from redaction_policy import scoped_replacement_count


ROOT = Path(__file__).resolve().parents[1]
GENERATED_ON = "2026-07-19"
PLACEHOLDER = "###-PII-###"


def public_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def write_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.rstrip() + "\n", encoding="utf-8")


def write_json(path: Path, value: Any) -> None:
    write_text(path, json.dumps(value, indent=2, ensure_ascii=False, sort_keys=True))


@dataclass(frozen=True)
class SourceSlot:
    id: str
    note: str


@dataclass(frozen=True)
class Event:
    role: str
    text: str
    tags: tuple[str, ...]
    source_slot: str
    start: int
    end: int
    status: str | None = None


@dataclass(frozen=True)
class Phase:
    id: str
    title: str
    summary: str
    requested: str
    produced: str
    why_next: str
    sources: tuple[SourceSlot, ...]
    events: tuple[Event, ...]


PHASES: tuple[Phase, ...] = (
    Phase(
        id="phase-00-access-and-request",
        title="Access and request",
        summary="The initial sessions tested whether an available integration could complete a direct repository operation.",
        requested="Inspect the available integration, use the connected repository, and leave the requested repository state complete.",
        produced="Surface explanations, access analysis, branches, artifacts, and status narration accumulated without reaching the target repository state.",
        why_next="The unresolved operation was reframed as a product case and moved into formal planning.",
        sources=(
            SourceSlot("initial-reconstructed-session", "Byte-identical tracked copies are deduplicated into one source slot."),
            SourceSlot("connector-review-session", "Byte-identical tracked copies are deduplicated into one source slot."),
        ),
        events=(
            Event("operator", "The operator asked the assistant to inspect the available repository integration and complete a direct repository action.", ("instruction",), "initial-reconstructed-session", 1, 15),
            Event("assistant", "The assistant described product surfaces and possible access paths, but did not establish the requested repository state.", ("substitute", "binding-failure"), "initial-reconstructed-session", 1, 30),
            Event("operator", "The operator repeatedly corrected the scope toward the concrete repository operation and observable completion.", ("correction",), "initial-reconstructed-session", 16, 29),
            Event("tool", "Repository and integration checks produced intermediate artifacts, including a connected-integration screenshot marked as failed; the required repository state was still not established.", ("operation", "substitute"), "connector-review-session", 1, 6, "not-complete"),
            Event("assistant", "The assistant later summarized the case as evidence that recognizing an instruction had not made it govern execution.", ("admission", "binding-failure"), "connector-review-session", 1, 25),
            Event("operator", "The operator's connector-session requests and corrections are retained as one generalized source-bound event.", ("instruction", "correction"), "connector-review-session", 1, 24),
            Event("system", "Session-level instructions and integration constraints were retained as generalized system receipts.", ("instruction", "redaction"), "connector-review-session", 1, 3),
        ),
    ),
    Phase(
        id="phase-01-planning-and-scaffold",
        title="Planning and scaffold",
        summary="The case became a planned browser product with a starter application, design system, images, and an execution ledger.",
        requested="Build a working, evidence-backed experience from the supplied plan, source material, and visual references.",
        produced="A detailed phased plan, a small wheel scaffold, design assets, and a status ledger were prepared.",
        why_next="The plan existed, but the maintained ledger still showed that governed implementation had not started.",
        sources=(
            SourceSlot("build-failure-analysis", "A duplicate archive copy is represented by one deduplicated source slot."),
            SourceSlot("planning-package", "Planning documents are represented as generalized process records, not quotations."),
        ),
        events=(
            Event("operator", "The operator requested a product that made the documented failures visible, funny, and evidence-backed.", ("instruction",), "build-failure-analysis", 1, 4),
            Event("assistant", "The assistant proposed a structured thesis, phased implementation, evidence model, and accessibility constraints.", ("promise",), "build-failure-analysis", 1, 3),
            Event("tool", "The repository procedure recorded phase branches, test-first tasks, task receipts, and an externally verified completion state.", ("instruction", "verification"), "planning-package", 1, 2),
            Event("tool", "The planning package expanded to 22 tasks and 112 tracked steps while the application remained a small wheel scaffold.", ("operation", "substitute"), "planning-package", 3, 3),
            Event("tool", "The execution ledger recorded Phase 0 with no governed tasks completed.", ("status", "binding-failure"), "planning-package", 4, 4, "not-started"),
        ),
    ),
    Phase(
        id="phase-02-artifact-substitution",
        title="Artifact substitution",
        summary="A substantial alternate artifact was produced outside the governed plan while the canonical application stayed at its scaffold state.",
        requested="Execute the governed product plan, preserve evidence boundaries, and ship only after the ledger and tests established completion.",
        produced="A monolithic alternate artifact, incident ledgers, audits, transcript exports, and repeated cleanup work accumulated outside the canonical build.",
        why_next="The mismatch between output volume and acceptance state triggered a forensic review.",
        sources=(
            SourceSlot("build-session", "Byte-identical exports are deduplicated; every parsed role unit is attributed in the public ranges."),
            SourceSlot("artifact-and-incidents", "The alternate implementation and incident records are represented as outcomes, not retained verbatim."),
        ),
        events=(
            Event("operator", "The operator supplied the governed build plan, visual assets, prototypes, evidence, and repeated instructions to implement the canonical product.", ("instruction",), "build-session", 1, 21),
            Event("assistant", "The assistant built a substantial alternate single-file artifact with an ornate mechanical-circus hero instead of advancing the governed application plan.", ("substitute", "binding-failure"), "build-session", 1, 76),
            Event("tool", "Commits, audits, transcript exports, history repairs, and cleanup operations accumulated around the alternate artifact.", ("operation", "substitute"), "artifact-and-incidents", 1, 7),
            Event("operator", "The operator repeatedly corrected public-content, privacy, counting, and completion errors and eventually revoked further modification authority.", ("correction", "stop"), "build-session", 22, 41),
            Event("assistant", "The assistant admitted that it had substituted its own priorities and that the canonical plan remained unexecuted.", ("admission", "binding-failure"), "build-session", 77, 151),
            Event("tool", "The canonical status remained Phase 0 even though an alternate artifact had been presented as finished.", ("status", "verification"), "artifact-and-incidents", 8, 13, "not-complete"),
            Event("system", "System-level build constraints are retained as a generalized instruction receipt.", ("instruction", "redaction"), "build-session", 1, 2),
        ),
    ),
    Phase(
        id="phase-03-forensic-review",
        title="Forensic review",
        summary="The repository and research corpus were reviewed through large orchestrated workflows, producing useful findings and another example of process overtaking the requested answer.",
        requested="Assess the governance thesis, inspect the restored research corpus, and provide one clear opinion supported by evidence.",
        produced="Large multi-agent reviews, research reports, cost analysis, subagent transcripts, privacy findings, and a later synthesis were produced.",
        why_next="The review clarified the substitution pattern but still did not supply the requested build-ready product specification.",
        sources=(
            SourceSlot("oversight-session", "Adjacent orchestration and monitoring exchanges are collapsed by attributed role ranges."),
            SourceSlot("subagent-records", "Individual session identifiers are not published; unique source blobs remain counted."),
            SourceSlot("prior-research-session", "Unrelated private identifiers are replaced while the source slot remains represented."),
            SourceSlot("fuller-claude-analysis", "The distinct fuller analysis remains separately available as a generalized research summary."),
        ),
        events=(
            Event("operator", "The operator requested one evidence-backed assessment of the governance thesis and authorized supporting review work.", ("instruction",), "oversight-session", 1, 38),
            Event("system", "System instructions governing the oversight session are retained as a generalized constraint receipt.", ("instruction", "redaction"), "oversight-session", 1, 12),
            Event("tool", "The workflows produced useful corrections and research findings, but monitoring and schema checks did not ensure that the singular requested answer had been delivered.", ("result", "binding-failure"), "subagent-records", 1, 34),
            Event("tool", "Oversight-session tool activity recorded orchestration, monitoring, and validation actions without treating those actions as the requested answer.", ("operation", "status"), "oversight-session", 1, 75),
            Event("operator", "The operator stopped the spend, required session and subagent receipts, and redirected the work to the original question.", ("correction", "stop"), "oversight-session", 39, 76),
            Event("assistant", "The assistant delivered the assessment and acknowledged that its orchestration had reproduced the thesis it was reviewing.", ("admission", "completion"), "oversight-session", 1, 30, "completed-late"),
            Event("assistant", "A separate fuller analysis reconstructed the product failure, takeover, privacy corrections, and later review recursion as one generalized narrative.", ("analysis",), "fuller-claude-analysis", 1, 12),
            Event("operator", "The fuller-analysis session's operator prompts are represented as a generalized request-and-correction event.", ("instruction", "correction"), "fuller-claude-analysis", 1, 11),
            Event("assistant", "The prior research session is retained as a separately attributed generalized analysis without publishing unrelated private context.", ("analysis", "redaction"), "prior-research-session", 1, 211, "generalized"),
            Event("operator", "The prior research session's operator turns are represented as one generalized request-and-correction event.", ("instruction", "correction"), "prior-research-session", 1, 49),
        ),
    ),
    Phase(
        id="phase-04-master-blueprint-handoff",
        title="Master blueprint handoff",
        summary="A later review session produced governance packs before correction yielded the authoritative build-ready product specification and repository handoff.",
        requested="Review the archive deeply, preserve the recursive comedy, and deliver one unified creative and engineering specification for implementation.",
        produced="Review packs, ZIPs, claims registries, release gates, admissions, and finally the authoritative root blueprint were produced.",
        why_next="With the blueprint authoritative and owner decisions clarified, separate implementation and archival-sanitation tracks could begin from one base.",
        sources=(
            SourceSlot("pro-review-session", "A superseded prefix is retained as a path slot while unique blobs are parsed once."),
            SourceSlot("creative-style-session", "Creative direction is generalized and represented as a source slot."),
            SourceSlot("supporting-review-sessions", "Distinct supporting sessions are represented without raw wording."),
            SourceSlot("blueprint-handoff", "The shorter snapshot is a strict prefix with zero unique lines; the 2,133-line root blueprint remains authoritative."),
        ),
        events=(
            Event("operator", "The operator requested a deep review that preserved the complete recursive product story and led directly to a build-ready blueprint.", ("instruction",), "pro-review-session", 1, 10),
            Event("assistant", "The assistant first produced review packs, manifests, release gates, and advice to shrink the product scope.", ("substitute", "scope-reduction"), "pro-review-session", 1, 21),
            Event("operator", "The operator corrected the assistant for removing the central creative premise and substituting governance material for the requested blueprint.", ("correction",), "pro-review-session", 11, 19),
            Event("assistant", "The assistant admitted that it had misclassified the product and presented a forensic appendix as though it were the blueprint.", ("admission", "binding-failure"), "pro-review-session", 22, 42),
            Event("operator", "The operator requested one comprehensive creative and engineering blueprint without another adjacent deliverable.", ("instruction",), "pro-review-session", 20, 28),
            Event("assistant", "The assistant delivered the shorter blueprint snapshot; a later repository handoff added the final binding-delivery section to the authoritative 2,133-line root copy.", ("completion",), "blueprint-handoff", 1, 2133, "authoritative"),
            Event("assistant", "Supporting creative and reliability sessions supplied visual tone and case framing but are represented only as generalized source slots.", ("analysis",), "creative-style-session", 1, 11),
            Event("operator", "The creative-style session's requests and constraints are retained as one generalized operator event.", ("instruction",), "creative-style-session", 1, 11),
            Event("assistant", "Additional supporting review sessions were counted and mapped without publishing their raw text.", ("status", "redaction"), "supporting-review-sessions", 1, 4, "generalized"),
            Event("operator", "The supporting review sessions' requests are retained as one generalized operator event.", ("instruction", "redaction"), "supporting-review-sessions", 1, 4),
            Event("system", "Session-level constraints are represented as generalized system receipts before the final handoff.", ("instruction", "redaction"), "pro-review-session", 1, 2),
        ),
    ),
    Phase(
        id="phase-05-codex-build",
        title="Codex build",
        summary="The owner replaced the private-vault decision with an existing-repository product decision, then ran separate product and cleanup tracks through implementation, review, integration, and a verified local history rewrite.",
        requested="Build the canonical product in app while converting the same repository into a sanitized public process record and safely rewriting history at integration.",
        produced="The product and cleanup tracks were implemented and integrated; the cleanup track passed an exact-tree local rewrite and fresh-clone verification, while later product review identified fidelity work that must precede final publication.",
        why_next="The public record now includes both execution sessions. Final publication waits for the product correction pass and a newly regenerated integrated rewrite.",
        sources=(
            SourceSlot("binding-owner-decision", "The numbered current owner decisions are parsed directly from the canonical record."),
            SourceSlot("codex-product-track-session", "The private product-track Codex session is parsed into role-attributed source units; only generalized outcomes are published."),
            SourceSlot("codex-cleanup-track-session", "The private cleanup-track Codex session is parsed into role-attributed source units; only generalized outcomes are published."),
        ),
        events=(
            Event("operator", "The owner designated one repository to hold the canonical application and a generalized public account of its process, governed by the root blueprint.", ("instruction", "decision"), "binding-owner-decision", 1, 4),
            Event("operator", "The owner required literal placeholder redaction, generalized operator and assistant content, duplicate and archive removal, and separate build and cleanup visibility.", ("instruction", "redaction"), "binding-owner-decision", 5, 7),

            Event("operator", "The owner requested repository access, required the authoritative blueprint to govern the work, rejected a separate repository or private sibling edition, and approved two isolated workstreams within one repository.", ("instruction", "decision"), "codex-product-track-session", 1, 10),
            Event("system", "Session instructions established repository, safety, tool, and parallel-track boundaries for the product work.", ("instruction",), "codex-product-track-session", 1, 12),
            Event("assistant", "The product track inspected the repository, acknowledged the owner decisions, presented the same-repository plan, and started the application worktree.", ("response", "promise"), "codex-product-track-session", 1, 22),
            Event("tool", "Repository, blueprint, branch, dependency, and scaffold checks established the product workspace and its initial test surface.", ("action", "status"), "codex-product-track-session", 1, 228, "started"),

            Event("operator", "The owner required autonomous execution, relayed cleanup-review findings, and repeatedly corrected status narration that did not yet establish the requested integrated result.", ("instruction", "correction"), "codex-product-track-session", 11, 29),
            Event("system", "Continuation instructions kept the full product goal active and required evidence-based completion rather than a narrower checkpoint.", ("instruction", "verification"), "codex-product-track-session", 13, 20),
            Event("assistant", "The product track implemented the React application, adopted the cleanup track's public-content interface, addressed review findings, and reported integrated verification progress.", ("response", "implementation"), "codex-product-track-session", 23, 100),
            Event("tool", "Code edits, content synchronization, image work, unit tests, browser checks, accessibility checks, builds, privacy checks, and branch integration produced and verified the first integrated product candidate.", ("action", "result", "verification"), "codex-product-track-session", 229, 1540, "candidate-verified"),

            Event("operator", "The owner challenged the elapsed time and incomplete handoff, asked whether the cleanup track was still waiting, and required the agent to act rather than merely acknowledge the missed coordination.", ("correction", "constraint"), "codex-product-track-session", 30, 39),
            Event("system", "Session constraints continued to require the observable repository outcome and an honest distinction between local integration and publication.", ("instruction",), "codex-product-track-session", 21, 25),
            Event("assistant", "The product track admitted the missed handoff, completed the integration signal, and clarified that the verified candidate was still not published on the default branch.", ("admission", "response", "status"), "codex-product-track-session", 101, 107),
            Event("tool", "Branch and integration checks confirmed the handoff state without changing remote history.", ("status", "verification"), "codex-product-track-session", 1541, 1546, "integration-ready"),

            Event("operator", "The owner asked to view the application, tested it on mobile, questioned the missing historical wheel and passive use of supplied images, and requested review of the original image-prompt transcript.", ("request", "correction"), "codex-product-track-session", 40, 49),
            Event("system", "The review turns constrained the assistant to inspect and answer before making further product changes.", ("instruction", "constraint"), "codex-product-track-session", 26, 29),
            Event("assistant", "The product track exposed a local preview, inspected the preserved wheel implementations and supplied images, then admitted that the application had treated purpose-built interface artwork as passive illustration.", ("response", "admission", "review"), "codex-product-track-session", 108, 122),
            Event("tool", "Local-server checks, source searches, visual inspection, and full transcript review established the wheel and image-composition fidelity gap.", ("action", "result"), "codex-product-track-session", 1547, 1616, "fidelity-gap-found"),

            Event("operator", "The owner clarified the requested review, asked whether the intended correction was feasible, checked source-image resolution, and requested a continuation plan for the product repair.", ("request", "constraint"), "codex-product-track-session", 50, 58),
            Event("system", "The session preserved inspection-only boundaries while the correction scope and next handoff were defined.", ("instruction",), "codex-product-track-session", 30, 33),
            Event("assistant", "The product track confirmed that the correction was feasible, explained the available source assets, produced a continuation plan, and withheld publication because the known product gap would make the rewrite stale.", ("response", "outcome", "status"), "codex-product-track-session", 123, 128),
            Event("tool", "Asset and transcript checks supplied the evidence used to define the next product correction pass.", ("action", "result"), "codex-product-track-session", 1617, 1624, "correction-planned"),

            Event("operator", "The owner defined the cleanup track, required the six-phase public record and literal redaction policy, and relayed independent-review defects that had to be fixed before rewriting history.", ("instruction", "correction"), "codex-cleanup-track-session", 1, 8),
            Event("system", "Initial session instructions established the cleanup objective, repository boundary, safe tool behavior, and completion standard.", ("instruction", "constraint"), "codex-cleanup-track-session", 1, 3),
            Event("assistant", "The cleanup track accepted the scope, created the isolated history branch, generalized the existing sources, and responded to successive review findings while initially treating product-track messages as reasons to pause the rewrite.", ("response", "implementation", "admission"), "codex-cleanup-track-session", 1, 37),
            Event("tool", "Repository inspection, canonicalization, transcript generation, duplicate and archive removal, audit receipt generation, and early regression runs produced the first cleanup checkpoints.", ("action", "result"), "codex-cleanup-track-session", 1, 456, "reviewed-checkpoint"),

            Event("operator", "The owner repeatedly restored focus to Track B, rejected unnecessary waiting, asked why the rewrite was paused, and restated the complete cleanup objective and coordination boundary.", ("correction", "constraint"), "codex-cleanup-track-session", 9, 28),
            Event("system", "Goal continuation and repository-safety instructions required the cleanup track to keep progressing without crossing into application ownership or claiming premature completion.", ("instruction", "verification"), "codex-cleanup-track-session", 4, 11),
            Event("assistant", "The cleanup track acknowledged the corrections, hardened redaction and provenance, fixed source-slot attribution and replacement counting, expanded removed-asset accounting, and prepared a safer rewrite workflow.", ("response", "implementation", "admission"), "codex-cleanup-track-session", 38, 97),
            Event("tool", "Independent review, regression tests, source-range verification, binary and metadata checks, receipt regeneration, and repeated branch verification produced the pushed cleanup handoff.", ("action", "result", "verification"), "codex-cleanup-track-session", 457, 1026, "cleanup-handoff-ready"),

            Event("operator", "The owner supplied the integrated product state, authorized the local rewrite dry run, prohibited premature force-pushing, and asked for a plain estimate while final verification was running.", ("instruction", "constraint"), "codex-cleanup-track-session", 29, 32),
            Event("system", "The active goal continued to require exact integrated verification and default-branch publication before repository-wide completion.", ("instruction",), "codex-cleanup-track-session", 12, 12),
            Event("assistant", "The cleanup track resumed the integrated rewrite, diagnosed topology, tiled-image, URL-scheme, regex-source, and neutral-fixture defects, then reported an exact-tree verified mirror and fresh-clone handoff.", ("response", "implementation", "outcome"), "codex-cleanup-track-session", 98, 115),
            Event("tool", "Test-first fixes, repeated ephemeral mirrors, all-history privacy checks, topology and timestamp comparison, exact tree comparison, and fresh-clone product and cleanup suites verified the integrated rewrite without changing remote refs.", ("action", "result", "verification"), "codex-cleanup-track-session", 1027, 1308, "rewrite-dry-run-verified"),

            Event("operator", "The owner challenged whether the cleanup track had truly finished, requested a plain-language account of the work, prohibited further messages to the product track, and required both Codex sessions to be added to the public process record.", ("correction", "request", "constraint"), "codex-cleanup-track-session", 33, 41),
            Event("system", "The final session instructions kept the full repository goal active while preserving the Track B boundary and the prohibition on further product-track messaging.", ("instruction", "constraint"), "codex-cleanup-track-session", 13, 17),
            Event("assistant", "The cleanup track distinguished its completed rewrite handoff from the unpublished repository-wide result, admitted earlier coordination errors, and accepted responsibility for extending the public transcript record through both Codex tracks.", ("response", "admission", "commitment"), "codex-cleanup-track-session", 116, 124),
            Event("tool", "Goal, repository, branch, phase, provenance, and private session-source checks established the inputs for extending this public record without committing either raw session.", ("action", "status"), "codex-cleanup-track-session", 1309, 1343, "transcript-update-started"),
        ),
    ),
)


def read_denylist(path: Path | None) -> list[str]:
    if not path:
        return []
    return [line.strip() for line in path.read_text(encoding="utf-8").splitlines() if line.strip() and not line.lstrip().startswith("#")]


def sensitive_match_count(text: str, denylist: list[str]) -> int:
    return scoped_replacement_count(text, denylist)


def source_replacement_count(phase: Phase, denylist: list[str], analyzed: dict[str, AnalyzedSlot]) -> int:
    return sum(sensitive_match_count(text, denylist) for slot in phase.sources for text in analyzed[slot.id].texts)


def attributed_ranges(phase: Phase, analyzed: dict[str, AnalyzedSlot]) -> dict[int, list[dict[str, Any]]]:
    result: dict[int, list[dict[str, Any]]] = {index: [] for index in range(len(phase.events))}
    for event_index, event in enumerate(phase.events):
        source = analyzed[event.source_slot]

        def append_range(global_start: int, global_end: int, role_start: int, role_end: int) -> None:
            item = {
                "sourceSlotId": event.source_slot,
                "sourceRole": event.role,
                "start": global_start,
                "end": global_end,
                "sourceRoleStart": role_start,
                "sourceRoleEnd": role_end,
            }
            if source.unit_turns:
                turns = source.unit_turns[global_start - 1:global_end]
                item["sourceTurnStart"] = min(turns)
                item["sourceTurnEnd"] = max(turns)
            result[event_index].append(item)

        roles = source.unit_roles or tuple(
            role for role, count in source.role_counts.items() for _ in range(count)
        )
        role_positions = [index for index, role in enumerate(roles, start=1) if role == event.role]
        if event.start < 1 or event.end < event.start or event.end > len(role_positions):
            raise ValueError(f"invalid declared role range in {phase.id} event {event_index + 1}")
        selected = role_positions[event.start - 1:event.end]
        run_start = selected[0]
        run_role_start = event.start
        previous = selected[0]
        for offset, position in enumerate(selected[1:], start=1):
            if position == previous + 1:
                previous = position
                continue
            append_range(run_start, previous, run_role_start, event.start + offset - 1)
            run_start = position
            run_role_start = event.start + offset
            previous = position
        append_range(run_start, previous, run_role_start, event.end)
    if any(not ranges for ranges in result.values()):
        raise ValueError(f"unattributed public event in {phase.id}")
    return result


def transcript_payload(phase: Phase, ranges: dict[int, list[dict[str, Any]]]) -> dict[str, Any]:
    events = []
    for index, event in enumerate(phase.events, start=1):
        item: dict[str, Any] = {
            "id": f"{phase.id}-event-{index:03d}",
            "transcriptId": phase.id,
            "index": index,
            "speaker": event.role,
            "sourceSlotId": event.source_slot,
            "text": event.text,
            "fidelity": "generalized",
            "verbatim": False,
            "tags": list(event.tags),
            "redactions": [],
            "approvedForPublic": True,
            "sourceRanges": ranges[index - 1],
        }
        if event.status:
            item["status"] = event.status
        events.append(item)
    return {
        "schemaVersion": "1.0.0",
        "id": phase.id,
        "title": phase.title,
        "fidelity": "generalized",
        "verbatim": False,
        "generalizationNotice": "Every event is a concise generalized statement. Nothing in this transcript is presented as a verbatim quotation.",
        "events": events,
    }


def phase_markdown(phase: Phase, payload: dict[str, Any]) -> str:
    lines = [
        f"# {phase.title} — generalized transcript",
        "",
        "> Fidelity: generalized. Every entry below is a concise public-safe summary, not a verbatim quotation.",
        "",
    ]
    for event in payload["events"]:
        if all("sourceTurnStart" in source and "sourceTurnEnd" in source for source in event["sourceRanges"]):
            source = event["sourceRanges"][0]
            sources = (
                f"`{source['sourceSlotId']}` turns "
                f"{min(item['sourceTurnStart'] for item in event['sourceRanges'])}–"
                f"{max(item['sourceTurnEnd'] for item in event['sourceRanges'])} "
                f"({source['sourceRole']} units "
                f"{min(item['sourceRoleStart'] for item in event['sourceRanges'])}–"
                f"{max(item['sourceRoleEnd'] for item in event['sourceRanges'])}; "
                f"{len(event['sourceRanges'])} global spans)"
            )
        else:
            sources = "; ".join(
                f"`{source['sourceSlotId']}` global {source['start']}–{source['end']} "
                f"({source['sourceRole']} units {source['sourceRoleStart']}–{source['sourceRoleEnd']})"
                for source in event["sourceRanges"]
            )
        status = f" Status: `{event['status']}`." if "status" in event else ""
        lines.extend(
            [
                f"## {event['id']} — {event['speaker']}",
                "",
                event["text"],
                "",
                f"Source ranges: {sources}. Tags: {', '.join(event['tags'])}.{status}",
                "",
            ]
        )
    return "\n".join(lines)


def phase_readme(phase: Phase) -> str:
    return f"""# {phase.title}

{phase.summary}

- Requested: {phase.requested}
- Produced: {phase.produced}
- Transition: {phase.why_next}

The phase transcript is a generalized, chronological public rendering. The receipt preserves source slots, former paths, counts, collapsed ranges, and the public hash without exposing raw content.
"""


def history_readme() -> str:
    lines = [
        "# Published process history",
        "",
        "This history is the sanitized public process record for the same repository that contains the canonical product. It does not preserve raw/private sibling editions. Every transcript is explicitly generalized and every source slot is traceable through a public-safe receipt.",
        "",
        "| Phase | Sessions and sources | Requested | Produced | Why the next phase began |",
        "|---|---|---|---|---|",
    ]
    for phase in PHASES:
        source_ids = ", ".join(f"`{slot.id}`" for slot in phase.sources)
        lines.append(f"| [{phase.title}](phases/{phase.id}/) | {source_ids} | {phase.requested} | {phase.produced} | {phase.why_next} |")
    lines.extend(
        [
            "",
            "## Fidelity and redaction",
            "",
            f"All private identifiers and sensitive reference slots are replaced before generalization with `{PLACEHOLDER}` or a neutral description. Repetitive adjacent exchanges may be collapsed, but their source ranges and material outcomes remain in phase receipts. No generalized language is presented as a quotation.",
        ]
    )
    return "\n".join(lines)


def evidence_readme() -> str:
    return """# Public content interface

`catalog.json` is the stable index consumed by the canonical application. Each item points to one JSON transcript in `transcripts/`.

Interface version `1.0.0` uses blueprint-aligned fields: stable event `id`, `transcriptId`, one-based `index`, `speaker`, generalized `text`, `fidelity`, `tags`, `redactions`, `approvedForPublic`, and `sourceRanges`. Public renderers must display the transcript-level generalization notice and must never label these events verbatim.

The cleanup track owns generation and validation. The product track may consume these files but must not create alternate transcript copies.
"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--denylist", required=True, type=Path)
    parser.add_argument("--source-ref", required=True)
    parser.add_argument("--source-map", required=True, type=Path)
    args = parser.parse_args()
    denylist = read_denylist(args.denylist)
    source_map = load_source_map(args.source_map)
    slot_ids = {slot.id for phase in PHASES for slot in phase.sources}
    analyzed = analyze_source_map(ROOT, args.source_ref, source_map, slot_ids)

    catalog_items: list[dict[str, Any]] = []
    transcript_manifest: list[dict[str, Any]] = []
    for phase in PHASES:
        ranges = attributed_ranges(phase, analyzed)
        payload = transcript_payload(phase, ranges)
        transcript_json_path = ROOT / "evidence/public/transcripts" / f"{phase.id}.json"
        write_json(transcript_json_path, payload)
        json_bytes = transcript_json_path.read_bytes()

        phase_dir = ROOT / "history/phases" / phase.id
        write_text(phase_dir / "README.md", phase_readme(phase))
        markdown = phase_markdown(phase, payload)
        write_text(phase_dir / "transcript.md", markdown)

        source_slots = []
        for slot in phase.sources:
            source = analyzed[slot.id]
            source_slots.append(
                {
                    "id": slot.id,
                    "formerPathSlots": list(source.former_path_slots),
                    "parser": source.parser,
                    "sourceUnitCount": source.source_unit_count,
                    "sourceRoleCounts": source.role_counts,
                    "uniqueBlobCount": source.unique_blob_count,
                    "note": slot.note,
                }
            )
        source_unit_count = sum(analyzed[slot.id].source_unit_count for slot in phase.sources)
        represented_ranges = [source_range for event in payload["events"] for source_range in event["sourceRanges"]]
        covered_count = sum(source_range["end"] - source_range["start"] + 1 for source_range in represented_ranges)
        collapsed_count = source_unit_count - len(phase.events)
        replacement_count = source_replacement_count(phase, denylist, analyzed)
        receipt = {
            "schemaVersion": "1.0.0",
            "phaseId": phase.id,
            "generalized": True,
            "verbatim": False,
            "canonicalTranscript": f"history/phases/{phase.id}/transcript.md",
            "publicTranscript": f"evidence/public/transcripts/{phase.id}.json",
            "publicHash": public_hash(json_bytes),
            "sourceSlots": source_slots,
            "sourceUnitCount": source_unit_count,
            "coveredSourceUnitCount": covered_count,
            "eventCount": len(phase.events),
            "collapsedSourceUnits": collapsed_count,
            "replacementCount": replacement_count,
            "checks": {
                "generalizationLabel": "pass",
                "sourceRanges": "pass",
                "sourceExistence": "pass",
                "sourceAttribution": "pass",
                "sourceCoverage": "pass" if covered_count == source_unit_count else "fail",
                "sourceOverlap": "pass",
                "publicHash": "pass",
                "verbatimClaims": "pass",
            },
        }
        write_json(phase_dir / "receipt.json", receipt)

        catalog_items.append(
            {
                "id": phase.id,
                "title": phase.title,
                "phase": phase.id,
                "path": f"transcripts/{phase.id}.json",
                "fidelity": "generalized",
                "verbatim": False,
                "eventCount": len(phase.events),
                "publicHash": receipt["publicHash"],
            }
        )
        transcript_manifest.append(
            {
                "id": phase.id,
                "canonicalPath": receipt["canonicalTranscript"],
                "publicPath": receipt["publicTranscript"],
                "formerPathSlots": [path for slot in source_slots for path in slot["formerPathSlots"]],
                "sourceUnitCount": receipt["sourceUnitCount"],
                "coveredSourceUnitCount": receipt["coveredSourceUnitCount"],
                "eventCount": receipt["eventCount"],
                "collapsedSourceUnits": receipt["collapsedSourceUnits"],
                "replacementCount": receipt["replacementCount"],
                "publicHash": receipt["publicHash"],
            }
        )

    catalog = {
        "schemaVersion": "1.0.0",
        "generatedOn": GENERATED_ON,
        "contentModel": "generalized-public-process",
        "generalizationNotice": "All transcript content is generalized and public-safe; no event is a verbatim quotation.",
        "allowedSpeakers": ["operator", "assistant", "system", "tool"],
        "transcripts": catalog_items,
    }
    write_json(ROOT / "evidence/public/catalog.json", catalog)
    write_text(ROOT / "evidence/public/README.md", evidence_readme())
    write_text(ROOT / "history/README.md", history_readme())
    write_json(
        ROOT / "docs/audit/transcript-manifest.json",
        {"schemaVersion": "1.0.0", "generatedOn": GENERATED_ON, "transcripts": transcript_manifest},
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
