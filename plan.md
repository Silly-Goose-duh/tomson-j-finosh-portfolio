# Portfolio website — implementation and design plan

## Product and implementation

Build a static, mobile-first, single-page creative portfolio for the GitHub identity `Silly Goose`. Preserve the nine-section order from the PRD: Hero; Intro; Skills; Tools and Awards; Creative Campaigns; Web and Video; Social Pages; Landing and Posters; Thank You / Contact. Treat the owner’s description—hosting events for a few years, interest in photography, research, poetry and literature—as verified input. Use only the public repositories under `Silly-Goose-duh` as project references. Do not infer performance, clients, awards, social handles, contact information, education or personal identity details. Keep every missing image and non-repository project clearly identified as a placeholder.

Use React 18, TypeScript and Vite. Keep the application static: no backend, database, login, analytics, or form submission is required for this request. Use Lenis only at desktop widths and GSAP/ScrollTrigger for light reveal and fill effects; do not add Framer Motion, Tailwind, Three.js, a custom cursor or expensive canvas because their benefits do not justify the added runtime and no real videos/media/carousels were supplied. Use local Fontsource packages, CSS custom properties and hand-authored component styles. Generate a production HTML snapshot from the same typed content that hydrates in the browser; only add a canonical URL, absolute sharing URLs and a sitemap after a real public origin is configured.

The hero receives one custom abstract dark artwork as a decorative background. Do not generate a portrait or imply that an owner photo exists; use an explicit portrait slot. Campaign, social, and poster frames stay visually polished but marked as placeholders. Repository cards link directly to verified public source repositories, and summaries remain factual and concise.

## Design system

**Design movement:** Swiss editorial poster design crossed with tactile post-internet zine culture: maximal type, precise spacing, printed-paper grain and deliberate contrast.

**Core principles:** (1) Lead with clear identity and oversized, condensed typography. (2) Alternate dark editorial chapters with warm paper chapters so each scroll has a strong rhythm. (3) Frame work like a printed object—thick, rounded borders and tactile texture—while keeping unverified material explicitly open. (4) Make motion supportive and brief; content, focus and navigation remain usable without animation.

**Color philosophy:** Near-black grounds the page like an ink-heavy book jacket. Warm cream, `#E3E0B4`, is the ownable signature color—paper-like, distinctive and readable against black. Soft paper (`#F4F3E6`) is reserved for long-form light content. Do not introduce unverified client/brand colors or unrelated accents.

**Layout paradigm:** A continuous editorial strip, not a uniform dashboard grid: full-bleed type in the hero, left-aligned oversized biography, an off-axis circle/panel skill spread, then varied bento frames, with a single-column mobile fall-through. Keep narrow annotations and section numbers as quiet wayfinding.

**Signature elements:** Giant two-line PORT / FOLIO lettering; orbital geometry inside the labelled portrait placeholder and project-art blocks; faint dotted ink and paper textures under the alternating chapters.

**Interaction philosophy:** Links behave like quiet invitations, not sales funnels. Active navigation follows the current section; the top pill retreats on scroll-down and returns on scroll-up. Cards lift only slightly and remain keyboard-addressable. Use the verified GitHub profile as the contact route because no email or booking link was supplied.

**Animation:** First visit uses a short, non-blocking slit-wipe preloader; it never lasts more than 720ms. Reveal and bar animations use opacity/transform with a restrained `power3.out` curve. Lenis is desktop-only and synchronised with ScrollTrigger. Marquees pause on hover and become static/scrollable when reduced motion is preferred. Avoid pinning, mouse-parallax, blocking transitions and layout-property animation; disable motion when `prefers-reduced-motion: reduce` is active.

**Typography system:** Anton for condensed uppercase titles and poster figures; Poppins 400/500/600 for labels, cards and controls; Inter Variable for paragraphs and longer reading; a local monospace system fallback for metadata. Use fluid `clamp()` scales, tight display leading and comfortable body-text line length.

**Brand essence:** An evolving home for the ideas, gatherings and digital work of an event-minded creative—more personal field notebook than generic agency portfolio. Personality: **curious, grounded, inventive**.

**Brand voice:** First-person, observant and warm; specific rather than inflated. Example lines: “A notebook for the things I make, host, notice and imagine.” “A few personal details and visual samples still need to be added.” CTAs invite browsing or contact without claiming email availability.

**Wordmark and logo:** A custom black circular badge with a cream double-letter SG glyph, mirrored by the compact header monogram and a distinct favicon/logo SVG; the wordmark is set in Anton rather than a default body font.

**Signature brand color:** Warm cream `#E3E0B4`.

## Content and route behavior

One typed `PortfolioContent` object in `src/content/content.ts` owns copy, URLs, project descriptions, section labels and asset paths. Sections receive typed slices as props. The one-page route is `/`; `public/manus-routes.json` declares it before Vite starts. External repository links open their source. Never fabricate a resume, email, client, result, achievement, follower metric or image caption.

## Project structure

- `src/main.tsx` loads self-hosted fonts, global tokens, section CSS and React hydration.
- `src/App.tsx` composes the preloader, accessible navigation and nine ordered sections.
- `src/content/types.ts` and `src/content/content.ts` hold the typed content contract and editable portfolio data.
- `src/components/` contains the navigation, preloader, reusable repository card and CSS-backed abstract placeholder artwork.
- `src/sections/IdentitySections.tsx`, `WorkSections.tsx` and `ContactSection.tsx` provide the nine semantic, data-driven sections.
- `src/lib/useSiteMotion.ts` owns GSAP/ScrollTrigger lifecycle, reduced-motion behavior and the desktop-only Lenis sync.
- `src/styles/` holds color/type tokens, global accessibility rules and responsive section/layout styling.
- `src/entry-server.tsx` and `scripts/prerender.mjs` produce crawlable initial HTML plus escaped, content-derived metadata/Person JSON-LD. Production-origin metadata is conditional on a verified `PUBLIC_SITE_URL`.
- `public/` contains the static route manifest, SVG logo/favicon and share-card artwork. The abstract hero and raster social-card images also have durable public CDN URLs. Robots and sitemap documents are generated only when a verified origin is available, leaving platform defaults intact otherwise.
- `TODO.md` records the independently deliverable outcome criteria; `RESEARCH.md` preserves the public GitHub evidence behind repository cards.
- `package.json`, `pnpm-lock.yaml` and the workspace policy pin the Node package toolchain and reviewed build-script permissions. The Vite project serves on the initialized port 3000.
