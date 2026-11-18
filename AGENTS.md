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

# Responsive Breakpoints & Layout Rules (Framer Baseline)
- **Phone (base `< 744px`, design ref `390px`):** `padding: 40px 16px` (`hero` / `section` / `footer` `40px 16px 24px`).
- **Tablet (`md: >= 744px` to `< 1024px`, design ref `744px`):** `padding: 40px 32px` (`footer` `40px 32px 24px`).
- **Desktop 2 (`lg: >= 1024px` to `< 1280px`, design ref `1024px`):** `padding: 40px` (`hero` `48px 40px`, `footer` `80px 40px 40px`).
- **Desktop (`xl: >= 1280px`, design ref `1280px`, max content `2xl: 1440px`):** `padding: 40px 80px` (`hero` `48px 80px`, `footer` `80px 80px 40px`).
- **Hero Bleed:** Case study hero image rows overflow page padding to the viewport edges (`w-screen`) and reveal more as screen size widens (`230px/360px` Phone → `383px/565px` Tablet → `533px/646px` Desktop).
- **Carousels & Slideshows:** Must include accessible navigation (clickable prev/next chevrons, keyboard `ArrowLeft`/`ArrowRight`, and/or scrollbar), reserve 2 lines of heading copy (`min-h-[48px]`), and lock uniform slide media height so switching slides never jumps vertically.


