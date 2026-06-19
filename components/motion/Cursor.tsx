"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-magnetic-wrap], [role=button], input, textarea, select"
      );
      if (interactive) {
        ring.classList.add("is-hovering");
      } else {
        ring.classList.remove("is-hovering");
      }

      // Context label ("View" / "View process" / "Zoom" / "Drag").
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      const text = labelled?.dataset.cursorLabel ?? "";
      if (text) {
        label.textContent = text;
        label.classList.add("is-visible");
      } else {
        label.classList.remove("is-visible");
      }
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${ringX}px, ${ringY}px) translate(18px, 18px)`;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(tick);

    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 h-[6px] w-[6px] rounded-full bg-foreground mix-blend-difference"
        style={{ zIndex: 9999, transform: "translate(-100px, -100px)" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring pointer-events-none fixed top-0 left-0 h-9 w-9 rounded-full border border-foreground/70 mix-blend-difference transition-[width,height,opacity] duration-300 ease-out"
        style={{ zIndex: 9998, transform: "translate(-100px, -100px)" }}
        aria-hidden
      />
      <div
        ref={labelRef}
        className="custom-cursor-label pointer-events-none fixed top-0 left-0 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-black"
        style={{ zIndex: 9999, transform: "translate(-100px, -100px)" }}
        aria-hidden
      />
    </>
  );
}