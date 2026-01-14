"use client";

import Image from "next/image";
import { useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BeforeAndAfter({
  beforeSrc,
  afterSrc,
  className = "",
  initial = 50, // 0..100
}: {
  beforeSrc: string;
  afterSrc: string;
  className?: string;
  initial?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(initial);
  const draggingRef = useRef(false);

  function setFromClientX(clientX: number) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    setPct(clamp((x / rect.width) * 100, 0, 100));
  }

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  }

  function stopDrag() {
    draggingRef.current = false;
  }

  return (
    <div
      ref={wrapRef}
      className={`relative rounded-xl ${className}`}
    >
      {/* Base image (before) */}
      <Image
        src={beforeSrc}
        alt="Before"
        width={1600}
        height={900}
        className="h-auto w-full select-none"
        draggable={false}
      />

      {/* Overlay image (after), clipped like a window wipe */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)`}}>
        <Image
          src={afterSrc}
          alt="After"
          width={1600}
          height={900}
          className="h-full w-full object-cover select-none"
          draggable={false}
        />
      </div>

      {/* Draggable divider (this is the ONLY control) */}
      <div
        className="absolute inset-y-0"
        style={{ left: `${pct}%` }}
      >
        {/* visual line */}
        <div className="absolute left-0 top-0 h-full w-[2px] -translate-x-1/2 bg-white/80" />

        {/* bigger invisible hit-area so it's easy to grab */}
        <div
          className="absolute left-0 top-0 h-full w-10 -translate-x-1/2 cursor-ew-resize touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onLostPointerCapture={stopDrag}
        >
          {/* optional small handle knob */}
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 text-black shadow grid place-items-center pointer-events-none">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}
