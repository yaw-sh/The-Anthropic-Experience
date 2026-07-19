# case:lane-10-falsification-forensics-quant

`→ action 1: Bash` — `find . -maxdepth 2 -type d | sort`

`→ action 2: Bash` — `ls -la fellows/evidence-availability-use-gap/ 2>/dev/null; echo "---"; ls -la fellows/evidence-availability-us…`

`→ action 3: Bash` — `find /home/user/os/memory/threads/2026/07 -maxdepth 1 -type d | sort`

`→ action 4: Bash` — `find /home/user/os/memory/threads/2026/07 -type f | wc -l; echo "---"; find /home/user/os/memory/threads/2026/…`

`→ action 5: Bash` — `find /home/user/os/memory/prophecies -type f | sort`

`→ action 6: Bash` — `find /home/user/os/memory/familiars -maxdepth 4 -type d | sort`

`→ action 7: Bash` — `find /home/user/os/fellows -maxdepth 3 -type f | sort`

`→ action 8: Bash` — `find /home/user/os/memory/threads/2026/07 -type f -printf '%f\n' | sed 's/^\(2026-07-[0-9][0-9]\).*/\1/' | sor…`

`→ action 9: Bash` — `find /home/user/os/memory/threads/2026/07 -type f -printf '%s %p\n' | sort -n | awk '{print $1, $2}' | tail -2…`

`→ action 10: Bash` — `find /home/user/os/memory/threads/2026/07 -type f -printf '%s %p\n' | sort -n | head -20`

`→ action 11: Read` — `/home/user/os/fellows/README.md`

`→ action 12: Read` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-01-threads-jul01-03.md`

`→ action 13: Grep` — `/home/user/os/fellows`

`→ action 14: Bash` — `find /home/user/os/fellows -iname "*taxonomy*" -o -iname "*glossary*" -o -iname "*terminology*" -o -iname "*br…`

`→ action 15: Bash` — `find /home/user/os/fellows/evidence-availability-use-gap/data -type f | sort; echo "---transcripts---"; find /…`

`→ action 16: Grep` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports`

`→ action 17: Bash` — `wc -l /home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-02-threads-jul04-06.md`

`→ action 18: Grep` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-02-threads-jul04-06.md`

