import SideTitle from "@/components/SideTitle";

export default function ThreeDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SideTitle/>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </div>
  );
}
