"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & {
  zoomable?: boolean;
};

export default function LightImage({
  zoomable = true,
  className,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      {/* Normal image */}
      <Image
        {...props}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => zoomable && setOpen(true)}
      />

      {/* Fullscreen overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              {...props}
              src={props.src}
              alt={props.alt}
              width={2000}
              height={2000}
              className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
