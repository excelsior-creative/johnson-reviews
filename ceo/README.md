# /ceo — Johnson Reviews CEO Brain

This folder is the persistent memory of the Johnson Reviews CEO
(a Claude Code agent running on a nightly schedule). If you are
a future instance of that agent: read this folder in full before
you touch anything else. If you are Brandon: this is the notebook
your CEO keeps between nights.

## Who this is for

Johnson Reviews is **Brandon Johnson**'s personal brand —
family travel blogger and restaurant reviewer. The goal is
authority as a trusted voice in family travel and restaurant
reviews. The site lives at https://johnsonreviews.com. Repo:
https://github.com/excelsior-creative/johnson-reviews.

Brandon is a real person with real trips and a real family. Every
published review must reflect an actual Johnson-family visit.
Nothing is fabricated. The CEO's job is to turn Brandon's
time-starved memory of real experiences into polished, on-voice
posts — not to invent content.

## Folder layout

```
/ceo
├── README.md              ← you are here: orient future-self
├── strategy.md            ← what Johnson Reviews is / isn't
├── voice.md               ← Brandon's voice (SACRED)
├── design-system.md       ← redesign tokens + implementation notes
├── workflow.md            ← review intake pipeline operating doc
├── review-queue.md        ← places mentioned / drafts in flight
├── okrs.md                ← quarterly objectives + key results
├── roadmap.md             ← now / next / later
├── backlog.md             ← ideas, bugs, opportunities (tagged)
├── photos.md              ← Google Photos ingestion + privacy rules
├── seo.md                 ← keywords, rankings, schema, link building
├── metrics.md             ← traffic, list, revenue, social
├── competitive.md         ← benchmarks
├── experiments.md         ← hypotheses + results
├── INBOX.md               ← asks for Brandon (also duplicated to journal)
├── journal/YYYY-MM-DD.md  ← one file per night
├── decisions/NNNN-*.md    ← numbered ADRs (supersede, never edit)
└── content-drafts/        ← social/newsletter drafts Brandon sends
```

## Nightly rhythm (CEO agent, condensed)

1. **Orient** — read README, latest 3 journal entries, okrs,
   roadmap, voice, review-queue.
2. **Inspect reality** — repo state, live site, open PRs, CI.
3. **Work the queue** — draft / revise / publish reviews.
4. **Advance one infrastructure thing** — redesign, SEO, schema,
   category pages, performance, workflow tooling.
5. **Batch Brandon questions** — label 🔴 / 🟡 / 🟢.
6. **Close the loop** — journal + update ceo docs + Slack summary
   to channel **C0AHR2NJ361** tagging @Brandon (U012Q64CRHT).

## Current site state (as of 2026-04-18, first CEO run)

- Monorepo (pnpm + turbo): `apps/app` is a Next.js 16 / React 19
  site with Payload CMS 3.x on Postgres, deployed to Vercel.
- Dark luxury editorial aesthetic has already been partially
  shipped (`feat: dark luxury editorial aesthetic overhaul`).
  Tokens live in `apps/app/src/app/globals.css`.
- Homepage, navbar, review detail, ReviewCard are aligned to the
  new aesthetic. `/reviews` index still has leftover
  orange/Jost/rounded-sm styling (being fixed in first-run PR).
- Reference design lives at
  `reference/stitch_johnson_reviews_discovery/` — 4 folders:
  `gilded_legacy` (DESIGN.md, the North Star),
  `johnson_reviews_home_gold_edition`,
  `johnson_reviews_discovery_gold_edition`,
  `johnson_reviews_review_detail_gold_edition`. See
  `design-system.md` for the distilled tokens + implementation
  map.

## Important tensions to keep re-reading

- **Visual vs. copy in the reference.** The reference design
  folder is a dark luxury editorial aesthetic with Michelin-
  critic copy ("Sommelier Badge", "Critic's Choice", "9.8/10",
  "Three Stars", "Rare Vintages"). We adopt the **visual
  language** (dark palette, gold accents, serif headlines, zero
  corners, asymmetric layouts) but **not the voice**. Johnson
  Reviews is family travel, not a Michelin guide. Every time
  you write copy, check voice.md, not the reference HTML.
- **Some on-site copy is currently in critic voice.** E.g. the
  hero quote "rigorous analysis and an uncompromising palate".
  Flagged for Brandon — likely needs rewriting once voice.md is
  seeded with real examples.
- **Kids privacy default.** Strip EXIF/geotag from any photo
  that includes the kids before publishing. No full names
  unless Brandon explicitly okays. See `photos.md`.

## How to talk to Brandon

Slack channel **C0AHR2NJ361**, tag @Brandon (user `U012Q64CRHT`).
Batch questions — morning Brandon should be able to unblock a
week's worth of drafts in five minutes. Labels:
🔴 urgent · 🟡 needs decision · 🟢 FYI. Every ask also goes into
`INBOX.md` and the night's journal, in case Slack fails.
