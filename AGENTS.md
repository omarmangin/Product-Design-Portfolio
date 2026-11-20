<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines
- Stack: Next.js App Router, React, Tailwind CSS.
- Architecture: Set up an MDX content directory for scalable case studies.
- Accessibility: Enforce strict semantic HTML, proper ARIA labels, and WCAG 2.2 AA contrast compliance.
- Assets: Reference images exclusively from the `/public/assets` directory.
- Typography & Capitalization: Enforce **Sentence case** by default across all case study titles, `<h2>`/`<h3>`/`<h4>` headings, card titles, and UI descriptions (preserving proper nouns like `Microsoft`, `Level Access`, `Multiapoyo`, `M365`, `Agent Store`, `Cursor`, `React` and acronyms like `AI`, `UX`, `UI`, `WCAG`, `AA`, `LLM`, `B2B`, `B2C`, `OS`, `ATS`). Reserve **Title Case** strictly for the formal role/identity title (`"Senior Product Designer · AI Systems & Agentic UX"`) and short 1–3 word navigation/button/metadata labels (`"My work"`, `"About me"`, `"Download Resume"`, `"Role & Scope"`, `"Core Decision"`, `"Verified Outcome"`).

# Responsive Breakpoints & Layout Rules (Framer Baseline)
- **Phone (base `< 744px`, design ref `390px`):** `padding: 40px 16px` (`hero` / `section` / `footer` `40px 16px 24px`).
- **Tablet (`md: >= 744px` to `< 1024px`, design ref `744px`):** `padding: 40px 32px` (`footer` `40px 32px 24px`).
- **Desktop 2 (`lg: >= 1024px` to `< 1280px`, design ref `1024px`):** `padding: 40px` (`hero` `48px 40px`, `footer` `80px 40px 40px`).
- **Desktop (`xl: >= 1280px`, design ref `1280px`, max content `2xl: 1440px`):** `padding: 40px 80px` (`hero` `48px 80px`, `footer` `80px 80px 40px`).
- **Hero Bleed:** Case study hero image rows overflow page padding to the viewport edges (`w-screen`) and reveal more as screen size widens (`230px/360px` Phone → `383px/565px` Tablet → `533px/646px` Desktop).
- **Carousels & Slideshows:** Must include accessible navigation (clickable prev/next chevrons, keyboard `ArrowLeft`/`ArrowRight`, and/or scrollbar), reserve 2 lines of heading copy (`min-h-[48px]`), and lock uniform slide media height so switching slides never jumps vertically.

# Dark Mode & Semantic Token Rules
- **Semantic Tokens Only:** Always use CSS custom properties from `src/app/globals.css` (`--bg-primary`, `--bg-surface`, `--bg-surface-subtle`, `--bg-surface-hover`, `--text-primary`, `--text-secondary`, `--border-subtle`, `--border-interactive`, `--focus-ring`, `--cta-bg`, `--cta-fg`, `--accent-teal`, `--accent-indigo`, `--accent-purple`) instead of hardcoded light-mode hex values (`#FFFFFF`, `#F5F5F5`, `#212529`, `#495057`).
- **Elevation & Borders:** Keep `Header`, `Footer`, portraits, and Back-to-Top buttons borderless in light mode. Dark-mode card elevation is handled automatically via `--shadow-card` and `--shadow-card-sm` under `:root[data-theme="dark"]`.
- **Theme Architecture:** Theme defaults to `"system"` with zero-FOUC pre-hydration resolution in `src/app/layout.tsx`, live `prefers-color-scheme: dark` sync in `src/components/ThemeProvider.tsx`, and the icon-only `ThemeToggle` (`src/components/ui/ThemeToggle.tsx`) placed in `Footer.tsx` (not `Header.tsx`).
- **Media & Transparent Diagrams:** Transparent dark-ink diagrams must set `"transparentDiagram": true` (renders `.transparent-diagram-frame` on `#F8FAFC` in dark mode). Case study UI screenshots use `.case-study-media` (`brightness(0.92)` in dark mode); portraits remain undimmed.

# WCAG 2.2 Level AA & Mobile Layout Guardrails
- **Contrast (`1.4.3`, `1.4.11`, `2.4.7`):** Maintain `>= 4.5:1` for normal text and `>= 3:1` for large text, UI components, and focus rings in both light and dark modes. Glass cards over brand gradients use `bg-black/25`; focus outlines use `outline-[var(--focus-ring)]`.
- **Target Size (`2.5.8`):** All interactive controls (including slideshow pagination dots) must have a minimum `24×24px` hit target.
- **Sticky Header & Focus Management (`2.4.11`, `2.1.1`, `2.4.3`):** Keep `html { scroll-padding-top: 84px; }` so focused elements are not obscured by the sticky header, restore focus to trigger buttons on `Escape` when closing menus, and never attach `onClick` to non-button `<div>` elements.
- **Reduced Motion (`2.3.3`, `2.2.2`):** Respect `prefers-reduced-motion: reduce` on looping videos (`VideoShowcaseSection.tsx`) and programmatic scrolling (`behavior: "auto"`).
- **Mobile Layout:** Scope equal-height `flex-1` on stacked cards to `lg:flex-1`, scale large typography specimens (`min(size, 5.2vw)` with `leading-[1.2]`), and keep search/banner action buttons `shrink-0` with `items-stretch` pill containers.



