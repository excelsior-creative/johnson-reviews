# design-system.md — Johnson & Co. Dark Editorial

Source of truth: `reference/design2/Johnson Reviews/` — the new dark editorial
reference Timmy shipped in PR #15 (merged 2026-04-23). This **supersedes**
the earlier Gilded Legacy system that was the v0 reference
(`reference/design/gilded_legacy/`). That folder is kept for history only.

Brandon's rule still holds: the reference's creative system is law, but the
reference's placeholder *copy* is not — voice.md always wins.

_Last updated: 2026-04-24 (supersession). Previous version archived in
git history at commit 251f6c0._

---

## North Star

**"Johnson & Co."** — a dark, editorial, print-inspired publication.
Serif-driven, warmer palette than Gilded Legacy (more brown-black ink
than pure black, softer gold). Editorial grid with sticky navigation,
issue bar, mono nav labels, serif footer links, drop caps on article
bodies, small "Brandon J." cursive signature at end of each article.

Tagline sample: *"Reviews worth the trip."*

## Color tokens

Shipped in `apps/app/src/app/globals.css`. (CSS custom properties; both
raw names like `--bg` and `--color-*` aliases are available because
globals.css defines both the reference-parity raw tokens and Tailwind
`@theme` color-* versions.)

| Token (raw)        | Token (Tailwind)             | Hex       | Usage                                         |
|--------------------|------------------------------|-----------|-----------------------------------------------|
| `--bg`             | `--color-bg`                 | `#0f0d0b` | Page base — warm ink                          |
| `--bg-raised`      | `--color-bg-raised`          | `#1a1613` | Nav/footer/meta bar                           |
| `--bg-card`        | `--color-bg-card`            | `#221c17` | Cards / panels                                |
| `--bg-elev`        | `--color-bg-elev`            | `#2a221b` | Raised surfaces                               |
| `--ink`            | `--color-ink`                | `#ece4d3` | Primary text (warm cream)                     |
| `--ink-dim`        | `--color-ink-dim`            | `#a89d89` | Secondary text                                |
| `--ink-mute`       | `--color-ink-mute`           | `#6b6355` | Tertiary / meta text                          |
| `--rule`           | `--color-rule`               | `#2e251d` | Hairline dividers                             |
| `--rule-strong`    | `--color-rule-strong`        | `#3d3125` | Stronger dividers / borders on tags           |
| `--accent`         | `--color-accent`             | `#c9a961` | Primary gold (softer than Gilded Legacy)      |
| `--accent-warm`    | `--color-accent-warm`        | `#d4b97a` | Hover gold                                    |
| `--accent-deep`    | `--color-accent-deep`        | `#8c7340` | Deep gold (accents, drop caps at rest)        |
| `--danger`         | `--color-danger`             | `#a84630` | Error / warning                               |

Signature moves: 1-px hairline rules between sections; thin gold
`::before` rule on tag chips; drop cap uses `--accent`.

## Typography

Four faces — serif, sans, mono, script.

| Role            | Family              | Size / Style                                    |
|-----------------|---------------------|-------------------------------------------------|
| Display         | Playfair Display    | weight 500, letter-spacing -0.02em, line 0.98   |
| Display italic  | Playfair Display    | italic, weight 400                              |
| Prose body      | Playfair Display    | 19px / 1.65                                     |
| Eyebrow         | JetBrains Mono      | 11px, uppercase, tracking 0.22em, `--ink-dim`   |
| Meta            | JetBrains Mono      | 11px, uppercase, tracking 0.14em, `--ink-mute`  |
| Kicker          | JetBrains Mono      | 10px, uppercase, tracking 0.3em, `--accent`     |
| Nav link        | JetBrains Mono      | 11px, uppercase, tracking 0.2em                 |
| Footer links    | Playfair Display    | 17px                                            |
| Signature       | Caveat (cursive)    | 32px, `--accent`, used at end of article body   |

Fallback stack kept: `"Cormorant Garamond","Times New Roman", serif`.

## Layout & spacing

- `--max-w: 1440px`; `.container-jr` wraps at that width with `--gutter`
  of `clamp(20px, 4vw, 64px)`.
- Section rhythm: hero 82vh, content sections typically `padding: 60–100px 0`.
- Footer: `margin-top: 120px; padding: 80px 0 40px`.
- 4-col footer grid `2fr 1fr 1fr 1fr`; collapses to `1fr 1fr` at 860px.

## Component primitives (all in globals.css or `/components`)

