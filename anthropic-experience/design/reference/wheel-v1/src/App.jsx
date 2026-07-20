import { useEffect, useLayoutEffect } from "react";

const sourceScripts = [
  {
    "src": "###-PII-###",
    "type": "",
    "id": "",
    "async": false,
    "defer": false,
    "content": ""
  },
  {
    "src": "###-PII-###",
    "type": "",
    "id": "",
    "async": false,
    "defer": false,
    "content": ""
  },
  {
    "src": "",
    "type": "",
    "id": "",
    "async": false,
    "defer": false,
    "content": "\n      const S = [\n        {n:\"Claude Code\",p:\"Terminal / CLI\",rule:\"✅\",gh:[\"✅\",\"g\",\"Native. Reads, writes, commits, opens PRs.\"],\n         v:\"The one that can actually do the entire thing. It lives in your terminal, which is precisely why you are not in it right now.\"},\n        {n:\"Claude Code\",p:\"Web\",rule:\"✅\",gh:[\"✅\",\"g\",\"OAuth into GitHub, runs in a cloud sandbox.\"],\n         v:\"Same brain as the CLI, in a browser tab. This is Anthropic's answer to Codex. Nobody told you it existed, but here we are.\"},\n        {n:\"Claude Cowork\",p:\"Web · YOU ARE HERE\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"Works — via a personal access token, not a button.\"],\n         v:\"It can absolutely do the work. It just wants a token first, like a coat check for your credentials. Which is the entire fight you've been having for the last twenty minutes.\"},\n        {n:\"Claude Cowork\",p:\"Desktop app\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"Same as web, plus it can reach your local files.\"],\n         v:\"The web one, but it can also touch files on your actual computer. Whether that's an upgrade or a second thing to keep track of is left as an exercise.\"},\n        {n:\"Claude chat\",p:\"claude.ai / Web\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"Read-only repo file sync via the + menu.\"],\n         v:\"For when you'd rather describe the work eloquently than do it. Can read your repo files. Cannot write. Will apologize about it warmly.\"},\n        {n:\"Claude chat\",p:\"Desktop app\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"Same + menu, now in a dedicated window.\"],\n         v:\"It's the website, but it's an app, so it gets its own icon in your dock and its own place in your heart.\"},\n        {n:\"Claude chat\",p:\"Mobile\",rule:\"❌\",gh:[\"❌\",\"b\",\"No. It's a phone. Be reasonable.\"],\n         v:\"For doing this argument again, but with a thumb, on a train.\"},\n        {n:\"Projects\",p:\"Inside Claude chat\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"Inherits chat's read-only repo sync.\"],\n         v:\"A surface inside a surface. Surface-ception. Great for context, structurally incapable of being found in the menu.\"},\n        {n:\"Claude in Chrome\",p:\"Browser extension\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"It can click around github.com like a person.\"],\n         v:\"Drives your browser for you. So technically it can 'use GitHub' the way you use GitHub: manually, one sad click at a time.\"},\n        {n:\"Claude in Excel\",p:\"Spreadsheet add-in\",rule:\"❌\",gh:[\"❌\",\"b\",\"No. Why would— no.\"],\n         v:\"Yes, this is real. No, it will not help with your repo. Yes, it is a separate thing to learn. Moving on.\"},\n        {n:\"Claude API\",p:\"Console / Workbench\",rule:\"✅\",gh:[\"✅\",\"g\",\"You build the integration. It's all yours.\"],\n         v:\"Infinite power, zero hand-holding. Do it yourself, from scratch, and you can have anything — including this exact frustration, but billed per token.\"},\n        {n:\"Claude in Slack\",p:\"Workspace app\",rule:\"⚠️\",gh:[\"⚠️\",\"w\",\"Depends entirely on what's wired to the workspace.\"],\n         v:\"@-mention it between two people arguing about the standup. Its GitHub powers are a rumor whispered by your admin.\"},\n        {n:\"Agent SDK\",p:\"Build-your-own\",rule:\"✅\",gh:[\"✅\",\"g\",\"You are the connector now.\"],\n         v:\"The framework this very selector is judging you from. Ship your own surface. Congratulations, that's 16.\"},\n        {n:\"Managed Agents\",p:\"Platform\",rule:\"✅\",gh:[\"✅\",\"g\",\"Server-hosted, GitHub access documented.\"],\n         v:\"Enterprise-grade, sandbox-managed, and named similarly enough to three other things that you will lose a meeting to clarifying which one you mean.\"},\n        {n:\"Code GitHub Actions\",p:\"CI / GitHub-native\",rule:\"✅\",gh:[\"✅\",\"g\",\"Lives inside GitHub, reviews PRs, pushes commits.\"],\n         v:\"Claude, but it moved into GitHub and got a job. Does exactly what you want — as long as what you want is to configure a YAML file at 11pm.\"}\n      ];\n\n      const grid=document.getElementById('grid');\n      const drawer=document.getElementById('drawer');\n      const unpicked=document.getElementById('unpicked');\n      document.getElementById('tot').textContent=S.length;\n      let sel=-1;\n\n      const colorMap = {\n        g: 'text-emerald-900 bg-emerald-400 border-emerald-600 shadow-[0_2px_0_#047857]',\n        w: 'text-amber-900 bg-amber-400 border-amber-600 shadow-[0_2px_0_#b45309]',\n        b: 'text-red-900 bg-red-400 border-red-600 shadow-[0_2px_0_#991b1b]'\n      };\n\n      S.forEach((s,i)=>{\n        const c=document.createElement('div');\n        c.className='group bg-[linear-gradient(135deg,#fffbeb,#fde68a)] text-red-950 border-4 border-amber-400 border-double p-5 relative cursor-pointer hover:-translate-y-2 hover:rotate-1 transition-all duration-300 flex flex-col justify-between min-h-[140px] shadow-[0_6px_0_#b45309] rounded-2xl data-[selected=true]:bg-[linear-gradient(135deg,#fcd34d,#fbbf24)] data-[selected=true]:border-red-600 data-[selected=true]:ring-4 data-[selected=true]:ring-amber-300 data-[selected=true]:shadow-[0_0_30px_rgba(245,158,11,0.8)] data-[selected=true]:scale-110 data-[selected=true]:-rotate-2 data-[selected=true]:z-20';\n        c.dataset.selected = \"false\";\n        c.innerHTML=`\n          <div class=\"absolute top-3 right-3 text-lg bg-red-100 rounded-full h-8 w-8 flex items-center justify-center shadow-[0_2px_0_#f87171] border border-red-300 z-10\">${s.rule}</div>\n          <div class=\"relative z-0 text-left\">\n            <div class=\"font-extrabold text-lg text-red-950 tracking-tight group-hover:text-red-700 transition-colors pr-8 leading-tight\">${s.n}</div>\n            <div class=\"text-xs font-bold text-red-800/80 uppercase tracking-widest mt-2 bg-amber-200/50 inline-block px-2 py-1 rounded border border-amber-300/50\">${s.p}</div>\n          </div>\n          <div class=\"absolute bottom-3 right-3 text-sm font-black text-amber-600/40 transform -rotate-12\">No. ${String(i+1).padStart(2,'0')}</div>\n        `;\n        c.onclick=()=>pick(i);\n        grid.appendChild(c);\n      });\n\n      function pick(i){\n        sel=i;const s=S[i];\n        [...grid.children].forEach((c,j)=>c.setAttribute('data-selected', j===i ? 'true' : 'false'));\n        unpicked.textContent=S.length-1;\n        const ghBadge = colorMap[s.gh[1]];\n\n        drawer.innerHTML=`\n          <div class=\"absolute inset-0 border-[4px] border-dashed border-red-900/40 pointer-events-none m-3 rounded-2xl animate-pulse\"></div>\n          <div class=\"absolute -top-10 -right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl opacity-20 pointer-events-none\"></div>\n          <div class=\"relative z-10 text-left\">\n            <div class=\"text-2xl md:text-3xl font-extrabold tracking-tight text-amber-300 mb-2 flex items-center gap-3 drop-shadow-md\">\n              <iconify-icon icon=\"solar:ticket-bold\" class=\"text-amber-500 text-4xl drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]\"></iconify-icon>\n              ${s.n}\n              <span class=\"text-sm font-bold bg-red-900 text-amber-400 px-3 py-1 rounded-full border border-amber-500/50 uppercase tracking-widest shadow-inner ml-2\">${s.p}</span>\n            </div>\n            <div class=\"text-amber-50 text-lg md:text-xl mb-6 leading-relaxed pl-12 font-medium\">${s.v}</div>\n            <div class=\"flex flex-wrap gap-3 items-center text-sm pl-12 font-bold\">\n              <span class=\"border-2 border-red-700 bg-red-950/60 rounded-xl px-4 py-2.5 text-amber-100 flex items-center gap-3 shadow-lg\">\n                Can write to your GitHub repo?\n                <strong class=\"${ghBadge} font-black px-3 py-1 rounded-lg border-2 flex items-center gap-1 uppercase tracking-wide\">\n                  ${s.gh[0]} ${s.gh[2]}\n                </strong>\n              </span>\n            </div>\n          </div>`;\n        drawer.scrollIntoView({behavior:'smooth',block:'center'});\n      }\n\n      document.getElementById('rng').onclick=()=>{\n        const q=[\"SPINNING THE WHEEL... \",\"WHEEL OF DESTINY SAYS: \",\"NO PEEKING! \",\"THE CARNIVAL MASTER CHOOSES: \"];\n        let i=0;\n        let spins = 0;\n        const interval = setInterval(() => {\n          [...grid.children].forEach(c=>c.setAttribute('data-selected', 'false'));\n          grid.children[i].setAttribute('data-selected', 'true');\n          i = (i + 1) % S.length;\n          spins++;\n          if (spins > 15) {\n            clearInterval(interval);\n            const finalPick = Math.floor(Math.random()*S.length);\n            pick(finalPick);\n            drawer.firstElementChild.insertAdjacentHTML('afterend',\n              `<div class=\"relative z-10 mb-6 inline-flex items-center gap-2 bg-amber-400 border-4 border-red-800 text-red-950 font-black text-sm px-4 py-2 rounded-xl shadow-[0_4px_0_#7f1d1d] transform -rotate-1\">\n                <iconify-icon icon=\"solar:magic-stick-3-bold\" class=\"text-xl\"></iconify-icon>\n                <span>${q[Math.floor(Math.random()*q.length)]} TICKET <b class=\"text-red-700 text-lg mx-1\">#${finalPick+1}</b>! <span class=\"animate-bounce ml-1 inline-block\">🎪</span></span>\n              </div>`);\n          }\n        }, 50);\n      };\n\n      document.getElementById('reset').onclick=()=>{\n        sel=-1;[...grid.children].forEach(c=>c.setAttribute('data-selected', 'false'));\n        unpicked.textContent=S.length;\n        drawer.innerHTML=`\n          <div class=\"absolute inset-0 border-[4px] border-dashed border-red-900/40 pointer-events-none m-3 rounded-2xl\"></div>\n          <div class=\"text-amber-300 text-xl text-center py-10 flex flex-col items-center justify-center gap-4 relative z-10 font-bold tracking-wide\">\n            <iconify-icon icon=\"solar:refresh-circle-bold\" class=\"text-5xl opacity-80 drop-shadow-[0_0_10px_rgba(252,211,77,0.5)]\"></iconify-icon>\n            Step right up! The wheel is ready. 15 doorways await your decision.\n          </div>`;\n      };\n    "
  }
];
const sourceHtmlId = "";
const sourceHtmlClassName = "";
const sourceHtmlStyle = "";
const sourceBodyId = "";
const sourceBodyClassName = "font-mono bg-[repeating-conic-gradient(from_0deg,#450a0a_0deg_15deg,#2e0404_15deg_30deg)] text-amber-50 min-h-screen p-6 md:p-10 antialiased overflow-x-hidden";
const sourceBodyStyle = "";
const inlineEventAttributeNames = [
  "click",
  "change",
  "input",
  "submit",
  "mouseover",
  "mouseout",
  "mouseenter",
  "mouseleave",
  "keydown",
  "keyup",
  "focus",
  "blur"
];

