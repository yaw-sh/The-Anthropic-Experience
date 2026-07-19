# Audit Receipts

These receipts describe the supplied archive snapshot and this review environment. They do not establish unavailable remote Git history or current external service state.

## Archive inventory

- Original files: **108**
- Original bytes: **59,730,000**
- Text-readable files: **88**
- Detailed path/size/SHA-256 inventory: `ARCHIVE-INVENTORY.csv`
- Heuristic scan results and duplicate groups: `archive-audit.json`

Exact duplicate highlights:

- Three copies of `anthropicexperiencefulltranscript.md` share SHA-256 `a77556179b4aeccac1cb809613995a01585c5eb26939c2eb07e8403e934efcd8`.
- Multiple prototype/design archives duplicate source already present elsewhere.
- Six small subagent metadata files are byte-identical.

## React app build

Working directory:

```text
repo_current_state/app
```

Commands executed during review:

```bash
npm ci
npm run build
```

Observed result:

- Vite production build exited 0.
- Installed Vite version: 6.4.3.
- Output observed in review: CSS approximately 6.45 kB, JavaScript approximately 170.89 kB; JavaScript gzip approximately 56.33 kB.
- `npm audit` reported 0 vulnerabilities at the time of the review install.

Scope of receipt:

- proves only that the supplied small wheel compiles in the review environment;
- does not prove the planned product is implemented;
- no test suite exists in the supplied app;
- no CI workflow exists in the supplied repo snapshot.

## Artifact metrics

File:

```text
repo_current_state/artifact/the-anthropic-experience.html
```

Observed:

- raw bytes: **3,783,931**
- gzip bytes in review environment: **2,703,835**
- embedded `data:image` markers: **10**
- hard-coded surface rows: **35**
- `<h1>` elements: **2**
- `<img>` elements: **10**
- `srcset` attributes: **0**
- external/operational URLs include a GitHub repository URL and GitHub MCP endpoint strings

The compiled artifact is an output snapshot, not proof of a reproducible source build.

## Artifact script reproducibility

### `assemble.py`

Command:

```bash
python3 repo_current_state/artifact/src/assemble.py
```

Result: exit 1.

First failure:

```text
FileNotFoundError: ... /tmp/claude-0/.../scratchpad/part1-css.html
```

The script also expects session-specific scratchpad JSON/HTML inputs and writes to `/home/user/The-Anthropic-Experience/artifact`.

### `build_public_edition.py`

Command:

```bash
python3 repo_current_state/artifact/src/build_public_edition.py
```

Result: exit 1.

First failure:

```text
FileNotFoundError: /root/.claude/uploads/.../claude.md
```

### `parse-transcript.js`

Command:

```bash
node repo_current_state/artifact/src/parse-transcript.js
```

Result: exit 1.

First failure:

```text
Cannot find module '/tmp/claude-0/.../scratchpad/node_modules/marked'
```

Conclusion: none of the supplied artifact source scripts runs from the archive without reconstruction and path/dependency replacement.

## JSON validation

All five JSON files under the supplied repository outside generated dependency/build directories parsed successfully as JSON.

Parsing success does not validate claim truth, privacy, schema consistency, or source lineage.

## Plan and status

- Historical implementation plan: **2,205 lines**.
- Tasks: **22**.
- Unchecked Markdown steps: **112**.
- Build status reports phases 1–5 not started and an empty task-receipt table.
- Canonical app contains **10** hard-coded entries, not 35.

## Heuristic privacy/code scan

Counts across the original 108 files:

| Finding pattern | Matches | Files |
|---|---:|---:|
| URLs | 337 | 26 |
| model identifiers | 192 | 20 |
| sensitive-context terms | 151 | 37 |
| profanity tokens | 289 | 12 |
| planning/not-started markers | 83 | 23 |
| raw HTML sink patterns | 52 | 4 |
| Unix absolute-path patterns | 863 | 30 |
| GitHub URLs | 44 | 10 |
| token-name references | 61 | 10 |
| data-URI markers | 14 | 2 |
| dead ChatGPT citations | 92 | 1 |
| email patterns | 4 | 1 |

Interpretation rules:

- These are review candidates, not automatically leaks.
- Package-lock URLs and generic `.gitignore` comments inflate URL counts.
- Absolute-path patterns include quoted logs and analysis.
- Token-name references do not establish token values.
- The three “secret assignment” matches are duplicated example text, not a verified live credential.
- Semantic privacy and source lineage require human review beyond regex scanning.

## PDF inspection

`source_build_data/Research findings abstract conversion.pdf`:

- five pages;
- image-only/no useful selectable text in extraction;
- metadata indicates Chrome Helper/macOS Quartz production on 2026-07-18;
- visually presents a proposal/pre-registration draft;
- contains no visible bibliography or full empirical-method apparatus.

## Git limitation

`repo_current_state/` contains no `.git` directory. This review cannot independently verify:

- commit hashes;
- branch state;
- clean tree claims;
- force-pushes/history rewrites;
- public/private timing;
- dangling object presence or deletion;
- remote synchronization;
- deployment ancestry.

Any such statement in the supplied documents remains a documentary claim until separately verified against an actual repository or platform receipt.
