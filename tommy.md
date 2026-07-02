# Tommy Portfolio Handoff

This file is the handoff note for Tomson J. Finosh's portfolio. Give another LLM or developer this file first so they understand the project, design choices, and what has already been built.

## Project Goal

Build a minimal, modern, dark-themed portfolio for Tomson J. Finosh using black, white, and grayscale as the visual system. The tone is clean, slightly deadpan, and personal. The left brand is `silly goose duh`, with `duh` italicized in the UI.

The portfolio should represent Tomson as more than only a developer:

- Web/software builder
- Event host/coordinator
- Photographer
- Creative technologist
- CSE student / learner

## Stack

- Vite
- React
- TypeScript
- React Router
- Framer Motion
- Lucide React icons
- Plain CSS in `src/App.css` and `src/index.css`

## Routes

- `/` - landing page
- `/skills` - skills/capability matrix
- `/work` - renamed project page
- `/contact` - contact page
- `/story` - personal story page

The word `projects` was intentionally replaced with `work` because the page includes tech builds, hosted events, photography, and experiences. `work` is broader, cleaner, and less generic.

## Design Direction

The design uses:

- Dark-first monochrome palette
- Large compressed/editorial typography inspired by developer tooling sites like OpenCode
- Grayscale borders and crisp layout rules
- Kinetic landing typography
- Subtle page transitions
- Interactive overlays for details
- A playful floating duck/goose character that says silly lines

2026 UI trend research pointed toward restrained dark UI, bold typography, bento/editorial density, micro-interactions, and targeted 3D. The site follows that by keeping the base layout minimal and reserving 3D for the skills scene.

## Implemented Pages

### Landing Page

File: `src/App.tsx`

Features:

- Sticky nav with `silly goose duh` on the left
- Nav links: `contact`, `work`, `skills`
- Hero copy: `building things, hosting moments, chasing frames.`
- Fixed no-scroll landing viewport with the large name lockup:
  - `Tomson`
  - `J.`
  - `Finosh.`
- Pointer-reactive name movement
- Random philosopher quote under the name on each reload
- Loading intro where `silly goose duh.` types in, `duh` bounces, and the dot wipe reveals the page
- Duck avatar nav menu on the top-right
- Resume download link at `/Tomson-J-Finosh-Resume.pdf`

### Skills Page

Instead of sliding panels, this now uses a GPT-memory-style mesh. The graph is HTML/SVG, not canvas, so labels remain readable and accessible.

Main nodes:

- Tomson
- AI curious
- marketing + branding
- coding
- photography
- leadership
- events
- IEDC officer
- media team
- FOSS Club
- Under25 fellow
- CSE B.Tech
- out of the box
- make it happen

Clicking a node updates the readout panel.

### Work Page

This is the renamed project page. It uses expanding category lanes for:

- tech builds
- brand + events
- photography
- communities

Each lane expands into subpanels. Subpanels open a modal with descriptions and links where available.

### Contact Page

Contact details:

- Name: Tomson J. Finosh
- Place: Trivandrum
- GitHub: `https://github.com/Silly-Goose-duh`
- Email: `tjj5279@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/tomson-j-finosh/`
- Instagram: `https://www.instagram.com/me_nosmot/`
- Phone: `+91 9895329319`

Features:

- Tight viewport-first layout
- Contact intent picker:
  - hire me
  - collaborate
  - event/photo
  - AI idea
- Mailto link with selected intent as subject
- Copy email button with feedback text
- Masked social links using readable labels:
  - `Silly-Goose-duh`
  - `Tomson J. Finosh`
  - `me_nosmot`

### Story Page

Route: `/story`

Simple typography page using Tomson's provided personal story text. No cards, no timeline, quiet presentation.

### Floating Duck/Goose

Implemented with the uploaded duck image at `src/assets/duck-avatar.jpg`.

Behavior:

- Continuously moves left-to-right and right-to-left
- Starts with `why are u stalking me?`
- Changes text automatically every 20 seconds
- The same image is used as the nav avatar

## Important Files

- `src/App.tsx` - main routes, data, pages, modals, duck/goose
- `src/App.css` - all component/page styling
- `src/index.css` - global theme variables and base styles
- `src/main.tsx` - React Router setup
- `vercel.json` - SPA rewrite for Vercel route refresh support
- `index.html` - title and meta description
- `src/assets/duck-avatar.jpg` - duck avatar image
- `resume/Tomson-J-Finosh-Resume.html` - source layout for the fresh resume
- `public/Tomson-J-Finosh-Resume.pdf` - downloadable resume PDF
- `public/Tomson-J-Finosh-Resume.txt` - plain text resume fallback

## Current Verification

The app has been built successfully with:

```bash
npm run build
```

Run locally with:

```bash
npm run dev
```

Preview production build with:

```bash
npm run preview
```

## Deployment Notes

This is a static Vite app and is ready for Vercel.

Expected Vercel settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

`vercel.json` is included so direct visits to `/skills`, `/work`, and `/contact` work after deployment.

## Good Next Improvements

- Replace placeholder work panels with real project/event/photo entries.
- Add real photography thumbnails or a small monochrome gallery.
- Add actual project links and GitHub repo links.
- Add Open Graph preview image for social sharing.
- Add analytics only if needed.