function applyElementAttributes(element, attributes) {
  const previousId = element.id;
  const previousClassName = element.className;
  const previousStyleAttribute = element.getAttribute("style");

  if (attributes.id) {
    element.id = attributes.id;
  }
  attributes.className
    .split(/\s+/)
    .filter(Boolean)
    .forEach((className) => element.classList.add(className));
  if (attributes.style) {
    element.style.cssText = [element.style.cssText, attributes.style]
      .filter(Boolean)
      .join("; ");
  }

  return () => {
    element.id = previousId;
    element.className = previousClassName;
    if (previousStyleAttribute === null) {
      element.removeAttribute("style");
    } else {
      element.setAttribute("style", previousStyleAttribute);
    }
  };
}

function applySourceRootAttributes() {
  const restoreHtml = applyElementAttributes(document.documentElement, {
    id: sourceHtmlId,
    className: sourceHtmlClassName,
    style: sourceHtmlStyle,
  });
  const restoreBody = applyElementAttributes(document.body, {
    id: sourceBodyId,
    className: sourceBodyClassName,
    style: sourceBodyStyle,
  });

  return () => {
    restoreBody();
    restoreHtml();
  };
}

function attachInlineEventHandlers(root) {
  const cleanups = [];

  inlineEventAttributeNames.forEach((eventName) => {
    root
      .querySelectorAll(`[data-aura-on${eventName}]`)
      .forEach((element) => {
        const handlerCode = element.getAttribute(`data-aura-on${eventName}`);
        if (!handlerCode) return;

        const listener = function (event) {
          const result = Function("event", handlerCode).call(element, event);
          if (result === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        };
        element.addEventListener(eventName, listener);
        cleanups.push(() => element.removeEventListener(eventName, listener));
      });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function appendSourceScript(scriptInfo) {
  const script = document.createElement("script");
  if (scriptInfo.id) script.id = scriptInfo.id;
  if (scriptInfo.type) script.type = scriptInfo.type;
  if (scriptInfo.async) script.async = true;
  if (scriptInfo.defer) script.defer = true;
  if (scriptInfo.src) {
    script.src = scriptInfo.src;
  } else if (scriptInfo.content) {
    script.textContent = scriptInfo.content;
  }
  document.body.appendChild(script);
  return script;
}

export default function App() {
  useLayoutEffect(() => applySourceRootAttributes(), []);

  useEffect(() => {
    const detachInlineEventHandlers = attachInlineEventHandlers(document);
    const appendedScripts = sourceScripts
      .filter((scriptInfo) => scriptInfo.src || scriptInfo.content)
      .map(appendSourceScript);

    return () => {
      detachInlineEventHandlers();
      appendedScripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="aura-source-body font-mono bg-[repeating-conic-gradient(from_0deg,#450a0a_0deg_15deg,#2e0404_15deg_30deg)] text-amber-50 min-h-screen p-6 md:p-10 antialiased overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <div className="text-sm font-bold tracking-[0.3em] uppercase text-amber-400 mb-4 flex items-center justify-center gap-2 bg-red-950/80 px-5 py-2 rounded-full border-2 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <iconify-icon icon="solar:ferris-wheel-bold" strokeWidth="1.5"></iconify-icon>
              Anthropic Onboarding Experience
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] mb-4 uppercase flex flex-col md:flex-row items-center gap-3 justify-center text-center">
              Which Claude do you want to fail to use today?
              <sup className="text-2xl md:text-3xl text-amber-500 -ml-1 font-black drop-shadow-none">
                ™
              </sup>
            </h1>

            <p className="text-amber-100/90 text-base md:text-lg max-w-3xl mb-8 leading-relaxed mx-auto font-medium">
              You have a task. Somewhere in the product portfolio is a surface that
              can do it. Statistically. We won't tell you which one — that would
              defeat the funnel. Step right up and select from the following
              functionally-overlapping doorways.
            </p>

            <div className="flex flex-wrap gap-4 items-center justify-center mb-8 bg-red-950/60 p-5 rounded-3xl border-4 border-double border-red-800/80 shadow-xl">
              <span className="px-4 py-2 rounded-xl border-2 border-amber-500/30 bg-red-950/80 text-sm text-amber-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] font-semibold flex items-center gap-1">
                Surfaces available:
                <b id="tot" className="text-amber-400 font-medium ml-1">15</b>
              </span>
              <span className="px-4 py-2 rounded-xl border-2 border-amber-500/30 bg-red-950/80 text-sm text-amber-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] font-semibold flex items-center gap-1">
                Surfaces that fully do what you want:
                <b className="text-amber-400 font-medium ml-1">1*</b>
              </span>
              <span className="px-4 py-2 rounded-xl border-2 border-amber-500/30 bg-red-950/80 text-sm text-amber-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] font-semibold flex items-center gap-1">
                Surfaces you have
                <em className="italic opacity-80">not</em>
                chosen:
                <b id="unpicked" className="text-amber-400 font-medium ml-1">15</b>
              </span>

              <button className="bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-red-950 text-base font-extrabold px-8 py-3.5 rounded-full border-2 border-amber-100 shadow-[0_6px_0_#9a3412] active:shadow-[0_0px_0_#9a3412] active:translate-y-[6px] transition-all flex items-center gap-2 uppercase tracking-wider mx-2" id="rng">
                <iconify-icon icon="solar:magic-stick-3-bold" strokeWidth="1.5"></iconify-icon>
                Just pick one for me
              </button>

              <button className="bg-red-900/80 hover:bg-red-800 border-2 border-red-600 text-amber-300 text-sm font-bold px-6 py-3.5 rounded-full shadow-[0_4px_0_#450a0a] active:shadow-[0_0px_0_#450a0a] active:translate-y-[4px] transition-all flex items-center gap-2 uppercase tracking-wider mx-2" id="reset">
                <iconify-icon icon="solar:refresh-circle-bold" strokeWidth="1.5"></iconify-icon>
                Start over (again)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 p-6 bg-red-950/40 rounded-3xl border-4 border-dashed border-red-900/60 shadow-inner" id="grid"></div>

            <div className="mt-12 border-8 border-double border-amber-400 bg-[radial-gradient(ellipse_at_center,#7f1d1d,#450a0a)] rounded-3xl p-8 md:p-12 min-h-[200px] shadow-[0_0_50px_rgba(245,158,11,0.4)] relative overflow-hidden transform transition-all duration-500 text-left" id="drawer">
              <div className="absolute inset-0 border-[4px] border-dashed border-red-900/40 pointer-events-none m-3 rounded-2xl"></div>
              <div className="text-amber-300 text-xl text-center py-10 flex flex-col items-center justify-center gap-4 relative z-10 font-bold tracking-wide">
                <iconify-icon icon="solar:refresh-circle-bold" className="text-5xl opacity-80 drop-shadow-[0_0_10px_rgba(252,211,77,0.5)]"></iconify-icon>
                Step right up! The wheel is ready. 15 doorways await your decision.
              </div>
            </div>

            <div className="mt-16 pt-8 border-t-4 border-dotted border-red-800/80 text-sm text-amber-400/80 leading-relaxed font-medium mx-auto max-w-4xl text-center">
              <b className="text-amber-500/80">*</b>
              "Fully" is doing heroic work in that sentence. Actual capability varies
              by surface, platform, plan tier, moon phase, and whether you've pasted a
              token.
              <br />
              <b className="text-amber-500/80 mt-2 inline-block">Note:</b>
              This selector is itself a 16th surface. You are now using it instead of
              doing the thing.
            </div>
          </div>
    </div>
  );
}
