# Roadmap

## Now (this week)

- 🔴 **Land one of the seven open draft PRs** (recommendation: PR #17 — see
  `/ceo/pr-triage.md`). Until something merges, the nightly routine cannot
  advance the brand-critical SEO/copy fixes; new runs just add to the pile.
- 🟢 **Replace luxury-critic placeholder copy** — substantially shipped
  by PR #15 (2026-04-23). New home page reads on-brand
  ("Real visits. Honest reviews.", the On-Method quote, Archive CTA).
  Remaining off-brand strings (mostly /about page) are addressed in
  open draft PRs.
- ⬜ **Verify the live deploy.** WebFetch from agent returned 403/
  ECONNREFUSED on 2026-04-20. Brandon: confirm site is up and what URL
  is canonical (`johnsonreviews.com` vs `www.johnsonreviews.com`).
- 🟡 **Author bio block on Posts.** E-E-A-T signal. Pending in open
  PRs (#14, #17). Will land when one of those merges.
- 🟡 **About page** rewritten on-voice. Pending in open PRs.

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

- ✅ EXIF GPS stripper utility (`apps/app/scripts/strip-exif-gps.ts`,
  `pnpm strip:exif`) shipped 2026-04-26 — supports the kid-photo
  privacy default per the CEO mandate.
- ✅ PR #15 — Migrate to Johnson & Co. dark editorial design system
  from `reference/design2/` (2026-04-23). Supersedes Gilded Legacy.
  See ADR 0002. `design-system.md` rewritten to match.
- ✅ PR #12 — `/ceo` brain bootstrap + first round of off-brand copy
  surgery (2026-04-20).
- ✅ PR #10 — Apply Gilded Legacy design system across the site
  (visual layer; superseded by PR #15).
- ✅ PR #7 — Remove payload-types from tracking.
- ✅ PR #6 — Dark luxury editorial aesthetic overhaul (preceded
  the current Gilded Legacy pass).
- ✅ PR #5 — Reviews collection, seed script, frontend pages.
- ✅ PR #3 — Payload CMS upgrade; Pages collection layout builder
  (Hero, Content, Media, CTA, Reviews blocks).
- ✅ Initial WordPress import (PR #1).
