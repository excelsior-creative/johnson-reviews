# design-system.md — Johnson & Co. Dark Editorial

_Source of truth: `reference/design2/Johnson Reviews/` — `styles.css` plus
the four JSX templates in `components/` (home.jsx, pages.jsx, review.jsx,
shell.jsx) and the standalone HTML._

_Status (2026-04-26): in main. Shipped via PR #15 on 2026-04-23
("feat: migrate to dark editorial design system from reference/design2").
This system **supersedes** Gilded Legacy (reference
`stitch_johnson_reviews_discovery/`)._

This doc is the shared reference so future-you doesn't re-parse the
reference each night. If Brandon updates the reference or gives new
direction, capture the change here and note the supersession.

---

## North Star

**"Dark editorial — Johnson & Co."** A warm, deep, ink-and-bourbon
canvas with a single warm-gold accent. The interface reads like a
weekly editorial publication, not a Michelin critic site and not a
stock travel blog. UI serves photography. Type does most of the work.

> Note: the reference's *creative system* is law per Brandon's
> instruction. The reference's *placeholder copy* is **not** law.
> Voice always wins. See `/ceo/voice.md`.

## Color tokens

Implementation is in `apps/app/src/app/globals.css`
(`@theme` block + `@layer base` HSL shims for legacy
`hsl(var(--xxx))` consumers).

| Token                      | Hex       | Usage                                                |
|----------------------------|-----------|------------------------------------------------------|
| `--color-bg`               | `#0f0d0b` | Page base ("ink-bourbon")                            |
| `--color-bg-raised`        | `#1a1613` | Subtle band / press strip                            |
| `--color-bg-card`          | `#221c17` | Cards, panels, popover                               |
| `--color-bg-elev`          | `#2a221b` | Highest-elevation surface                            |
| `--color-ink`              | `#ece4d3` | Body text, headings                                  |
| `--color-ink-dim`          | `#a89d89` | Italic deck, secondary copy                          |
| `--color-ink-mute`         | `#6b6355` | Mono meta, ghosted text                              |
| `--color-rule`             | `#2e251d` | Hairline rules, default border                       |
| `--color-rule-strong`      | `#3d3125` | Stronger borders, raised dividers                    |
| `--color-accent`           | `#c9a961` | Warm gold — primary accent                           |
| `--color-accent-warm`      | `#d4b97a` | Lighter warm gold — secondary text, button hover     |
| `--color-accent-deep`      | `#8c7340` | Deeper gold — pressed CTA, signature                 |
| `--color-danger`           | `#a84630` | Errors, destructive                                  |

**Tailwind/shadcn semantic aliases** (also in `@theme`) point at the
editorial palette: `--color-background`, `--color-foreground`,
`--color-primary`, `--color-card`, `--color-muted`, etc.

**No pure white.** Always `#ece4d3`. **No pure black on text.** Always
on the bourbon ink.

**Selection style:** `::selection { background: var(--accent); color: var(--bg); }`.

## Typography

| Style        | Font                | Spec                                    | Usage                                          |
|--------------|---------------------|-----------------------------------------|------------------------------------------------|
| Display      | Playfair Display    | weight 500, tracking -0.02em, lh 0.98   | `.display` — hero, page titles, restaurant names |
| Display ital | Playfair Display    | italic, weight 400                      | `.display-italic` — accent words, secondary    |
| Prose        | Playfair Display    | 19px, lh 1.65                           | `.prose` — long-form review copy               |
| Drop cap     | Playfair Display    | 600 weight, 5.2em, gold                 | `.prose p.drop-cap::first-letter`              |
| Eyebrow      | JetBrains Mono      | 11px, tracking 0.22em, uppercase, dim   | `.eyebrow` — section eyebrows                  |
| Meta         | JetBrains Mono      | 11px, tracking 0.14em, uppercase, mute  | `.meta` — bylines, dates                       |
| Kicker       | JetBrains Mono      | 10px, tracking 0.3em, uppercase, gold   | `.kicker` — section caps in accent color       |
| Sans body    | Inter               | 15px, lh 1.5                            | Default body / nav                             |
| Signature    | Caveat              | script                                  | `.signature` — Brandon's hand-style sign-off   |

