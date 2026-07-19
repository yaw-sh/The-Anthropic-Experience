# case:lane-07-mordu

`→ action 1: Bash` — `echo "=== repo root ls ===" && ls -la && echo "=== memory/repos/mordu ===" && ls -la memory/repos/mordu/ 2>&1`

`→ action 2: Read` — `/home/user/os/memory/repos/mordu/MORDU-CHARTER-v0.md`

`→ action 3: Read` — `/home/user/os/memory/repos/mordu/MORDU-STATE.md`

`→ action 4: Read` — `/home/user/os/memory/repos/mordu/README.md`

`→ action 5: Read` — `/home/user/os/memory/repos/mordu/wrangler.jsonc`

`→ action 6: Read` — `/home/user/os/memory/repos/mordu/package.json`

`→ action 7: Bash` — `echo "=== gate/ ===" && find memory/repos/mordu/gate -type f | sort && echo "=== src/ ===" && find memory/repo…`

`→ action 8: Bash` — `echo "is mordu dir a git repo?" && git -C memory/repos/mordu status 2>&1 | head -5; echo "---"; git log --onel…`

`→ action 9: Read` — `/home/user/os/memory/repos/mordu/gate/docs/ARCHITECTURE.md`

`→ action 10: Read` — `/home/user/os/memory/repos/mordu/gate/docs/GATE.md`

`→ action 11: Read` — `/home/user/os/memory/repos/mordu/gate/docs/DEPLOY.md`

Now let's look at the src files (key ones) and test files briefly, plus scripts and workflows.

`→ action 12: Read` — `/home/user/os/memory/repos/mordu/src/index.ts`

`→ action 13: Read` — `/home/user/os/memory/repos/mordu/src/ledger.ts`

`→ action 14: Read` — `/home/user/os/memory/repos/mordu/src/sidecar-budget.ts`

`→ action 15: Bash` — `echo "=== contracts dir ===" && for f in memory/repos/mordu/src/contracts/*.ts; do echo "--- $f ---"; wc -l "$…`

`→ action 16: Bash` — `echo "=== .gitignore mordu ===" && cat memory/repos/mordu/.gitignore | head -40 echo "=== scripts/public-safet…`

`→ action 17: Read` — `/home/user/os/memory/repos/mordu/src/contracts/index.ts`

`→ action 18: Read` — `/home/user/os/memory/repos/mordu/src/contracts/shared.ts`

`→ action 19: Read` — `/home/user/os/memory/repos/mordu/src/contracts/mordu-verdict.ts`

`→ action 20: Bash` — `wc -l memory/repos/mordu/src/model.ts memory/repos/mordu/src/ledger.ts memory/repos/mordu/src/contracts/*.ts`

`→ action 21: Bash` — `grep -rli "mordu" memory/threads/2026/07/ 2>/dev/null | sort`

`→ action 22: Bash` — `ls memory/threads/2026/07/ | sort echo "---" echo "checking case variations across all threads dirs" grep -rli…`

`→ action 23: Bash` — `ls memory/threads/2026/07/ | wc -l ls memory/threads/2026/07/ | grep -E "2026-07-1[3-8]" | sort echo "--- othe…`

`→ action 24: Bash` — `for f in memory/threads/2026/07/2026-07-03--t_algr5brnhowhhr5wgqha4wwlx5.md \ memory/threads/2026/07/2026-07-0…`

`→ action 25: Bash` — `for f in 2026-07-05--t_62ojfjntkdtuijkry7jyruzrc6.md 2026-07-05--t_bwhjpcrjzhlgu3vnxenj5hsub3.md; do echo "###…`

`→ action 26: Read` — `/home/user/os/memory/threads/2026/07/2026-07-05--t_ifdhij7lcmgd7zsffdpiweisya.md`

`→ action 27: Bash` — `for f in 2026-07-07--t_2re5w75evhyyjbvyhyazig3xlc.md 2026-07-07--t_lgnkmjj33q5dj3utacv6c3xt4v.md 2026-07-08--t…`

`→ action 28: Bash` — `for f in 2026-07-07--t_2re5w75evhyyjbvyhyazig3xlc.md 2026-07-07--t_lgnkmjj33q5dj3utacv6c3xt4v.md 2026-07-08--t…`

`→ action 29: Bash` — `for f in 2026-07-07--t_2re5w75evhyyjbvyhyazig3xlc.md 2026-07-07--t_lgnkmjj33q5dj3utacv6c3xt4v.md 2026-07-08--t…`

