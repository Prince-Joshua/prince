import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Importing the specific fonts used in the HTML
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";
import "@fontsource/dm-mono";
import "@fontsource/instrument-serif/400-italic.css";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      backgroundColor: "brand.bg",
      color: "brand.text",
      fontFamily: "mono",
      fontSize: "14px",
      lineHeight: "1.7",
      overflowX: "hidden",
      boxSizing: "border-box",
    },
    // The Grainy Noise Overlay from the HTML
    "body::before": {
      content: '""',
      position: "fixed",
      inset: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
      pointerEvents: "none",
      zIndex: 1000,
      opacity: 0.6,
    },
  },

  theme: {
    tokens: {
      colors: {
        brand: {
          bg: { value: "#0a0a0b" },
          surface: { value: "#111114" },
          surface2: { value: "#18181d" },
          border: { value: "#222228" },
          accent: { value: "#e8ff47" },
          accent2: { value: "#47c8ff" },
          accent3: { value: "#ff6b47" },
          accent4: { value: "#b47fff" },
          text: { value: "#f0f0f0" },
          muted: { value: "#666672" },
          muted2: { value: "#9090a0" },
        },
      },
      fonts: {
        heading: { value: "Syne, sans-serif" },
        body: { value: "DM Mono, monospace" },
        mono: { value: "DM Mono, monospace" },
        serif: { value: "Instrument Serif, serif" },
      },
    },

    semanticTokens: {
      colors: {
        "fg.default": { value: "{colors.brand.text}" },
        "fg.muted": { value: "{colors.brand.muted2}" },
        "bg.default": { value: "{colors.brand.bg}" },
        "border.default": { value: "{colors.brand.border}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
