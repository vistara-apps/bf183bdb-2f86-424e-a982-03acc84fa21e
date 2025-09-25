import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // GamerFit Nexus Design System Colors
        primary: "hsl(var(--color-primary))",
        accent: "hsl(var(--color-accent))",
        bg: "hsl(var(--color-bg))",
        surface: "hsl(var(--color-surface))",
        fg: "hsl(var(--color-fg))",
        'text-primary': "hsl(var(--color-text-primary))",
        'text-secondary': "hsl(var(--color-text-secondary))",
        secondary: "hsl(var(--color-secondary))",
        success: "hsl(var(--color-success))",
        warning: "hsl(var(--color-warning))",
        danger: "hsl(var(--color-danger))",

        // Legacy shadcn/ui colors for compatibility
        background: "hsl(var(--color-bg))",
        foreground: "hsl(var(--color-fg))",
        card: {
          DEFAULT: "hsl(var(--color-surface))",
          foreground: "hsl(var(--color-text-primary))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-surface))",
          foreground: "hsl(var(--color-text-primary))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-surface))",
          foreground: "hsl(var(--color-text-secondary))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-danger))",
          foreground: "hsl(var(--color-text-primary))",
        },
        border: "hsl(230, 15%, 25%)",
        input: "hsl(230, 15%, 25%)",
        ring: "hsl(var(--color-accent))",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 5px hsl(var(--color-accent))" },
          "50%": { boxShadow: "0 0 20px hsl(var(--color-accent))" },
          "100%": { boxShadow: "0 0 5px hsl(var(--color-accent))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
