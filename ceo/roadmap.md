# Roadmap

## Now (this week)

- ✅ **Replace luxury-critic placeholder copy** site-wide. Pass 1
  (2026-04-20): Hero, FeaturedReviews, CategoryGrid, QuickStats,
  About, Contact, Reviews index/detail headers. Pass 2 (2026-04-21):
  blog index ("The Discovery / Michelin Starred" tier filter gone),
  BlogSection badge, blog/[slug] sidebar ("Concierge / Plan a
  Visit"), reviews/[slug] sidebar + "Field Review" badge +
  fabricated Verdict block (see ADR 0002). Voice.md §8 has the log.
- ⬜ **Verify the live deploy.** WebFetch from agent returned 403/
  ECONNREFUSED. Could be Vercel firewall, CF, or a real outage.
  Brandon: confirm site is up and what URL is canonical
  (`johnsonreviews.com` vs `www.johnsonreviews.com`).
- ✅ **Author bio block on Posts.** 2026-04-21 — `AuthorBio`
  component (compact + full variants). Placed in sidebar on both
  blog/[slug] and reviews/[slug]. Links to /about + conditional
  Google Local Guide profile link (gated on env var; URL pending
  Brandon per INBOX #11).
- ⬜ **About page** rewritten on-voice.
- ✅ **Schema coverage refactor.** 2026-04-21 — structured-data.ts
  expanded: Person (Brandon), Organization (founder → Person),
  WebSite, BlogPosting (author → Person), Review + itemReviewed
  (Restaurant/LocalBusiness/TouristAttraction/Hotel), Breadcrumb.
  generateMetadata wired on blog/[slug] + reviews/[slug].

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
