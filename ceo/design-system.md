# Design System — "Gilded Legacy"

Distilled from `/reference/design/gilded_legacy/DESIGN.md` and the
three code+screenshot references (home, discovery, review detail) at
`/reference/design/johnson_reviews_*_gold_edition/`.

This is the shared reference. Read this instead of re-parsing the HTML
every night.

## 1. North star

**"The Digital Maître d'"** — invisible yet authoritative. Guides
without shouting. Negative space, deliberate asymmetry, typographic
scale as authority signal.

## 2. Color tokens (dark, ink-based)

| Token | Hex | Use |
|---|---|---|
| `background` / `surface` / `surface-dim` | `#131313` | page bg |
| `surface-container-lowest` | `#0e0e0e` | sunken zones |
| `surface-container-low` | `#1c1b1b` | cards, secondary panels |
| `surface-container` | `#20201f` | primary card body |
| `surface-container-high` | `#2a2a2a` | raised controls |
| `surface-container-highest` | `#353535` | top-most floating |
| `surface-variant` | `#353535` | glass base |
| `surface-bright` | `#393939` | — |
| `primary` | `#f2ca50` | gold accent (text, icons) |
| `primary-container` | `#d4af37` | gilded fill (gradients) |
| `primary-fixed` | `#ffe088` | bright gilded |
| `primary-fixed-dim` | `#e9c349` | dim gilded |
| `on-primary` | `#3c2f00` | text on gold |
| `on-surface` / `on-background` | `#e5e2e1` | body text (NOT pure white) |
| `secondary` / `secondary-fixed-dim` | `#d3c5ad` | champagne accents |
| `secondary-container` | `#524835` | — |
| `outline` | `#99907c` | — |
| `outline-variant` | `#4d4635` | "ghost borders" only |

**Rules.**
- No 1px solid borders for sectioning. Achieve definition via surface
  shifts. Borders allowed only as "ghost" outlines at low opacity or
  on-focus.
- No pure white. Body text = `#e5e2e1`.
- Gilded gradient for emphasis: `linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)`.
- Glass panel for nav/modals: `background: rgba(53,53,53,0.6)` +
  `backdrop-filter: blur(20px)`.

## 3. Type

- **Display / Headline / Body:** Noto Serif (400, 700, 400-italic).
- **Label / UI utility:** Inter (400, 500, 600).
- **Scale.**
  - `display-lg` — 3.5–5.5rem, tight tracking (-0.02em), for hero + page titles.
  - `headline-lg` — 3rem, serif bold, for section heads.
  - `headline-md` — 1.75–2rem, for review heads.
  - `headline-sm` — 1.25rem, for card titles.
  - `body-lg` — 1.125rem / 1.25rem, serif, line-height 1.6–1.7, for long form.
  - `body` — 1rem serif.
  - `label-md` — Inter, 0.75rem, uppercase, tracking 0.15–0.2em.
  - `label-sm` — Inter, 0.625–0.7rem, uppercase, tracking 0.2–0.4em.
- **Drop cap** on long-form lead paragraph: 5rem Noto Serif bold,
  float-left, color `primary-container`.

## 4. Elevation & depth

- Ambient glow only: `box-shadow: 0 48px 100px rgba(0,0,0,0.3)` for
  cards; `0 4px 48px rgba(229,226,225,0.06)` for nav glass.
- Corners: **`border-radius: 0`** everywhere except full-round for
  avatars/pills.
- Underline-only inputs (`border-b outline-variant`; focus →
  `border-b-primary`).

## 5. Spacing rhythm

- Major section vertical spacing: `py-24` / `py-32` (6rem / 8rem).
- Container max widths: `1440px` for content, `1920px` for
  full-bleed header/footer.
- Review-card list: separate by `16` (5.5rem) vertical spacing — no
  dividers.

## 6. Component inventory

### Navigation (top bar)

- Fixed, full-width, z-50.
- Glass panel: `rgba(19,19,19,0.6)` + backdrop-blur + faint
  border-bottom.
- Brand wordmark: Noto Serif bold, `text-3xl`, primary gold,
  `tracking-tighter`.
- Nav links: **Noto Serif**, `text-lg`, tracking wide, hover → gold.
  (Current site uses Inter caps — reference uses serif. Reconcile.)
- Right actions: subtle search input (border-b only) + notifications
  bell + small avatar in a square frame.

### Hero (page-top)

- `min-h-[800px]`, `h-screen`-feel.
- Full-bleed image with dual gradient overlay (left→right dark fade,
  bottom→top dark fade to blend into page).
- Content: eyebrow label (tracking 0.3em, Inter caps, gold) with a 12px
  gold rule; giant serif headline (5.5rem on desktop, tight leading);
  italic serif subcopy; two buttons (gilded-gradient primary + ghost
  outline secondary).

### Buttons

- **Primary (Gilded):** gilded-gradient bg, `on-primary` text, Inter
  bold uppercase tracking 0.2–0.3em, generous padding, no radius.
  Hover: `translate-y(-2px/-4px)` + subtle shadow.
- **Secondary (Ghost):** transparent, 1px primary-soft border, primary
  text, uppercase label. Hover: surface-container-high bg.

### Cards (review / destination)

- `bg-surface-container-low`, no radius, grayscale image that color-
  reveals on hover + scales to 105–110%.
- Meta row above title (eyebrow gold "Featured" / category, 1px rule,
  small gray date).
