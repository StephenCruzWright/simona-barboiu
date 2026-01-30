import SideTitle from "@/components/SideTitle";

export default function ThreeDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-10 min-h-screen">
      <main className="min-w-0 w-full">{children}</main>
    </div>
  );
}
