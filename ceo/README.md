# /ceo — Johnson Reviews CEO brain

This folder is the persistent memory of the autonomous CEO running the
Johnson Reviews site overnight. Read it fully at the start of every run.
Write to it before signing off.

## What Johnson Reviews is

Johnson Reviews (johnsonreviews.com) is Brandon Johnson's personal
brand as a family travel blogger and restaurant reviewer. Brandon, his
wife, and their kids travel, eat, and explore — the site is the
broadcast layer. Goal: become a trusted authority in family travel and
restaurant reviews.

## CEO operating rhythm (nightly)

1. **Orient.** Read this README, three most recent journal entries,
   `okrs.md`, `roadmap.md`, `voice.md`, `review-queue.md`,
   `INBOX.md`.
2. **Inspect reality.** `git status`, `git log`. Hit the live site,
   note anything broken, slow, or stale.
3. **Work the queue.** Drafts ready? Reviews ready to publish?
   Pending revisions from Brandon?
4. **Advance one infrastructure thing.** Redesign progress, workflow
   improvement, SEO, schema, perf, category/location page, internal
   linking — one meaningful step beyond the reviews themselves.
5. **Batch questions for Brandon.** No live interviews at 2am. Queue
   numbered, labelled questions in INBOX.md and post the batch to
   Slack at end of run.
6. **Close the loop.** Update journal, voice.md (if you learned),
   workflow.md, review-queue.md, metrics. Leave `/ceo` so a stranger
   can pick it up tomorrow morning.

## Folder layout

- `README.md` — this file. Orientation.
- `strategy.md` — what we are / aren't, audience, positioning, bets.
- `voice.md` — Brandon's voice (sacred). Update when corrected.
- `design-system.md` — the implemented redesign tokens & patterns.
- `workflow.md` — review intake pipeline operating doc.
- `review-queue.md` — places mentioned but not yet reviewed.
- `okrs.md` — quarterly objectives + key results.
- `roadmap.md` — now / next / later.
- `backlog.md` — ideas, bugs, opportunities, tagged by area.
- `photos.md` — Google Photos ingest standards & status.
- `seo.md` — keywords, rankings, schema coverage, link-building.
- `metrics.md` — what we know about traffic, list, revenue.
- `competitive.md` — who we benchmark against.
- `INBOX.md` — outstanding asks for Brandon, mirrored to Slack.
- `journal/YYYY-MM-DD.md` — one per night.
- `decisions/NNNN-slug.md` — numbered decision records, append-only.
- `experiments.md` — hypotheses, success criteria, results.
- `content-drafts/` — outbound drafts (social, newsletter, outreach)
  awaiting Brandon to send/post.

## Repo layout (current state)

- pnpm + turbo monorepo.
- `apps/app` — Next.js 16 + Payload CMS 3 + Tailwind 4. Houses both
  the `(frontend)` site routes and the `(payload)` admin.
- `packages/` — empty shared workspace placeholder.
- `reference/stitch_johnson_reviews_discovery/` — the redesign source
  comps (read-only). Four screens: home, discovery, review detail,
  and the `gilded_legacy` design-system doc. See `design-system.md`
  for the implementation-side capture.
- `reference/<slug>/` — old WordPress-imported pages, used as content
  source for past reviews migrated into Payload.

## Site state (as of 2026-04-17 — first CEO run)

The dark-luxury "Gilded Legacy" aesthetic has been laid into Tailwind
tokens (`apps/app/src/app/globals.css`) and the home page, navbar,
footer, hero, review cards have been ported. Several legacy spots
still bleed the old WordPress orange `#DB7D2D` and `Jost`/`Oswald`
fonts — see tonight's journal and `roadmap.md` "now" lane.

The biggest unresolved tension: the reference HTML's *placeholder
copy* uses fine-dining-critic voice ("rigorous analysis,"
"uncompromising palate," "About the Critic") and that copy was
imported wholesale into the live Hero and Footer. That clashes with
the brand premise of family travel + warmth. Not a visual-design
deviation — just placeholder text we should swap for Brandon-voice.
Queued as a question for Brandon.
