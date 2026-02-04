"use client";

import { useEffect, useState } from "react";

export function useHideOnScroll(threshold = 10) {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(currentY - lastY) > threshold) {
            setHidden(currentY > lastY && currentY > 50);
            setLastY(currentY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, threshold]);

  return hidden;
}
