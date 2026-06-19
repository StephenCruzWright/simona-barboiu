/**
 * Film-grain overlay — editorial texture across the whole viewport.
 * Static (no animation), warm-tinted, soft-light blend at ~4.5% so it adds
 * depth on the warm near-black base and doubles as dithering against gradient
 * banding. Tuned per the design-research finding (baseFrequency 0.65,
 * numOctaves 3, soft-light, warm tint, low opacity).
 */
export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 mix-blend-soft-light opacity-[0.045]"
      style={{ zIndex: 55 }}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          {/* Desaturate to grey, then bias channels warm (more R, less B). */}
          <feColorMatrix type="saturate" values="0" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 0.9 0 0 0  0 0 0.74 0 0  0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
