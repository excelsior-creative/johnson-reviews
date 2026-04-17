# Design system — "Gilded Legacy" implementation notes

Source of truth: `reference/stitch_johnson_reviews_discovery/`
(read-only). This doc captures the implementation-side translation
into the Next.js + Tailwind 4 codebase so future-you doesn't have to
re-parse the reference HTML every night.

## North star

> The Digital Maître d'.

Editorial, asymmetric, photography-first, near-black canvas with
gold accents. No 1px section dividers — separate by background tone.
Sharp 0px corners (except `rounded-full` for chips/avatars). No
pure white text — use `#e5e2e1` ("muted parchment").

The design is luxe; the **content voice is family-warm** (see
`voice.md`). Don't let the design's snob-aesthetic pull copy into
fine-dining-critic mode.

## Color tokens (live in `apps/app/src/app/globals.css`)

```
background                #131313   # near-black canvas
on-surface                #e5e2e1   # primary text (NEVER pure white)
primary                   #f2ca50   # signature gold
primary-container         #d4af37   # darker gold for gradients/CTAs
on-primary                #3c2f00   # ink-on-gold
surface-container         #20201f   # raised cards
surface-container-low     #1c1b1b   # subtle "sunken" sections
surface-container-high    #2a2a2a   # elevated (hover) cards
surface-container-highest #353535   # chips, glass-panel base
outline                   #99907c   # muted gold-grey outlines
outline-variant           #4d4635   # ghost borders (use at low opacity)
secondary                 #d3c5ad   # champagne body accent
secondary-fixed-dim       #d3c5ad   # italicized secondary copy
```

shadcn/Payload compatibility shims (`--background`, `--foreground`,
`hsl(var(--xxx))`) are mapped to the same palette in `:root`.

## Typography

- **Display / headline / body:** `Noto Serif` (`font-headline`,
  `font-body`).
- **Labels, micro-copy, navigation:** `Inter` (`font-label`).
- **Italic body:** Noto Serif italic for pull-quotes and lede italics.
- **Caps labels:** `font-label`, `text-[10px]`,
  `tracking-[0.4em]`, `uppercase`. Used everywhere there's a kicker
  ("Featured Critique," "Curated Excellence," "01 / San Sebastián").

Type scale (live):
- Hero title: `clamp(3rem, 8vw, 7rem)`, `leading-[0.9]`, tracking-tighter.
- Section headline: `text-4xl md:text-5xl`, font-headline, bold.
- Card title: `text-2xl` font-headline bold.
- Body: `text-xl leading-relaxed`.
- Verdict / metadata: `text-sm` Inter, `tracking-widest`.

## Layout primitives

- **Page max-width:** `max-w-[1440px]` (cards / grids),
  `max-w-[1920px]` (full-bleed sections in the reference). Currently
  inconsistent on the site — should converge.
- **Section vertical rhythm:** `py-32` for major editorial sections.
  `py-20` for utility sections.
- **Gutters:** `px-12` desktop, `px-8` mobile.
- **No 1px section dividers.** Use background-tone shifts:
  `surface` → `surface-container-low` → `surface-container-lowest`
  to layer adjacent sections.

## Component inventory (current)

Implemented (dark-luxury pass done in commit `ef6a87a`):
- `Navbar` — fixed glass-panel, gold logo, Inter caps nav.
- `Hero` — full-bleed photo, gradient ink overlay, gold kicker,
  serif headline, gilded gradient CTA + ghost-bordered secondary.
- `Footer` — 4-column dark, gold logo + subscribe form area.
- `ReviewCard` — grayscale → color hover, serif title, gold star
  rating, Inter labels.
- `BlogSection`, `FeaturedReviews`, `CategoryGrid`, `QuickStats`,
  `AsSeenIn` — dark backgrounds + serif headings.

Implemented but **still using legacy palette** (fix in flight
tonight):
- `apps/app/src/components/SubscribeForm.tsx` — orange
  `#DB7D2D` button, `Jost` / `Oswald` fonts.
- `apps/app/src/components/LexicalContent.tsx` — orange list
  markers + blockquote borders.
- `apps/app/src/app/(frontend)/reviews/page.tsx` — orange filter
  pills + `Jost` font.
- `apps/app/src/app/(frontend)/reviews/[slug]/page.tsx` — orange
  stars + `Oswald` headings + `Jost` body + `Unna` date pill.

Not yet implemented (gaps vs. reference):
- **Discovery page** — sidebar filters + bento card grid with the
  asymmetric featured "Critic's Choice" card. Reference:
  `johnson_reviews_discovery_gold_edition`. Probably maps onto
  `/reviews` long-term.
- **Editor's Choice / "Verdict" block** — drop-cap intro
  paragraph, scored sub-categories with hairline progress bars,
  sticky "Concierge" sidebar (address, price tier, hours, cuisine,
  reservation CTA, map preview). Reference:
  `johnson_reviews_review_detail_gold_edition`. Maps onto the
  `/reviews/[slug]` template.
- **Sommelier Badge chips** — `surface-container-highest` bg,
  Inter `text-[8px]` caps, gold or champagne fill. Used for tags
  on cards. Currently we have plain text categories.
- **Map preview tile** — grayscale opacity-40 map with gold
  pinpoints. Useful on review detail + city hub pages.
- **City / category hub pages** — the reference doesn't show one,
  but we'll need them. Treat as a category-of-cards page with a
  hero + filtered grid.
- **About page** — currently exists but hasn't been audited for
  voice or layout.

## Signature treatments to preserve

- `.gilded-gradient` — `linear-gradient(135deg, #f2ca50 0%, #d4af37
  100%)`. Primary CTAs only.
- `.glass-panel` — `rgba(53,53,53,0.6)` + `backdrop-blur(20px)`.
  Navbar + floating chips.
- `.drop-cap` — Noto Serif 5rem first letter, gold. Use on review
  ledes.
- `.grayscale-hover` — image desaturates by default, returns to
  color on group hover. Already wired into ReviewCard.
- `.gold-divider` — `50px × 2px` gilded gradient line. Use as
  tasteful section underlines (not 1px borders).

## Forbidden

- 1px solid section dividers.
- Rounded corners (except chip pills + avatars).
- Pure `#FFFFFF` text on dark backgrounds — always `#e5e2e1`.
- Dropshadows with high opacity. If shadow needed: `48px` blur,
  6% opacity, tinted `on-surface`.
- The legacy WordPress orange `#DB7D2D` and the `Jost` / `Oswald` /
  `Unna` font families. Anywhere these appear is a bug.

## Open ambiguities (queued for Brandon)

- The reference doesn't show empty / loading / error states for
  any list or detail view. Defaulting to "show empty grid +
  on-brand placeholder text" for now.
- The reference is desktop-first; mobile breakpoints below 768px
  are inferred. Tablet (768–1024px) is mostly "treat as small
  desktop." Worth a manual review pass once main pages are
  faithful.
- Scoring system: the review detail reference shows numeric
  sub-scores ("Gastronomy 9.8 / Ambience 9.5 / Service 10.0"). The
  current Reviews collection only stores a 1–5 star rating. Either
  we adopt sub-scores in the schema, or we scale the design back
  to a single rating. Brandon should decide.
- Reservation / address CTA: the reference shows a "Reserve Table"
  CTA. We don't have OpenTable / Resy integration. For now, link
  out to the establishment's site or Google Maps.
