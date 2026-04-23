# /ceo — Johnson Reviews CEO Brain

This folder is the persistent memory of the autonomous CEO that runs nightly
on the Johnson Reviews codebase. Future-you (or morning-Brandon, or a stranger)
should be able to open this folder and orient in five minutes.

## What Johnson Reviews is

A personal brand site for **Brandon Johnson**, a Google Local Guide (Level 10,
500+ reviews) and family travel + restaurant reviewer. The Johnsons live in
the Orange County / SoCal area, travel often, eat out frequently, and the site
broadcasts those experiences with authority and warmth. Site:
https://johnsonreviews.com.

## Repo layout (high level)

- `apps/app` — Next.js 15 + Payload CMS app. Frontend routes under
  `src/app/(frontend)/`, Payload admin under `src/app/(payload)/`. Payload
  collections in `src/collections/` (Posts, Reviews, Categories, Tags, Pages,
  Media, Users). Globals in `src/globals/`.
- `apps/app/src/components` — React components (Hero, Navbar, Footer,
  FeaturedReviews, CategoryGrid, QuickStats, etc).
- `apps/app/src/app/globals.css` — design tokens (Gilded Legacy palette,
  Noto Serif + Inter, sharp corners).
- `reference/stitch_johnson_reviews_discovery/` — **read-only** reference
  design (Gilded Legacy + three page templates: home, discovery, review
  detail). Source of truth for visual direction.
- `reference/<slug>/` — legacy WordPress site mirror. Each subfolder is a
  past review slug. Useful for the migration backlog (`/ceo/review-queue.md`).
- `ceo/` — this folder.

## Current site state (as of 2026-04-20, first nightly run)

- **Visual system: applied.** Dark luxury palette (#131313 base, #f2ca50 +
  #d4af37 gold), Noto Serif headlines, Inter labels, 0px corner radius.
  Shipped in PR #10 ("Gilded Legacy design system").
- **Copy: WILDLY off-brand.** The reference design's *placeholder* copy was
  copied verbatim into the live components. Examples:
  - Hero: "Established 1984", "Elevating the Standard of Taste through
    rigorous analysis and an uncompromising palate."
  - QuickStats: "The Sommelier's Ledger", "A Quiet Tally of Crossings."
  - FeaturedReviews: "We do not merely eat; we witness the convergence of
    technique, tradition, and audacity."
  - CategoryGrid: "Trending Destinations", "Where fire meets craftsmanship
    at the table."
  This reads like a Michelin critic site, not a family travel + restaurant
  blog. Tonight's CEO patch starts replacing this with honest placeholder
  copy in Brandon's voice. **See `voice.md`.**
- **Content backend works.** Payload CMS Posts collection, Reviews
  collection (Google Reviews import schema), Categories, Tags, Pages,
  Media. Published posts render at `/blog/[slug]` and reviews at
  `/reviews/[slug]`.
- **No live deploy verified this run.** WebFetch to johnsonreviews.com
  returned 403/ECONNREFUSED — could be Vercel firewall, CF, or a real
  outage. Flagged as a question for Brandon. Did not block this run.

## Operating rhythm

Each night roughly:

1. **Orient** — read README, last 3 journals, okrs, roadmap, voice,
   review-queue, INBOX.
2. **Inspect reality** — repo, live site, anything broken or stale.
3. **Work the queue** — drafts to write, drafts to revise, posts to
   publish.
4. **Advance one infrastructure thing** — redesign, workflow, SEO,
   schema, perf, category pages.
5. **Batch questions** — anything that needs Brandon's input goes in
   one Slack message at end of run, also logged in INBOX + journal.
6. **Close the loop** — journal, voice, workflow, review-queue,
   metrics. Leave /ceo morning-readable.

## Slack

Canonical channel: **C0AHR2NJ361**. Tag @Brandon (`U012Q64CRHT`) in
every nightly summary and every ask. Severity tags: 🔴 urgent /
🟡 needs decision / 🟢 FYI.

## Folder index

- `README.md` — this file
- `strategy.md` — what Johnson Reviews is, audience, positioning
- `voice.md` — Brandon's voice — sacred, evolving
- `workflow.md` — review intake pipeline
- `review-queue.md` — places mentioned, drafts in progress, blockers
- `okrs.md` — current quarter objectives
- `roadmap.md` — now / next / later
- `backlog.md` — tagged ideas + bugs
- `design-system.md` — captured from `reference/.../gilded_legacy/`
- `seo.md` — keyword targets, schema coverage, link plan
- `metrics.md` — what we know
- `competitive.md` — who we benchmark against
- `photos.md` — Google Photos ingestion + privacy rules
- `INBOX.md` — running queue of asks for Brandon (Slack-mirrored)
- `journal/YYYY-MM-DD.md` — one per night
- `decisions/NNNN-short-slug.md` — numbered ADRs, supersede rather than edit
- `experiments.md` — hypotheses + results
- `content-drafts/` — outbound drafts (social, email, outreach)
