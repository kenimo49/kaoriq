# KaoriQ

**https://kaoriq.com/**

Data-driven fragrance recommendations powered by personality science.

## About

KaoriQ is a fragrance discovery platform that matches scents to individual personalities using AI analysis and a database of 59,000+ fragrances. Instead of relying on marketing or trends, KaoriQ uses personality diagnostics (Big Five model) and fragrance component data to generate personalized recommendations with clear reasoning.

## Tech Stack

- **Framework**: Astro v6 + Tailwind CSS v4
- **Hosting**: GitHub Pages
- **Analytics**: Google Analytics 4
- **Languages**: Bilingual (EN / JA)
- **LLMO**: llms.txt, JSON-LD structured data, sitemap

## Project Structure

```
kaoriq/
├── src/
│   ├── content/blog/
│   │   ├── en/          # English articles
│   │   └── ja/          # Japanese articles
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   ├── components/
│   │   └── Nav.astro
│   └── pages/
│       ├── index.astro       # EN homepage
│       ├── ja.astro          # JA homepage
│       ├── about.astro       # EN about
│       ├── blog.xml.ts       # EN RSS feed
│       ├── blog/             # EN blog pages
│       └── ja/               # JA pages (about, blog, RSS)
├── public/
│   ├── llms.txt              # LLMO optimization
│   ├── favicon.svg
│   └── CNAME
├── docs/
│   └── design-references.md  # Design palette and reference sites
└── astro.config.mjs
```

## Blog Categories

Blog articles are organized into three categories, each with a different writing style and target audience:

| Category | Label (EN / JA) | Target Reader | Writing Style |
|----------|-----------------|---------------|---------------|
| `guide` | Guide / 選び方ガイド | Beginners looking for the right scent | Friendly, practical. Comparison tables, checklists, scan-friendly |
| `science` | Science / 香りの科学 | Curious readers who want the "why" | Research-backed, accessible. Technical terms always explained |
| `story` | Story / 香りの世界 | Readers who enjoy fragrance culture | Editorial, essay-style. History, people, cultural context |

Each article requires a `category` field in its frontmatter (`guide`, `science`, or `story`). The blog index page provides tab-based filtering so readers can choose what interests them.

## Development

```sh
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

## Design

Warm Intellectual theme with amber/gold accents. Cormorant Garamond (serif) for headings, DM Sans for body text. See [docs/design-references.md](docs/design-references.md) for details.

## Architecture

Phase A (current): Astro static site for content and LLMO optimization. Zero Shopify cost.

Phase B (future): Add Shopify Storefront API for e-commerce on the same domain. Triggered when monthly PV reaches 5,000 or diagnosis page users exceed 100/month.

## Related

- [Issue #94](https://github.com/kenimo49/iris-hub/issues/94) — Strategy document
- [persona-manager](https://github.com/kenimo49/persona-manager) — Personality diagnosis engine