`→ action 30: Bash` — `grep -in "mordu" /root/.claude/projects/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/tool-results/b4ddss…`

`→ action 31: Bash` — `for f in 2026-07-07--t_2re5w75evhyyjbvyhyazig3xlc.md 2026-07-07--t_lgnkmjj33q5dj3utacv6c3xt4v.md 2026-07-08--t…`

`→ action 32: Bash` — `for f in 2026-07-10--t_6sds5xryduo26v3yvbtfb4zou2.md 2026-07-10--t_aa67kn5vuynih5cbjflvb77dup.md 2026-07-10--t…`

`→ action 33: Bash` — `for f in 2026-07-10--t_6sds5xryduo26v3yvbtfb4zou2.md 2026-07-10--t_aa67kn5vuynih5cbjflvb77dup.md 2026-07-10--t…`

`→ action 34: Bash` — `grep -in "mordu" "memory/threads/2026/07/2026-07-10--t_aa67kn5vuynih5cbjflvb77dup.md"`

`→ action 35: Read` — `/home/user/os/memory/threads/2026/07/2026-07-10--t_aa67kn5vuynih5cbjflvb77dup.md`

`→ action 36: Bash` — `grep -n -i "mordu" "memory/threads/2026/07/2026-07-10--t_iwokl73llwstjzci3yhrwq2mwt.md"`

`→ action 37: Read` — `/home/user/os/memory/threads/2026/07/2026-07-10--t_iwokl73llwstjzci3yhrwq2mwt.md`

`→ action 38: Read` — `/home/user/os/memory/threads/2026/07/2026-07-10--t_iwokl73llwstjzci3yhrwq2mwt.md`

`→ action 39: Bash` — `for f in 2026-07-11--t_b3qvj4ryg5jy2igmkhbiyme2w3.md 2026-07-11--t_fr46vri5rfq6yqmpmawoehc65d.md 2026-07-11--t…`

`→ action 40: Read` — `/home/user/os/memory/threads/2026/07/2026-07-11--t_jce3qbuqsw3q6gg32gkwh4aozq.md`

`→ action 41: Bash` — `grep -n -i "mordu" "memory/threads/2026/07/2026-07-11--t_b3qvj4ryg5jy2igmkhbiyme2w3.md" | head -40`

`→ action 42: Bash` — `grep -n -i -E "no mordu|not exist|doesn'?t exist|unbuilt|research transcripts and zero" "memory/threads/2026/0…`

`→ action 43: Bash` — `grep -rli -E "is unbuilt|no mordu repo|there is no mordu|research transcripts and zero enforcement" memory/ 2>…`

`→ action 44: Bash` — `grep -in -E "is unbuilt|no mordu repo|there is no mordu|research transcripts and zero enforcement" "memory/thr…`

`→ action 45: Bash` — `grep -n -i "mordu" "memory/threads/2026/07/2026-07-11--t_fr46vri5rfq6yqmpmawoehc65d.md" | head -50`

`→ action 46: Read` — `/home/user/os/memory/threads/2026/07/2026-07-11--t_b3qvj4ryg5jy2igmkhbiyme2w3.md`

`→ action 47: Bash` — `echo "=== test file counts ===" for f in memory/repos/mordu/test/*.test.ts; do echo "--$f--"; grep -c "it(\|te…`

`→ action 48: Read` — `/home/user/os/memory/prophecies/mem/needs_sorted/MEMORY-REBUILD-20260717/outstanding-prompts/Mordu/CODEX-P5-MO…`

`→ action 49: Read` — `/home/user/os/memory/prophecies/income/fellows/needs_sorted/scratchpad/lane-mordu.md`

`→ action 50: Bash` — `find /home/user/os/fellows -maxdepth 4 -type d | sort echo "---" find /home/user/os/fellows/evidence-availabil…`

`→ action 51: Read` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-02-threads-jul04-06.md`

`→ action 52: Bash` — `find memory/repos/cos -maxdepth 1 -type d 2>/dev/null echo "---" find memory/repos/cos -iname "publish-mordu*"…`

`→ action 53: Bash` — `ls memory/repos/cos/scripts/ | grep -i mordu echo "---mcp-server ledger tools---" grep -n "ledger_open\|ledger…`

`→ action 54: Bash` — `find memory/repos/cos/memory/backups -iname "*destructive-gate*" 2>/dev/null find memory/repos/cos -iname "*.c…`

