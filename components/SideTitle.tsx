"use client";

import { usePathname } from "next/navigation";
import { buildCrumbs } from "@/lib/breadcrumbs";

export default function SideTitle() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);
  const title = crumbs[crumbs.length - 1]?.label ?? "";

  return (
    <div className="origin-left -rotate-90 text-5xl sm:text-l font-semibold tracking-wide opacity-90 h-full pointer-events-none flex items-center absolute left-6 z-10">
      {title}
    </div>
  );
}
