# Omar Mangin — Product Design Portfolio

A Next.js App Router + Tailwind CSS v4 product design portfolio featuring an MDX/JSON content architecture for scalable case studies, WCAG 2.2 AA accessibility compliance, and high-resolution optimized assets.

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
│   ├── site.json                     # Global site metadata, navigation, bio, social links
│   ├── about.json                    # About Me page content (portrait, mentors, skills, toolkit)
│   └── case-studies/                 # Case studies (.mdx + .json) rendered dynamically at /[slug]
├── public/assets/
│   ├── Brand/                        # Favicon & OpenGraph social image
│   └── framer/                       # High-resolution images & MP4 interaction videos
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout, Google Fonts, global SEO/OG/Twitter metadata
│   │   ├── globals.css               # Design tokens (:root & @theme inline) and responsive spacing
│   │   ├── page.tsx                  # Homepage with 2×2 featured Bento grid
│   │   ├── about-me/page.tsx         # About Me page
│   │   └── [slug]/page.tsx           # Dynamic SSG case study route
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BentoGrid.tsx         # Semantic BentoSection, BentoGrid, and BentoCard primitives
│   │   │   └── FramerImage.tsx       # Aspect-ratio-preserving next/image wrapper
│   │   ├── CaseStudySectionRenderer.tsx # Renders all case study section types
│   │   ├── Slideshow.tsx             # Accessible peeking carousel with keyboard & ARIA support
│   │   ├── ProjectCard.tsx           # Accessible case study card with WCAG AA scrim
│   │   ├── Header.tsx                # Sticky header with skip link & responsive mobile menu
│   │   └── Footer.tsx                # Featured other projects grid & centered contact links
│   ├── lib/
│   │   ├── content.ts                # MDX/JSON loaders for site, about, and case studies
│   │   └── asset-dimensions.ts       # Intrinsic width/height map for all assets
│   └── types/
│       └── content.ts                # TypeScript interfaces for content & section schemas
└── AGENTS.md                         # Project & Next.js architectural guidelines
```

---

## Design Tokens (`src/app/globals.css`)

### Colors & Surfaces
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--background` | `#f5f5f5` | Page canvas background |
| `--surface` | `#ffffff` | Bento card background |
| `--surface-hover` | `#e9ecef` | Interactive pill hover state |
| `--foreground` | `#212529` | Primary body & heading text |
| `--foreground-inverse` | `#f8f9fb` | Text on dark gradient hero & design sections |
| `--accent-teal` | `#00a3e0` | Level Access case studies (`Unified AI Product Strategy`, `Accessibility Agents`) |
| `--accent-indigo` | `#464feb` | Microsoft 365 case studies (`AI Agents in M365`, `M365 Agent Store`) |
| `--accent-purple` | `#5a5aff` | `Pawnshop OS` & `GoldenWeb Design System` |
| `--accent-blue` | `#455cff` | `MOOV Web` |
| `--accent-green` | `#35cf44` | `GoldenWeb Design System` V1 |

### Typography Scale
- **Display (`--font-display` — Archivo Black):** `40px` (`h1` titles, `-0.04em` tracking), `32px` (`h2` section headings), `16px` (`Subtitles 2` card/slide labels)
- **Heading (`--font-heading` — Archivo Bold 700):** `24px` (`h3` card titles & subtitles), `20px` (card overlay titles), `16px` (`h4` / nav items)
- **Body (`--font-sans` — Montserrat 400):** `16px` / `24px` line-height

### Radii, Shadows & Breakpoints
- **Card Radius (`--radius-card`):** `24px`
- **Media Radius (`--radius-media`):** `16px`
- **Pill Radius (`--radius-pill`):** `60px`
- **Responsive Breakpoints (`src/app/globals.css` `@theme inline`):**
  - **Phone (base `< 744px`, ref `390px`):** Section padding `40px 16px`, hero side-images bleed to viewport edges (`230px / 360px / 230px`).
  - **Tablet (`md: 744px–1023.98px`, ref `744px`):** Section padding `40px 32px`, hero images `383px / 565px / 383px`.
  - **Desktop 2 (`lg: 1024px–1279.98px`, ref `1024px`):** Section padding `40px` (Hero `48px 40px`), hero images `533px / 646px / 533px`.
  - **Desktop (`xl: >= 1280px`, ref `1280px`):** Section padding `40px 80px` (Hero `48px 80px`), max content container `1440px` (`2xl: 1440px`).
- **Carousels & Slideshows:** Reserve 2 lines of slide heading copy (`min-h-[48px]`) and lock a uniform media stage aspect ratio per carousel so slide heights never jump; include clickable prev/next chevrons, keyboard `ArrowLeft`/`ArrowRight`, and horizontal touch/pointer scrolling.

---

## Accessibility (WCAG 2.2 AA) & SEO
- **Strict Heading Hierarchy:** Every route maintains a sequential `<h1> → <h2> → <h3> → <h4>` structure without skipped heading levels.
- **Landmarks & Skip Navigation:** Includes a keyboard-focusable `"Skip to main content"` link in `Header.tsx`, `<header>`, `<main id="main-content">`, `<nav aria-label="...">`, and `<footer>`.
- **Interactive Carousel (`Slideshow.tsx`):** Uses `role="region"`, `aria-roledescription="carousel"`, `aria-live="polite"` slide announcements, keyboard `ArrowLeft`/`ArrowRight` navigation, `role="tablist"`/`role="tab"` pagination dots, and descriptive `aria-label` controls.
- **Contrast Compliance:** Thumbnail overlays use a `rgba(22, 27, 34, 0.72)` scrim with `backdrop-blur-md` for >= 7:1 contrast on white text; inverse sections use `#F8F9FB` on dark brand gradients.
- **Media & Icons:** Meaningful `alt` attributes on all content images, `aria-hidden="true"` on decorative SVGs and hover-only duplicate thumbnails, and accessible labels on all external links (`"(opens in a new tab)"`).
- **SEO Metadata:** Root metadata in `src/app/layout.tsx` plus route-specific `title`, `description`, `openGraph`, `twitter`, and `robots` metadata on `/`, `/about-me`, and `/[slug]`.

---

## Local Development & Adding Case Studies

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (runs TypeScript check + SSG)
npm run build
```

To add a new case study, create `content/case-studies/<slug>.mdx` (with JSON frontmatter matching `CaseStudy` in `src/types/content.ts`) and place any referenced media inside `public/assets/`. Next.js will automatically pick it up and pre-render `/<slug>` at build time.
