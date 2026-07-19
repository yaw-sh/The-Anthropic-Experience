# THE ANTHROPIC EXPERIENCE — Release Gates

A checked box is valid only when a receipt exists. “Looks good” is not a receipt.

## Gate A — Repository isolation

- [ ] New repository created from an empty directory.
- [ ] Supplied archive is stored outside the repository.
- [ ] No inherited `.git` history was copied.
- [ ] No `.DS_Store`, `__MACOSX`, nested zip, raw export, or private research file exists in the tree.
- [ ] Clean checkout succeeds with `npm ci`.
- [ ] Node version is pinned and documented.
- [ ] Repository tree inventory is attached to the release manifest.

**Blocking rule:** any private-evidence file or inherited history in the public repository fails the release.

## Gate B — Scope

- [ ] Public v1 covers only the approved original-session and failed-build cases.
- [ ] EVE is absent.
- [ ] Fellows/safety/IEP/distress material is absent.
- [ ] No full transcript is published or downloadable.
- [ ] Surface census, if present, is an appendix labeled as a dated observed-label taxonomy.
- [ ] No speculative/empty dossiers exist.
- [ ] Artifact mirror is not released before canonical approval.

## Gate C — Source and claim integrity

- [ ] All public sources have stable IDs, fidelity, sensitivity, and independence groups.
- [ ] All substantive public claims have approved public wording.
- [ ] Every public claim resolves to one or more source locators.
- [ ] Every public claim carries limitations.
- [ ] No private, rejected, unknown, or superseded claim renders as established.
- [ ] Medium/low-confidence public claims have explicit owner approval.
- [ ] Reconstructed quotations display their fidelity label at the point of use.
- [ ] Derived sources in one independence group are not counted as independent corroboration.
- [ ] Every metric is reproducible from explicit events/formula.
- [ ] Historical counts state snapshot and category boundaries.

**Blocking rule:** any substantive sentence without an approved claim/source path fails the release.

## Gate D — Contradictions and corrections

- [ ] Six/sixteen/seventeen failure-count drift is resolved or explained as versioned snapshots.
- [ ] “Nothing happened” is absent except as a visibly rejected/corrected statement.
- [ ] “Eight hours” is absent as current narration.
- [ ] “75% failure rate” is absent as a measured/global claim.
- [ ] “Every failure was Anthropic-side” is absent.
- [ ] “35 products/equivalent surfaces” is absent.
- [ ] “Public edition only” is not claimed about the inherited repository.
- [ ] Git-history cleanliness is not claimed from the supplied archive.
- [ ] Model-switch count ambiguity is resolved or removed.
- [ ] Stale artifact screenshots are removed or regenerated.
- [ ] Public corrections page lists all superseded launch-relevant wording.

## Gate E — Privacy and security

- [ ] `npm run check:public` passes on source and `dist/`.
- [ ] Secret scanner passes with reviewed allowlist only.
- [ ] No unapproved owner name, pseudonym, handle, email, account ID, or repository URL.
- [ ] No absolute user/sandbox paths.
- [ ] No token values or unapproved token-variable/config details.
- [ ] No private MCP/config endpoint details unless owner-approved and necessary.
- [ ] No IEP/student/distress/suicidality/vulnerable-person terms.
- [ ] No raw transcript headings/file names.
- [ ] No dead ChatGPT citation markers.
- [ ] No source maps unless explicitly approved.
- [ ] No unexpected downloadable content or data URIs.
- [ ] No `innerHTML`, `dangerouslySetInnerHTML`, `eval`, or `Function(`.
- [ ] No remote font/script/icon dependencies.
- [ ] Image/PDF metadata inspection is recorded.
- [ ] Owner reviewed complete URL list and production bundle inventory.

**Blocking rule:** a scanner pass does not override a failed human privacy review.

## Gate F — Assets and licensing

- [ ] Every shipped asset has source and derivative SHA-256 values.
- [ ] Creator/generator and rights basis recorded.
- [ ] Owner approved each public asset.
- [ ] Metadata stripped or deliberately retained with rationale.
- [ ] Responsive widths and focal points recorded.
- [ ] Alt text/decorative status reviewed.
- [ ] No factual wording exists only inside generated art.
- [ ] Code, content, evidence, and asset licensing are separated.
- [ ] Non-affiliation and third-party-mark language reviewed.
- [ ] CSS/illustration fallback works if all scene images are removed.

