# Portfolio Content Architecture

All site copy, metadata, and case studies live in this `content/` directory so you can add or edit projects without touching core page layouts in `src/app/`.

## Directory Structure

- `content/site.json` — Global navigation links, social links, Home hero copy, and footer message.
- `content/about.json` — Content for the `/about-me` page (bio, focus, mentors, favorite things, skills, toolkit).
- `content/case-studies/*.json` — Individual case study files. Each `<slug>.json` automatically generates a static route at `/<slug>`, populates the Home grid (when `"featuredOnHome": true`), and populates the Footer `"Check some of my other projects"` carousel (when `"showInFooterCarousel": true`).
- `content/case-studies/_template.json` — Starter template for new case studies (files prefixed with `_` are ignored by the route generator).

## Adding a New Case Study

1. Copy `content/case-studies/_template.json` to `content/case-studies/<your-new-slug>.json` (and optional `.mdx` mirror).
2. Place your project images/videos under `public/assets/<Project Folder>/` (and record intrinsic dimensions in `src/lib/asset-dimensions.ts`).
3. Update `"slug"`, `"order"`, `"featuredOnHome"`, `"theme"`, and compose any combination of section blocks in `"sections"` (`"about"`, `"challenges"`, `"split-cards"`, `"design-showcase"`, `"cards-grid"`, `"research-showcase"`, `"iterations-showcase"`, `"design-system-showcase"`, `"video-showcase"`, `"results"`).

## Responsive Breakpoints & Media Guidelines

- **Breakpoints:** Layouts follow Framer's 4 breakpoints (`Phone < 744px`, `Tablet md: 744px`, `Desktop 2 lg: 1024px`, `Desktop xl: 1280px`, `maxWidth: 1440px`).
- **Hero Images:** 3-image heroes (`heroLayout: "three-equal"`) and device collages (`"moov-devices"`) bleed past section padding to the viewport edges and progressively reveal more as screen width widens.
- **Slideshow & Carousel Titles:** Keep slide titles concise (up to 2 lines); `Slideshow.tsx` reserves 2 lines (`min-h-[48px]`) and locks a uniform media aspect ratio per carousel so cards never change height across slides.
- **Capitalization Rule (Sentence Case vs. Title Case):** Use **Sentence case** for all case study titles, `<h2>`/`<h3>`/`<h4>` section headings, card titles, and descriptions (preserving proper nouns and acronyms such as `AI`, `UX`, `WCAG`, `M365`, `Agent Store`). Use **Title Case** only for the formal identity title and short 1–3 word nav/button/metadata labels (`"Download Resume"`, `"Role & Scope"`, `"Core Decision"`, `"Verified Outcome"`).
