# CapitalMind

Production-grade investment research and advisory platform for investors, NRIs, founders, and wealth management clients.

**Live site:** https://www.capitalmind.in

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static output) |
| UI Layer | React 19 (islands only) |
| Styling | Tailwind CSS + CSS custom properties |
| Language | TypeScript 5 |
| Content | MDX + Astro Content Collections |
| Analytics | Google Analytics via Partytown |
| Images | Sharp (AVIF output) |
| Deployment | AWS S3 + CloudFront + Route53 via GitHub Actions |

---

## Getting Started

```bash
npm install
npm run dev        # Dev server at localhost:4321
npm run build      # Type-check + production build
npm run preview    # Preview the production build locally
npm run check      # Astro + TypeScript diagnostics
npm run lint       # TypeScript strict check (tsc --noEmit)
```

---

## Project Structure

```
capitalminds/
├── public/                     # Static assets (images, fonts, SVGs)
│   └── images/
├── src/
│   ├── components/             # All UI components
│   │   ├── layout/             # SeoHead.astro
│   │   ├── navigation/         # SiteHeader, SiteFooter, menus
│   │   ├── sections/           # Page sections (content-driven)
│   │   ├── cards/              # ArticleCard, StrategyCard
│   │   ├── forms/              # ContactForm (React island)
│   │   ├── animations/         # MotionWrapper (React island)
│   │   └── ui/                 # Button, Badge, Breadcrumb, Tabs, Accordion
│   ├── content/                # Astro content collections (MDX/MD)
│   │   ├── home/               # Homepage content
│   │   ├── pages/              # Static pages (About, etc.)
│   │   ├── strategies/         # Investment strategy entries
│   │   ├── insights/           # Market insights articles
│   │   ├── blogs/              # Blog posts
│   │   ├── authors/            # Author profiles
│   │   ├── team/               # Team member profiles
│   │   ├── legal/              # Privacy, Terms
│   │   └── config.ts           # Zod schemas for all collections
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root layout: SeoHead + SiteHeader + <main>
│   │   └── ContentLayout.astro # Layout for content pages (breadcrumb, prose)
│   ├── lib/
│   │   └── seo.ts              # buildSeo(), buildOrganizationJsonLd(), etc.
│   ├── utils/
│   │   ├── cn.ts               # clsx + tailwind-merge helper
│   │   ├── image.ts            # Image utility helpers
│   │   └── date.ts             # Date formatting helpers
│   ├── data/
│   │   └── navigation.ts       # Mega menu link data
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── 404.astro           # Not found page
│   │   ├── robots.txt.ts       # Dynamic robots.txt
│   │   └── rss.xml.ts          # RSS feed endpoint
│   └── styles/
│       └── global.css          # Design tokens, global resets, utility classes
├── astro.config.mjs            # Astro + integrations config
├── tailwind.config.mjs         # Tailwind config (maps to CSS variables)
├── tsconfig.json               # TypeScript config with path aliases
└── package.json
```

### Path Aliases

```typescript
@components/*   → src/components/*
@layouts/*      → src/layouts/*
@lib/*          → src/lib/*
@utils/*        → src/utils/*
@data/*         → src/data/*
@assets/*       → src/assets/*
@styles/*       → src/styles/*
```

---

## Homepage: Component Structure

The homepage (`src/pages/index.astro`) is entirely content-driven. It reads a single content entry and delegates all rendering to `SectionRenderer.astro`.

```
index.astro
└── BaseLayout.astro              # HTML shell, SeoHead, SiteHeader
    └── SectionRenderer.astro     # Dispatches each section by type
        ├── HomeHeroSection/
        │   └── index.astro       # Hero heading, CTA buttons, hero image, stat counters
        ├── WhoWeServeSection.astro       # Persona cards (6 audience segments)
        ├── OurInvestmentPrinciplesSection.astro  # 4-feature grid with images
        ├── CapitalmindAdvantageSection.astro     # Comparison table vs traditional PMS
        ├── MeetOurFounderSection.astro           # Founder profile, team grid, book & podcast
        ├── TestimonialsSection.astro             # Client testimonial cards
        ├── LatestMarketUpdatesSection.astro      # Article cards + newsletter signup
        └── FAQSection.astro                      # Accordion FAQ + contact CTA
```

### Navigation Components (rendered inside `BaseLayout`)

```
src/components/navigation/
├── SiteHeader.astro          # Top navigation bar wrapper
├── SiteHeaderIsland.tsx      # React island for scroll/sticky behaviour
├── MobileNavMenu.tsx         # Full-screen mobile menu (React)
├── StrategiesMenu.tsx        # Mega menu: Strategies dropdown
├── WhoWeServeMenu.tsx        # Mega menu: Who We Serve dropdown
├── InsightsMenu.tsx          # Mega menu: Insights dropdown
├── AboutMenu.tsx             # Mega menu: About dropdown
├── useSimpleDropdown.ts      # Shared dropdown open/close hook
└── SiteFooter.astro          # Footer (currently commented out in BaseLayout)
```

