"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll when menu is open (mobile)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-5">
        {/* Logo */}
        <Link href="/" onClick={close} className="shrink-0">
          <Image
            className="dark:invert"
            src="/LogoOffWhite.png"
            alt="Simona Barboiu"
            width={160}
            height={200}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-start gap-8 text-sm md:flex md:text-lg lg:text-xl xl:text-2xl">
          <div className="flex flex-col">
            <Link href="/3D">3D</Link>
            <div className="flex text-sm">
              <Link href="/3D/#ProductViz">Product viz</Link>
              <Link href="/3D/#Games">Games & Interactive apps</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link href="/2D">2D</Link>
            <div className="flex text-sm">
              <Link href="/2D/#Illustration">Illustration</Link>
            </div>
          </div>

          <Link href="/work">Work Experience</Link>
          <Link href="/about">About &amp; Contact</Link>
        </nav>

        {/* Mobile burger button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Simple burger / close icon */}
          <span className="relative block h-5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform 
                ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition-opacity 
                ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition-transform 
                ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu overlay + panel */}
      {open && (
        <div className="md:hidden">
          {/* Overlay */}
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/50"
            onClick={close}
          />

          {/* Panel */}
          <div
            id={panelId}
            className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-background p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70">Menu</span>
              <button
                type="button"
                className="rounded-md p-2"
                aria-label="Close menu"
                onClick={close}
              >
                ✕
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-6 text-lg">
              <div className="flex flex-col gap-2">
                <Link href="/3D" onClick={close}>3D</Link>
                <Link href="/3D/#ProductViz" onClick={close}>Product viz</Link>
                <Link href="/3D/#Games" onClick={close}>Games &amp; Interactive apps</Link>
              </div>

              <div className="flex flex-col gap-2">
                <Link href="/2D" onClick={close}>2D</Link>
                <Link href="/2D/#Illustration" onClick={close}>Illustration</Link>
              </div>

              <Link href="/work" onClick={close}>Work Experience</Link>
              <Link href="/about" onClick={close}>About &amp; Contact</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
