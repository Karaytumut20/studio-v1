import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Catch-all for src directory
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      spacing: {
        'gutter': 'var(--gutter)',
        'page-padding': 'var(--page-padding)',
      },
      fontSize: {
        'display': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'h1': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'h2': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'body': ['clamp(1rem, 1.2vw, 1.25rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
      },
    },
  },
  plugins: [],
};
export default config;