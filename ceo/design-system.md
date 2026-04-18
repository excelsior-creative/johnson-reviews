# Design System — "Gilded Legacy" / The Digital Maître d'

Source of truth: `reference/stitch_johnson_reviews_discovery/`.
Distilled here so future-CEO doesn't re-parse the HTML every
night. When reference and this file conflict, reference wins
unless Brandon has explicitly superseded.

## North star

**"The Digital Maître d'"** — invisible but authoritative, like
a concierge. Editorial prestige, not startup-SaaS. Staged
asymmetry over rigid grids. Photography leads; UI supports.

**Brand caveat:** We adopt the *visual language* only. The
reference HTML uses Michelin-critic copy which is **off-brand**
for Johnson Reviews. See `voice.md`.

## Tokens

### Colors

Already shipped in `apps/app/src/app/globals.css` via Tailwind
v4 `@theme`.

| Token                           | Hex       | Role                                  |
| ------------------------------- | --------- | ------------------------------------- |
| `background` / `surface` / `surface-dim` | `#131313` | Page ground                 |
| `surface-container-lowest`      | `#0e0e0e` | Deepest recess                        |
| `surface-container-low`         | `#1c1b1b` | Article cards / review cards          |
| `surface-container`             | `#20201f` | Nested cards                          |
| `surface-container-high`        | `#2a2a2a` | Filter pills / raised blocks          |
| `surface-container-highest`     | `#353535` | Sommelier/tag chips, map containers   |
| `surface-bright`                | `#393939` | Brightest neutral layer               |
| `surface-variant`               | `#353535` | Glass panel base                      |
| `primary`                       | `#f2ca50` | Gold accent (headline hover, CTA fg)  |
| `primary-container`             | `#d4af37` | Gilded CTA background, gradient end   |
| `primary-fixed`                 | `#ffe088` | Lightest gold                         |
| `primary-fixed-dim`             | `#e9c349` | Dim gold                              |
| `on-primary`                    | `#3c2f00` | Text on gold                          |
| `on-surface`                    | `#e5e2e1` | Body text (muted white, never `#fff`) |
| `on-surface-variant`            | `#d0c5af` | Secondary text                        |
| `secondary`                     | `#d3c5ad` | Champagne accent                      |
| `secondary-fixed-dim`           | `#d3c5ad` | Italic lead paragraphs                |
| `outline`                       | `#99907c` | Meta text                             |
| `outline-variant`               | `#4d4635` | Borders / dividers (use sparingly)    |
| `error`                         | `#ffb4ab` |                                       |
| `error-container`               | `#93000a` |                                       |

**"No-line" rule**: avoid 1px solid borders for sectioning.
Prefer tonal surface shifts. A divider should be an ambient
shadow or a background-colour change, not a rule.

**"No pure white" rule**: `#e5e2e1` (on-surface) is the lightest
text. Do not use `#fff`.

### Typography

- **Display / Headline**: Noto Serif (700). `font-headline`,
  `font-body`, `font-unna` (legacy alias).
- **Label**: Inter (400/500/600). `font-label`, `font-sans`,
  `font-jost` / `font-oswald` (legacy aliases — migrate away).
- **Italic serif** for pull-quote and lead paragraphs.

Scale (from reference):

| Token       | Size           | Use                                |
| ----------- | -------------- | ---------------------------------- |
| display-lg  | 3.5–8rem       | Hero headlines (responsive clamp)  |
| display-md  | 3–5rem         | Section headlines                  |
| headline-md | 1.75rem (28px) | Review titles in grid              |
| title       | 1.25–1.5rem    | Card titles                        |
| body-lg     | 1rem–1.25rem   | Long-form review copy              |
| body-sm     | 0.875rem       | Meta, sidebar                      |
| label-md    | 0.75rem (12px) | All-caps metadata                  |
| label-sm    | 0.625rem (10px)| Super-compact labels (0.3em track) |

Tracking: label styles use `letter-spacing: 0.2em–0.4em` and
`text-transform: uppercase`. Headlines use
`tracking-tighter`.

Line-height: body is `1.6`; headlines are `0.9–1.1`.

### Radius

**Zero corners.** `--radius-*` is set to 0–0.25rem, buttons and
cards are square. The only rounded element is profile avatar
circles (`full`).

### Elevation

- No drop shadows. Use "ambient glow": blur 48px, 6% opacity,
  tint `#e5e2e1`.
- Glass panel: `rgba(53,53,53,0.6)` + `backdrop-filter:
  blur(20px)`.
- Layering is by tonal shift, not shadow.

### Signature utilities (already in globals.css)

- `.gilded-gradient` — `linear-gradient(135deg, #f2ca50 0%,
  #d4af37 100%)`.
- `.glass-panel` — see above.
- `.drop-cap` — large gold first letter for review lede.
- `.gold-divider` — 50×2px gradient pip used instead of hr.
- `.grayscale-hover` — images are grayscale by default, color
  on hover (on `.group:hover`).
