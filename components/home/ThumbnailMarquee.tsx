import Link from "next/link";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

type Props = {
  items: ProjectImage[];
  speed?: number;
  reverse?: boolean;
};

/**
 * Auto-scrolling horizontal strip of thumbnail cards. Pauses on hover.
 * Honors prefers-reduced-motion via the .thumbnail-marquee-track CSS rule.
 *
 * Hover behavior: while the marquee is hovered the track pauses AND every
 * thumbnail dims to 50%; the specific thumbnail under the cursor overrides
 * back to 100% with a scale + accent border highlight.
 *
 * Items are duplicated x2 for a seamless loop. When there is only one
 * unique item, the loop is skipped — a single static thumbnail is rendered
 * centered (otherwise the marquee animates the same image past itself).
 */
export default function ThumbnailMarquee({
  items,
  speed = 60,
  reverse = false,
}: Props) {
  if (items.length === 0) return null;

  const cardClass =
    "relative h-full w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-[transform,border-color,opacity] duration-(--duration-normal) ease-(--ease-smooth) group-hover/marquee:opacity-50 hover:!opacity-100 hover:scale-[1.04] hover:border-(--accent) sm:w-[320px] md:w-[380px]";

  const renderCard = (item: ProjectImage, key: string) => {
    const card = (
      <div className={cardClass}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 380px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
      </div>
    );
    return item.href ? (
      <Link
        key={key}
        href={item.href}
        className="shrink-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        {card}
      </Link>
    ) : (
      <div key={key} className="shrink-0">
        {card}
      </div>
    );
  };

  // Single thumbnail — no marquee loop, just a centered static card.
  if (items.length === 1) {
    return (
      <div className="thumbnail-marquee group/marquee relative flex h-full w-full items-center justify-center overflow-hidden">
        {renderCard(items[0], `single-${items[0].src}`)}
      </div>
    );
  }

  const repeated = [...items, ...items];

  return (
    <div className="thumbnail-marquee group/marquee relative h-full w-full overflow-hidden">
      <div
        className="thumbnail-marquee-track flex h-full w-max items-center gap-3 group-hover/marquee:[animation-play-state:paused]"
        style={{
          animation: `thumbnail-marquee-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((item, i) => renderCard(item, `${i}-${item.src}`))}
      </div>
    </div>
  );
}
