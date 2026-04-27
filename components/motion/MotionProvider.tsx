"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      document
        .querySelectorAll<HTMLElement>(
          "[data-reveal], [data-reveal-clip], [data-reveal-split], [data-stagger-in]"
        )
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.05, duration: 1.2, smoothWheel: true });
    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const cleanups: Array<() => void> = [];
    const splits: SplitType[] = [];

    const rafId = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-reveal-split]").forEach((el) => {
        const split = new SplitType(el, { types: "lines" });
        splits.push(split);
        if (!split.lines || !split.lines.length) return;

        split.lines.forEach((line) => {
          const lineEl = line as HTMLElement;
          const wrap = document.createElement("span");
          wrap.style.display = "block";
          wrap.style.overflow = "hidden";
          wrap.style.paddingBottom = "0.05em";
          lineEl.parentNode?.insertBefore(wrap, lineEl);
          wrap.appendChild(lineEl);
          lineEl.style.display = "block";
        });

        gsap.fromTo(
          split.lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.6,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-reveal-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", scale: 1.12 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-stagger-in]").forEach((el) => {
        const children = Array.from(el.children) as HTMLElement[];
        gsap.fromTo(
          children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "20");
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic-wrap]").forEach((wrap) => {
        const child = wrap.firstElementChild as HTMLElement | null;
        if (!child) return;

        const onMove = (e: MouseEvent) => {
          const rect = wrap.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(child, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(child, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
        };

        wrap.addEventListener("mousemove", onMove);
        wrap.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          wrap.removeEventListener("mousemove", onMove);
          wrap.removeEventListener("mouseleave", onLeave);
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      cleanups.forEach((fn) => fn());
      splits.forEach((s) => s.revert?.());
    };
  }, [pathname]);

  return null;
}