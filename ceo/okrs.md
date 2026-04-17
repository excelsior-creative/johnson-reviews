# OKRs — Q2 2026 (Apr–Jun)

Status: **draft for Brandon's review.** Numbers are starter
targets — we don't have baseline metrics yet (`metrics.md` is empty).
Rebase once we wire analytics + a real baseline.

## O1. Ship the redesign and hold the line

- KR1: All `(frontend)` pages render the dark-luxury palette with
  zero references to legacy `#DB7D2D`, `Jost`, `Oswald`, or `Unna`
  in source. (Tonight: in flight.)
- KR2: Lighthouse Performance ≥ 90 on home, /reviews, and a sample
  /reviews/[slug] on mobile.
- KR3: Reference-faithful versions of: home, discovery (/reviews),
  review detail. Each signed off by Brandon.

## O2. Make review production cheap

- KR1: v1 intake workflow shipped: conversational interview,
  voice-aware drafter, draft staged in Payload as `awaiting-review`.
- KR2: Median time from "Brandon mentions a place" → "review live"
  under 7 days. (Currently: not measured. Probably ∞.)
- KR3: 8 new Brandon-authored reviews published in Q2.

## O3. Lay the SEO foundation

- KR1: Schema.org JSON-LD live on all review pages
  (`Restaurant` + `Review` + `AggregateRating` where applicable).
- KR2: Sitemap auto-regenerates on publish; submitted to Google
  Search Console.
- KR3: City hub pages live for: Orange County, San Diego, Los
  Angeles, Las Vegas. (4 hubs.)
- KR4: Internal-link graph: every review links to ≥ 2 other
  related reviews.

## O4. Build the persistent CEO brain

- KR1: `/ceo` folder fully populated and updated nightly.
- KR2: A morning Slack summary every weekday with: shipped,
  drafted, blocked, asks-batch.
- KR3: `voice.md` sees ≥ 4 substantive updates from real Brandon
  redlines.

## Explicitly out of scope this quarter

- Monetization (ads, affiliates, sponsorships). Wait for traffic.
- Email list growth beyond a passive subscribe form.
- Social posting — drafts only into `content-drafts/`, Brandon posts.
