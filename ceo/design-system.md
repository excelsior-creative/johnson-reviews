# design-system.md — Gilded Legacy (captured from `/reference/`)

> ⚠️ **2026-04-25 status:** PR #15 merged on 2026-04-23 ("feat: migrate
> to dark editorial design system from reference/design2"). There are
> now **three** design folders in `reference/`:
> `stitch_johnson_reviews_discovery/` (the original Gilded Legacy that
> this doc captures), `design/`, and `design2/`. The live components
> currently reflect the design2 merge. **Open question:** is design2
> the new canonical target? If yes, this doc needs a full rewrite to
> reflect design2's tokens, type scale, and components. INBOX #11.
> Until Brandon confirms, the contents below describe Gilded Legacy
> as the captured reference, not necessarily the live state.

---


Source of truth: `reference/stitch_johnson_reviews_discovery/gilded_legacy/DESIGN.md`
plus three page-template HTML files (home, discovery, review_detail).

This doc is the **shared reference** so future-you doesn't have to re-parse
the reference each night. If the reference is updated or Brandon gives
new direction, capture the change here and note the supersession.

---

## North Star

**"The Digital Maître d'."** Invisible-yet-authoritative interface, dark
ink-base canvas, gold accents, intentional asymmetry, generous negative
space. The UI serves photography, not the other way around.

> Note (CEO): the reference's *creative system* is law per Brandon's
> instruction. The reference's *placeholder copy* (luxury restaurant
> critic vibes) is **not** law. Voice always wins. See `/ceo/voice.md`.

## Color tokens

Implementation is in `apps/app/src/app/globals.css` (`@theme` block).

| Token                          | Hex       | Usage                                                |
|--------------------------------|-----------|------------------------------------------------------|
| `--color-background`           | `#131313` | Page base ("ink")                                    |
| `--color-on-surface`           | `#e5e2e1` | Body text, headings                                  |
| `--color-primary`              | `#f2ca50` | Gold accent (lighter)                                |
| `--color-primary-container`    | `#d4af37` | Gold accent (darker, for CTAs/gradients)             |
| `--color-on-primary`           | `#3c2f00` | Text on gold buttons                                 |
| `--color-surface-container`    | `#20201f` | Cards / panels                                       |
| `--color-surface-container-low`| `#1c1b1b` | Subtle recessed surfaces                             |
| `--color-surface-container-high`| `#2a2a2a`| Raised surfaces                                      |
| `--color-surface-container-highest`| `#353535`| "Closest to user" surfaces (chips, sommelier badge) |
| `--color-outline`              | `#99907c` | Mid-tone border / metadata text                      |
| `--color-outline-variant`      | `#4d4635` | Faint borders / "ghost border" at 15% opacity        |
| `--color-secondary`            | `#d3c5ad` | Champagne accent (secondary text, italics)           |
| `--color-secondary-fixed-dim`  | `#d3c5ad` | Same — alias                                         |

**Signature gradient:** `linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)`
exposed as `.gilded-gradient`. Use on primary CTAs and featured ratings.

**No-Line Rule:** no 1px solid borders for sectioning. Definition by
background shifts only. Exception (already in CategoryGrid): an editorial
plate of bordered cells is acceptable when it's an explicit grid system,
not a divider.

**No pure white.** Always `#e5e2e1`.

## Typography

| Style        | Font        | Size                                | Notes                                     |
|--------------|-------------|-------------------------------------|-------------------------------------------|
| Display LG   | Noto Serif  | clamp(3rem, 8vw, 5.5rem), tracking-tighter | Hero headlines, restaurant names |
| Headline MD  | Noto Serif  | 1.75rem                             | Review headings                           |
| Body LG      | Noto Serif  | 1rem, line-height 1.6               | Long-form review copy                     |
| Label MD     | Inter       | 0.75rem, uppercase, tracking 0.2em+ | Metadata, eyebrow labels                  |
| Label SM     | Inter       | 0.625rem, uppercase, tracking 0.3em | Tags, "view guide" links                  |

Italic Noto Serif is the secondary voice — used for editorial
quotations, taglines, secondary descriptions.

## Spacing

