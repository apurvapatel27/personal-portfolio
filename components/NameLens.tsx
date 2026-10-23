"use client";

import { useRef, type PointerEvent } from "react";

/**
 * The name inside the dark box. With a mouse, a round lens follows the
 * cursor (one style update per animation frame) and shows an inverted,
 * yellow copy of the letters underneath. Touch screens and reduced-motion
 * users just see the plain name.
 */
export function NameLens({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  function setLens(x: number, y: number, radius: number) {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--lens-x", `${x}px`);
      el.style.setProperty("--lens-y", `${y}px`);
      el.style.setProperty("--lens-r", `${radius}px`);
    });
  }

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // Lens scales with the box: about 45% of its height, capped.
    setLens(event.clientX - rect.left, event.clientY - rect.top, Math.min(96, rect.height * 0.45));
  }

  function onPointerLeave(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setLens(event.clientX - rect.left, event.clientY - rect.top, 0);
  }

  return (
    <span
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative block overflow-hidden bg-ink text-paper select-none"
    >
      <span className="name-text">{text}</span>
      <span className="lens-fill">
        <span className="name-text">{text}</span>
      </span>
      <span className="lens-ring" />
    </span>
  );
}
