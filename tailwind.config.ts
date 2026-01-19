import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        'gutter': '20px',
        'page-padding': '20px',
      },
      // Clamp ve Minimal Tipografi Ayarları (Referans sitelere uygun)
      fontSize: {
        'display': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '200' }],
        'h1': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '300' }],
        'h2': ['clamp(1.5rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '300' }],
        'body': ['clamp(1rem, 1.1vw, 1.125rem)', { lineHeight: '1.6', letterSpacing: '-0.01em', fontWeight: '300' }],
      },
      height: {
        'screen': '100svh', // Viewport fix (svh kullanımı)
      },
      minHeight: {
        'screen': '100svh', // Viewport fix
      }
    },
  },
  plugins: [],
};
export default config;