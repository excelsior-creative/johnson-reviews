# Roadmap

## Now (this week)

- 🟡 **Replace luxury-critic placeholder copy** site-wide. Started
  2026-04-20. First pass: Hero, FeaturedReviews, CategoryGrid,
  QuickStats. 2026-04-25: also fixed `SITE_NAME` (was "Template
  Site"), Hero/AsSeenIn images, About-page Unsplash portrait, About
  brand-name "Johnson & Co." → "Johnson Reviews." Voice.md is the
  rubric.
- 🔴 **Verify the live deploy.** WebFetch from agent returned 403/
  ECONNREFUSED on 2026-04-20 and 2026-04-25 — two consecutive
  nights. Brandon: confirm site is up and what URL is canonical;
  whitelist agent traffic if there's a WAF rule. INBOX #1.
- ✅ **Author bio block on Posts.** Shipped 2026-04-25. BJ avatar
  tile + credentials + link to /about renders above the signature
  on `/blog/[slug]`. Mobile single-column. Schema-linked to the
  global Author `@id`.
- 🟡 **About page** rewritten on-voice. Stock-photo portrait
  removed; brand-name fixed; "Three Principles" / monetization-
  posture copy still pending Brandon's confirmation (INBOX #12).

## Next (this month)

- **Discovery page (`/blog`)** mapped to reference design.
- **Review Detail page** (`/blog/[slug]`) polished — drop cap, photo
  gallery, schema, related reviews, location anchor.
- **Empty / 404 / loading** states designed and shipped.
- **Schema coverage** — Restaurant / TouristAttraction / LocalBusiness
  + Review on 100% of published posts.
- **Sitemap audit** — confirm the routes Next.js generates match
  reality, drop dead URLs, submit to GSC.
- **Migrate first 5 legacy reviews** into Posts with refreshed voice.
  Start with Dana Point cluster (Apizza Doho, Chart House, Maison
  Cafe, Ramos House) — highest local density.
- **Location hub: Dana Point** — proof of concept for the hub
  pattern. List all reviews in Dana Point, with map + intro.

## Later (this quarter)

- Location hubs for Irvine, Las Vegas, Anaheim/Disney, Hollywood,
  San Diego.
- Category hub pages with on-brand intros (Restaurants, Hotels,
  Entertainment, Shopping).
- Email newsletter wiring (provider TBD with Brandon).
- Internal link graph audit + automation.
- Image performance pass (responsive sizes, AVIF/WebP, CLS).
- Author bio + reviewer-trust signals everywhere.
- Affiliate strategy proposal (decision: Brandon).

## Backlog (sortable, not committed)

See `/ceo/backlog.md`.

## Done

- ✅ 2026-04-25 — `SITE_NAME = "Template Site"` removed from
  `lib/metadata.ts`. Site no longer identifies itself as a template
  in OG cards / JSON-LD / email / Twitter / Search.
- ✅ 2026-04-25 — JSON-LD live on `/blog/[slug]`: Article + Review
  + Breadcrumb + Author Person, all `@id`-cross-referenced. Schema
  generators centralized in `lib/structured-data.ts`.
- ✅ 2026-04-25 — Hero + AsSeenIn images localized to
  `apps/app/public/`; SG-Host dependency dropped. AsSeenIn
  honesty-pass: dedupe + only confirmed platform.
- ✅ 2026-04-25 — Dead `CalculatorSection` + `ServicesSection`
  components deleted.
- ✅ 2026-04-25 — Author bio block on `/blog/[slug]` (E-E-A-T).
- ✅ 2026-04-25 — `/ceo/prompts/intake.md` v1 + `/ceo/templates/
  review-template.md` v1 shipped. Workflow infrastructure exists.
- ✅ 2026-04-25 — Apizza Doho first migration draft in
  `/ceo/drafts/`, blocked on Brandon redline.
- ✅ PR #15 — Migrate to dark editorial design system from
  reference/design2 (merged externally between nightly runs;
  pending /ceo/design-system.md update).
- ✅ PR #10 — Apply Gilded Legacy design system across the site
  (visual layer; copy still off-brand, addressed in current cycle).
- ✅ PR #7 — Remove payload-types from tracking.
- ✅ PR #6 — Dark luxury editorial aesthetic overhaul (preceded
  the current Gilded Legacy pass).
- ✅ PR #5 — Reviews collection, seed script, frontend pages.
- ✅ PR #3 — Payload CMS upgrade; Pages collection layout builder
  (Hero, Content, Media, CTA, Reviews blocks).
- ✅ Initial WordPress import (PR #1).
