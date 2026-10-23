"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Scroll engine for /explained. One requestAnimationFrame loop eases each
 * chapter's progress --p (0 when its stage pins, 1 when it lets go) toward
 * the scroll position, and moves each chapter's camera. Everything else is
 * CSS that derives from --p, so scrolling back up rewinds it all.
 *
 * The loop only runs while something is still easing; scroll and resize
 * restart it. With reduced motion (or a browser without the `scripting`
 * media feature) the CSS falls back to a static page and this does nothing.
 */

// Same query as the CSS that turns on the sticky stages.
const PLAY = "(scripting: enabled) and (prefers-reduced-motion: no-preference)";
const PHONE = "(max-width: 40rem)";
// Seconds for the eased value to cover ~63% of the remaining distance.
const SMOOTHING = 0.09;
// On phones, camera zoom, drift and rotation are scaled down to this share.
const PHONE_CAMERA = 0.35;

/**
 * A camera keyframe: [p, x%, y%, scale, rotate°], or [p, "focus", scale,
 * rotate°] to centre the element with that data-cam-focus value.
 */
export type CamKey = [number, number, number, number, number] | [number, string, number, number];

type Pose = { x: number; y: number; s: number; r: number };
type Camera = {
  el: HTMLElement;
  keys: CamKey[];
  /** Pans (data-cam-pan) keep their full x/y on phones. */
  pan: boolean;
  poses: { p: number; pose: Pose }[];
  written: string;
};
type Chapter = {
  el: HTMLElement;
  stage: HTMLElement;
  cams: Camera[];
  top: number;
  span: number;
  p: number;
  written: string;
  near: boolean;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Position of an element's centre inside `ancestor`, ignoring transforms. */
function centreWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/** Turns keyframes into poses for the current layout and screen size. */
function resolvePoses(cam: Camera, phone: boolean) {
  const w = cam.el.offsetWidth || 1;
  const h = cam.el.offsetHeight || 1;
  const k = phone ? PHONE_CAMERA : 1;
  cam.poses = cam.keys.map((key) => {
    const p = key[0];
    let x: number, y: number, s: number, r: number;
    if (typeof key[1] === "string") {
      s = key[2] as number;
      r = key[3] as number;
      const target = cam.el.querySelector<HTMLElement>(`[data-cam-focus="${key[1]}"]`);
      x = y = 0;
      if (target) {
        // transform: translate(T) scale(s) rotate(r) around the camera's
        // centre maps a point f to T + s·R(f), so T = -s·R(f) centres it.
        const c = centreWithin(target, cam.el);
        const fx = c.x - w / 2;
        const fy = c.y - h / 2;
        const sd = phone ? 1 + (s - 1) * k : s;
        const rad = ((phone ? r * k : r) * Math.PI) / 180;
        x = (-sd * (fx * Math.cos(rad) - fy * Math.sin(rad)) / w) * 100;
        y = (-sd * (fx * Math.sin(rad) + fy * Math.cos(rad)) / h) * 100;
      }
    } else {
      [x, y, s, r] = key.slice(1) as number[];
    }
    if (phone) {
      s = 1 + (s - 1) * k;
      r *= k;
      if (!cam.pan) {
        x *= k;
        y *= k;
        x = keepInFrame(cam.el, x, s);
      }
    }
    return { p, pose: { x, y, s, r } };
  });
}

/**
 * On phones the content nearly fills the width, so even a small zoom or
 * drift can cut off the start of every line. Keep the content's left and
 * right edges on screen when it fits, and centre it when it doesn't.
 */
function keepInFrame(camEl: HTMLElement, xPercent: number, s: number) {
  const box = camEl.firstElementChild as HTMLElement | null;
  if (!box) return xPercent;
  const w = camEl.offsetWidth || 1;
  const margin = 6;
  // Edges of the scaled content, relative to the camera's centre.
  const left = s * (box.offsetLeft - w / 2);
  const right = s * (box.offsetLeft + box.offsetWidth - w / 2);
  let t = (xPercent / 100) * w;
  if (right - left > w - 2 * margin) t = -(left + right) / 2;
  else t = Math.min(w / 2 - margin - right, Math.max(-w / 2 + margin - left, t));
  return (t / w) * 100;
}

function poseAt(poses: Camera["poses"], p: number): Pose {
  if (p <= poses[0].p) return poses[0].pose;
  for (let i = 1; i < poses.length; i++) {
    const b = poses[i];
    if (p <= b.p) {
      const a = poses[i - 1];
      const t = smoothstep(clamp01((p - a.p) / (b.p - a.p || 1)));
      const mix = (u: number, v: number) => u + (v - u) * t;
      return { x: mix(a.pose.x, b.pose.x), y: mix(a.pose.y, b.pose.y), s: mix(a.pose.s, b.pose.s), r: mix(a.pose.r, b.pose.r) };
    }
  }
  return poses[poses.length - 1].pose;
}

export function Explainer({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const play = window.matchMedia(PLAY);
    const phone = window.matchMedia(PHONE);

    const chapters: Chapter[] = [...el.querySelectorAll<HTMLElement>("[data-vx-chapter]")].map((section) => ({
      el: section,
      stage: section.querySelector<HTMLElement>(".vx-stage")!,
      cams: [...section.querySelectorAll<HTMLElement>("[data-cam]")].map((cam) => ({
        el: cam,
        keys: JSON.parse(cam.dataset.cam!) as CamKey[],
        pan: cam.hasAttribute("data-cam-pan"),
        poses: [],
        written: "",
      })),
      top: 0,
      span: 0,
      p: 0,
      written: "",
      near: false,
    }));

    let raf = 0;
    let last = 0;
    let snap = true;
    // Later chapters' artwork and the texture loops wait until the page has
    // loaded and painted, so they don't hold back the title card.
    let artReady = false;

    function measure() {
      for (const c of chapters) {
        c.top = parseFloat(getComputedStyle(c.stage).top) || 0;
        c.span = c.el.offsetHeight - c.stage.offsetHeight;
        for (const cam of c.cams) resolvePoses(cam, phone.matches);
        c.written = "";
        for (const cam of c.cams) cam.written = "";
      }
    }

    function frame(now: number) {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 60;
      last = now;
      const ease = snap ? 1 : 1 - Math.exp(-dt / SMOOTHING);
      const vh = window.innerHeight;

      // Read every position first, then write, so the writes don't force
      // a layout per chapter.
      const rects = chapters.map((c) => c.el.getBoundingClientRect());
      let moving = false;
      chapters.forEach((c, i) => {
        const rect = rects[i];
        const target = c.span > 0 ? clamp01((c.top - rect.top) / c.span) : rect.top <= c.top ? 1 : 0;
        // More than a screen away: jump straight to the target (once) and skip it.
        const near = (artReady || i === 0) && rect.bottom > -vh && rect.top < 2 * vh;
        if (!near || ease === 1) {
          c.p = target;
        } else {
          c.p += (target - c.p) * ease;
          if (Math.abs(target - c.p) < 0.0002) c.p = target;
          else moving = true;
        }
        if (near !== c.near) {
          c.near = near;
          c.el.toggleAttribute("data-near", near);
        }
        const value = c.p.toFixed(4);
        if (value !== c.written) {
          c.written = value;
          c.el.style.setProperty("--p", value);
          for (const cam of c.cams) {
            if (!cam.poses.length) continue;
            const { x, y, s, r } = poseAt(cam.poses, c.p);
            const transform = `translate(${x.toFixed(3)}%, ${y.toFixed(3)}%) scale(${s.toFixed(4)}) rotate(${r.toFixed(3)}deg)`;
            if (transform !== cam.written) {
              cam.written = transform;
              cam.el.style.transform = transform;
            }
          }
        }
      });
      snap = false;
      if (moving) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        last = 0;
      }
    }

    function kick() {
      if (play.matches && !raf) raf = requestAnimationFrame(frame);
    }

    function relayout() {
      if (!play.matches) return;
      measure();
      snap = true;
      kick();
    }

    // Reduced motion switched on mid-visit: hand back to the static CSS.
    function onPlayChange() {
      if (play.matches) return relayout();
      cancelAnimationFrame(raf);
      raf = 0;
      for (const c of chapters) {
        c.el.style.removeProperty("--p");
        c.el.removeAttribute("data-near");
        for (const cam of c.cams) cam.el.style.removeProperty("transform");
      }
    }

    // Keyboard focus: jump to the moment the focused link has landed (the
    // end of its window), so the camera frames it and no card covers it.
    function onFocus(event: FocusEvent) {
      const target = event.target as HTMLElement;
      if (!play.matches || !target.matches(":focus-visible")) return;
      const c = chapters.find((chapter) => chapter.el.contains(target));
      if (!c || c.span <= 0) return;
      const b = parseFloat(target.closest<HTMLElement>(".vx-t")?.style.getPropertyValue("--b") ?? "");
      const p = Number.isFinite(b) ? clamp01(b) : 1;
      const top = c.el.getBoundingClientRect().top + window.scrollY - c.top + p * c.span;
      window.scrollTo({ top: Math.round(top), behavior: "instant" });
      snap = true;
      kick();
    }

    function onArtReady() {
      artReady = true;
      // Starts the ink boil and paper grain (see explained.css).
      el!.toggleAttribute("data-live", true);
      kick();
    }
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const painted = new Promise<void>((resolve) => {
      if (performance.getEntriesByName("first-contentful-paint").length) return resolve();
      try {
        new PerformanceObserver((list, observer) => {
          observer.disconnect();
          resolve();
        }).observe({ type: "paint", buffered: true });
      } catch {
        resolve();
      }
    });
    // Never hold the artwork back for long, even if no paint entry arrives.
    const fallback = window.setTimeout(onArtReady, 4000);
    Promise.all([loaded, painted]).then(() => {
      window.clearTimeout(fallback);
      if (!artReady) onArtReady();
    });

    const resize = new ResizeObserver(relayout);
    resize.observe(el);
    window.addEventListener("scroll", kick, { passive: true });
    el.addEventListener("focusin", onFocus);
    phone.addEventListener("change", relayout);
    play.addEventListener("change", onPlayChange);
    // Web fonts move the camera focus points once they load.
    document.fonts?.ready.then(relayout);

    return () => {
      window.clearTimeout(fallback);
      artReady = true; // so the pending promise does nothing after unmount
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("scroll", kick);
      el.removeEventListener("focusin", onFocus);
      phone.removeEventListener("change", relayout);
      play.removeEventListener("change", onPlayChange);
    };
  }, []);

  return (
    <div ref={root} className="vx">
      {children}
    </div>
  );
}
