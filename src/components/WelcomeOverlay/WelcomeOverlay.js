import React, { useEffect, useState } from "react";
import "./WelcomeOverlay.css";

// Tab-scoped playback flag, written when the welcome starts.
const SESSION_KEY = "stephen-welcome-played";
// Milliseconds from greeting start; Hello is rendered initially.
const GREETINGS = [
  [400, "Bonjour"],
  [675, "Hola"],
  [950, "Ciao"],
  [1225, "Hallo"],
  [1500, "Dia duit"],
];

// Check at mount: reduced motion skips the welcome animation entirely.
const reducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// If storage is unavailable, remember playback until the document is reloaded.
let playedInMemory = false;

/**
 * Determines if welcome animation should be shown.
 * @returns {boolean} Whether to show the welcome on this mount.
 */
function shouldWelcome() {
  // Only a first visit to Home gets the intro; deep links open immediately.
  if (
    reducedMotion() ||
    window.location.pathname !== "/" ||
    window.location.hash
  )
    return false;
  try {
    return !sessionStorage.getItem(SESSION_KEY);
  } catch {
    return !playedInMemory;
  }
}

/**
 * Mount page content beneath a timed, first-visit welcome.
 * greeting (0–2.1s) → exit (700ms) → complete (overlay removed).
 * This component does not handle navigation, keyboard dismissal, focus, or scroll locking.
 * @param {{ children: React.ReactNode }} props Page content to keep mounted throughout.
 */
export default function WelcomeOverlay({ children }) {
  // greeting → exit → complete. Decide before the first render to avoid a Home flash.
  const [state, setState] = useState(() =>
    shouldWelcome() ? "greeting" : "complete",
  );
  const [word, setWord] = useState("Hello");
  const active = state !== "complete";
  useEffect(() => {
    if (!active) return;
    // Match the 700ms CSS exit, finishing the full welcome at 2.8 seconds.
    if (state === "exit") {
      const timer = setTimeout(() => setState("complete"), 700);
      return () => clearTimeout(timer);
    }
    // Mark playback at the start so refreshing mid-intro does not replay it.
    playedInMemory = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      /* In-memory fallback. */
    }
    // Timers never wait for images or network requests.
    const timers = GREETINGS.map(([delay, greeting]) =>
      setTimeout(() => setWord(greeting), delay),
    );
    timers.push(setTimeout(() => setState("exit"), 2100));
    return () => timers.forEach(clearTimeout);
  }, [active, state]);

  return (
    <>
      {/* Keep Home mounted throughout, but hide it from assistive technology until complete. */}
      <div
        aria-hidden={active || undefined}
        className={`welcome-content welcome-content--${state}`}
      >
        {children}
      </div>
      {/* Remove the overlay entirely after its exit animation. */}
      {active && (
        <div
          className={`welcome-overlay welcome-overlay--${state}`}
          role="dialog"
          aria-label="Welcome to Stephen Byrne’s website"
        >
          {/* Expose a stable dialog name; changing words are hidden from screen readers. */}
          <div className="welcome-greeting" aria-hidden="true">
            <div
              className="welcome-word"
              lang={word === "Dia duit" ? "ga" : undefined}
            >
              {word}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
