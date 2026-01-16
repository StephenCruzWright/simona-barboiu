import SideTitle from "@/components/SideTitle";

export default function IllustrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
        <main className="min-w-0 w-full">{children}</main>
    </div>
  );
}
