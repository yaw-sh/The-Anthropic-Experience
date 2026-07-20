import { publicCatalog } from "../../content/catalog";
import { EvidenceDrawer } from "../evidence-drawer/EvidenceDrawer";
import { Hero } from "../hero/Hero";
import { ScenePlayer } from "../scene-player/ScenePlayer";
import { SurfaceDirectoryExperience } from "../surface-directory/SurfaceDirectoryExperience";
import { useExperienceState } from "../../app/state";

const modes = ["roast", "receipts", "transcript"] as const;

export function GuidedExperience() {
  const state = useExperienceState();
  const activeScene = publicCatalog.scenes.some(({ id }) => id === state.scene)
    ? state.scene
    : publicCatalog.scenes[0].id;
  const chooseScene = (sceneId: string) => {
    state.setScene(sceneId);
    document.getElementById(`scene-${sceneId}`)?.scrollIntoView?.({ block: "start" });
  };
  return (
    <>
      <SurfaceDirectoryExperience fullFilters={false} />
      <Hero />
      <main id="guided-content" className="review-stage">
        <div className="review-stage__intro">
          <p className="kicker">BRANCH-CLEANUP / REVIEW CUT</p>
          <h2>What was requested. What appeared. What can be verified.</h2>
        </div>
        <div className="mode-switcher" role="group" aria-label="Review mode">
          {modes.map((mode) => (
            <button type="button" key={mode} aria-pressed={state.mode === mode} onClick={() => state.setMode(mode)}>
              {mode[0].toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        <nav className="scene-nav" aria-label="Scenes">
          {publicCatalog.scenes.map((scene) => (
            <button type="button" key={scene.id} aria-current={activeScene === scene.id ? "step" : undefined} onClick={() => chooseScene(scene.id)}>
              <span>{scene.sectionType === "scene" ? String(scene.sceneNumber).padStart(2, "0") : scene.sectionType === "prologue" ? "P" : "F"}</span>
              {scene.navLabel}
            </button>
          ))}
        </nav>
        <div className="guided-sections">
          {publicCatalog.scenes.map((scene) => (
            <ScenePlayer key={scene.id} scene={scene} mode={state.mode} active={activeScene === scene.id} onOpenReceipt={state.openReceipt} />
          ))}
        </div>
      </main>
      {state.receipt && <EvidenceDrawer receiptId={state.receipt} claimId={state.claim} onClose={state.closeReceipt} />}
    </>
  );
}
