"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildCrumbs } from "@/lib/breadcrumbs";

export default function RoutingNav() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm px-4 sm:px-6 lg:px-8 py-2 no-select max-w-screen-2xl mx-auto"
    >
      {crumbs.map((c, idx) => {
        const isLast = idx === crumbs.length - 1;

        return (
          <span key={`${c.href ?? c.label}-${idx}`} className="flex items-center gap-2">
            {c.active || !c.href ? (
              <span
                aria-current={c.active ? "page" : undefined}
                className={c.active ? "opacity-90 pointer-events-none" : "opacity-70"}
              >
                {c.label}
              </span>
            ) : (
              <Link href={c.href} className="opacity-70 hover:opacity-100 transition-opacity">
                {c.label}
              </Link>
            )}

            {!isLast && <span className="opacity-40">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
