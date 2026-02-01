export type TimelineItem = {
  year: string;
  title: string;
  bullets: string[];
};

export const timeline: TimelineItem[] = [
  {
    year: "2025",
    title: "3D Designer",
    bullets: [
      "Creating 3D photorealistic digital twins of fashion products for major brands (Hugo Boss, Hermès, Burberry, Santoni)",
      "Photoshop customization work (photo editing, retouching, layout/graphic tweaks (Dior, Hermès)",
      "Full time",
    ],
  },
  {
    year: "2023",
    title: "Technical 3D Artist",
    bullets: [
      "Created an interactive VR app to help relax patients that go through minor medical procedures, such as blood drawing",
      "Researched and tested VR-specific app optimization methods, resulting in improved",
      "VR app performance (rebuilt foliage and shaders, replaced legacy assets with cleaner, more efficient alternatives)",
      "Full time internship",
    ],
  },
  {
    year: "2022",
    title: "3D and Rigging Artist",
    bullets: [
      "Created storyboards, 3D assets, animations and infographics for oral cancer surgery educational content",
      "Sculpted 3D models with textures using reference from physicians (real scans, clinical photos, and patient studies) to keep the work  medically accurate",
      "Full time internship",
    ],
  },
];