- Sections: `py-24 md:py-32` (i.e. ~6–8rem vertical)
- Container: `max-w-[1440px] mx-auto px-6 md:px-12`
- Hero: `min-h-screen` with internal padding `px-8 md:px-24 max-w-5xl`
- Stack between major editorial sections: 7rem+ (the `20` token from
  reference)

## Elevation & shadow

- Zero rounded corners (`border-radius: 0`). Sharp lines = legacy
  prestige.
- Forbidden: traditional drop shadows.
- Allowed: ambient glow — `0 48px 100px rgba(0,0,0,0.3)` or
  ambient on `#e5e2e1` at 6%.
- Glass panel: `rgba(53,53,53,0.6)` + `backdrop-filter: blur(20px)`.
  Implemented as `.glass-panel`.

## Components inventory (current state in `apps/app/src/components`)

| Component         | Status       | Notes                                                  |
|-------------------|--------------|--------------------------------------------------------|
| `Hero`            | ✅ visual    | ⚠️ copy is luxury-critic placeholder. CEO patch.       |
| `Navbar`          | ✅ visual    | Glass blur, gold brand mark. Mobile menu working.      |
| `Footer`          | ✅ visual    | Need to verify links, social icons                     |
| `AsSeenIn`        | ✅           | Logos: Google Local Guides, OpenTable, Yelp            |
| `CategoryGrid`    | ✅ visual    | ⚠️ taglines are luxury-critic placeholder              |
| `FeaturedReviews` | ✅           | ⚠️ section labels off-brand ("Critic's Choice")        |
| `BlogSection`     | ✅           | Latest reviews grid                                    |
| `QuickStats`      | ✅           | ⚠️ section eyebrow "The Sommelier's Ledger" off-brand. Actual stats are real. |
| `PostCard`        | ✅           |                                                        |
| `ReviewCard`      | ✅           |                                                        |
| `PhotoGallery`    | ✅           |                                                        |
| `LexicalContent`  | ✅           |                                                        |
| `SearchDialog`    | ✅           |                                                        |
| `Logo`            | ✅           |                                                        |
| `ContactDialog`   | ✅           |                                                        |
| `AboutSection`    | ✅           |                                                        |
| `CalculatorSection`| ?           | Unclear what this does in a reviews site               |
| `ServicesSection` | ?            | Unclear what this does in a reviews site               |
| `SubscribeForm`   | ✅           | Newsletter form (no provider wired? to verify)         |

## Page templates from reference

1. **Home** (`johnson_reviews_home_gold_edition`) — fixed glass nav,
   full-bleed hero, "Editor's Choice" bento grid (8/4 split), "Trending
   Destinations" 4-up bordered grid, "Inner Circle" CTA split, footer.
   ✅ implemented in `(frontend)/page.tsx`.
2. **Discovery** (`johnson_reviews_discovery_gold_edition`) — to be
   reviewed and mapped to a "browse all reviews" page. Likely powers a
   `/reviews` or `/blog` index.
3. **Review detail** (`johnson_reviews_review_detail_gold_edition`) —
   to be reviewed and mapped to `/blog/[slug]` and `/reviews/[slug]`.

## Gaps in the reference (queue as Brandon questions)

The reference doesn't show:
- **Empty states** (no posts, no search results)
- **Error states** (404, 500)
- **Loading states**
- **Mobile breakpoints** beyond what's implied
- **Tablet breakpoint** — viewport between 768 and 1024
- **Category hub page** (e.g. /blog?category=restaurants landing
  experience — does it look like Discovery? A subset?)
- **Location hub page** (e.g. /location/dana-point-ca)
- **About page** layout
- **Tag page** layout
- **Author bio block** — we want this for E-E-A-T (Brandon as the
  authority). Not in reference.
- **Pagination** styling

Decision pending: implement these in the spirit of Gilded Legacy
without explicit reference, queue as questions for Brandon. **First
priority: empty / 404 / loading.**

## What's already shipped vs. what to do

Shipped (PR #10):
- Tailwind theme tokens
- All major component visuals
- Home page composition

To do (advanced through nightly runs):
- Replace placeholder luxury-critic copy site-wide (started 2026-04-20)
- Discovery page mapping (`/blog` index)
- Review-detail polish + schema
- Empty / error / 404 states
- Author bio block
- Category & location hub pages
- Mobile pass: verify everything on 375 / 414 / 768 widths
- Performance audit: image sizing, font loading, Lighthouse pass
