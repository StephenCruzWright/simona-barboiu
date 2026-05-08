/**
 * Software registry. Source of truth for tools Simona uses.
 * Phase 5 will add real `logoSrc` paths and render badges on project pages.
 */

export type Software = {
  key: string;
  label: string;
  logoSrc?: string;
};

export const SOFTWARE_KEYS = [
  "blender",
  "substance",
  "unreal",
  "photoshop",
  "procreate",
  "maya",
  "zbrush",
  "marvelous",
] as const;

export type SoftwareKey = (typeof SOFTWARE_KEYS)[number];

export const SOFTWARE: Record<SoftwareKey, Software> = {
  blender:    { key: "blender",    label: "Blender" },
  substance:  { key: "substance",  label: "Substance Painter" },
  unreal:     { key: "unreal",     label: "Unreal Engine" },
  photoshop:  { key: "photoshop",  label: "Photoshop" },
  procreate:  { key: "procreate",  label: "Procreate" },
  maya:       { key: "maya",       label: "Maya" },
  zbrush:     { key: "zbrush",     label: "ZBrush" },
  marvelous:  { key: "marvelous",  label: "Marvelous Designer" },
};

export function getSoftware(key: SoftwareKey): Software {
  return SOFTWARE[key];
}

export function listSoftware(keys: SoftwareKey[]): Software[] {
  return keys.map(getSoftware);
}