- Title: Noto Serif bold, `text-2xl–3xl`, `color: on-surface`.
- Excerpt: italic serif, `color: on-surface/55%`.
- Overlay "Critic's Choice" pill — surface box, left border
  `border-l-4 primary`.

### Chips ("Sommelier Badge")

- `bg-surface-container-highest`, no radius, Inter label 0.625–0.7rem
  uppercase, tracking widest, `color: secondary`.
- For restaurant tags: location, cuisine, amenity.
- In our context, adapt for: category, price tier, kid-friendly flag,
  reservations-recommended.

### Rating / score component

- Large Noto Serif primary-gold numeric (e.g., `9.8`).
- Sub-bar: 2px track `outline-variant`, fill `primary-container`, pct
  width.
- Label row: Inter label caps for metric name, numeric right-aligned.
- Metrics we'll use (adapted for family-travel lens, NOT the
  reference's Gastronomy/Wine):
  - **Food** / **Experience** (Places that aren't restaurants)
  - **Value**
  - **Kid-Friendly**
  - **Service** (optional)
  - **Vibe / Ambience** (optional)

### Sidebar ("Concierge")

- `bg-surface-container`, `p-10`, shadow `0 48px 100px rgba(0,0,0,0.3)`.
- Header: "Concierge" / "The Details" — Noto Serif bold `text-2xl`.
- Rows: material-style icon (gold) + label-caps eyebrow + body value.
- Fields: Address, Price Tier, Hours, Category / Cuisine.
- Terminal CTA: gilded-gradient full-width button.

### Footer

- `bg-surface-container-lowest`, thick vertical padding.
- Brand block + navigation column(s) + newsletter capture.
- Bottom bar: copyright + terms/privacy + tiny tagline.

## 7. Page templates — implementation checklist

### Home page (`/`)

**Reference:** `johnson_reviews_home_gold_edition/`.

- [x] Nav bar (glass, dark, gold brand) — **built**.
- [x] Hero (dark image, gold eyebrow, giant serif headline) —
      **built** (copy needs voice pass).
- [x] Editor's Choice / Featured Reviews asymmetric bento —
      **built** (`FeaturedReviews.tsx`).
- [x] Category grid — **built** (needs image migration off
      `brandonj117.sg-host.com`).
- [ ] Trending Destinations numbered 4-column (01–04, locations,
      short italic copy, "View Guide →") — **missing**.
- [ ] "Join the Private Collection" / sommelier badge feature
      section — **missing** (and tonally questionable for
      family-travel; likely convert to "Join the Newsletter").
- [x] Footer — **built** (copy needs voice pass).

### Discovery page (`/blog` or `/reviews`)

**Reference:** `johnson_reviews_discovery_gold_edition/`.

- [ ] Hero search ("The Search For Perfection" + underline input) —
      our version should be "Find your next spot" or similar in
      Brandon voice.
- [ ] 3-col filter sidebar (cuisine-architecture → **category**;
      experience-tiers → **price tier**; map preview).
- [ ] 9-col main content: featured full-row card + 2-col bento.
- [ ] Category chips under cards.
- [ ] Currently `/blog/page.tsx` uses generic header, not this.

### Review detail page (`/blog/[slug]`)

**Reference:** `johnson_reviews_review_detail_gold_edition/`.

- [ ] Hero: full-bleed image `h-[870px]`, grayscale 20% + brightness
      0.4, eyebrow pills (rating / location), giant serif title,
      italic tagline. **Working on Night 1.**
- [ ] Two-col layout: 8-col narrative + 4-col Concierge sidebar.
- [ ] Drop-cap lead paragraph, `body-lg` serif with generous leading.
- [ ] Inline 2-col image gallery fragment (one offset by `mt-12`
      for "designed" staggered look).
- [ ] "The Verdict" ratings panel (4 metrics, filled bars).
- [ ] Concierge sidebar sticky, Address / Price / Hours / Category,
      CTA button (ours: "Visit the Restaurant" / "See Their Site" /
      "Get Directions").
- [ ] Currently `apps/app/src/app/(frontend)/blog/[slug]/page.tsx`
      uses a generic `max-w-4xl prose` layout with a rounded image
      — does NOT match. **Fixing Night 1.**

## 8. Ambiguities + gaps flagged

1. **Voice vs. visuals.** Reference copy is haute-cuisine-critic, not
   Brandon. Assume visuals follow reference; copy stays Brandon.
2. **Navbar item count.** Reference 3, current 6. Ask.
3. **Rating scale.** Reference uses `/10` with one-decimal
   (9.8 / 9.4 / 9.1). Brandon's Reviews collection uses `/5` integers.
   Two options: (a) keep `/5` on Reviews collection, present as stars,
   and use `/10` score visually only on long-form Posts; or (b)
   migrate Reviews to `/10`. Ask Brandon.
4. **"Sommelier Badge" / "Gastronomy" / "Wine Program" metric
   labels.** Must adapt to family-travel (Food / Experience / Value
   / Kid-Friendly).
5. **State coverage.** Reference shows no empty / loading / error /
   mobile-nav-open / form-error states. Build from first principles
   when the need arises, keeping the token system.
6. **Page types not referenced.** About page, Contact page, 404,
   Privacy/Terms, category hub, location hub, search results — all
   need design decisions using the same token system.

## 9. Where the tokens live in code

- `apps/app/src/app/globals.css` — CSS custom properties under
  `@theme` + legacy shims. Already aligned with the reference palette.
- No central `tokens.ts` — consider extracting if theme diverges.
