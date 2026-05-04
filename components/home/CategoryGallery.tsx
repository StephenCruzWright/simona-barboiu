import Link from "next/link";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

type Props = {
  items: ProjectImage[];
};

/**
 * Static grid of thumbnails — the "view all" view that replaces the
 * carousel when the user clicks "View all" on a CategoryShowcase. Sized
 * to fit inside the same vertical envelope as the carousel.
 */
export default function CategoryGallery({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="h-full w-full overflow-y-auto p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => {
          const card = (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-[transform,border-color] duration-[var(--duration-normal)] ease-[var(--ease-smooth)] hover:scale-[1.03] hover:border-(--accent)">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
            </div>
          );
          return item.href ? (
            <Link
              key={`${i}-${item.src}`}
              href={item.href}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-xl"
            >
              {card}
            </Link>
          ) : (
            <div key={`${i}-${item.src}`}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}