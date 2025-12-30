"use client";

import { usePathname } from "next/navigation";
import { buildCrumbs } from "@/lib/breadcrumbs";

export default function SideTitle() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);
  const title = crumbs[crumbs.length - 1]?.label ?? "";

  return (
    <div className="h-full">
      <div className="origin-left -rotate-90 whitespace-nowrap text-4xl font-semibold tracking-wide opacity-90">
        {title}
      </div>
    </div>
  );
}
