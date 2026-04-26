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

## Current site state (as of 2026-04-26)

- **Visual system: dark editorial Johnson & Co.** Warm bourbon-ink
  base (`#0f0d0b`) + warm gold accent (`#c9a961`), Playfair Display
  headlines, Inter sans, JetBrains Mono meta, Caveat signature. 0px
  corners. Shipped in PR #15 (2026-04-23) — supersedes Gilded
  Legacy. **Source of truth:** `reference/design2/Johnson Reviews/`
  + `/ceo/design-system.md` (rewritten 2026-04-26). See ADR 0002.
- **Copy: mostly on-brand on home/index pages.** PR #15 shipped
  good editorial copy on the home page (Hero "Real visits. Honest
  reviews.", On-Method quote, Archive CTA). Some pages
  still need polish — particularly /about (open draft PRs propose
  fixes).
- **Content backend works.** Payload CMS Posts collection, Reviews
  collection, Categories, Tags, Pages, Media. Renders at
  `/blog/[slug]` and `/reviews/[slug]`.
- **Brand metadata leak still live.** `apps/app/src/lib/metadata.ts`
  still ships `SITE_NAME = "Template Site"` and "Built with Next.js
  & Payload CMS" tagline → leaks to OG cards, JSON-LD Organization,
  Twitter cards, RSS feed channel, contact email footer. Fixed in
  multiple open draft PRs (#13, #14, #16, #17). Not yet merged.
- **JSON-LD schema graph still incomplete.** Same story — proposed
  in open PRs.
- **PR backlog — 7 open drafts, none merged.** Documented in
  `/ceo/pr-triage.md`. Recommendation: merge PR #17, close the rest.
- **EXIF GPS stripper utility shipped 2026-04-26**
  (`pnpm strip:exif <path>`). New tooling, no other PR has it.
- **Live site reachability still unverified.** Last attempted
  2026-04-20 — returned 403/ECONNREFUSED. Open ask for Brandon.

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
- `pr-triage.md` — current open-PR audit; refresh each night
- `journal/YYYY-MM-DD.md` — one per night
- `decisions/NNNN-short-slug.md` — numbered ADRs, supersede rather than edit
- `experiments.md` — hypotheses + results
- `content-drafts/` — outbound drafts (social, email, outreach)
