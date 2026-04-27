import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/home/SpotlightCard";
import { buildCrumbs } from "@/lib/breadcrumbs";

type Props = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  spanClassName?: string;
  aspectClassName?: string;
  priority?: boolean;
};

export default function HomeProjectThumbnail({
  href,
  imageSrc,
  imageAlt,
  summary,
  spanClassName = "",
  aspectClassName = "aspect-[4/3]",
  priority = false,
}: Props) {
  const crumbs = buildCrumbs(href);
  const title = crumbs[crumbs.length - 1]?.label ?? imageAlt;

  return (
    <article className={`relative ${spanClassName}`}>
      <SpotlightCard
        className={`group overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.35)] ${aspectClassName}`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-black/10 via-transparent to-white/5 opacity-70" />

        <div className="absolute inset-x-0 top-0 z-3 flex flex-wrap items-center gap-2 px-5 pt-5 text-[0.62rem] uppercase tracking-[0.3em] text-white/58 sm:px-6 sm:pt-6">
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

        <div className="absolute inset-x-0 bottom-0 z-3 p-5 sm:p-6">
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h3 className="max-w-xl text-2xl font-semibold text-white sm:text-3xl">
                {title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/72">
                {summary}
              </p>
            </div>
            <span className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80 transition-colors duration-300 group-hover:border-(--accent) group-hover:text-(--accent) sm:inline-flex">
              View
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>

        <Link
          href={href}
          aria-label={`Open ${title}`}
          className="absolute inset-0 z-10 rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        />
      </SpotlightCard>
    </article>
  );
}