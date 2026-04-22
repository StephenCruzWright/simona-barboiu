export default function IllustrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-10">
        <main className="min-w-0 w-full">{children}</main>
    </div>
  );
}
