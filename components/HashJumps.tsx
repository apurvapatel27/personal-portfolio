"use client";

import { useEffect } from "react";

/**
 * Sections below the fold render lazily (.defer-render) at an estimated
 * height, so a jump to /#section would aim at the wrong spot and drift as
 * the real heights arrive. Right before any jump, render them all for real
 * so the browser aims true.
 */
export function HashJumps() {
  useEffect(() => {
    const root = document.documentElement;
    const renderAll = () => root.classList.add("render-all");

    // Capture phase: runs before the link's own navigation and scroll.
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (link instanceof HTMLAnchorElement && link.pathname === location.pathname && link.hash) renderAll();
    }

    // Arrived with a hash (from another page or a fresh load): aim again.
    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    if (target) {
      renderAll();
      target.scrollIntoView({ behavior: "instant" });
      const landed = window.scrollY;
      // Web fonts can still reflow the page; aim once more unless the reader has moved.
      document.fonts?.ready.then(() => {
        if (window.scrollY === landed) target.scrollIntoView({ behavior: "instant" });
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