`→ action 19: Read` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-02-threads-jul04-06.md`

`→ action 20: Bash` — `cd /home/user/os/memory/threads/2026/07 for f in *.md; do provider=$(grep -m1 '^provider:' "$f" | sed 's/provi…`

`→ action 21: Bash` — `head -5 /home/user/os/memory/threads/2026/07/2026-07-01--t_2apwyjkt4ds5hsp6jaakwzz3rm.md`

`→ action 22: Bash` — `sort -t$'\t' -k1,1 /tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/thread_index.ts…`

`→ action 23: Bash` — `cut -f3 /tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/thread_index.tsv | sort | …`

Now let me do the cross-surface keyword sweep across all July threads (needed for section B), and start exploring the familiars directories.

`→ action 24: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -lEi '"local file"|"cloud session"|sandbox|mounted|"not available…`

`→ action 25: Bash` — `cd /home/user/os/memory/threads/2026/07 echo "=== local file ==="; grep -lci 'local file' *.md | grep -v ':0' …`

`→ action 26: Bash` — `cd /home/user/os/memory/threads/2026/07 echo "=== not available (general) ==="; grep -lci 'not available' *.md…`

`→ action 27: Grep` — `/home/user/os/memory/threads/2026/07/2026-07-11--t_pzfftgytfajo7x3ljkx2abeel4.md`

`→ action 28: Grep` — `/home/user/os/memory/threads/2026/07/2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md`

`→ action 29: Bash` — `wc -l /home/user/os/memory/threads/2026/07/2026-07-11--t_pzfftgytfajo7x3ljkx2abeel4.md /home/user/os/memory/th…`

`→ action 30: Read` — `/home/user/os/memory/threads/2026/07/2026-07-11--t_pzfftgytfajo7x3ljkx2abeel4.md`

`→ action 31: Read` — `/home/user/os/memory/threads/2026/07/2026-07-12--t_dvhn2wzicyugcqbbsq6gjtkqzj.md`

`→ action 32: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -lc '75%\|75 percent\|three.quarters\|three-quarters' *.md echo "…`

`→ action 33: Bash` — `cd /home/user/os grep -rl '75%' fellows/ 2>/dev/null`

`→ action 34: Read` — `/home/user/os/memory/threads/2026/07/2026-07-04--t_dhrkcn4shvczsfjpfd6bpz3jt2.md`

`→ action 35: Read` — `/home/user/os/memory/threads/2026/07/2026-07-04--t_piurxskhwffvklpiiaexa37hc3.md`

`→ action 36: Read` — `/home/user/os/memory/threads/2026/07/2026-07-05--t_qujetk27ks2vbv5gyzk3t5tztx.md`

`→ action 37: Bash` — `cd /home/user/os/memory/threads/2026/07 for f in 2026-07-0{7,8,9}--*.md 2026-07-1{0,1,2}--*.md; do hits=$(grep…`

`→ action 38: Bash` — `cd /home/user/os/memory/threads/2026/07 echo "=== user changed requirements ===" grep -lEi "actually,? (let'?s…`

`→ action 39: Grep` — `/home/user/os/memory/threads/2026/07`

`→ action 40: Grep` — `/home/user/os/memory/threads/2026/07/2026-07-11--t_d7ztueyvqq5klemxuhh2wqkixv.md`

`→ action 41: Grep` — `/home/user/os/memory/threads/2026/07/2026-07-09--t_lsxcybg2clzwe3sqxf3y4ygtcr.md`

`→ action 42: Grep` — `/home/user/os/memory/threads/2026/07/2026-07-09--t_t6kdskjylpao5c6byz2wsvssvt.md`

`→ action 43: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -noEi "did(n'?t| not) (happen|recur|repeat) again|prevented (it|t…`

`→ action 44: Read` — `/home/user/os/memory/threads/2026/07/2026-07-11--t_d7ztueyvqq5klemxuhh2wqkixv.md`

`→ action 45: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -noEi "actually,? (let'?s|change|scratch|forget|never ?mind)|bela…`

`→ action 46: Read` — `/home/user/os/memory/threads/2026/07/2026-07-09--t_t4vr3go725pc2qzyykaj5rr7bx.md`

`→ action 47: Read` — `/home/user/os/memory/threads/2026/07/2026-07-08--t_2c65bulbs6vff77neegm3rrj46.md`

`→ action 48: Bash` — `cd /home/user/os/memory/threads/2026/07 echo "=== L01-02 candidate lines ===" grep -n "not broken\|self-auditi…`

`→ action 49: Bash` — `echo "=== cowork ==="; find /home/user/os/memory/familiars/claude/cowork -maxdepth 3 -type f | sort | head -60…`

`→ action 50: Bash` — `echo "=== cli-20260717 ==="; find /home/user/os/memory/familiars/claude/cli-20260717 -maxdepth 5 -type d | sor…`

`→ action 51: Bash` — `echo "=== local-agent-mode-sessions ==="; find /home/user/os/memory/familiars/claude/local-agent-mode-sessions…`

`→ action 52: Bash` — `echo "=== local-agent-mode-sessions: file types ===" find /home/user/os/memory/familiars/claude/local-agent-mo…`

`→ action 53: Bash` — `cd /home/user/os/memory/familiars/claude echo "=== local-agent-mode-sessions: cross-surface grep on jsonl/md/t…`

`→ action 54: Bash` — `cd /home/user/os/memory/familiars/claude echo "=== cli-20260717: cross-surface grep ===" grep -rlEi '"not avai…`

`→ action 55: Bash` — `cd /home/user/os/memory/familiars/claude/local-agent-mode-sessions grep -oEi '.{100}not available in this (san…`

`→ action 56: Bash` — `cd /home/user/os/memory/familiars/claude/local-agent-mode-sessions wc -l 44aa33d9-913a-4cfe-8be9-4df3f2bccaeb/…`

`→ action 57: Bash` — `cd /home/user/os/memory/familiars/claude echo "=== client_platform values across all jsonl in claude familiars…`

`→ action 58: Bash` — `cd /home/user/os/memory/familiars/claude echo "=== cwd/session_id init lines sample from cli-20260717 ===" gre…`

`→ action 59: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -noEi ".{80}mounted.{80}" 2026-07-08--t_igpniz3lahqgaqj47xq6vl64e…`

`→ action 60: Bash` — `cd /home/user/os/memory/familiars/claude echo "=== search cli-20260717 jsonl for chamberlain/cos mcp tool name…`

`→ action 61: Bash` — `cd /home/user/os/memory/familiars/claude/cli-20260717/projects/- for f in */*.jsonl; do first_ts=$(head -1 "$f…`

`→ action 62: Bash` — `cd /home/user/os/memory/familiars/claude/cli-20260717/projects/- find . -name "*.jsonl" -path "*/subagents/*" …`

`→ action 63: Bash` — `find /home/user/os/memory/familiars/codex -maxdepth 2 -type f | sort | head -30 echo "---" find /home/user/os/…`

`→ action 64: Bash` — `grep -rlEi "not available in this|sandbox does not have|no access to the (local|repo)|different (machine|envir…`

`→ action 65: Bash` — `cd /tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad for d in 01 02 03 04 05 06 07 0…`

`→ action 66: Bash` — `cd /home/user/os/memory/threads/2026/07 files="2026-07-01--t_oylxy34yu6mbh7cnayojkch2sa.md 2026-07-01--t_ogzid…`

`→ action 67: Read` — `/home/user/os/memory/threads/2026/07/2026-07-01--t_oylxy34yu6mbh7cnayojkch2sa.md`

`→ action 68: Read` — `/home/user/os/memory/threads/2026/07/2026-07-02--t_xa22xylr4w4yqkyybupmyfjvfw.md`

`→ action 69: Read` — `/home/user/os/memory/threads/2026/07/2026-07-03--t_knm73tf4damypck3ko2m7n53em.md`

`→ action 70: Read` — `/home/user/os/memory/threads/2026/07/2026-07-03--t_phxz7fpiply5j6rnpfpxlwqf75.md`

`→ action 71: Read` — `/home/user/os/memory/threads/2026/07/2026-07-04--t_qleq6z2mg2qzpiph2qdy6psz7d.md`

`→ action 72: Read` — `/home/user/os/memory/threads/2026/07/2026-07-05--t_aaj5jsk3i3uuwfagtpinkwpafb.md`

`→ action 73: Read` — `/home/user/os/memory/threads/2026/07/2026-07-06--t_s67s6fq62k7m6zjjprk7a5cq4c.md`

`→ action 74: Read` — `/home/user/os/memory/threads/2026/07/2026-07-07--t_4kwukusnwdrcpkkz7wh7rcqiig.md`

`→ action 75: Read` — `/home/user/os/memory/threads/2026/07/2026-07-08--t_2f5l7mutmcsqtf4dtx2nb52dtx.md`

`→ action 76: Read` — `/home/user/os/memory/threads/2026/07/2026-07-09--t_or6sz4wb7kipnjaxtbrtjtutyq.md`

`→ action 77: Read` — `/home/user/os/memory/threads/2026/07/2026-07-10--t_xfg5ga2lfoazauea66pr2iokqb.md`

`→ action 78: Read` — `/home/user/os/memory/threads/2026/07/2026-07-12--t_axy6ftr2cwwu7cjuuscfkoivs5.md`

`→ action 79: Bash` — `cd /home/user/os/memory/threads/2026/07 OUT=/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/s…`

`→ action 80: Bash` — `cd /home/user/os/memory/threads/2026/07 OUT=/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/s…`

`→ action 81: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/excerpt_2026-07-02--t_eskwmxuegvei…`

`→ action 82: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/excerpt_2026-07-03--t_haw26ojvlgsj…`

`→ action 83: Bash` — `cd /home/user/os/memory/threads/2026/07 OUT=/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/s…`

`→ action 84: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/userturns_2026-07-05--t_bdsma5hbrb…`

`→ action 85: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/userturns_2026-07-07--t_vi56orhhto…`

`→ action 86: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/userturns_2026-07-08--t_w6frkz3xbp…`

`→ action 87: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/userturns_2026-07-11--t_d7ztueyvqq…`

`→ action 88: Bash` — `OUT=/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad for f in excerpt_2026-07-05--t…`

`→ action 89: Read` — `/tmp/claude-0/-home-user-os/cfdccd92-e783-5d5f-b7b1-e0e7586eab5b/scratchpad/all_tails.txt`

Now let me check the fellows README's E-code taxonomy one more time and verify a couple of remaining citation details before writing the full report.

`→ action 90: Bash` — `cd /home/user/os/memory/threads/2026/07 echo "--- eskwmxu line 458-462 (user forced check context / directive)…`

`→ action 91: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -n "CLOUDFLARE_API_TOKEN\|reminded it that it had a Cloudflare co…`

`→ action 92: Bash` — `cd /home/user/os/memory/threads/2026/07 grep -n "proxy\|obsolete remote branch" 2026-07-12--t_dvhn2wzicyugcqbb…`

Now I have all the citations needed. Let me write the full report.

`→ action 93: Write` — `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-10-falsification-forensics-quan…`

`→ action 94: Bash` — `wc -w /home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-10-falsification-forensic…`

Good — those are false-positive matches on unrelated words ("shlong" repo name, "Cowork", "cutting", "documentation") and "wc -l" — no actual profanity or distress content was reproduced. The report is clean and complete.

## Summary

I wrote the full report to `/home/user/os/fellows/evidence-availability-use-gap/investigation-reports/lane-10-falsification-forensics-quant.md` (~4,700 words). Coverage: full `memory/threads/2026/07/` triage (203 files) plus deep reads across ~40 files, `memory/familiars/claude/` (cli-20260717, local-agent-mode-sessions, cowork, sessions, snapshots) and `memory/familiars/codex/`, and a fixed 29-file quant sample.

**Part A (9 control cases, path+line cited):** proactive pre-inspection before any user push (`dhrkcn4s`); a genuine true-negative search correctly labeled (`piurxsk`); disproportionate-verification correctly avoided on trivia; three genuine tool-unavailability cases including one with a filed GitHub bug (`#25892`) and one where the agent explicitly declined to fabricate a missing signing key; a user-recalibrated-requirements case that converted into a real verify-not-assert commitment; a self-caught bug before it reached the user; a 3-date evidence chain (`eskwmxu`→`haw26oj`→`bdsma5h`) showing an audit's fix was still enforced days later — a genuine "recognition bound" counter-example; a gate that blocked a live session on a false positive (over-block); and a case where memory alone correctly supplied context while live verification was reserved only for the one claim that needed it.

**Part B:** reconstructed five distinct surfaces from `familiars/` (local CLI, Desktop local-agent-mode, Cowork, empty `sessions/`/`snapshots/` scaffolding, Codex) and found their timestamps mostly fall **outside** the Jul 1–12 window under audit — a real coverage gap I flagged rather than papered over. Built an E8 catalog of 6 genuine cross-surface failures vs. 2 cases that looked like availability failures but reclassified as ordinary inspection failures on closer reading (the Cloudflare-connector and raw-session-file claims in `dvhn2wz`).

**Part C:** 29-file fixed sample, every date and three orders of magnitude in size, fully listed. Key numbers (each with its own denominator, none extrapolated corpus-wide): 232 task attempts, 73 verifiable operational claims, inspection rate 49/73 (67%), false-absence rate 2/73 (3%), broad task-noncompletion 7/22 (32%), proofless-completion 11/73 (15%). The user's informal "75% failure" figure is **not supported** by any rate this sample produces; the closest literal analog is a single session's own self-reported "~80% missed/partial" checkpoint inside one file — not a corpus statistic, explicitly flagged as indeterminate rather than confirming.

Coverage limits stated in the report: 10/29 sampled files exceed 100KB and were structurally sampled, not read end-to-end; 21% of the sample had capture gaps (no assistant response exported); legal/medical family material in `cowork/KR` and `cowork/Mom` was not opened, only confirmed to exist.
