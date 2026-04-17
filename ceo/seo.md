# SEO

## Posture

We're a small, honest, locally-grounded review site. SEO strategy
is **earn rankings through specificity and trust**, not by gaming
keyword density.

Three things that actually matter for us right now:

1. **Schema.org markup on review pages.** `Restaurant` /
   `LocalBusiness` + `Review` + `AggregateRating`. This is table
   stakes for surfaceability in Google's review-rich-results.
2. **City + category hub pages with internal linking.** Every
   review should appear on a city hub *and* a category hub, with
   gold-cross-link anchor text.
3. **Original, voice-driven content.** Generic AI-flavored prose
   gets penalized. Brandon-voice prose gets read.

## Current technical state

- `next-sitemap` not present; `sitemap.ts` and `robots.ts` exist
  in `app/` — verify next run.
- `feed.xml` route exists.
- `@payloadcms/plugin-seo` is installed and wired (per package.json),
  meaning each Reviews / Pages doc has SEO fields. Audit whether
  the rendered pages actually pull the SEO meta into the `<head>`.
- No JSON-LD `<script type="application/ld+json">` rendered yet.

## Target keywords (seed list — refine after GSC connect)

By location:
- "best restaurants in dana point with kids"
- "family friendly restaurants san juan capistrano"
- "irvine spectrum restaurants review"
- "kid friendly things to do laguna niguel"
- "san diego family travel guide"
- "puerto vallarta with kids"

By category:
- "italian restaurant orange county family"
- "sushi restaurant orange county review"
- "thai food newport beach review"

By specific establishment (long tail):
- For every legacy review, the establishment name + city is the
  primary target. e.g., "apizza doho dana point review."

## Internal link graph notes

- Today: reviews don't link to each other. Big miss.
- Target: every review body should link to:
  - The relevant city hub.
  - The relevant category hub.
  - 1–2 thematically adjacent reviews ("if you liked this, try…").
- Build a small "related" rail under each review pulled from same
  city + category.

## Backlink / outreach opportunities (research only — Brandon sends
all outreach)

- Local OC parenting blogs / OC Mom Activities / OC Family Magazine.
- Visit California / Visit Anaheim / Visit Dana Point partner pages.
- Restaurant-side: many small SoCal places will gladly link a
  positive review from their press page if asked nicely.

## Schema coverage matrix

| Page type | Schema | Status |
|-----------|--------|--------|
| Review detail | Restaurant / Review / AggregateRating | Not yet |
| Hotel review | Hotel / Review | Not yet |
| Tourist attraction review | TouristAttraction / Review | Not yet |
| Home | WebSite / Person (Brandon) | Not yet |
| About | Person | Not yet |
| City hub | Place + ItemList | Not built |
| Category hub | CollectionPage + ItemList | Not built |
