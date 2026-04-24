# Roadmap

## Now (this week)

- ✅ **Replace luxury-critic placeholder copy** site-wide (PR #12,
  2026-04-20). Voice re-audit of Timmy's PR #15 rebuild is the
  next sub-task.
- ✅ **Author bio signal on Posts + Reviews** — Person schema for
  Brandon added to the global JSON-LD graph, Article and Review
  schemas both author-ref to him (2026-04-24). The inline
  BJ-avatar byline is already present on detail pages from PR #15.
- ✅ **Core SEO foundation** — metadata.ts rewritten with real
  brand values, structured-data.ts expanded with Person/Restaurant/
  LodgingBusiness/TouristAttraction/Review/Breadcrumb schemas,
  `generateMetadata` exports wired to slug pages (2026-04-24).
- ⬜ **Verify the live deploy.** WebFetch from agent returned 403/
  ECONNREFUSED. Could be Vercel firewall, CF, or a real outage.
  Brandon: confirm site is up and what URL is canonical
  (`johnsonreviews.com` vs `www.johnsonreviews.com`). (INBOX #1)
- ⬜ **Voice re-audit of PR #15 rebuild.** Home/about/contact/privacy/
  terms were rebuilt on new components; re-check for any
  luxury-critic regressions.
- ⬜ **About page** — spot-check voice after PR #15 rebuild.

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

- ✅ CEO run 2026-04-24 — killed "Template Site" brand bug in
  `metadata.ts` + `structured-data.ts`, added Person (Brandon) /
  Review / Restaurant / LodgingBusiness / TouristAttraction /
  Breadcrumb schemas, wired `generateMetadata` + JSON-LD onto
  `/blog/[slug]` and `/reviews/[slug]`, deleted 6 dead scaffold
  components, rewrote `design-system.md` for the new Johnson & Co.
  reference, authored `/ceo/prompts/intake.md` (full review intake
  script).
- ✅ PR #15 — Migrate to new dark editorial design system (Johnson
  & Co.) from `reference/design2/`. Timmy, 2026-04-23. Supersedes
  Gilded Legacy.
- ✅ PR #12 — Rewrite off-brand placeholder copy to Brandon's voice
  + bootstrap `/ceo` (first CEO run, 2026-04-20).
- ✅ PR #10 — Apply Gilded Legacy design system across the site
  (superseded by PR #15).
- ✅ PR #7 — Remove payload-types from tracking.
- ✅ PR #6 — Dark luxury editorial aesthetic overhaul (preceded
  the current Gilded Legacy pass).
- ✅ PR #5 — Reviews collection, seed script, frontend pages.
- ✅ PR #3 — Payload CMS upgrade; Pages collection layout builder
  (Hero, Content, Media, CTA, Reviews blocks).
- ✅ Initial WordPress import (PR #1).
