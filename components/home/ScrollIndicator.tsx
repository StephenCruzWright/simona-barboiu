"use client";

import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setHidden(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-8 z-30 flex justify-center transition-opacity duration-700 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/55">
        <span>Scroll</span>
        <div className="relative h-10 w-[1px] overflow-hidden bg-white/15">
          <div className="scroll-indicator-pulse absolute inset-x-0 top-0 h-3 w-[1px] bg-[var(--accent)]" />
        </div>
      </div>
    </div>
  );
}