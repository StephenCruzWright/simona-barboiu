import SideTitle from "@/components/SideTitle";

export default function EnvironmentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 flex flex-col items-center justify-center">
      <aside className="justify-end pt-4 nowrap">
        <SideTitle />
      </aside>
      <main>{children}</main>
    </div>
  );
}
