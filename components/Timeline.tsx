import { timeline } from "@/lib/timeline";

export default function Timeline() {
  return (
    <div className="relative max-w-4xl mx-auto w-full py-8 select-none">
      {/* Spine */}
      <div className="absolute left-10 top-0 h-full w-px bg-white/20" />

      <ul data-stagger-in className="space-y-14">
        {timeline.map((item) => (
          <li key={item.year} className="relative pl-20">
            {/* Connector + accent node */}
            <div className="absolute left-10 top-3 h-px w-9 bg-white/25" />
            <div className="absolute left-10 top-2.5 size-2 -translate-x-1/2 rounded-full bg-accent" />

            <div className="absolute left-0 top-2 text-sm opacity-70">
              {item.year}
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {item.title}
                {item.year === "2025" && (
                  <span className="ml-2 text-xs text-accent">(current)</span>
                )}
              </h3>
              <ul className="mt-1 space-y-1 text-sm opacity-80">
                {item.bullets.map((b, i) => {
                  const isLast = i === item.bullets.length - 1;
                  return (
                    <li key={i} className={isLast ? "font-medium opacity-60" : ""}>
                      {b}
                    </li>
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
