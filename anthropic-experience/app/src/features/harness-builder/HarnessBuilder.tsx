import { useMemo, useState } from "react";
import { publicCatalog, resolveAcceptedClaim } from "../../content/catalog";
import { getHarnessPreview, getInitialHarnessAnswers, type HarnessAnswers } from "../../content/harness";

const DEFAULT_PRESET = "repository-coding";

export function HarnessBuilder() {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET);
  const [plainLanguage, setPlainLanguage] = useState(false);
  const [answers, setAnswers] = useState<HarnessAnswers>(() => getInitialHarnessAnswers(DEFAULT_PRESET));
  const [status, setStatus] = useState("");
  const preview = useMemo(() => getHarnessPreview(presetId, plainLanguage, answers), [answers, plainLanguage, presetId]);
  const selectPreset = (next: string) => {
    setPresetId(next);
    setAnswers(getInitialHarnessAnswers(next));
    if (next !== "k12-support") setPlainLanguage(false);
    setStatus("");
  };
  const copy = async () => {
    await navigator.clipboard.writeText(preview);
    setStatus("Preview copied.");
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([preview], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `intent-harness-${presetId}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Preview downloaded.");
  };
  const reset = () => {
    setPresetId(DEFAULT_PRESET);
    setPlainLanguage(false);
    setAnswers(getInitialHarnessAnswers(DEFAULT_PRESET));
    setStatus("");
  };

  return (
    <main id="main-content" className="page-shell harness-page">
      <p className="kicker">CLIENT-ONLY / NO NETWORK</p><h1>Harness Builder</h1>
      <div className="harness-layout">
        <form className="harness-controls" onSubmit={(event) => event.preventDefault()}>
          <label>Preset<select value={presetId} onChange={(event) => selectPreset(event.target.value)}>{publicCatalog.harnessPresets.map((preset) => <option value={preset.id} key={preset.id}>{preset.label}</option>)}</select></label>
          <label><input type="checkbox" checked={plainLanguage} disabled={presetId !== "k12-support"} onChange={(event) => setPlainLanguage(event.target.checked)} /> K–12 plain language</label>
          <div className="harness-questions">
            {publicCatalog.harnessQuestions.map((question) => {
              const label = resolveAcceptedClaim(question.labelClaimId).text;
              const prompt = resolveAcceptedClaim(plainLanguage ? question.plainPromptClaimId : question.promptClaimId).text;
              return (
                <label key={question.id}>
                  {label}
                  <span>{prompt}</span>
                  <textarea
                    value={answers[question.id]}
                    onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                  />
                </label>
              );
            })}
          </div>
          <div className="button-row"><button type="button" onClick={copy}>Copy</button><button type="button" onClick={download}>Download .txt</button><button type="button" onClick={reset}>Reset</button></div>
          <p role="status" aria-live="polite">{status}</p>
        </form>
        <label className="preview-field">Deterministic preview<textarea readOnly value={preview} /></label>
      </div>
    </main>
  );
}
