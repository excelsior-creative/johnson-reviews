# SEO

## Status: foundation phase

We have not yet done a full technical audit. This doc is skeleton —
fill in as we instrument and measure.

## What's implemented

- `sitemap.ts` and `robots.ts` exist at
  `apps/app/src/app/(frontend)/` (verified Night 1). Not yet audited
  for coverage.
- `lib/structured-data.ts` generates a global schema (attached to
  root layout). Site-level Organization / Website schema likely.
- `lib/metadata.ts` + `@payloadcms/plugin-seo` — per-page metadata
  supported in Payload. Not verified end-to-end on live reviews.
- Open Graph + Twitter card defaults — present in `metadata.ts`,
  verify.

## What's missing

- **Review-level schema.** `Restaurant`, `TouristAttraction`,
  `LocalBusiness`, `Review`, `AggregateRating` JSON-LD is NOT wired up
  on review posts yet. Biggest SEO lift we can make.
- **Hub-page schema.** Category and location hub pages should carry
  `CollectionPage` / `ItemList` schema.
- **Breadcrumbs schema** site-wide.
- **Internal link graph.** No enforced rule — reviews don't currently
  link to related reviews.
- **Canonical URLs.** Verify `blog/[slug]` canonical is set and that
  `reviews/[slug]` does not duplicate content.
- **Legacy URL map.** 70+ legacy WP URLs in `reference/*` with slugs
  that need either Next.js routes, 301s to new routes, or retirement.

## Target keyword territories (working, not researched)

These need real keyword research before we bank on them.

**Restaurants — Orange County.**
"Best family restaurants in [city]", "kid-friendly restaurant
[Irvine/Dana Point/San Clemente/Laguna]", "[restaurant name]
review".

**Experiences.**
"Disneyland with kids," "family-friendly things to do in [city]",
"best [chain / attraction] for families".

**Hotels / travel.**
"[Hotel name] review family" tends to have genuine long-tail.

## Baseline metrics to capture (by end of April)

- Indexed page count (site:johnsonreviews.com).
- Current monthly organic visits.
- Top 20 ranking queries + positions.
- Domain Authority (Moz) / Domain Rating (Ahrefs) proxy.
- Core Web Vitals p75 (LCP / CLS / INP).

## Ongoing / link-building

- Not yet. Park until authority has some reviews under it.
- Future: guest-post pitches to family-travel / OC-local publications.
- Future: relationships with OC restaurant owners (earn links, not
  buy).
