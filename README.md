# Omar Mangin | Senior Product Designer · AI Systems & Agentic UX

A Next.js App Router + Tailwind CSS v4 product design portfolio featuring an MDX/JSON content architecture for scalable case studies, WCAG 2.2 AA accessibility compliance, JSON-LD structured data, and high-resolution optimized assets.

## Tech Stack
- **Framework:** Next.js 16 (App Router, Static Site Generation via `generateStaticParams`)
- **UI & Styling:** React 19, TypeScript, Tailwind CSS v4
- **Fonts:** `Archivo Black` (`--font-display`), `Archivo` (`--font-heading`), `Montserrat` (`--font-sans`) via `next/font/google`
- **Content Layer:** Structured MDX & JSON files in `content/`
- **Assets:** Local assets in `public/assets/` rendered with intrinsic dimensions via `next/image` (`AVIF` / `WebP`)

---

## Project Structure

```text
├── content/
│   ├── site.json                         # Global metadata, navigation, homepage hero & AI workflow
│   ├── about.json                        # About me page content (portrait, mentors, skills, toolkit)
│   └── case-studies/                     # 4 flagship case studies (.mdx + .json) at /[slug]
│       ├── unified-ai-product-strategy.* # Level Access (Apr - Sep 2026)
│       ├── accessibility-agents.*        # Level Access (Apr - Sep 2026)
│       ├── ai-agents-in-m365.*           # Microsoft (Aug 2024 - Feb 2026)
│       └── pawnshop-os.*                 # Multiapoyo · Retail finance end-to-end platform (Jun 2022 - Jul 2024)
├── public/assets/
│   ├── Brand/                            # Favicon & OpenGraph social image
│   └── framer/                           # High-resolution images & MP4 interaction loops
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout, Google Fonts, global SEO & Person/CreativeWork JSON-LD
│   │   ├── globals.css                   # Design tokens (:root & @theme inline) and responsive spacing
│   │   ├── page.tsx                      # Homepage with hero, proof pills, 4x1 flagship grid & AI workflow
│   │   ├── about-me/page.tsx             # About me page (horizontal bio, focus, AI workflow, mentors, skills)
│   │   ├── [slug]/page.tsx               # Dynamic SSG case study route with Executive summary & JSON-LD
│   │   ├── sitemap.ts                    # Generated XML sitemap (/sitemap.xml)
│   │   └── robots.ts                     # Crawler rules (/robots.txt)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BentoGrid.tsx             # Semantic BentoSection, BentoGrid, and BentoCard primitives
│   │   │   ├── CompetitorCarousel.tsx    # Accessible horizontal competitor logo carousel
│   │   │   ├── FramerImage.tsx           # Aspect-ratio-preserving next/image wrapper
│   │   │   └── PrototypeEmbed.tsx        # Optional external prototype iframe embed
│   │   ├── CaseStudySectionRenderer.tsx  # Renders all case study section types & GoldenWeb DS V2 views
│   │   ├── ExecutiveSummaryCard.tsx      # Portfolio-styled Role & Scope, Core Decision, Verified Outcome card
│   │   ├── HowIBuildWithAI.tsx           # 3-card AI prototyping, probabilistic UI & accessibility QA section
│   │   ├── VideoShowcaseSection.tsx      # 2x2 looping GIF/MP4 showcase with global Pause/Play animations toggle
│   │   ├── Slideshow.tsx                 # Accessible peeking carousel with keyboard & ARIA support
│   │   ├── ProjectCard.tsx               # 1.28:1 case study card with translucent frosted-glass scrim
│   │   ├── SocialIcons.tsx               # Shared LinkedIn & Email SVG icons (Header, Footer)
│   │   ├── Header.tsx                    # Sticky header with skip link, Download Resume CTA & social links
│   │   └── Footer.tsx                    # Other projects carousel & centered contact links
│   ├── lib/
│   │   ├── content.ts                    # MDX/JSON loaders for site, about, and case studies
│   │   └── asset-dimensions.ts           # Intrinsic width/height map for all assets
│   └── types/
│       └── content.ts                    # TypeScript interfaces for content & section schemas
├── next.config.ts                        # Image optimization & permanent redirects (/about, /work/:slug, legacy slugs)
└── AGENTS.md                             # Project, typography & Next.js architectural guidelines
```

---

## Design System & Patterns (`src/app/globals.css`)

### Colors & Surfaces
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--background` | `#f5f5f5` | Page canvas background |
| `--surface` | `#ffffff` | Bento card background |
| `--surface-hover` | `#e9ecef` | Discrete proof/keyword pills & interactive hover state |
| `--foreground` | `#212529` | Primary body & heading text |
| `--foreground-inverse` | `#f8f9fb` | Text on dark gradient hero & design sections |
| `--accent-teal` | `#00a3e0` / `rgb(0, 119, 178)` | Level Access gradients & AA-compliant accent text |
| `--accent-indigo` | `#464feb` | Microsoft M365 case study |
| `--accent-purple` | `#5a5aff` / `#4b4be6` | Multiapoyo Retail finance end-to-end platform & GoldenWeb DS V2 |