### Section Components — Detail

| Component | File | Description |
|---|---|---|
| Home Hero | `sections/HomeHeroSection/index.astro` | Full-width hero with responsive image, heading, CTA, and 3 stat counters |
| Hero Image (React) | `sections/HomeHeroSection/HeroImageSection.tsx` | Animated hero image island |
| Who We Serve | `sections/WhoWeServeSection.astro` | Dark-background section with 6 persona cards and contextual links |
| Investment Principles | `sections/OurInvestmentPrinciplesSection.astro` | 4-principle feature grid with illustrative images |
| Capitalmind Advantage | `sections/CapitalmindAdvantageSection.astro` | Side-by-side comparison rows vs traditional PMS |
| Meet Our Founder | `sections/MeetOurFounderSection.astro` | Founder quote + photo, leadership team grid, book card, podcast card |
| Testimonials | `sections/TestimonialsSection.astro` | Masonry-style testimonial cards with wide-card support |
| Latest Market Updates | `sections/LatestMarketUpdatesSection.astro` | Article card grid + newsletter CTA panel |
| FAQ | `sections/FAQSection.astro` | Accordion FAQ list with "view all" and "contact" links |

### Shared UI Components

```
src/components/ui/
├── Button.astro          # Primary / secondary / ghost button variants
├── Badge.astro           # Pill label for categories
├── Breadcrumb.astro      # Breadcrumb nav (used in ContentLayout)
├── SectionHeader.astro   # Eyebrow + heading + optional body pattern
├── Accordion.tsx         # Headless accordion (React island)
├── FaqAccordion.tsx      # FAQ-specific accordion wrapper (React island)
├── Tabs.tsx              # Accessible tab panel (React island)
└── AnimatedCounter.tsx   # Number counter animation (React island, client:visible)
```

### React Islands Rule

React is used **only** for interactive widgets. All islands hydrate with `client:visible` unless documented otherwise.

```
AnimatedCounter.tsx    → client:visible  (stat counters)
FaqAccordion.tsx       → client:visible  (FAQ section)
Tabs.tsx               → client:visible  (tab panels)
ContactForm.tsx        → client:visible  (contact form)
MotionWrapper.tsx      → client:visible  (Framer Motion wrapper)
SiteHeaderIsland.tsx   → client:idle     (sticky header scroll logic)
MobileNavMenu.tsx      → client:idle     (mobile menu)
```

---

## Homepage: Content Structure

Homepage content lives in a single Markdown file. The page is entirely data-driven — no content is hardcoded in `.astro` files.

```
src/content/home/
└── homepage.md     # All homepage sections defined here as YAML frontmatter
```

### File: `src/content/home/homepage.md`

```
---
title:          string          # Internal page title
description:    string          # Meta description fallback
seoTitle:       string          # <title> tag (max 60 chars)
seoDescription: string          # <meta name="description"> (max 160 chars)

sections:
  - type: hero                  # → HomeHeroSection
  - type: whoweserve            # → WhoWeServeSection
  - type: ourinvestmentprinciples  # → OurInvestmentPrinciplesSection
  - type: capitalmindadvantage  # → CapitalmindAdvantageSection
  - type: meetourfounder        # → MeetOurFounderSection
  - type: testimonialssection   # → TestimonialsSection
  - type: latestmarketupdates   # → LatestMarketUpdatesSection
  - type: faq                   # → FAQSection
---
```

### Section Schemas

Each `type` key maps to a Zod schema in `src/content/config.ts` and a component in `SectionRenderer.astro`.

#### `type: hero`
```yaml
type: hero
eyebrow: string           # Small label above the heading
heading: string           # Main H1
subheading?: string
body?: string
backgroundVariant: gradient | default | dark | image
fullHeight: boolean
ctas:
  - label: string
    href: string
    variant: primary | secondary | ghost
    external: boolean
image?:
  src: string
  alt: string
  width: number
  height: number
```

#### `type: whoweserve`
```yaml
type: whoweserve
eyebrow?: string
heading?: string
body?: string
personas:
  - id: string            # Unique identifier (used as tab key)
    title: string
    description: string
    href?: string
    image?:
      src: string
      alt: string
      width: number
      height: number
    links?:
      - label: string
        href: string
```

#### `type: ourinvestmentprinciples`
```yaml
type: ourinvestmentprinciples
heading: string
ctaLabel?: string
ctaHref?: string
features:
  - title: string
    description: string
    image: string         # Path to /public/images/
    imageWidth: number
    imageHeight: number
```

#### `type: capitalmindadvantage`
```yaml
type: capitalmindadvantage
eyebrow?: string
ctaLabel?: string
ctaHref?: string
rows:
  - title: string         # Row heading (Capitalmind side)
    icon: string          # Path to SVG icon
    cardText: string      # Capitalmind description (supports multiline)
    rightText: string     # Traditional PMS description
```

