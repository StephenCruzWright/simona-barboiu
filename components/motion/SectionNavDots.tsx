"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

/**
 * Right-rail section nav. Auto-discovers `[data-nav-section]` elements on
 * mount, renders one dot per section, highlights the active one based on
 * scroll position, and scrolls to a section on click.
 *
 * Pages opt in by adding `data-nav-section="Label"` to a section element.
 * If no sections are found, this component renders nothing.
 *
 * Hidden on small screens (md breakpoint).
 */
export default function SectionNavDots() {
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]")
    );
    if (!els.length) return;

    const list: Section[] = [];
    els.forEach((el, i) => {
      if (!el.id) el.id = `nav-section-${i}`;
      list.push({
        id: el.id,
        label: el.dataset.navSection || `Section ${i + 1}`,
      });
    });

    // Reading the mounted DOM for `[data-nav-section]` elements is an
    // external-system read — the legitimate use of an effect — so syncing the
    // discovered sections into state here is intentional, not a render-derived
    // value. (This runs once on mount.)
    /* eslint-disable react-hooks/set-state-in-effect */
    setSections(list);
    setActive(list[0]?.id ?? null);
    /* eslint-enable react-hooks/set-state-in-effect */

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!sections.length) return null;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 md:flex"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => scrollTo(s.id)}
          aria-label={`Jump to ${s.label}`}
          aria-current={active === s.id}
          className="group relative flex h-3 w-3 items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-300 ease-out ${
              active === s.id
                ? "h-3 w-3 bg-(--accent)"
                : "h-1.5 w-1.5 bg-white/35 group-hover:bg-white/70"
            }`}
          />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[10px] uppercase tracking-[0.4em] text-white/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
