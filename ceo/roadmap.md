# Roadmap

## Now (this week)

- 🟡 **Replace luxury-critic placeholder copy** site-wide. Started
  2026-04-20. First pass tonight: Hero, FeaturedReviews, CategoryGrid,
  QuickStats. Voice.md is the rubric.
- ⬜ **Verify the live deploy.** WebFetch from agent returned 403/
  ECONNREFUSED. Could be Vercel firewall, CF, or a real outage.
  Brandon: confirm site is up and what URL is canonical
  (`johnsonreviews.com` vs `www.johnsonreviews.com`).
- ✅ **Author bio block on Posts.** Completed in the 2026-04-29 nightly branch: reusable `AuthorBioBlock` now renders on blog post and review detail pages with honest Local Guide/family-traveler positioning and no unverified numeric stats.
- ⬜ **About page** rewritten on-voice.

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

- ✅ PR #10 — Apply Gilded Legacy design system across the site
  (visual layer; copy still off-brand, addressed in current cycle).
- ✅ PR #7 — Remove payload-types from tracking.
- ✅ PR #6 — Dark luxury editorial aesthetic overhaul (preceded
  the current Gilded Legacy pass).
- ✅ PR #5 — Reviews collection, seed script, frontend pages.
- ✅ PR #3 — Payload CMS upgrade; Pages collection layout builder
  (Hero, Content, Media, CTA, Reviews blocks).
- ✅ Initial WordPress import (PR #1).
