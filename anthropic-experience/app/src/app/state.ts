import { useSearchParams } from "react-router-dom";
import { modeSchema, type ExperienceMode } from "../content/schemas";

const DEFAULT_MODE: ExperienceMode = "roast";
const DEFAULT_SCENE = "prologue";

export function useExperienceState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedMode = modeSchema.safeParse(searchParams.get("mode"));
  const mode = parsedMode.success ? parsedMode.data : DEFAULT_MODE;
  const scene = searchParams.get("scene") || DEFAULT_SCENE;
  const receipt = searchParams.get("receipt");
  const claim = searchParams.get("claim");

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(changes)) {
      if (value === null) next.delete(key);
      else next.set(key, value);
    }
    setSearchParams(next, { replace: false });
  };

  return {
    mode,
    scene,
    receipt,
    claim,
    setMode: (nextMode: ExperienceMode) => update({ mode: nextMode }),
    setScene: (nextScene: string) => update({ scene: nextScene, receipt: null }),
    openReceipt: (receiptId: string, claimId?: string) =>
      update({ mode: "receipts", receipt: receiptId, claim: claimId ?? null }),
    closeReceipt: () => update({ receipt: null, claim: null }),
  };
}
