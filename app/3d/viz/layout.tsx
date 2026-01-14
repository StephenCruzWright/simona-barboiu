// app/3d/viz/layout.tsx
import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-10">
      <div className="grid grid-cols-[64px_1fr] gap-8">
        <aside className="relative">
          <SideTitle />
        </aside>
        <main className="min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
