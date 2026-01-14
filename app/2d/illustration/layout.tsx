// app/3d/viz/layout.tsx
import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-10">
        <SideTitle />
        <main className="min-w-0 w-full">{children}</main>
    </div>
  );
}
