"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { buildCrumbs } from "@/lib/breadcrumbs";

type Props = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  spanClassName?: string;
  aspectClassName?: string;
  delay?: number;
  priority?: boolean;
};

export default function HomeProjectThumbnail({
  href,
  imageSrc,
  imageAlt,
  summary,
  spanClassName = "",
  aspectClassName = "aspect-[4/3]",
  delay = 10,
  priority = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const crumbs = buildCrumbs(href);
  const title = crumbs[crumbs.length - 1]?.label ?? imageAlt;

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={cardRef} className={`relative ${spanClassName}`}>
      <div
        className={`
          group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5
          shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-all duration-700 ease-out
          ${aspectClassName}
          ${
            visible
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-800 opacity-0 blur-[2px]"
          }
          motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none
        `}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-black/10 via-transparent to-white/5 opacity-70" />

        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 px-5 pt-5 text-[0.62rem] uppercase tracking-[0.3em] text-white/58 sm:px-6 sm:pt-6">
          {crumbs.map((crumb, index) => (
            <span
              key={`${crumb.href}-${crumb.label}`}
              className="flex items-center gap-2"
            >
              <span className={crumb.active ? "text-white/88" : "text-white/58"}>
                {crumb.label}
              </span>
              {index < crumbs.length - 1 && <span className="text-white/30">/</span>}
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          {/* <p className="text-xs uppercase tracking-[0.45em] text-white/55">
            Project thumbnail
          </p> */}
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h3 className="max-w-xl text-2xl font-semibold text-white sm:text-3xl">
                {title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/72">
                {summary}
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80 sm:inline-flex">
              Open
            </span>
          </div>
        </div>

        <Link
          href={href}
          aria-label={`Open ${title}`}
          className="absolute inset-0 z-10 rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        />
      </div>
    </article>
  );
}
