import { timeline } from "@/lib/timeline";

export default function Timeline() {
  return (
    <div className="relative max-w-7xl mx-auto py-8 select-none">
      <div className="absolute left-10 top-0 h-full w-px bg-white/70 min-h-screen justify-start" />

      <ul className="space-y-14">
        {timeline.map((item) => (
          <li key={item.year} className="relative pl-20 transition-transform">
            <div className="absolute left-10 top-4 w-9 h-px bg-white/70" />

            <div className="absolute left-0 top-2 text-sm opacity-70">
              {item.year}
            </div>

            <div>
              <h3 className="text-lg font-semibold  opacity-0 animate-fade-in">
                {item.title}
                {item.year === "2025" && (
                  <span className="ml-2 text-xs">(current)</span>
                )}
              </h3>
              <ul className="space-y-1 text-sm opacity-80 opacity-0 animate-fade-in">
                {item.bullets.map((b, i) => {
                  const isLast = i === item.bullets.length - 1;
                  return (
                    <li key={i} className={isLast ? "opacity-70 font-medium" : ""}>{b}</li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
