import React, { useEffect, useRef, useState } from "react";
import "./DublinGlobe.css";

/**
 * Display the interactive Dublin globe and its loading or unavailable state.
 * Loads the Three.js renderer asynchronously, forwards keyboard/reset controls,
 * and disposes the renderer on unmount. No props are required.
 * @returns {React.ReactElement} Globe figure with an accessible caption and controls.
 */
export default function DublinGlobe() {
  const canvas = useRef(null);
  const label = useRef(null);
  const controls = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    let dispose;
    import("./createGlobe").then(({ createGlobe }) => {
      if (cancelled) return;
      try {
        const globe = createGlobe(canvas.current, label.current, () => {
          if (!cancelled) setStatus("ready");
        }, () => {
          if (!cancelled) setStatus("error");
        });
        controls.current = globe;
        dispose = globe.dispose;
      } catch {
        setStatus("error");
      }
    }).catch(() => { if (!cancelled) setStatus("error"); });
    return () => {
      cancelled = true;
      controls.current = null;
      dispose?.();
    };
  }, []);

  if (status === "error") {
    return <figure className="dublin-globe"><p>Dublin, Ireland</p><p role="status">3D globe unavailable.</p></figure>;
  }

  return (
    <figure className="dublin-globe">
      <div className="dublin-globe__scene" aria-busy={status === "loading"}>
        <canvas
          ref={canvas}
          className="dublin-globe__canvas"
          width="280"
          height="280"
          tabIndex={0}
          role="img"
          aria-label="Interactive 3D Earth with Dublin highlighted. Drag or use arrow keys to rotate. Press Home to reset."
          onKeyDown={event => {
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) {
              event.preventDefault();
              controls.current?.key(event.key);
            }
          }}
        >Earth showing Dublin, Ireland.</canvas>
        <span ref={label} className="dublin-globe__label" aria-hidden="true" hidden>Dublin</span>
        {status === "loading" && <span className="dublin-globe__loading">Loading Earth…</span>}
      </div>
      <figcaption>
        <button className="dublin-globe__reset" title="Reset globe to Dublin" onClick={() => controls.current?.reset()}>
          <span aria-hidden="true">●</span> Dublin, Ireland
        </button>
        <span className="dublin-globe__hint">Drag to explore · arrow keys to rotate</span>
      </figcaption>
    </figure>
  );
}
