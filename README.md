# Tomson J. Finosh — Portfolio

Personal portfolio site showcasing builds, events, photography, skills, and contact. Designed with dark monochrome palette, editorial typography, and interactive 3D elements.

## Live Demo
https://tomson-j-finosh.vercel.app

## Tech Stack
- React + TypeScript + Vite
- React Router (SPA routing)
- Framer Motion (page transitions, scroll reveals, micro-interactions)
- React Three Fiber + Drei (3D mesh in hero)
- Plain CSS with CSS variables (dark mode design system)
- Vercel (hosting & deployment)

## Pages
- **Home** — Hero with 3D floating mesh, work highlights, duck mascot
- **Work** — Category-filtered project showcase (AI & Product, Marketing & Growth, Community & Business, Creative Media) with featured cards, circular carousel, and GitHub lab
- **Skills** — Two-column layout: skill buckets + force-directed skill graph (bounded, interactive)
- **Contact** — Links for email, GitHub, LinkedIn, Instagram

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
  App.tsx        All pages, components, data structures, types
  App.css        Full styling with design tokens
  index.css      Global resets and CSS variables
```

## Design System
- **Background**: `#050505` (──bg), **Paper**: `#f4f4f0` (──paper)
- **Type**: JetBrains Mono (nav/body), Arial Narrow (display), Georgia (serif)
- **Transitions**: 160–200ms ease, spring for sidebar
- **Dark mode only**

## Deployment
Deployed on Vercel. Push to `master` triggers auto-deploy (or use `vercel --prod --prebuilt` for local builds).
