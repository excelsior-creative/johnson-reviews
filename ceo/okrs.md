# OKRs — Q2 2026

_Drafted 2026-04-20. v0 — needs Brandon sign-off. Targets are best-guess
based on the mandate and current state._

## Objective 1: Ship the redesign cleanly

- **KR1.1** — All home page section copy on-brand (no luxury-critic
  placeholder language). 🟡 Started 2026-04-20.
- **KR1.2** — Discovery (`/blog`) and Review Detail pages match
  reference design system. ⬜
- **KR1.3** — Empty / 404 / loading states designed and shipped. ⬜
- **KR1.4** — Mobile + tablet pass: every page is excellent at 375 /
  768 / 1024. ⬜
- **KR1.5** — Lighthouse: ≥ 90 on Performance, Accessibility, SEO,
  Best Practices for home + a sample review page. ⬜

## Objective 2: Make review production cheap

- **KR2.1** — Review intake workflow documented and tested with one
  end-to-end Brandon → published review by end of April. ⬜
- **KR2.2** — Time from "Brandon mentions a place" → "review live"
  averaging ≤ 48h on the first 5 reviews. ⬜
- **KR2.3** — Migrate ≥ 25 of the 60+ legacy WP reviews into Posts
  with refreshed voice + schema by end of Q2. ⬜
- **KR2.4** — Publish ≥ 30 net-new full-length reviews by end of Q2
  (combined: legacy migrations + new visits). ⬜

## Objective 3: SEO authority

- **KR3.1** — Restaurant / LodgingBusiness / TouristAttraction /
  LocalBusiness + Review schema on 100% of published reviews.
  🟢 Infra shipped 2026-04-24 (`generateReviewSchema` +
  `categoryToSchemaType` + wired into `/reviews/[slug]`). Counts
  as done as soon as we have published reviews in the collection.
- **KR3.2** — Author E-E-A-T signal — Person schema for Brandon in
  global JSON-LD graph, Article + Review schemas author-ref to him.
  ✅ Shipped 2026-04-24. Inline BJ byline on detail pages is already
  there from PR #15.
- **KR3.3** — Sitemap.xml + robots.txt verified clean and
  submitted to GSC. 🟡 `sitemap.ts` has a pre-existing TS narrowing
  issue (surfaced by type-check tonight); fix next run, then submit.
- **KR3.4** — At least 3 location hub pages live (Dana Point,
  Irvine, Las Vegas as starting set based on legacy review
  density). ⬜ Dana Point is next run's target.

## Objective 4: Establish the brand publicly

- **KR4.1** — About page is on-voice and accurate to the family. ⬜
- **KR4.2** — At least one social-channel publishing rhythm
  established (Brandon picks platform: IG, X, Threads, FB). ⬜
- **KR4.3** — Email list signup wired to a real provider (currently
  unverified). ⬜

## Pending Brandon input on targets

All numerical targets above are agent-best-guess. Brandon should
confirm or revise them in the next nightly review.
