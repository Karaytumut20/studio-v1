# STUDIO V1 - Architecture Manual

Awwwards-winning portfolio architecture built with Next.js 15, Tailwind, GSAP, and Lenis.

## 🚀 Getting Started

1.  **Install**: `npm install`
2.  **Dev**: `npm run dev`
3.  **Build**: `npm run build`

## 📂 Core Architecture

### 1. Animations (GSAP)
- **Central Config**: `src/lib/gsap.ts` (Plugins registered here)
- **ScrollTrigger**: Used in `ProjectGallery`, `Services`, `ClientList`.
- **Page Transitions**: `src/app/template.tsx` creates the "curtain" effect.

### 2. Interaction
- **Smooth Scroll**: Managed by `src/components/SmoothScroll.tsx` (Lenis).
- **Custom Cursor**: `src/components/ui/CustomCursor.tsx` (Blends only on desktop).
- **Navigation**: `src/components/Header.tsx` (Fullscreen GSAP timeline).

### 3. Data Flow
- **Projects**: All project data lives in `src/data/works.ts`.
- **Adding a Project**:
    1. Open `src/data/works.ts`
    2. Add a new object to the `WORKS` array.
    3. Ensure images are high-res (Unsplash links provided for demo).
    4. The system automatically generates the route `/work/[id]` and SEO tags.

## 🛠 Troubleshooting

- **Scroll Locked?**: Check `src/components/Preloader.tsx`. It must allow unmounting (return null).
- **Images not loading?**: Check `next.config.ts` domain allowlist.
- **Build Errors?**: Ensure Tailwind version is pinned to v3.4.17.

## 🎨 Design System
- **Font**: Manrope (Variable)
- **Colors**: Black (#000), White (#FFF), Neutral Greys.
- **Grid**: 4 cols (Mobile), 12 cols (Desktop).

---
*Created by Gemini Principal Architect*