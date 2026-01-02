import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4">
        <aside className="hidden sm:block auto h-screen relative">
          <SideTitle />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
