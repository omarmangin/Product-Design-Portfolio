# Portfolio Content Architecture

All site copy, metadata, and case studies live in this `content/` directory so you can add or edit projects without touching core page layouts in `src/app/`.

## Directory Structure

- `content/site.json` — Global navigation links, social links, Home hero copy, and footer message.
- `content/about.json` — Content for the `/about-me` page (bio, focus, mentors, favorite things, skills, toolkit).
- `content/case-studies/*.json` — Individual case study files. Each `<slug>.json` automatically generates a static route at `/<slug>`, populates the Home grid (when `"featuredOnHome": true`), and populates the Footer `"Check some of my other projects"` carousel (when `"showInFooterCarousel": true`).
- `content/case-studies/_template.json` — Starter template for new case studies (files prefixed with `_` are ignored by the route generator).

## Adding a New Case Study

1. Copy `content/case-studies/_template.json` to `content/case-studies/<your-new-slug>.json`.
2. Place your project images/videos under `public/assets/<Project Folder>/`.
3. Update `"slug"`, `"order"`, `"featuredOnHome"`, `"theme"`, and compose any combination of section blocks in `"sections"` (`"about"`, `"challenges"`, `"split-cards"`, `"design-showcase"`, `"cards-grid"`, `"video-showcase"`, `"results"`).
