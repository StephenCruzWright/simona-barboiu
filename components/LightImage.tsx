"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
  zoomable?: boolean;
  altsrc?: string;
  type?: "image" | "video";
};

export default function LightImage({
  zoomable = true,
  altsrc,
  className,
  type = "image",
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const bigSrc = altsrc || props.src;
  const imageWidth = props.width ?? 2000;
  const imageHeight = props.height ?? 2000;
  const isVideo = type === "video";
  const altText = typeof props.alt === "string" ? props.alt : "Portfolio media";

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setZoomed(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openLightbox() {
    if (!zoomable) return;
    setLoaded(false);
    setOpen(true);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <>
      {isVideo ? (
        <button
          type="button"
          onClick={openLightbox}
          className="block w-full bg-transparent border-0 p-0 text-left"
          aria-label={`Open ${altText}`}
        >
          <video
            src={String(bigSrc)}
            className={`cursor-zoom-in w-full h-auto ${className ?? ""} transition-transform motion-safe:hover:scale-[1.01] transition-shadow hover:shadow-lg`}
            autoPlay
            loop
            muted
            playsInline
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={openLightbox}
          className="block w-full bg-transparent border-0 p-0 text-left"
          aria-label={`Open ${altText}`}
        >
          <Image
            {...props}
            alt={altText}
            className={`cursor-zoom-in w-full h-auto ${className ?? ""} transition-transform motion-safe:hover:scale-[1.01] transition-shadow hover:shadow-lg`}
            width={imageWidth}
            height={imageHeight}
            draggable={props.draggable ?? true}
          />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => {
            setOpen(false);
            setZoomed(false);
          }}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden"
            onMouseMove={handleMouseMove}
            onClick={(e) => e.stopPropagation()}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center text-white/70 text-sm">
                Loading…
              </div>
            )}
            {isVideo ? (
              <video
                src={String(bigSrc)}
                className={`max-h-[90vh] max-w-[90vw] object-contain
                transition-opacity duration-500
                ${loaded ? "opacity-100" : "opacity-0"}`}
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setLoaded(true)}
              />
            ) : (
              <Image
                {...props}
                src={bigSrc}
                alt={altText}
                width={2000}
                height={2000}
                priority
                draggable={false}
                onLoad={() => setLoaded(true)}
                onClick={() => setZoomed(!zoomed)}
                className={`h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain
                          transition-opacity duration-500
                          ${loaded ? "opacity-100" : "opacity-0"}`}
                style={{
                  transform: zoomed ? "scale(1.6)" : "scale(1)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  cursor: zoomed ? "zoom-out" : "zoom-in",
                }}
              />
            )}
            <button
              type="button"
              aria-label="Close media dialog"
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-70 transition-opacity"
              onClick={() => {
                setOpen(false);
                setZoomed(false);
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
