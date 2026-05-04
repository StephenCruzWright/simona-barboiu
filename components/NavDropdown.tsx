"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

type DropdownItem = {
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: ReactNode;
  items: DropdownItem[];
  className?: string;
  triggerClassName?: string;
};

export default function NavDropdown({
  label,
  items,
  className = "",
  triggerClassName = "",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (target && rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative inline-flex flex-col ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        const relatedTarget = event.relatedTarget as Node | null;
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 text-left ${triggerClassName}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
      >
        <span>{label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        className={`absolute left-0 top-full min-w-52 rounded-2xl border border-white/15 bg-black/90 p-3 shadow-2xl backdrop-blur-md transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 text-sm">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="rounded-xl px-3 py-2 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
