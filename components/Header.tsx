"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavDropdown from "./NavDropdown";
import { useHideOnScroll } from "@/lib/useHideOnScroll";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const hidden = useHideOnScroll(10);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`
        sticky top-0 z-50 backdrop-blur-md
        transition-transform duration-300 ease-out
        ${hidden ? "md:translate-y-0 -translate-y-full" : "translate-y-0"}
    `}
    >
      <div className="mx-auto flex px-4 py-2 sm:px-6 lg:px-8 max-w-screen-2xl justify-between items-center gap-4">
        <Link
          href="/"
          onClick={close}
          className="max-w-[20vw] mix-blend-difference"
        >
          <Image
            src="/LogoOffWhite.png"
            alt="Simona Barboiu"
            width={150}
            height={150}
            draggable={false}
            priority
          />
        </Link>

        <nav className="hidden gap-8 text-sm md:flex md:text-base lg:text-lg flex-row items-center font-medium">
          <NavDropdown
            label="Projects"
            triggerClassName="mix-blend-difference text-white font-medium"
            items={[
              { label: "All projects", href: "/#projects" },
              { label: "Vintage Flower Lamps", href: "/projects/viz/vintage-flower-lamps" },
              { label: "Flower Alley", href: "/projects/viz/flower-alley" },
              { label: "Greek House", href: "/projects/environments/greek-house" },
              { label: "Pax VR", href: "/projects/interactive/paxvr" },
              { label: "Illustration", href: "/projects/illustration" },
            ]}
          />
          <Link href="/work" className="mix-blend-difference text-white font-medium">
            Work Experience
          </Link>
          <Link href="/about" className="mix-blend-difference text-white font-medium">
            About &amp; Contact
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 mix-blend-difference text-white"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="absolute block h-5 w-6 z-100">
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

      {open && (
        <div className="md:hidden">
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-58 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          {/* Panel — opaque, near-fullscreen, above the grain overlay (z-55) */}
          <div
            id={panelId}
            className="fixed right-0 top-0 z-60 flex h-dvh w-full max-w-sm flex-col bg-surface-1 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="-mr-2 rounded-md p-2 text-3xl leading-none transition-opacity hover:opacity-70"
                aria-label="Close menu"
                onClick={close}
              >
                &times;
              </button>
            </div>

            <nav className="mt-4 flex flex-col gap-6 text-lg">
              <div>
                <Link href="/projects" onClick={close} className="link-glow w-fit">
                  Projects
                </Link>
                <div className="mt-3 flex flex-col gap-2 text-sm opacity-80">
                  <Link href="/projects/viz/vintage-flower-lamps" onClick={close} className="link-glow w-fit">
                    Vintage Flower Lamps
                  </Link>
                  <Link href="/projects/viz/flower-alley" onClick={close} className="link-glow w-fit">
                    Flower Alley
                  </Link>
                  <Link href="/projects/environments/greek-house" onClick={close} className="link-glow w-fit">
                    Greek House
                  </Link>
                  <Link href="/projects/interactive/paxvr" onClick={close} className="link-glow w-fit">
                    Pax VR
                  </Link>
                  <Link href="/projects/illustration" onClick={close} className="link-glow w-fit">
                    Illustration
                  </Link>
                </div>
              </div>

              <Link href="/work" onClick={close} className="link-glow w-fit">
                Work Experience
              </Link>
              <Link href="/about" onClick={close} className="link-glow w-fit">
                About &amp; Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
