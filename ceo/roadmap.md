# Roadmap

Living doc. Reorder freely as priorities shift. Tag each item
with its parent objective (see `okrs.md`).

## NOW (this week)

- [O1] **Align `/reviews` index to the dark luxury
  aesthetic.** Remove Jost, orange (#DB7D2D), rounded-sm,
  "Google Reviews" badge. Rebuild to the Discovery reference
  pattern (sidebar filters + bento grid). Shipping in
  first-run PR tonight, partial.
- [O1] Audit `/reviews/[slug]` detail page against the
  `johnson_reviews_review_detail_gold_edition` reference —
  drop-cap lede, gallery fragment, verdict scorecard
  (blocked on 🟡-3), concierge sidebar with address/price/
  hours.
- [O1] Hero copy pass — replace "rigorous analysis /
  uncompromising palate" with Brandon-voice lede once
  Brandon weighs in (🟡-2).
- [O5] Wire analytics + baseline Lighthouse. Record results
  in `metrics.md`.

## NEXT (2–4 weeks)

- [O2] Build the Slack-to-draft intake loop. When Brandon
  posts "we went to X", CEO should pick it up on the next
  nightly run, generate a question batch, and advance it
  through the workflow on subsequent nights. Infrastructure:
  a lightweight `ceo/inbox/YYYY-MM-DD-slug.md` convention
  plus a parse step in the nightly runbook.
- [O1] Category hub template. OC restaurants, SoCal hotels,
  Vegas family, Disneyland, Puerto Vallarta as launch
  categories. Need design — mock two options and send for
  review.
- [O1] Location hub template (OC, San Diego, LA, Vegas,
  Puerto Vallarta).
- [O4] Schema coverage: ensure `lib/structured-data.ts`
  emits Review + Restaurant/LocalBusiness/
  TouristAttraction + AggregateRating where applicable.
- [O3] Pick 3 legacy reviews for the first rewrite batch
  (see `review-queue.md`).

## LATER

- [O2] Voice-note ingest from Brandon's phone (shared Drive
  folder or email-to-ceo).
- [O2] Google Photos album processing pipeline (metadata
  stripping, alt-text generation, renditions).
- [O4] Backlink outreach — bloggers in family-travel niche,
  local OC publications.
- Email list + first newsletter draft. Defer until traffic
  is worth capturing.
- Monetization: affiliate relationships (booking.com,
  expedia, gear). Not until authority shows up in metrics.
- Custom Payload admin view for the review queue.
