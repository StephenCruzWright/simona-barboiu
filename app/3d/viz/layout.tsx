// app/3d/viz/layout.tsx
import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto px-6">
      <div className="grid grid-cols-[64px_1fr] gap-8 py-10">
        <aside className="relative">
          <SideTitle />
        </aside>
        <main className="min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
