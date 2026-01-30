import SideTitle from "@/components/SideTitle";

export default function VizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideTitle className="top-165" />
      <main className="min-w-0 w-full">{children}</main>
    </>
  );
}
