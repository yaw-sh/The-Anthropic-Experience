import type { CSSProperties, ReactNode } from "react";
import { publicCatalog } from "../../content/catalog";
import { imageManifest, imageSources, type ImageId } from "../../content/imageManifest";
import type { StageLayout } from "../../content/stageLayouts";

export type CatalogStageControl = (typeof publicCatalog.stageControls)[number];

type ResponsiveSceneStageProps = {
  layout: StageLayout;
  renderControl: (control: CatalogStageControl) => ReactNode;
  companion?: ReactNode;
};

export function ResponsiveSceneStage({ layout, renderControl, companion }: ResponsiveSceneStageProps) {
  const imageId = layout.imageId as ImageId;
  const image = imageManifest[imageId];
  const sources = imageSources(imageId);
  const large = sources.jpeg.at(-1)!;
  const srcSet = (items: typeof sources.jpeg) => items.map(({ path, width }) => `${path} ${width}w`).join(", ");
  const controls = new Map(publicCatalog.stageControls.map((control) => [control.id, control]));
  const companionId = `${layout.id}-companion`;
  const controlGroupLabels: Record<StageLayout["kind"], string> = {
    directory: "Surface directory controls",
    static: "Static scene anchor",
    families: "Surface family selector",
    capabilities: "Capability inventory",
    authorization: "Authorization chain",
    thesis: "Thesis framework",
    responsibilities: "Operator responsibilities",
    paperwork: "Paperwork output",
    evidence: "Evidence Room controls",
    finale: "Finale navigation",
  };

  return (
    <section
      className={`responsive-scene-stage responsive-scene-stage--${layout.kind}`}
      data-layout-id={layout.id}
      data-mobile-presentation={layout.mobilePresentation}
    >
      <div className="responsive-scene-stage__raster">
        <picture data-stage-image-id={layout.imageId} aria-describedby={companion ? companionId : undefined}>
          <source type="image/avif" srcSet={srcSet(sources.avif)} sizes="(max-width: 899px) 100vw, 1100px" />
          <source type="image/webp" srcSet={srcSet(sources.webp)} sizes="(max-width: 899px) 100vw, 1100px" />
          <img
            className="responsive-scene-stage__image"
            src={large.path}
            srcSet={srcSet(sources.jpeg)}
            sizes="(max-width: 899px) 100vw, 1100px"
            width={image.sourceWidth}
            height={image.sourceHeight}
            alt={image.alt}
            loading="lazy"
          />
        </picture>
        <div
          className="responsive-scene-stage__controls"
          role="group"
          aria-label={controlGroupLabels[layout.kind]}
          aria-describedby={companion ? companionId : undefined}
        >
          {layout.slots.map((stageSlot) => {
            const control = controls.get(stageSlot.controlId);
            if (!control) throw new Error(`Missing stage control: ${stageSlot.controlId}`);
            return (
              <div
                className="responsive-scene-stage__slot"
                key={stageSlot.id}
                data-stage-control-id={stageSlot.controlId}
                style={{
                  "--stage-x": `${stageSlot.x}%`,
                  "--stage-y": `${stageSlot.y}%`,
                  "--stage-width": `${stageSlot.width}%`,
                  "--stage-height": `${stageSlot.height}%`,
                } as CSSProperties}
              >
                {renderControl(control)}
              </div>
            );
          })}
        </div>
      </div>
      {companion && <div id={companionId} className="responsive-scene-stage__companion">{companion}</div>}
    </section>
  );
}
