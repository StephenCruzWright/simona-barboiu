import SideTitle from "@/components/SideTitle";

export default function ThreeDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl px-4 min-h-screen">
        <main>{children}</main>
    </div>
  );
}
