"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import type { Tone } from "@/content/site";
import { cn, tilt, toneBg } from "@/lib/ui";

type DraggableStickerProps = {
  children: ReactNode;
  tone: Tone;
  angle: number;
  className?: string;
  /** Max distance (px) a sticker can be dragged from its resting spot. */
  range?: number;
  /** Offsets the wobble so neighbouring stickers don't move in sync. */
  index?: number;
};

/**
 * A sticker you can nudge around with a mouse, pen or finger. Purely
 * decorative: its text stays readable and in place for assistive tech.
 */
export function DraggableSticker({
  children,
  tone,
  angle,
  className,
  range = 220,
  index = 0,
}: DraggableStickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const drag = useRef({ active: false, startX: 0, startY: 0, x: 0, y: 0, baseX: 0, baseY: 0 });

  const clamp = (value: number) => Math.max(-range, Math.min(range, value));

  function onPointerDown(event: PointerEvent<HTMLSpanElement>) {
    if (event.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture(event.pointerId);
    drag.current = {
      ...drag.current,
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      baseX: drag.current.x,
      baseY: drag.current.y,
    };
    el.dataset.dragging = "true";
  }

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    const state = drag.current;
    const el = ref.current;
    if (!state.active || !el) return;
    state.x = clamp(state.baseX + event.clientX - state.startX);
    state.y = clamp(state.baseY + event.clientY - state.startY);
    el.style.translate = `${state.x}px ${state.y}px`;
  }

  function onPointerEnd(event: PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    drag.current.active = false;
    if (!el) return;
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    delete el.dataset.dragging;
  }

  return (
    <span
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      className={cn(
        "sticker animate-wobble cursor-grab touch-none text-ink active:cursor-grabbing",
        "data-[dragging=true]:z-30 data-[dragging=true]:[animation-play-state:paused] data-[dragging=true]:scale-105",
        toneBg[tone],
        className,
      )}
      style={tilt(angle, { animationDelay: `${index * -1.1}s` })}
    >
      {children}
    </span>
  );
}
