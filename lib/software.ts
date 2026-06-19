/**
 * Software registry. Source of truth for tools Simona uses.
 *
 * `logoSrc` is optional and currently unset — the software strip renders text
 * pills as the baseline (and reduced-motion fallback). When monochrome /
 * foreground-tinted logo SVGs are added under `public/software/<key>.svg`,
 * set `logoSrc` here. Do NOT point `logoSrc` at files that don't exist yet
 * (it would fail `npm run test:media`).
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
  "houdini",
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
  houdini:    { key: "houdini",    label: "Houdini" },
};

export function getSoftware(key: SoftwareKey): Software {
  return SOFTWARE[key];
}

export function listSoftware(keys: SoftwareKey[]): Software[] {
  return keys.map(getSoftware);
}