- `.label-caps` — Inter 10px uppercase 0.4em.

## Components

### Nav

Fixed top, glass-panel background, 1px bottom border using
`outline-variant/40`. Logo in Noto Serif gold (tracking
tighter, uppercase in current build). Items in Inter 12px
uppercase 0.15em. Active = gold. (Current build matches.)

### Buttons

- **Primary (gilded)**: `.gilded-gradient` bg, `on-primary`
  text, all-caps Inter 12px, 0.2–0.3em tracking, ~16–20px
  vertical padding, zero radius. Hover: `-2px` translate +
  primary-fixed.
- **Secondary (ghost)**: transparent bg, 1px `outline-variant`
  border (or `outline/40`), primary text, same typographic
  treatment. Hover: border → primary, subtle surface tint bg.
- **Tertiary / link**: inline primary-colored label with
  `trending_flat` icon in Material Symbols.

### Cards

- Base: `surface-container-low` (`#1c1b1b`), zero radius.
- Image: bleed to edges, 16:9 (feature) or portrait (aside),
  grayscale by default, color + scale on hover.
- Title in headline serif overlapping or sitting below the
  image, meta as Inter label above the title.
- Score / rating in primary gold, in headline serif, top-right.
- Tags ("Sommelier Badge" in reference → call them **chips**
  for Johnson Reviews; see below): `surface-container-highest`
  bg, Inter label-xs, 0.2em tracking, zero radius, no border.

### Verdict scorecard

Reference uses bars labelled Gastronomy / Ambience / Service /
Wine Program on a 10 scale. For Johnson Reviews, re-axis as
**Food · Vibe · Service · Kid-friendliness · Value** (5 bars).
Bars = `h-[2px]` on `outline-variant` track with `primary-
container` fill. Still **pending Brandon sign-off** — do not
ship until confirmed. See journal entry 2026-04-18 question
🟡-3.

### Concierge sidebar

Right-column sticky card, `surface-container` background,
deep ambient shadow, Material Symbols icon + label pairs for
address / price tier / hours / cuisine, gilded-gradient
Reserve Table button. For Johnson Reviews the "reserve" action
is probably "Directions" + "See on Google Maps"; placeholder
card component to build once we have geodata per review.

### Hero

Full-viewport (`min-h-[800px]` or `h-screen`), background
image with dual-gradient overlay (left-to-transparent,
bottom-to-background). Kicker label in primary gold, tracked
all-caps Inter. Display headline, italic secondary-fixed-dim
lede paragraph, CTA row.

## Page templates inventory

| Template              | Reference file                                | Status |
| --------------------- | --------------------------------------------- | ------ |
| Home                  | `johnson_reviews_home_gold_edition/code.html` | Aligned-ish. Hero copy drifts toward critic voice; needs voice.md pass. |
| Discovery (reviews index) | `johnson_reviews_discovery_gold_edition/code.html` | **Misaligned** — /reviews still uses orange/Jost/rounded-sm. Fix in first-run PR. |
| Review detail         | `johnson_reviews_review_detail_gold_edition/code.html` | Needs audit. Existing `/reviews/[slug]` component may not match drop-cap + verdict sidebar pattern. |
| Category hub          | _not in reference_                            | Gap. Need to design or ask Brandon. |
| Location hub          | _not in reference_                            | Gap. |
| About                 | _not in reference_                            | Gap. |
| Search results        | _not in reference_                            | Gap. |
| 404 / empty states    | _not in reference_                            | Gap. |
| Mobile viewports      | _not explicitly shown_                        | Implementation owns it; follow the `md:` patterns in code.html. |

## Ambiguities / gaps to queue for Brandon

1. 🟡 Verdict scorecard axes — ok to use *Food / Vibe /
   Service / Kid-friendliness / Value* on a 1–10 scale?
2. 🟡 Hero copy currently carries critic voice ("rigorous
   analysis ... uncompromising palate"). Drop it for something
   in Brandon's voice?
3. 🟡 Nav "Trending" vs. current categories (Restaurants /
   Hotels & Resorts / Shopping / Entertainment / Contact). The
   reference nav is lean (Reviews / Trending / About); current
   nav is category-heavy. Which direction?
4. 🟢 No reference for category pages, location pages, About,
   search, 404, mobile. Who designs these — do I mock them in
   the existing system and send for review, or wait?
5. 🟢 No reference for login / bookmarks flow. The nav shows
   "Sign In" and a bookmark icon; is that a real feature or
   reference ornamentation?

## Do / don't (summary)

**Do.**
- Embrace negative space (use 5–7rem vertical rhythm between
  major sections).
- Grayscale-by-default imagery, color on hover.
- Serif headlines, tight tracking.
- Tonal surface layering for section division.
- Ambient glows instead of drop shadows.

**Don't.**
- Don't add 1px dividers between sections.
- Don't use rounded corners (except avatars + search pills).
- Don't use pure white `#fff`.
- Don't center long-form body text.
- Don't import the reference's Michelin-critic copy verbatim.
