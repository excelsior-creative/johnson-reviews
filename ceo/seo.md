# SEO

## Current state (2026-04-18, first run)

- `apps/app/src/app/sitemap.ts` and `robots.ts` exist.
- SEO plugin wired via Payload (`@payloadcms/plugin-seo`).
- Structured-data helpers in `apps/app/src/lib/structured-
  data.ts` — need to audit coverage.
- Target keywords file at
  `apps/app/src/config/seo-keywords.ts` — need to read and
  decide whether it's the source of truth.
- Google Search Console: **unknown** — need Brandon to
  confirm property ownership (🟡-4).
- Analytics: **unknown** which tool — GA4? Plausible? None?
  (🟡-4).

## Target keyword architecture

Driven by the audience in `strategy.md`: traveling families +
SoCal locals. Thinking in clusters, not individual terms.

### Cluster 1: OC restaurant reviews

- "family restaurants [city]" (Irvine, Dana Point, San Juan
  Capistrano, Laguna, San Clemente, Newport Beach)
- "best kids menu [neighborhood]"
- "[restaurant name] review" (exact match on the ~50 legacy
  restaurants in the backlog — already indexed, re-rank by
  rewriting in Brandon's voice with better schema)

### Cluster 2: Disneyland / Grand Californian

- "Grand Californian with kids"
- "Disneyland with toddlers"
- "Disney Genie Plus worth it"
- Evergreen, high volume. Family-blog competition is heavy
  — Brandon's edge is specificity and honesty, not novelty.

### Cluster 3: Family Vegas

- "Vegas with kids"
- "Excalibur family hotel"
- "kid-friendly Vegas hotels on the strip"

### Cluster 4: San Diego family trips

- "SeaWorld San Diego review"
- "Coronado with kids"

### Cluster 5: Puerto Vallarta luxury family

- "Hotel Mousai family"
- "Puerto Vallarta resorts with kids"

## Schema

Priority: every review must emit at least one of:

- `Review` (review body, rating, author)
- `Restaurant` or `LocalBusiness` or `TouristAttraction` or
  `Hotel` (whichever fits the subject)
- `AggregateRating` where we have >1 data point (our own
  rating + maybe a Google rating if cited)
- `BreadcrumbList` on all secondary pages

Audit item: read `lib/structured-data.ts`, confirm what's
emitted now, map gaps.

## Internal linking

- Every review links to ≥ 2 related reviews (same location,
  same category, same trip).
- Category hub pages link to every review in their category.
- Location hub pages link to every review in their location.
- Home features 6–8 curated recent reviews.

## Backlink opportunities (longer-term)

- Local OC publications (OCWeekly, Stu News Laguna,
  Patch.com — some still take guest posts).
- Family-travel round-ups (e.g. TravelingMom,
  FamilyVacationist).
- Disney fan communities (Disney-focused newsletters often
  link out to real-parent reviews).
- Restaurant/venue pages — if a restaurant has a "press"
  page, they may link to honest reviews.

## Current rankings

Unknown. Setup pass #1 is to wire GSC, wait 7 days, then
populate a baseline ranking snapshot here.
