// components/SideTitle.tsx

"use client";

import { usePathname } from "next/navigation";
import { buildCrumbs } from "@/lib/breadcrumbs";

export default function SideTitle() {
  const crumbs = buildCrumbs(usePathname());
  const title = crumbs[crumbs.length - 1]?.label ?? "";

  return (
    <div
      className="
        relative top-120
        origin-left -rotate-90
        whitespace-nowrap
        text-5xl font-semibold opacity-90
        pointer-events-none
      "
    >
      {title}
    </div>
  );
}