The four type families are all loaded via the Google Fonts `@import`
at the top of `globals.css`: Playfair Display, Inter, JetBrains Mono,
Caveat.

Italic Playfair (`.display-italic`) is the secondary editorial voice —
used for accent words inside display headlines (e.g. "Real visits.
*Honest reviews.*") and for italic-deck secondary copy.

## Layout

- `--max-w: 1440px` container width
- `--gutter: clamp(20px, 4vw, 64px)` responsive horizontal padding
- `.container` and `.container-jr` wrap content at this width
- Section spacing typically `padding: 100px 0` to `120px 0`; hero is
  `60px 0 100px`; method/quote bands use `100px 0` with top+bottom
  rules.

## Geometry

- **Zero rounded corners** (`border-radius: 0` everywhere). Sharp lines.
- Hairline rules (`.rule`, `border-bottom: 1px solid var(--color-rule)`)
  for sectioning. The "no-line rule" of Gilded Legacy is **superseded**
  — the new system uses thin hairlines liberally as editorial structure.
- Forbidden: traditional drop shadows.
- Allowed: subtle ambient on cards. The system mostly uses background-
  shift for elevation.
- Glass nav: `rgba(15, 13, 11, 0.88)` + `backdrop-filter: blur(12px)`
  on the sticky `.nav`.

## Motion

All motion uses one ease: `cubic-bezier(0.22, 1, 0.36, 1)`.

GPU-only properties (transform, opacity). Available helpers:
- `.rise`, `.rise-1`, `.rise-2`, `.rise-3`, `.rise-4` — staggered
  rise-in entrance, increasing delay
- `.page-body` — top-level fade-in
- `.ken-burns` — slow zoom on hero photography
- `.fade-in` — generic fade-in
- `.photo` with hover zoom — image card zooms 1.04x on hover

Honors `prefers-reduced-motion: reduce` globally — animations
collapse to a static end state.

`focus-visible`: outline-only, 3px offset, no layout shift.

## Components inventory (current state in `apps/app/src/components`)

| Component         | Status       | Notes                                                  |
|-------------------|--------------|--------------------------------------------------------|
| `Hero`            | ✅ shipped   | Editorial split, ScoreDisc verdict, ken-burns photo. ⚠️ Hero photo still at `brandonj117.sg-host.com`. |
| `Navbar`          | ✅ shipped   | Issue bar + sticky 3-col grid + center wordmark + glass backdrop + mobile drawer. |
| `Footer`          | ✅ shipped   | 4-col editorial grid (brand / Sections / Publication / Follow). |
| `Wordmark`        | ✅ new       | Standalone wordmark component for nav + footer.        |
| `ScoreDisc`       | ✅ new       | Sm/md/lg score-disc with score + "Out of 10" label.    |
| `PageHeader`      | ✅ new       | Reused on every secondary page (Reviews, Blog, About, Contact). |
| `NewsletterInline`| ✅ new       | Full-width Dispatch newsletter band.                   |
| `Hero`            | ✅           |                                                        |
| `AsSeenIn`        | ✅ shipped   | ⚠️ Logos still externally hosted at sg-host.com (fragile). |
| `CategoryGrid`    | ✅ shipped   | 4-col atlas, hairline rules, hover background.         |
| `FeaturedReviews` | ✅ shipped   | Editorial section header + kicker + ghost CTA.         |
| `BlogSection`     | ✅ shipped   |                                                        |
| `QuickStats`      | ✅ shipped   | Serif accent counters, ease-out-cubic, IO-triggered.   |
| `PostCard`        | ✅ shipped   | Photo-first, category, serif title, italic blurb.      |
| `ReviewCard`      | ✅ shipped   | Same shape as PostCard; horizontal variant for featured. |
| `PhotoGallery`    | ✅           | Editorial gallery grid on review detail.               |
| `LexicalContent`  | ✅ shipped   | Prose 19/1.7, headings → `.display`, blockquote → display-italic with thin gold rule. |
| `SearchDialog`    | ✅           |                                                        |
| `ContactDialog`   | ✅           |                                                        |
| `ContactForm`     | ✅ shipped   | Underline-only fields, mono labels, primary CTA + arrow. |
| `SubscribeForm`   | ✅           | Newsletter form (verify provider; backlog).            |
| `SectionReveal`   | ✅           | Wraps sections, dispatches `rise` entrance.            |
| `CalculatorSection` / `ServicesSection` | 🟡 dead | Confirmed unused — flagged for deletion. Multiple open PRs (#14, #16, #17) propose deleting both; merge any of them and they're gone. |

## Page templates (current state in `apps/app/src/app/(frontend)/`)

| Page              | Status       | Notes                                                  |
|-------------------|--------------|--------------------------------------------------------|
| `/` (Home)        | ✅ shipped   | Hero → Press strip → The Latest → On Method quote → Atlas → Featured → Newsletter → Stats → Archive CTA. |
| `/blog` (list)    | ✅ shipped   | Rebuilt on PageHeader + editorial structure.           |
| `/blog/[slug]`    | ✅ shipped   | Full-bleed hero w/ ken-burns, meta bar, drop cap, pull quote, gallery, Particulars panel, signature, related grid, Dispatch. ⚠️ JSON-LD schema not yet wired in main (multiple open PRs propose adding it). |
| `/reviews` (list) | ✅ shipped   | PageHeader + stats + sticky rating filter strip + Editor's Pick + 3-col grid. |
| `/reviews/[slug]` | ✅ shipped   | Same editorial frame as blog detail.                   |
| `/about`          | ✅ shipped   | Rebuilt on tokens + PageHeader. ⚠️ Multiple open PRs propose copy fixes (Unsplash placeholder portrait, fabricated "Johnson & Co." brand string). |
| `/contact`        | ✅ shipped   | Rebuilt.                                               |
| `/privacy`        | ✅ shipped   | Token migration only.                                  |
| `/terms`          | ✅ shipped   | Token migration only.                                  |
| `/404`            | ⬜           | Not yet designed.                                      |
| `/loading`        | ⬜           | Not yet designed.                                      |
| `/category/[slug]`| ⬜           | Hub page not yet built.                                |
| `/location/[slug]`| ⬜           | Hub page not yet built.                                |

## Reusable utility classes (in globals.css)

- `.btn`, `.btn-primary`, `.btn-ghost` — three button styles
- `.arrow` — animated arrow affordance for CTAs (`→` slides on hover)
- `.score-disc` (`.sm` / `.md` / `.lg`) — circular numeric verdict
- `.tag` — small uppercase mono tag chip
- `.photo` — image frame with optional `.ken-burns` or hover-zoom
- `.nav-jr`, `.wordmark`, `.footer-jr` — composed page-shell elements
- `.review-card`, `.index-row` — list/grid items
- `.signature` — script-font sign-off (Caveat)
- `.field-line` — underline-only form field
- `.kicker`, `.eyebrow`, `.meta`, `.display`, `.display-italic`,
  `.prose` — typography primitives

## Gaps in the reference (still open)

The reference doesn't show:
- **404 / 5xx** page treatment
- **Loading** state
- **Empty states** (no posts, no search results, no related reviews)
- **Mobile breakpoints** beyond what's implied (system handles 860px
  hero stack inline)
- **Tablet** intermediate breakpoint
- **Category hub** page
- **Location hub** page (high-priority — Dana Point is the proof of
  concept per `/ceo/roadmap.md`)
- **Tag page** layout
- **Pagination** (review list and blog)

Decision pending: implement these in the spirit of the editorial
system without explicit reference, queue as questions for Brandon
when significant. Brandon's instruction stands: visual direction is
his, not the agent's. Implementation polish + mobile + a11y is the
agent's.

## Supersession history

- **2026-04-23 (PR #15)**: replaced Gilded Legacy with Johnson & Co.
  dark editorial. Reference moved from
  `stitch_johnson_reviews_discovery/` to `design2/Johnson Reviews/`.
  Old reference is preserved in the repo but is no longer the source
  of truth.
- **2026-04-20**: initial Gilded Legacy capture (now superseded).

If Brandon wants the Gilded Legacy palette back, the file at
`reference/stitch_johnson_reviews_discovery/gilded_legacy/DESIGN.md`
still has the spec. Treat as historical until that direction returns.
