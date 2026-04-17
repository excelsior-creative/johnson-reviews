# Backlog

Ideas, bugs, opportunities. Tag area in `[brackets]`. Move to
`roadmap.md` when ready to commit.

## [site] bugs / cleanups

- `[site]` `apps/app/.gitignore.tmp` exists at root — orphan tmp
  file. Remove next time we touch ignore rules.
- `[site]` `AsSeenIn` component pulls press logos from
  `brandonj117.sg-host.com`. If the WP host goes away, the bar
  breaks. Localize the assets to `/public` and self-host.
- `[site]` `AsSeenIn` shows OpenTable / Yelp / Google Local Guides
  as "as seen in." Verify Brandon actually has a presence on each
  before we keep the implication. Otherwise replace with real
  publication logos or remove the section.
- `[site]` `Hero` background photo is hot-linked from the legacy
  WordPress host. Same fragility risk. Move to `/public` or to
  Vercel Blob storage.
- `[site]` `Hero` and `Footer` carry "rigorous analysis" /
  "uncompromising palate" / "About the Critic" copy from the
  reference HTML — wrong voice for the brand. Voice rewrite
  pending Brandon sign-off.
- `[site]` `Reviews` page has hardcoded `RATING_OPTIONS` with
  emoji stars in the label. Replace with the gold SVG star count
  to match the rest of the site.
- `[site]` Navbar "Sign In" button links nowhere. Either wire
  it to something real (saved-reviews account?) or remove for now.
- `[site]` Drop the unused `Header` component or repurpose it —
  the live pages use bespoke headers, not this one.

## [workflow] review intake

- `[workflow]` Build `scripts/intake.ts` — see `workflow.md` v1.
- `[workflow]` Add `status` enum + `internalNotes` field to
  Reviews collection.
- `[workflow]` Decide single rating vs. sub-scores (Food, Service,
  Vibe, Family-Friendliness, Value).

## [content]

- `[content]` Audit the 80 legacy WP-imported reviews for voice
  consistency. Sample 5/night, log to `review-queue.md`.
- `[content]` Decide a canonical category taxonomy (current admin
  has `Categories` collection — no enforced list yet).

## [seo]

- `[seo]` JSON-LD on review pages.
- `[seo]` Open Graph + Twitter card metadata pass.
- `[seo]` City hub pages (OC / SD / LA / Vegas).
- `[seo]` `/feed.xml` exists — verify its output and submit to
  feed aggregators.
- `[seo]` Add a `humans.txt` and a brief `/about` page that
  search engines can use to attribute authorship.

## [monetization] (paused — wait for traffic)

- `[monetization]` Booking.com affiliate evaluation.
- `[monetization]` OpenTable / Resy partner program research.
- `[monetization]` Display ads (Mediavine / Raptive thresholds).

## [brand]

- `[brand]` Author byline + small portrait on every review.
- `[brand]` "About" page rewrite in Brandon's voice with a real
  family photo (after Brandon picks one and we strip EXIF).
- `[brand]` Decide on a Twitter/X handle, Instagram handle,
  consistent profile copy across platforms.
