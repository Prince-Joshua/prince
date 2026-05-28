export const tokens = {
  bg: "brand.bg",
  surface: "brand.surface",
  surface2: "brand.surface2",
  border: "brand.border",
  accent: "brand.accent",
  accent2: "brand.accent2",
  accent3: "brand.accent3",
  accent4: "brand.accent4",
  text: "brand.text",
  muted: "brand.muted",
  muted2: "brand.muted2",
};

export const HEX = {
  accent: "#e8ff47",
  accent2: "#47c8ff",
  accent3: "#ff6b47",
  accent4: "#b47fff",
  border: "#222228",
  muted: "#666672",
  muted2: "#9090a0",
};

export const accentPalette = [
  {
    color: "rgba(232,255,71,0.06)",
    border: "rgba(232,255,71,0.15)",
    dot: tokens.accent,
  },
  {
    color: "rgba(180,127,255,0.06)",
    border: "rgba(180,127,255,0.15)",
    dot: tokens.accent4,
  },
  {
    color: "rgba(71,200,255,0.06)",
    border: "rgba(71,200,255,0.15)",
    dot: tokens.accent2,
  },
];


export const statusStyles = {
  live: {
    color: "brand.accent",
    border: "rgba(232,255,71,0.3)",
    label: "Live",
  },
  complete: {
    color: "brand.accent4",
    border: "rgba(180,127,255,0.3)",
    label: "Complete",
  },
  wip: {
    color: "brand.accent2",
    border: "rgba(71,200,255,0.3)",
    label: "In Progress",
  },
};
