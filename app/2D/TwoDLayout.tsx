import SideTitle from "@/components/SideTitle";

export default function TwoDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-[80px_1fr]">
        <aside className="hidden lg:block">
          <SideTitle />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
