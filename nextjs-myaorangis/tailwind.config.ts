import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)", "system-ui"],
      },
      colors: {
        kids: {
          bg: "var(--kids-bg)",
          surface: "var(--kids-surface)",
          border: "var(--kids-border)",
          text: "var(--kids-text)",
          muted: "var(--kids-muted)",
          accent: "var(--kids-accent)",
          "accent-bg": "var(--kids-accent-bg)",
          "accent-text": "var(--kids-accent-text)",
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
