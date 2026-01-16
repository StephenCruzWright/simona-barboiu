"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
  zoomable?: boolean;
  altsrc?: string;
};

export default function LightImage({
  zoomable = true,
  altsrc,
  className,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const bigSrc = altsrc || props.src;

  // Lock scroll when open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Only zoom on desktop (mouse exists)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <>
      {/* Thumbnail */}
      <Image
        {...props}
        className={`cursor-zoom-in ${className ?? ""} transition-transform hover:scale-[1.01] transition-shadow hover:shadow-lg`}
        draggable={props.draggable ?? true}
        onClick={() => zoomable && (setLoaded(false), setOpen(true))}
      />

      {/* Fullscreen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
            onMouseMove={handleMouseMove}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loader */}
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
                Loading…
              </div>
            )}

            {/* Big image */}
            <Image
              {...props}
              src={bigSrc}
              alt={props.alt}
              width={2000}
              height={2000}
              priority
              onLoad={() => setLoaded(true)}
              className={`
                h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain
                transition-opacity duration-500
                ${loaded ? "opacity-100" : "opacity-0"}
              `}
              style={{
                transform: loaded ? "scale(1.6)" : "scale(1)",
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-70 transition-opacity"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
