#!/usr/bin/env python3
"""Assemble the self-contained artifact page from parts + data (Research Archive edition)."""
import base64, json, os, re, sys

SP = "/tmp/claude-0/-home-user-The-Anthropic-Experience/06ae5b22-6ed0-58c8-b444-6a66a555e489/scratchpad"
OUT_DIR = "/home/user/The-Anthropic-Experience/artifact"
os.makedirs(OUT_DIR, exist_ok=True)
OUT = os.path.join(OUT_DIR, "the-anthropic-experience.html")

css = open(f"{SP}/part1-css.html").read()
body = open(f"{SP}/part2-body.html").read()
js = open(f"{SP}/part3-js.html").read()

fonts = json.load(open(f"{SP}/fonts.json"))
icons = json.load(open(f"{SP}/icons.json"))
images = json.load(open(f"{SP}/images.json"))
data1 = json.load(open(f"{SP}/data1.json"))
data2 = json.load(open(f"{SP}/data2.json"))
trn = json.load(open(f"{SP}/trn.json"))

md_path = f"{SP}/public-edition.md"
md = open(md_path, "rb").read()
md_uri = "data:text/markdown;base64," + base64.b64encode(md).decode()

report_html = open(f"{SP}/report.html").read()
report_md = open("/home/user/The-Anthropic-Experience/docs/evidence/research/adversarial-literature-review-recognition-does-not-bind.md", "rb").read()
lmd_uri = "data:text/markdown;base64," + base64.b64encode(report_md).decode()

css = (css.replace("{{RYE_URI}}", fonts["rye"]).replace("{{OSWALD_URI}}", fonts["oswald"])
          .replace("{{INTER_URI}}", fonts["inter"]).replace("{{JBMONO_URI}}", fonts["jbmono"]))

# body icon placeholders
def put_icons(s):
    return re.sub(r"\{\{ICON:([a-z-]+)\}\}", lambda m: icons[m.group(1)], s)
body = put_icons(body)
body = body.replace("{{REPORT_HTML}}", report_html)

def js_json(obj):
    return json.dumps(obj, ensure_ascii=False).replace("</", "<\\/")

js = js.replace("__IMG__", js_json(images))
js = js.replace("__DATA__", js_json(data1))
js = js.replace("__FEL__", js_json(data2))
js = js.replace("__ICON__", js_json(icons))
js = js.replace("__TRN__", js_json(trn))
js = js.replace("__TMD__", md_uri)
js = js.replace("__LMD__", lmd_uri)

page = css + "\n" + body + "\n" + js
for leftover in re.findall(r"\{\{[A-Z_:a-z-]+\}\}|__[A-Z]+__", page)[:5]:
    print("WARNING leftover placeholder:", leftover, file=sys.stderr)
with open(OUT, "w") as f:
    f.write(page)

print(f"Assembled: {OUT}")
print(f"Size: {len(page)/1024/1024:.2f} MB")
