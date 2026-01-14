"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildCrumbs } from "@/lib/breadcrumbs";

export default function RoutingNav() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm px-4 py-2 no-select lg:max-w-7xl mx-auto">
      {crumbs.map((c, idx) => {
        const isLast = idx === crumbs.length - 1;

        return (
          <span key={c.href} className="flex items-center gap-2">
            {c.active ? (
              <span aria-current="page" className="opacity-90 pointer-events-none">
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
