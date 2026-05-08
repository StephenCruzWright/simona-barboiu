type Props = {
  items: string[];
  speed?: number;
  reverse?: boolean;
};

export default function Marquee({ items, speed = 50, reverse = false }: Props) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-container relative w-full overflow-hidden border-y border-white/10 py-7">
      <div
        className="marquee-track flex w-max items-center gap-14"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-14 whitespace-nowrap text-2xl font-medium uppercase tracking-[0.2em] text-white/55 sm:text-3xl md:text-4xl"
          >
            {item}
            <span className="text-3xl text-[var(--accent)] sm:text-4xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}