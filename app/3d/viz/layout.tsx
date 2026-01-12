import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <aside className="sm:flex justify-end pt-4 hidden">
        <SideTitle />
      </aside>
      <main>{children}</main>
    </div>
  );
}
