import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4">
      <aside className="sm:flex justify-end pr-6">
        <SideTitle />
      </aside>
      <main>{children}</main>
    </div>
  );
}
