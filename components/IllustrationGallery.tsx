"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

/**
 * Illustration gallery — CSS-columns masonry (aspect-ratios preserved, never
 * cropped) plus a purpose-built, accessible lightbox. When an artwork has
 * `process[]`, the lightbox becomes a vertical process-scroller (hero first,
 * process images stacked below) — the direct match to the client brief.
 *
 * Accessibility: role="dialog" + aria-modal, focus moved to the dialog on open
 * and restored on close, Esc to close, ←/→ to move between artworks, focus
 * trapped inside while open, background scroll locked.
 */
export default function IllustrationGallery({
  items,
}: {
  items: ProjectImage[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isOpen = openIndex !== null;
  const active = isOpen ? items[openIndex] : null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + items.length) % items.length
      ),
    [items.length]
  );

  // Lock background scroll + remember/restore focus while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      triggerRef.current?.focus?.();
    };
  }, [isOpen]);

  // Reset scroll position when switching artworks.
  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [openIndex, isOpen]);

  // Keyboard: Esc to close, arrows to navigate, Tab trapped in the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  return (
    <>
      <div
        data-stagger-in
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 *:mb-4"
      >
        {items.map((item, i) => {
          const hasProcess = (item.process?.length ?? 0) > 0;
          return (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i)}
              data-cursor-label={hasProcess ? "View process" : "Zoom"}
              className="group art-frame relative block w-full break-inside-avoid overflow-hidden text-left"
              aria-label={`Open ${item.alt}${hasProcess ? " and its process" : ""}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width ?? 1500}
                height={item.height ?? 1500}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                draggable={false}
              />
              {/* Glare sweep on hover. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              {/* Caption — fades up on hover. */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/65 to-transparent p-3 text-small opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-medium">{item.alt}</span>
                {hasProcess && (
                  <span className="text-accent">View process</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {isOpen && active && (
        <div
          className="fixed inset-0 z-100 flex items-start justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.alt} — artwork and process`}
            tabIndex={-1}
            className="relative flex h-full w-full max-w-5xl flex-col outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
              <span className="pointer-events-auto rounded-full bg-surface-2/80 px-3 py-1 text-small">
                {active.alt}
              </span>
              <div className="pointer-events-auto flex items-center gap-2">
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous artwork"
                      className="rounded-full bg-surface-2/80 px-3 py-1 text-xl hover:text-accent"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next artwork"
                      className="rounded-full bg-surface-2/80 px-3 py-1 text-xl hover:text-accent"
                    >
                      ›
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="rounded-full bg-surface-2/80 px-3 py-1 text-2xl leading-none hover:text-accent"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Scrollable artwork + process column */}
            <div
              ref={scrollRef}
              className="flex flex-col items-center gap-8 overflow-y-auto px-4 py-16"
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width ?? 2000}
                height={active.height ?? 2000}
                priority
                sizes="(min-width:1024px) 64rem, 100vw"
                className="h-auto w-full max-w-4xl rounded-lg"
                draggable={false}
              />
              {active.process && active.process.length > 0 && (
                <>
                  <p className="text-small uppercase tracking-[0.18em] text-(--footer-foreground)">
                    Process — scroll to explore
                  </p>
                  {active.process.map((p, pi) => (
                    <Image
                      key={`${p.src}-${pi}`}
                      src={p.src}
                      alt={p.alt}
                      width={p.width ?? 1600}
                      height={p.height ?? 1600}
                      sizes="(min-width:1024px) 64rem, 100vw"
                      className="h-auto w-full max-w-4xl rounded-lg"
                      draggable={false}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
