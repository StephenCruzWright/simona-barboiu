"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

function pad4(n: number) {
  return String(n).padStart(4, "0");
}

export default function ScrollModel({
  path,
  frameCount = 30,
  ext = "png",
  width = 900,
  height = 1200,
  className = "",
  sensitivity = 80,
}: {
  path: string;
  frameCount?: number;
  ext?: "png" | "jpg" | "jpeg" | "webp" | "avif";
  width?: number;
  height?: number;
  className?: string;
  sensitivity?: number;
}) {
  const images = useMemo(() => {
    const base = path.replace(/\/$/, "");
    return Array.from({ length: frameCount }, (_, i) => {
      const frame = pad4(i + 1); // 0001..0030
      return `${base}/${frame}.${ext}`;
    });
  }, [path, frameCount, ext]);

  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoveringRef = useRef(false);
  const accRef = useRef(0);

  // Wheel cycles frames ONLY while hovered
  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length === 0) return;

    const onEnter = () => (hoveringRef.current = true);
    const onLeave = () => {
      hoveringRef.current = false;
      accRef.current = 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (!hoveringRef.current) return;

      e.preventDefault();
      accRef.current += e.deltaY;

      if (Math.abs(accRef.current) < sensitivity) return;

      const dir = accRef.current > 0 ? 1 : -1;
      accRef.current = 0;

      setIndex((prev) => (prev + dir + images.length) % images.length);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("wheel", onWheel as any);
    };
  }, [images.length, sensitivity]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl border border-white/10 ${className}`}
      style={{ cursor: "ns-resize" }}
    >
      <Image
        src={images[index]}
        alt={`Model frame ${index + 1}`}
        width={width}
        height={height}
        className="h-auto w-full select-none"
        draggable={false}
        priority={index === 0}
      />

      {/* Slider (clickable + draggable) */}
      <div className="absolute bottom-3 left-0 right-0 px-4">
        <input
          className="scrollmodel-slider w-full"
          type="range"
          min={0}
          max={images.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-label="Rotate model"
        />
      </div>
    </div>
  );
}
