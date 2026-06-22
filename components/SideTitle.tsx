// components/SideTitle.tsx

"use client";

import { usePathname } from "next/navigation";
import { buildCrumbs } from "@/lib/breadcrumbs";

export default function SideTitle({ className }: { className?: string }) {
  const crumbs = buildCrumbs(usePathname());
  const title = crumbs[crumbs.length - 1]?.label ?? "";

  return (
    <div
      aria-hidden
      className={`
        z-10 absolute
        hidden xl:block
        origin-left -rotate-90
        whitespace-nowrap
        text-5xl font-semibold opacity-90
        pointer-events-none
        select-none
        ${className ?? ""}
        `}
    >
      {title}
    </div>
  );
}
