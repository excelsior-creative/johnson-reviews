# SEO Plan

_v0 — established 2026-04-20. To be deepened with real GSC + GA data
once Brandon connects the agent to those._

## What we know about the asset

- Domain: `johnsonreviews.com` (canonical TBD: apex vs www).
- 60+ legacy WordPress URLs preserved in `reference/`. Many are
  long-form restaurant + hotel + attraction reviews. SEO history
  unknown — DA, current rankings, current organic traffic all need
  Brandon to share GSC / GA access.
- Brandon's Google Local Guide profile is a related authority asset
  (Level 10, 500+ reviews, ~132M photo views per the QuickStats).
  Worth linking from About page + author bio block. Possible
  rel-author opportunity.

## Target keyword themes

Based on the legacy review geography (Orange County dense, plus
LA/SD/Vegas/PV/Hollywood-FL):

### Restaurants — local intent
- `[restaurant name] [city] review`
- `family-friendly restaurants in [city]`
- `best [cuisine] in [city]`
- `kid menu [restaurant name]`

### Travel — destination intent
- `Disneyland with kids`, `Disneyland Genie+`, `Grand Californian
  family review`
- `Las Vegas with kids` — Excalibur, MGM Grand, NY-NY, Park MGM
  (all in legacy)
- `Puerto Vallarta family` — Hotel Mousai legacy review
- `Coronado / San Diego with kids`

### Attractions — local intent
- `[attraction] family review` (Disneyland, SeaWorld, Cinepolis,
  Regal Irvine Spectrum, Islands Golf Center)

## Schema targets

| Page type           | Schema                                    | Status |
|---------------------|-------------------------------------------|--------|
| Restaurant review   | `Restaurant` + `Review` (+ `AggregateRating` if multi-source) | ⬜ |
| Hotel review        | `Hotel` + `Review`                        | ⬜ |
| Attraction review   | `TouristAttraction` + `Review`            | ⬜ |
| Generic LocalBiz    | `LocalBusiness` + `Review`                | ⬜ |
| Author              | `Person` (Brandon) referenced from Reviews | ⬜ |
| Site                | `WebSite` + `SearchAction`                | ⬜ |
| Breadcrumbs         | `BreadcrumbList`                          | ⬜ |
| Organization        | `Organization` (Johnson Reviews)          | ⬜ |

`apps/app/src/lib/structured-data.ts` exists — I haven't audited
it yet. Tomorrow's infrastructure step candidate.

## Internal link plan

- Every published review links to:
  - Its location hub (e.g. /location/dana-point)
  - Its category hub (e.g. /category/restaurants)
  - 3 related reviews (same location preferred, then same category,
    then same cuisine/type)
- About page links to top 5 reviews and to the Google Local Guide
  profile.
- Footer permanent links: top categories, top locations, About,
  Contact, Privacy, Terms.

## Backlink opportunities (later)

- Visit California, Visit Anaheim, Visit Dana Point, Visit Laguna
  Beach — tourism boards may list local content creators.
- Restaurant association OC.
- Other family travel bloggers — guest post swaps.
- _Drafts only — Brandon sends._ See "Brandon owns" in mandate.

## Audit candidates (next nightly)

- Read `apps/app/src/app/sitemap.ts` and `robots.ts`.
- Read `apps/app/src/lib/structured-data.ts` and assess coverage.
- Read `apps/app/src/lib/metadata.ts`.
- Check `apps/app/src/app/feed.xml` for RSS validity.
