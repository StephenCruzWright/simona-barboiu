export default function ThreeDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-10 min-h-screen">
      <main className="min-w-0 w-full">{children}</main>
    </div>
  );
}