#### `type: meetourfounder`
```yaml
type: meetourfounder
founderName?: string
founderTitle?: string
founderImage?: string
founderBgImage?: string
founderQuote?: string
leadershipHeading?: string
team?:
  - name: string
    role: string
    image: string
bookEyebrow?: string
bookHeading?: string
bookDescription?: string
bookPurchaseLabel?: string
bookPurchaseHref?: string
podcastImage?: string
```

#### `type: testimonialssection`
```yaml
type: testimonialssection
heading?: string
testimonials:
  - quote: string
    mobileQuote?: string  # Shorter version shown on mobile
    name: string
    role: string
    image: string
    wide: boolean         # True = card spans 2 columns
    showOnMobile: boolean # Default true
```

#### `type: latestmarketupdates`
```yaml
type: latestmarketupdates
heading?: string
mobileHeading?: string
ctaLabel?: string
ctaHref?: string
newsletterHeading?: string
newsletterBody?: string
articles:
  - category: string
    title: string
    description: string
    author: string
    image: string
    imageAlt: string
```

#### `type: faq`
```yaml
type: faq
heading?: string
viewAllHref?: string
contactHref?: string
faqs:
  - question: string
    answer: string
```

### How a Section Gets Rendered

```
homepage.md frontmatter
  └── getEntry('home', 'homepage')        ← index.astro
      └── homePage.data.sections[]
          └── SectionRenderer.astro       ← switch(section.type)
              └── <MatchingSection {...section} />
```

Zod validates every field at build time. If a required field is missing or a value is out of range, `astro build` will throw with the exact path and error.

---

## Content Collections Overview

| Collection | Path | Purpose |
|---|---|---|
| `home` | `src/content/home/` | Homepage sections (single entry) |
| `pages` | `src/content/pages/` | Static pages (About, etc.) |
| `strategies` | `src/content/strategies/` | Investment strategy detail pages |
| `insights` | `src/content/insights/` | Market insight articles |
| `blogs` | `src/content/blogs/` | Blog posts |
| `authors` | `src/content/authors/` | Author profiles (referenced by insights & blogs) |
| `team` | `src/content/team/` | Team member profiles |
| `legal` | `src/content/legal/` | Privacy policy, terms, etc. |

All schemas are defined and exported from `src/content/config.ts`.

---

## Design System

All design tokens are CSS custom properties in `src/styles/global.css`. **Never hardcode hex values or raw pixel sizes in components.**

```css
/* Colors */
var(--color-primary-{50–900})
var(--color-gold-{50–900})
var(--color-beige-{50–900})
var(--color-text-primary)
var(--color-text-secondary)
var(--color-surface)
var(--color-border)

/* Typography */
var(--font-display)     /* Noto Serif Condensed */
var(--font-sans)        /* Inter */
var(--fs-*)             /* Font size scale */
var(--lh-*)             /* Line height scale */
var(--ls-*)             /* Letter spacing scale */

/* Spacing */
var(--space-{4xs|3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl})
```

---

## Deployment

Currently hosted on **Vercel** (auto-deploys via its Git integration — no extra config needed beyond `vercel.json`, which sets `buildCommand`/`outputDirectory` and the Cache-Control strategy below; Vercel compresses responses on the fly, no separate gzip/brotli setup required on that side).

An AWS S3 + CloudFront + GitHub Actions pipeline (`.github/workflows/deploy.yml`, triggers on push to `project`) is also kept in the repo and available if deployment moves back to AWS.

**Required GitHub secrets (AWS pipeline):**
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
CLOUDFRONT_DISTRIBUTION_ID
```

**Required GitHub repository variables:**
```
AWS_REGION
S3_BUCKET_NAME
```

**Cache strategy** (same rules on both platforms — enforced by `vercel.json` on Vercel, by the S3 sync `Cache-Control` flags on AWS):
- `/_astro/**` and `/fonts/**` — `Cache-Control: max-age=31536000, immutable`
- All other output (HTML, `robots.txt`, sitemap, images) — `Cache-Control: max-age=0, must-revalidate`
- CloudFront invalidation `/*` runs after every AWS deploy (Vercel needs no equivalent — each deploy gets a fresh, immediately-live edge cache)

**Build-time optimization:**
- `@playform/compress` minifies HTML/CSS/JS/SVG in `dist/` after build — applies on both platforms
- `vite-plugin-compression2` emits pre-compressed `.gz`/`.br` sidecar files for text assets. These are **AWS-only**: the S3 sync uploads them with matching `Content-Encoding` headers, and CloudFront needs **"Compress objects automatically"** enabled (recommended) or a CloudFront Function/Lambda@Edge to actually serve them. On Vercel these sidecar files are just inert extra output — Vercel's edge compresses every response on the fly, so nothing extra is needed there
- Astro's built-in `prefetch` (`defaultStrategy: 'viewport'`) prefetches same-origin links as they scroll into view — applies on both platforms