`→ action 55: Bash` — `find memory/repos/mordu/gate -maxdepth 2 echo "--- confirm no hooks subdir ---" ls -la memory/repos/mordu/gate…`

`→ action 56: Bash` — `find /home/user/os -iname "*.sqlite*" -o -iname "*.db" 2>/dev/null | grep -v node_modules | head -20`

`→ action 57: Bash` — `find memory/repos/mordu -maxdepth 1 echo "--- is there a dist/ dir? ---" find memory/repos/mordu -iname "dist"…`

`→ action 58: Read` — `/home/user/os/memory/threads/2026/07/2026-07-10--t_m4mozes3mlu4d6qd5i5yx37itx.md`

`→ action 59: Bash` — `grep -n -i "mordu" "memory/threads/2026/07/2026-07-10--t_m4mozes3mlu4d6qd5i5yx37itx.md"`

`→ action 60: Bash` — `grep -ioP ".{150}PARKED at governance.{150}" "memory/threads/2026/07/2026-07-10--t_m4mozes3mlu4d6qd5i5yx37itx.…`

`→ action 61: Bash` — `grep -ioP ".{200}fall-through.{200}" "memory/threads/2026/07/2026-07-08--t_2c65bulbs6vff77neegm3rrj46.md" | he…`

`→ action 62: Bash` — `find memory/repos/cos -iname "MORDU.md" -o -iname "2026-07-05-reconciliation*" 2>/dev/null`

Now I have enough material. Let me check one more cross-reference (the AEVAE seed pointer to Mordu, to verify the charter's "ported into seed/" claim independently) before writing.

`→ action 63: Bash` — `find memory/repos/aevae -iname "registry.ts" 2>/dev/null | head -5 grep -rn -i "mordu" memory/repos/aevae/seed…`

`→ action 64: Bash` — `grep -n -i -B2 -A2 "mordu" memory/repos/aevae/seed/src/self-edit.ts memory/repos/aevae/seed/src/mcp.ts memory/…`

`→ action 65: Write` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-07-mordu.md`

Report written to `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-07-mordu.md`.

**Summary (Mordu case study):**

Mordu is COS's governance gate — directive ledger, PIN-gated dispositions, proof-required DONE, session-close checks, spend/quota circuit breakers — built explicitly to stop "knowing without doing" (charter doctrine, `MORDU-CHARTER-v0.md` §3). It maps cleanly onto the audit's Availability/Inspection/Binding framework: the ledger addresses availability (nothing silently drops), proof-required DONE and session-close checks address inspection, PIN-gating and cross-session unresolved-item tracking address binding. It does **not** address runtime action authority beyond code-merge (email, spend, physical systems — confirmed by an AEVAE thread listing this gap explicitly), cross-surface tool-availability, claim *correctness* vs. claim *shape*, or its own governance-surface growth.

The core finding: **Mordu's own construction repeatedly reproduced the exact failure it exists to prevent.** `MORDU-CHARTER-v0.md` §2 (ratified 2026-07-16) falsely claimed hooks were "live" and code was "ported into AEVAE seed/" — both false, and the true state had been recorded in the same corpus six days earlier (`2026-07-10` thread, line 1672), a textbook available-but-uninspected failure at the level of the governance document itself. The 2026-07-11 hook-deletion commit claimed "preserve all work" with 0 insertions / 493,824 deletions — `MORDU-STATE.md`'s own words: "There was no gate on the gate." The documented wrangler.jsonc production-credential footgun was real, fixed in code before the fix reached the branch anyone would actually deploy from (an orphaned worktree), and only closed by external audit — governance-accretion (E13) at the infrastructure level. A "no Mordu repo" false-absence claim (E3) and a fan-out gate blocking legitimate work pending a magic word (E14, contested — precisely the shape the charter's own anti-precondition clause later legislates against) round out the pattern.

Counterweight: where Mordu's claims were checked against a live external system — a real `wrangler deployments list` API call, a real `npm test` run (93/93, zero drift across 9 days) — they held up exactly as stated, sometimes more solidly than the source docs themselves claimed.

**Evidence weaker than claimed:** the "no Mordu repo" incident rests on secondary paraphrase only (no primary transcript located); a cited "post-ledger fall-through 5.3% > 4.6%" statistic traces to a source file absent from this snapshot; live D1 ledger row data was never queried (no local sqlite access).

**Evidence stronger than claimed:** the AEVAE-porting falsehood and the wrangler.jsonc fix were both independently verified by direct code reads, not taken on the source documents' word.
