import SideTitle from "@/components/SideTitle";

export default function ThreeDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl px-4">
      <div className="grid gap-8 py-10 grid-cols-[80px_1fr]">
        <aside className="pt-6">
          <SideTitle />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
