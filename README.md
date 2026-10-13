# Silly Goose — Creative Portfolio

Live site: [tomson-j-finosh.vercel.app](https://tomson-j-finosh.vercel.app)

A responsive, single-page creative portfolio built with React 18, TypeScript, Vite, GSAP/ScrollTrigger and Lenis. The project follows the supplied editorial black-and-cream brief and keeps the editable portfolio content in `src/content/content.ts`.

## Run locally

- `pnpm install`
- `pnpm dev`
- `pnpm build`

The development server listens on port 3000. Production builds prerender the content-bearing HTML and include Person structured data plus the public PNG share card. Set `PUBLIC_SITE_URL` to the verified public origin at build time to add canonical/`og:url` tags and absolute sitemap/robots entries; those origin-dependent addresses are omitted until a real public URL is configured.

## Deployment

The GitHub repository is [Silly-Goose-duh/tomson-j-finosh-portfolio](https://github.com/Silly-Goose-duh/tomson-j-finosh-portfolio). Vercel project `tomson-j-finosh` builds the root directory using `npm ci` and `npm run build`, then publishes `dist/`, as configured in `vercel.json`.

The complete page is also available as a multi-page PDF at [`/portfolio.pdf`](https://tomson-j-finosh.vercel.app/portfolio.pdf), with a download button in the contact section. Set the Vercel production environment variable `PUBLIC_SITE_URL` to `https://tomson-j-finosh.vercel.app` so the prerendered SEO metadata uses the live origin.

## Personalise the content

Edit `src/content/content.ts` to update the name/brand wording, biography, verified links, repository selection, contact details, tools, approved recognition and portfolio images. Replace the specifically marked campaign, social, portrait and poster placeholders only with authentic material. The GitHub cards currently point to public repositories belonging to `Silly-Goose-duh`; their short descriptions are grounded in repository metadata.

The motion hook disables Lenis and scroll animation when `prefers-reduced-motion: reduce` is active. Fonts are bundled locally. `public/manus-routes.json` declares the one public route.