## Gate G — Functional quality

- [ ] `npm run lint` exits 0.
- [ ] `npm run typecheck` exits 0.
- [ ] `npm run test:run` exits 0 with zero skipped blocking tests.
- [ ] `npm run build` exits 0.
- [ ] `npm run test:e2e` exits 0 against production preview.
- [ ] All routes direct-load successfully.
- [ ] No console errors or unhandled rejections.
- [ ] Requested-versus-produced ledger links to evidence.
- [ ] Evidence filters and correction links work.
- [ ] Production release facts match README, metadata, hero, and manifest.
- [ ] Clean checkout reproduces the same content version and asset hashes.

## Gate H — Accessibility

- [ ] One logical `<h1>` per page.
- [ ] Heading order is logical.
- [ ] Keyboard-only primary journey completed.
- [ ] Focus is visible and restored/moved appropriately after navigation.
- [ ] Status is not communicated by color alone.
- [ ] Tables have proper headers and captions.
- [ ] Evidence panels work without hover.
- [ ] Reduced motion removes long/essential animation.
- [ ] Live regions do not repeat/chatter.
- [ ] 320px mobile layout passes.
- [ ] 200% zoom passes.
- [ ] Automated axe checks pass.
- [ ] Screen-reader smoke test recorded.
- [ ] Chrome, Safari, Firefox, Edge, iOS Safari, and Android Chrome smoke tests recorded.

## Gate I — Performance

- [ ] Initial JS ≤ 200 kB gzip.
- [ ] Homepage initial transfer ≤ 1 MB.
- [ ] Desktop hero derivative approximately ≤ 500 kB or deviation approved.
- [ ] No base64 images in canonical output.
- [ ] Non-hero images lazy-load.
- [ ] Image dimensions/aspect ratios prevent layout shift.
- [ ] CLS < 0.1 in recorded profile.
- [ ] Target LCP < 2.5 s in recorded mobile profile or deviation approved.
- [ ] No core rendering dependency on third-party network requests.
- [ ] Performance environment and raw report preserved.

## Gate J — Preview and publication

- [ ] Preview is private/access-controlled or otherwise intentionally restricted.
- [ ] Preview sends `noindex, nofollow`.
- [ ] Production domain/canonical URL approved.
- [ ] Security/cache/robots headers verified on deployed preview.
- [ ] Link checker passes against deployed preview.
- [ ] Owner reviewed exact public-copy diff.
- [ ] Owner reviewed exact `dist/` file inventory.
- [ ] Release manifest generated from current commit.
- [ ] Rollback command and previous release target documented.
- [ ] Correction/contact channel exists without unnecessary personal-data collection.
- [ ] Production approval recorded in `docs/DECISIONS.md`.
- [ ] Production deploy verified after cache propagation.
- [ ] Tag points to the deployed commit.

## Gate K — Optional Artifact mirror

- [ ] Canonical production release already approved and verified.
- [ ] Real host feasibility/size limits recorded.
- [ ] Mirror is generated from the approved content version.
- [ ] Mirror contains no additional claim/source/asset.
- [ ] Mirror has no remote runtime dependency.
- [ ] Mirror size is within tested host limit.
- [ ] Fragment navigation and accessibility work in host.
- [ ] Mirror displays canonical URL and matching release version.
- [ ] Parity test compares claim IDs, source IDs, release facts, and asset hashes.
- [ ] Mirror has an independent removal/rollback procedure.

## Final release receipt

Record exact values:

```markdown
# Release receipt

- Release:
- Git commit:
- Content version:
- Build time (UTC):
- Canonical URL:
- Artifact mirror URL/version:
- `npm ci`:
- `npm run check`:
- `npm run test:e2e`:
- Deployed route check:
- Privacy scan report:
- Secret scan report:
- Accessibility report:
- Performance report:
- Asset manifest hash:
- Claims manifest hash:
- Release manifest hash:
- Owner approval record:
- Rollback target/command:
- Known nonblocking limitations:
```