### Typography, Capitalization & Pill System
- **Display (`--font-display` — Archivo Black):** `40px` (`h1` titles, `-0.04em` tracking), `32px` (`h2` section headings), `16px` (`Subtitles 2` card/slide labels)
- **Heading (`--font-heading` — Archivo Bold 700):** `24px` (`h3` card titles & subtitles), `18px–20px` (card overlay & summary titles), `16px` (`h4` / nav items)
- **Body (`--font-sans` — Montserrat 400):** `16px` / `24px` line-height
- **Capitalization Rule:** **Sentence case** by default across all case study titles, `<h2>`/`<h3>`/`<h4>` headings, card titles, and descriptions (preserving proper nouns & acronyms such as `Microsoft`, `Level Access`, `Multiapoyo`, `M365`, `Agent Store`, `AI`, `UX`, `WCAG`, `AA`, `SaaS`). **Title Case** is reserved strictly for the formal role title (`"Senior Product Designer · AI Systems & Agentic UX"`) and short 1–3 word navigation/button/metadata labels (`"My work"`, `"About me"`, `"Download Resume"`, `"Role & Scope"`, `"Core Decision"`, `"Verified Outcome"`).
- **Discrete Pill Style:** Standardized muted pills (`rounded-[60px] bg-[#E9ECEF] px-[14px] py-[6px] font-sans text-[13px] font-medium text-[#495057]`) used for homepage proof highlights and case study keywords.

### Radii, Layout & Breakpoints
- **Card Radius (`--radius-card`):** `24px` (`16px` for `ProjectCard` and media frames)
- **Pill Radius (`--radius-pill`):** `60px`
- **Homepage Grid:** 4-column (`4x1`) row on desktop (`lg: >= 1024px`) with `aspect-[1.28/1]` cards matching `2160×1688` thumbnails without cropping.
- **Responsive Breakpoints (`src/app/globals.css`):**
  - **Phone (`< 744px`, ref `390px`):** Section padding `40px 16px`, hero side-images bleed to viewport edges (`230px / 360px / 230px`).
  - **Tablet (`md: 744px–1023.98px`, ref `744px`):** Section padding `40px 32px`, hero images `383px / 565px / 383px`.
  - **Desktop 2 (`lg: 1024px–1279.98px`, ref `1024px`):** Section padding `40px` (Hero `48px 40px`), hero images `533px / 646px / 533px`.
  - **Desktop (`xl: >= 1280px`, ref `1280px`):** Section padding `40px 80px` (Hero `48px 80px`), max content container `1440px` (`2xl: 1440px`).
- **Design System Views (`CaseStudySectionRenderer.tsx`):**
  - Left-aligned Typography specimen columns (`grid-cols-[1.4fr_0.75fr_1fr]`).
  - Accessible purple (`#4B4BE6`) Material iconography grid on light `#F8F9FB` tiles.
  - Organized 4-part tokenized component showcase (`Atoms`, `Molecules`, `Organisms`, `Templates`).

---

## Accessibility (WCAG 2.2 AA) & SEO
- **Strict Heading Hierarchy:** Every route maintains a sequential `<h1> → <h2> → <h3> → <h4>` structure without skipped heading levels.
- **Landmarks & Skip Navigation:** Includes a keyboard-focusable `"Skip to main content"` link in `Header.tsx`, `<header>`, `<main id="main-content">`, `<nav aria-label="...">`, `<article>` on case study pages, and `<footer>`.
- **Looping Animations (`VideoShowcaseSection.tsx`):** Looping interaction clips hide native browser controls and provide a section-wide `"Pause animations"` / `"Play animations"` toggle (also respecting `prefers-reduced-motion: reduce`).
- **Interactive Carousel (`Slideshow.tsx`):** Uses `role="region"`, `aria-roledescription="carousel"`, `aria-live="polite"` slide announcements, keyboard `ArrowLeft`/`ArrowRight` navigation, `role="tablist"`/`role="tab"` pagination dots, and descriptive `aria-label` controls.
- **Contrast Compliance:** Thumbnail overlays use a `rgba(22, 27, 34, 0.72)` scrim with `backdrop-blur-md` for >= 7:1 contrast on white text; inverse sections use `#F8F9FB` on dark brand gradients.
- **SEO & Structured Data:** Root `Person` + `CreativeWork` JSON-LD in `src/app/layout.tsx`, per-case-study `CreativeWork` JSON-LD in `src/app/[slug]/page.tsx`, `/sitemap.xml`, and `/robots.txt`.

---

## Local Development & Adding Case Studies

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Lint and build for production (TypeScript check + SSG)
npm run lint && npm run build
```

To add a new case study, copy `content/case-studies/_template.json` to `content/case-studies/<slug>.json` (and matching `.mdx`) and place referenced media inside `public/assets/`. Next.js will automatically pre-render `/<slug>` at build time and include it in `/sitemap.xml`.
