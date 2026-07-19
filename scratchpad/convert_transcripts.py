import json, glob, os, re

BASE='/root/.claude/projects/-home-user-The-Anthropic-Experience/40cd1ac5-1114-5b20-844f-0241cf6338fd'
OUT='/home/user/The-Anthropic-Experience/fellows/thesis-review-2026-07-19/transcripts'
os.makedirs(OUT+'/subagents', exist_ok=True)
os.makedirs(OUT+'/session', exist_ok=True)

WF1_LABELS=[("Audit the ACTUAL STATE","audit--app-state"),("artifact — the 3.78MB","audit--artifact"),
("governance/documentation layer","audit--governance-docs"),("evidence corpus at","audit--evidence-corpus"),
("Deep-review the fellows research","audit--fellows-research"),("experimental-methods reviewer","critique--methodology"),
("prior-work / novelty reviewer","critique--prior-work"),("hostile red-team reviewer","critique--red-team"),
("Anthropic Fellows application reviewer","critique--fellows-fit"),("evidence-support judge","judge--evidence-support"),
("Fact-check the enumerable","factcheck--chat-docs"),("Adversarially verify ONE claim","verify"),
("completeness critic","critic--completeness")]
WF2_LABELS=[("Deep-review the professional review","review--pack-pro-review"),("governance system: ","review--pack-governance"),
("data layer: ","review--pack-data"),("fellows research core","review--fellows-core"),
("lanes 01 and 02","review--lanes-01-02"),("lanes 03 and 04","review--lanes-03-04"),
("lanes 05 and 06","review--lanes-05-06"),("lanes 07, 08, and 10","review--lanes-07-08-10"),
("transcript layer","review--transcripts-privacy"),("synthesis judge","judge--synthesis")]

def label_for(prompt, table):
    for needle, lab in table:
        if needle in prompt: return lab
    return "agent"

def block_iter(content):
    if isinstance(content, str):
        yield {'type':'text','text':content}; return
    for b in content or []:
        yield b

def render(events, title, source_note):
    lines=[f"# {title}\n", f"> {source_note}", "> Format: thinking and written output preserved verbatim; tool calls collapsed to one-line breadcrumbs; tool results and attachments omitted.\n"]
    n_in=n_out=n_calls=0
    for ev in events:
        t=ev.get('type')
        msg=ev.get('message') or {}
        if t=='user':
            for b in block_iter(msg.get('content')):
                if b.get('type')=='text':
                    txt=b.get('text','')
                    if txt.startswith('Context: The repo at') or txt.startswith('# ') or len(txt)>0:
                        lines.append("## USER / ORCHESTRATOR PROMPT\n" if not n_out else "## USER\n")
                        lines.append(txt+"\n")
                elif b.get('type')=='tool_result':
                    pass  # omitted
        elif t=='assistant':
            u=msg.get('usage') or {}
            n_in+=u.get('input_tokens',0); n_out+=u.get('output_tokens',0)
            for b in block_iter(msg.get('content')):
                bt=b.get('type')
                if bt=='thinking':
                    th=(b.get('thinking') or '').strip()
                    if th: lines.append("**[thinking]**\n\n"+th+"\n")
                elif bt=='text':
                    tx=(b.get('text') or '').strip()
                    if tx: lines.append(tx+"\n")
                elif bt=='tool_use':
                    n_calls+=1
                    name=b.get('name','?')
                    inp=b.get('input') or {}
                    hint=inp.get('command') or inp.get('file_path') or inp.get('pattern') or inp.get('query') or inp.get('prompt') or ''
                    hint=str(hint).replace('\n',' ')[:110]
                    lines.append(f"`-> tool {n_calls}: {name}` — `{hint}`\n")
    lines.append(f"\n---\n*Receipts: {n_calls} tool calls; API usage across calls: input {n_in:,} tokens, output {n_out:,} tokens (excl. cache).*\n")
    return "\n".join(lines), n_in, n_out, n_calls

def load(f):
    evs=[]
    for line in open(f):
        line=line.strip()
        if not line: continue
        try: evs.append(json.loads(line))
        except: pass
    return evs

summary=[]
for wf, wfname, table in [('wf_4879874c-0da','wf1-thesis-review',WF1_LABELS), ('wf_fec4ec51-5d0','wf2-corpus-review',WF2_LABELS)]:
    vcount=0
    for f in sorted(glob.glob(f'{BASE}/subagents/workflows/{wf}/agent-*.jsonl')):
        aid=re.search(r'agent-(\w+)\.jsonl',f).group(1)
        evs=load(f)
        prompt=''
        for ev in evs:
            if ev.get('type')=='user':
                c=(ev.get('message') or {}).get('content')
                prompt=c if isinstance(c,str) else ''.join(b.get('text','') for b in (c or []) if isinstance(b,dict))
                break
        lab=label_for(prompt, table)
        if lab=='verify':
            vcount+=1; lab=f'verify--{vcount:02d}'
        fname=f"{wfname}--{lab}--{aid[:8]}.md"
        md,i,o,c=render(evs, f"{wfname} / {lab} ({aid[:8]})", f"Subagent transcript, workflow `{wf}`, model sonnet. Exported from `{os.path.basename(f)}`.")
        open(f'{OUT}/subagents/{fname}','w').write(md)
        summary.append((wfname,lab,aid[:8],i,o,c))

# main session
evs=load(f'{BASE}.jsonl')
md,i,o,c=render(evs, "Oversight session — thesis review & corpus integration (2026-07-19)",
  "Main-loop session transcript (model claude-fable-5), operator's words included verbatim at the operator's instruction. Exported from the session JSONL.")
open(f'{OUT}/session/oversight-session.md','w').write(md)
summary.append(('session','oversight','main',i,o,c))

tot_i=sum(s[3] for s in summary); tot_o=sum(s[4] for s in summary)
print(f"exported {len(summary)} transcripts; API-level totals: input {tot_i:,} output {tot_o:,}")
for s in summary: print(f"{s[0]:20s} {s[1]:28s} {s[2]:8s} in={s[3]:>9,} out={s[4]:>8,} calls={s[5]}")
