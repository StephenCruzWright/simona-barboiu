"use client";

import { useEffect, useId, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderGradient from "./HeaderGradient";
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
        sticky top-0 z-50 shadow-lg relative bg-background
        transition-transform duration-300 ease-out
        ${hidden ? "md:translate-y-0 -translate-y-full shadow-lg" : "translate-y-0"}
    `}
    >
      <HeaderGradient />
      <div className="mx-auto flex p-5 max-w-6xl justify-between gap-4">
        <Link href="/" onClick={close} className="shrink-0 max-w-[23vw]">
          <Image
            src="/LogoOffWhite.png"
            alt="Simona Barboiu"
            width={200}
            height={200}
            draggable={false}
            priority
          />
        </Link>

        <nav
          className="hidden justify-between gap-8 text-sm md:flex lg:flex flex-row 
        md:text-lg lg:text-xl"
        >
          <div className="flex flex-col">
            <Link href="/3d">3D</Link>
            <div className="flex flex-col text-sm">
              <Link href="/3d/#product">Product viz</Link>
              <Link href="/3d/#games">Games & Interactive apps</Link>
              <Link href="/3d/#environments">Environments</Link>
            </div>
          </div>

          <div className="flex flex-col">
            <Link href="/2d">2D</Link>
            <div className="flex text-sm">
              <Link href="/2d/#illustration">Illustration</Link>
            </div>
          </div>

          <Link href="/work">Work Experience</Link>
          <Link href="/about">About &amp; Contact</Link>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2"
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
        <div className="md:hidden pointer-events-none bg-black/80">
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40"
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed right-0 top-0 z-50 h-[100vh] w-60 p-6 shadow-xl bg-background"
          >
            {/* <HeaderGradient /> */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between text-xl">
                <div />
                <button
                  type="button"
                  className="rounded-mdpx-6 py-5 px-6 hover:opacity-70 transition-opacity select-none"
                  aria-label="Close menu"
                  onClick={close}
                />
              </div>

              <nav className="mt-6 flex flex-col gap-6 text-lg">
                <div>
                  <Link href="/3d" onClick={close}>
                    3D
                  </Link>
                  <div className="flex flex-col gap-0 text-sm">
                    <Link href="/3d/#product" onClick={close}>
                      Product viz
                    </Link>
                    <Link href="/3d/#games" onClick={close}>
                      Games &amp; Interactive apps
                    </Link>
                    <Link href="/3d/#environments">Environments</Link>
                  </div>
                </div>

                <div>
                  <Link href="/2d" onClick={close}>
                    2D
                  </Link>
                  <div className="flex flex-col gap-0 text-sm">
                    <Link href="/2d/#illustration" onClick={close}>
                      Illustration
                    </Link>
                  </div>
                </div>

                <Link href="/work" onClick={close}>
                  Work Experience
                </Link>
                <Link href="/about" onClick={close}>
                  About &amp; Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
