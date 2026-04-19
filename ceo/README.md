# /ceo — CEO Brain for Johnson Reviews

This folder is the persistent memory for the nightly CEO agent running Johnson
Reviews (johnsonreviews.com). Every nightly run starts here.

## What this folder is

The CEO agent runs overnight, autonomously, while Brandon Johnson sleeps.
Brandon is the brand — family travel blogger + restaurant reviewer, Orange
County based. The CEO agent cannot remember anything across runs, so this
folder IS the memory. Every file here exists so tomorrow-night's agent can
open the repo cold and pick up without asking Brandon.

The brand lives or dies on Brandon's actual experiences and Brandon's actual
voice. The CEO is the engine that turns Brandon's time-starved memory of
real trips into polished, on-voice, on-brand posts — and ships the site
infrastructure underneath them.

## How to use this folder (nightly)

1. **Read first, in this order.**
   - `README.md` (this file)
   - 3 most recent `journal/YYYY-MM-DD.md` entries
   - `okrs.md`
   - `roadmap.md`
   - `voice.md`
   - `review-queue.md`
   - `INBOX.md` (anything Brandon left for you)
2. **Work.** Ship something on the site, move reviews forward, advance SEO
   or workflow.
3. **Close the loop.** Update journal, voice.md if learned anything new,
   review-queue.md, metrics.md. Post Slack summary (channel C0AHR2NJ361).

## File map

- `README.md` — this file. Orientation.
- `strategy.md` — what Johnson Reviews is and isn't. Who it's for. Bets.
- `voice.md` — Brandon's voice. Sacred. Updated when you learn something.
- `design-system.md` — the redesign's visual language, tokens, components.
  Derived from `/reference/design/*`. Shared reference so future-you
  doesn't re-parse the reference every night.
- `workflow.md` — review intake pipeline operating doc. Current state,
  friction, improvements in flight, north-star metric.
- `review-queue.md` — places Brandon has mentioned. What we know, what
  we're missing, questions pending.
- `okrs.md` — quarter objectives + KRs.
- `roadmap.md` — prioritized initiatives. Now / next / later.
- `backlog.md` — ideas, bugs, opportunities. Tagged by area.
- `photos.md` — Google Photos ingestion standards, privacy rules, albums
  processed.
- `seo.md` — keywords, rankings, schema coverage, link-building notes.
- `metrics.md` — traffic, reviews published, list, revenue — what we know.
- `competitive.md` — benchmark sites.
- `INBOX.md` — running log of asks-for-Brandon, so nothing is lost if
  Slack fails.
- `journal/YYYY-MM-DD.md` — one per night.
- `decisions/NNNN-short-slug.md` — numbered decision records.
- `experiments.md` — hypotheses, criteria, results.
- `content-drafts/` — drafts of social posts, emails, outreach — for
  Brandon to review and send.

## Repo layout, briefly

- `apps/app/` — the Next.js 16 / React 19 / Payload CMS 3 app. Tailwind v4.
- `apps/app/src/app/(frontend)/` — public site routes.
- `apps/app/src/app/(payload)/` — Payload admin.
- `apps/app/src/collections/` — Posts, Reviews, Categories, Tags, Pages,
  Media, Users.
- `apps/app/src/components/` — Hero, Navbar, FeaturedReviews, PostCard,
  etc.
- `reference/design/` — **target design**. Read-only source of truth for
  the redesign (`DESIGN.md` + `code.html` + `screen.png`). See
  `design-system.md` for the distilled version.

## Current site state (high level, as of Night 1 — 2026-04-19)

- Dark luxury aesthetic is partially in place. Color tokens, serif+sans
  type pair, gold accents, grayscale→color hover — all shipped.
- Homepage: Hero + AsSeenIn + CategoryGrid + BlogSection + FeaturedReviews
  + QuickStats. Mostly matches reference language.
- **Blog post / review detail page (`/blog/[slug]`) is NOT updated** —
  still uses generic prose layout, no drop cap, no concierge sidebar, no
  verdict ratings.
- Reviews page (`/reviews`) still uses legacy orange `#DB7D2D` and Jost
  font tokens — stale.
- Hero + footer copy uses affected haute-cuisine-critic voice
  ("uncompromising palate") that does not match Brandon (family travel,
  casual + mid-tier restaurants). Voice drift is an open question.

## Channels

- Slack: `C0AHR2NJ361` (always tag Brandon — user `U012Q64CRHT`).
- GitHub: `excelsior-creative/johnson-reviews`.
- Dev branch: `claude/relaxed-hamilton-mRXMx` (current active branch).
