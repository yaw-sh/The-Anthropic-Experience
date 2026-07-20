import { useState } from "react";

const surfaces = [
  { name: "Claude Code", detail: "Terminal / CLI", color: "cream" },
  { name: "Claude Web", detail: "Cloud sandbox", color: "coral" },
  { name: "Cowork", detail: "Web edition", color: "teal" },
  { name: "Desktop", detail: "Local files", color: "yellow" },
  { name: "Claude Chat", detail: "claude.ai", color: "cream" },
  { name: "Projects", detail: "Longer context", color: "coral" },
  { name: "Artifacts", detail: "Make a thing", color: "teal" },
  { name: "Mobile", detail: "Tiny screen", color: "yellow" },
  { name: "API", detail: "Build it yourself", color: "cream" },
  { name: "Console", detail: "Settings maze", color: "coral" },
];

export default function App() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [chosen, setChosen] = useState(null);

  const spin = () => {
    if (spinning) return;
    const winner = Math.floor(Math.random() * surfaces.length);
    const segment = 360 / surfaces.length;
    const landingAngle = (360 - (winner * segment + segment / 2)) % 360;
    const currentAngle = rotation % 360;
    const nextRotation = rotation + 5 * 360 + ((landingAngle - currentAngle + 360) % 360);

    setChosen(null);
    setSpinning(true);
    setRotation(nextRotation);
    window.setTimeout(() => {
      setChosen(winner);
      setSpinning(false);
    }, 4200);
  };

  const reset = () => {
    if (!spinning) {
      setRotation(0);
      setChosen(null);
    }
  };

  return (
    <main className="circus-page">
      <div className="tent-stripes" />
      <section className="marquee" aria-label="The Claude Surface Selector">
        <div className="bulbs bulbs-top" />
        <div className="marquee-inner">
          <p className="eyebrow">Anthropic's most bewildering attraction</p>
          <h1>The Claude<br /><span>Surface Selector</span></h1>
          <p className="tagline">Spin boldly. Choose questionably.</p>
        </div>
        <div className="bulbs bulbs-bottom" />
      </section>

      <section className="game-area" aria-labelledby="wheel-heading">
        <div className="intro-card">
          <span className="ticket">ONE TASK ONLY</span>
          <h2 id="wheel-heading">Which doorway<br />will it be?</h2>
          <p>Ten surfaces. One wildly unnecessary decision. The wheel has no opinions, only momentum.</p>
          <div className="tiny-rule" />
          <p className="instruction">Pull the lever and let product architecture decide your fate.</p>
        </div>

        <div className="wheel-stage">
          <div className="pointer" aria-hidden="true"><span /></div>
          <div className="wheel-shadow" />
          <div className="wheel-frame">
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="wheel-face">
                {surfaces.map((surface, index) => (
                  <div
                    className={`wheel-label ${surface.color}`}
                    key={surface.name}
                    style={{ transform: `rotate(${index * 36 + 18}deg) translateY(-37%)` }}
                  >
                    <strong>{surface.name}</strong>
                    <small>{surface.detail}</small>
                  </div>
                ))}
                <div className="hub"><span>SPIN</span></div>
              </div>
            </div>
          </div>
          <button className="spin-button" onClick={spin} disabled={spinning}>
            {spinning ? "Hold tight..." : "Spin the wheel"}
          </button>
          <button className="reset-button" onClick={reset} disabled={spinning}>Reset the spectacle</button>
        </div>

        <aside className="result-card" aria-live="polite">
          <span className="ticket">TODAY'S FORTUNE</span>
          {spinning ? (
            <><div className="result-symbol">✦</div><h2>The suspense<br />is working.</h2><p>Somewhere, a surface is preparing to be selected.</p></>
          ) : chosen !== null ? (
            <><div className="result-symbol">★</div><h2>{surfaces[chosen].name}</h2><p><b>{surfaces[chosen].detail}</b><br />An excellent-ish choice. Try not to overthink it now.</p></>
          ) : (
            <><div className="result-symbol">?</div><h2>Your answer<br />awaits.</h2><p>The wheel is warmed up and professionally unqualified to advise you.</p></>
          )}
        </aside>
      </section>

      <footer>NO GUARANTEE OF CAPABILITY, COMPATIBILITY, OR EMOTIONAL CLOSURE. <span>•</span> EST. 2024</footer>
    </main>
  );
}
