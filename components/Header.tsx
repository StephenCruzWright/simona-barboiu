"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderGradient from "./HeaderGradient";
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
        sticky top-0 z-50 shadow-lg bg-background
        transition-transform duration-300 ease-out
        ${hidden ? "md:translate-y-0 -translate-y-full shadow-lg" : "translate-y-0"}
    `}
    >
      <HeaderGradient />
      <div className="mx-auto flex px-4 py-2 sm:px-6 lg:px-8 max-w-screen-2xl justify-between items-center gap-4">
        <Link href="/" onClick={close} className="max-w-[20vw]">
          <Image
            src="/LogoOffWhite.png"
            alt="Simona Barboiu"
            width={150}
            height={150}
            draggable={false}
            priority
          />
        </Link>

        <nav className="hidden gap-8 text-sm md:flex md:text-base lg:text-lg flex-row items-center">
          <NavDropdown
            label="Projects"
            items={[
              { label: "All projects", href: "/#projects" },
              { label: "Vintage Flower Lamps", href: "/projects/viz/vintage-flower-lamps" },
              { label: "Flower Alley", href: "/projects/viz/flower-alley" },
              { label: "Greek House", href: "/projects/environments/greek-house" },
              { label: "Pax VR", href: "/projects/interactive/paxvr" },
              { label: "Illustration", href: "/projects/illustration" },
            ]}
          />
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
        <div className="md:hidden bg-black/80">
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-40"
            onClick={close}
          />
          <div
            id={panelId}
            className="fixed right-0 top-0 z-50 h-screen w-60 p-6 shadow-xl bg-black/80"
          >
            <div className="absolute inset-0 bg-black/20" />
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
                  <Link href="/#projects" onClick={close}>
                    Projects
                  </Link>
                  <div className="mt-2 flex flex-col gap-1 text-sm opacity-80">
                    <Link href="/projects/viz/vintage-flower-lamps" onClick={close}>
                      Vintage Flower Lamps
                    </Link>
                    <Link href="/projects/viz/flower-alley" onClick={close}>
                      Flower Alley
                    </Link>
                    <Link href="/projects/environments/greek-house" onClick={close}>
                      Greek House
                    </Link>
                    <Link href="/projects/interactive/paxvr" onClick={close}>
                      Pax VR
                    </Link>
                    <Link href="/projects/illustration" onClick={close}>
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
