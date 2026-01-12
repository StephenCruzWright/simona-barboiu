import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <aside className="justify-end pt-4 whitespace-nowrap">
        <SideTitle />
      </aside>
      <main>{children}</main>
    </div>
  );
}
