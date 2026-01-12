import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-[64px_1fr] gap-8 py-10">
        <aside className="relative">
          {/* aligns under header + breadcrumb visually */}
          <div className="pt-10">
            <SideTitle />
          </div>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