### Primitives
- `.display`, `.display-italic`
- `.prose`, `.prose p.drop-cap::first-letter` (5.2em gold drop cap)
- `.eyebrow`, `.meta`, `.kicker`
- `.btn`, `.btn-primary` (solid gold), `.btn-ghost` (borderless)
- `.arrow` (animates +3px on btn hover)
- `.tag` (mono uppercase with gold `::before` rule)
- `.rule` (1px horizontal)
- `.signature` (Caveat cursive)
- `.wordmark` / `.wordmark-sub` (brand lockup with italic `&`)
- `.issue-bar` (thin mono strip above nav)
- `.score-disc` (sm / md / lg — 56 / 84 / 128px circle with score +
  "of 10" label)
- `.photo` (editorial frame with hover zoom)
- `.page-header` (padding 80/60 and bottom hairline)
- `.review-card`, `.review-card .cat`, `.review-card .blurb`

### React components (in `apps/app/src/components/`)
- `Navbar` (Johnson & Co. variant — issue bar + sticky 3-col grid +
  wordmark + mobile drawer)
- `Footer` (4-col editorial grid: brand + Sections + Publication + Follow
  + bottom strip)
- `Hero` (editorial split text/photo, ScoreDisc verdict block,
  staggered rise-in, ken-burns photo)
- `ReviewCard`, `PostCard` (photo-first, with horizontal variant for
  featured placements)
- `CategoryGrid` (4-col atlas)
- `FeaturedReviews`, `BlogSection` (editorial section headers: kicker +
  display title + ghost CTA)
- `AsSeenIn`, `QuickStats`, `PageHeader`, `NewsletterInline`,
  `PhotoGallery`, `ScoreDisc`, `Wordmark`, `SectionReveal`,
  `SubscribeForm`, `ContactForm`, `LexicalContent`

### Removed in 2026-04-24 CEO pass
- `CalculatorSection`, `ServicesSection`, `AboutSection`, `CTASection`,
  `Header` (component, not the Payload global), `Logo` — all were
  Next.js/Payload scaffold leftovers unrelated to a reviews site.

## Animation

- Single ease: `cubic-bezier(0.22, 1, 0.36, 1)`.
- GPU only (transform / opacity).
- `.rise-1..4` staggered entry (0–90ms offsets).
- Page body fade-in 0.4s.
- Ken-burns hero zoom.
- Honors `prefers-reduced-motion`.
- Focus: outline-only, 3px offset, no layout shift.

## Page templates (reference JSX)

- `home.jsx` — hero + press strip + "The Latest" + Method pull-quote +
  Atlas + Also This Month + Dispatch + Stats + Archive CTA.
- `review.jsx` — full-bleed hero + meta bar with score disc + drop-cap
  prose + pull quote + editorial gallery + Particulars panel + signature
  + related grid + dispatch.
- `pages.jsx` — category hub, archive, about, newsletter, location.
- `shell.jsx` — Nav + Footer + TweaksPanel (reference-only dev tool).

## Implementation status (as of 2026-04-24)

| Page                    | Matches reference?   | Notes                                            |
|-------------------------|----------------------|--------------------------------------------------|
| Home `/`                | ✅ Timmy PR #15      |                                                  |
| Reviews list `/reviews` | ✅ PR #15            | Sticky rating filter, Editor's Pick horizontal   |
| Review detail `/reviews/[slug]` | ✅ PR #15     | Tonight: added Review + Breadcrumb schema        |
| Blog list `/blog`       | ✅ PR #15            |                                                  |
| Blog detail `/blog/[slug]` | ✅ PR #15          | Tonight: added Article + Breadcrumb schema, generateMetadata |
| About `/about`          | ✅ PR #15            | Voice pass from 2026-04-20 still holds           |
| Contact `/contact`      | ✅ PR #15            |                                                  |
| Privacy / Terms         | ✅ PR #15            |                                                  |

## Gaps not yet in reference (queued for Brandon)

- **Empty / 404 / loading states** — not in reference design2 either.
- **Mobile breakpoint pass** — reference breaks at 860/900; needs a
  concrete 375 / 414 / 768 audit on all pages.
- **Category hub** (`/category/[slug]`) — reference has CategoryPage
  in `pages.jsx` (category="restaurants"|"hotels"|"travel"); not yet
  a live route on the site.
- **Location hub** (`/location/[slug]`) — reference has LocationPage
  but not yet a live route. Dana Point is the first target.
- **Tag page** — need to build.
- **Pagination** styling — not yet exercised.
- **Author bio card** — a Brandon-face module is inline on blog/review
  detail (BJ avatar + name + "Editor · date"). Could be promoted to
  its own `<AuthorBio>` component when we want Person schema + portrait.

## Supersession log

- **2026-04-24** — Johnson & Co. Dark Editorial (from `reference/design2/`)
  becomes the canonical reference. Gilded Legacy is archived.
- **2026-04-20** — Gilded Legacy system captured (now superseded).
