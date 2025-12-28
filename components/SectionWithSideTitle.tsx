export default function SectionWithSideTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-[140px_1fr] gap-8 px-4 py-20">
      <div className="sticky top-24 self-start">
        <div className="text-xs tracking-widest opacity-70">{title}</div>
      </div>

      <div>{children}</div>
    </section>
  );
}
