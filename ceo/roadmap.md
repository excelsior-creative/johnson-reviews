# Roadmap

## NOW (in flight this week)

1. **Stamp out the legacy palette.** Convert remaining
   `#DB7D2D` / `Jost` / `Oswald` / `Unna` usages to the dark-luxury
   gold + Noto Serif + Inter system. Files in scope:
   `SubscribeForm.tsx`, `LexicalContent.tsx`,
   `app/(frontend)/reviews/page.tsx`,
   `app/(frontend)/reviews/[slug]/page.tsx`. **(In progress
   tonight — see journal/2026-04-17.md.)**
2. **Voice audit on home + footer copy.** Hero + Footer currently
   carry the reference's fine-dining-critic placeholder ("rigorous
   analysis," "uncompromising palate," "About the Critic"). Draft
   a Brandon-voice replacement and ship after sign-off.
3. **Reference-faithful Reviews discovery page.** Match
   `johnson_reviews_discovery_gold_edition`: sidebar filters
   (category + city + rating), bento grid with one featured asym
   card, "Sommelier Badge" chips for tags.

## NEXT (this month)

4. **Reference-faithful Review Detail.** Rebuild
   `app/(frontend)/reviews/[slug]/page.tsx` to match
   `johnson_reviews_review_detail_gold_edition`: full-bleed hero
   image, drop-cap lede, "The Verdict" sub-scored block, sticky
   Concierge sidebar (address, hours, cuisine, price tier, link-out
   "Visit Site" CTA), inline image gallery with asymmetric offsets.
   *Decision needed:* keep 1–5 star rating, or extend Reviews
   schema to support sub-scores (Food / Service / Vibe / Family
   Friendliness / Value)?
5. **Schema.org JSON-LD.** `Restaurant`/`LocalBusiness`,
   `Review`, `AggregateRating`. Inject on review detail pages via
   a shared `<JsonLd>` component.
6. **City hub pages.** `/places/[city]` template. Hero +
   filtered grid + map preview. Generate from existing review
   addresses; backfill cities into a Categories taxonomy.
7. **v1 review-intake CLI.** `scripts/intake.ts` (Claude Agent
   SDK). Conversational interview → structured intake JSON →
   `awaiting-review` draft in Payload.

## LATER (this quarter and beyond)

8. Photo ingestion pipeline from Google Photos shared albums,
   with kid-photo EXIF/geotag scrubbing as a hard gate.
9. Search: ship a real `/search` page backed by the
   `@payloadcms/plugin-search` index (currently it's a dialog only).
10. About page rebuild with Brandon's actual story.
11. Newsletter shell — capture form → Resend (already wired) →
    a transactional welcome email. No regular sends until list > 250.
12. Analytics — Vercel Web Analytics + GSC + a tiny `/admin/metrics`
    dashboard pulling from each.
13. Affiliate program audit — Booking.com / Expedia / OpenTable —
    *requires Brandon sign-off before any signup.*
14. Press / outreach — drafts only into `content-drafts/outreach/`.

## Won't do (for now)

- Switch CMS away from Payload. Already invested.
- Re-platform off Vercel. Working fine.
- Native mobile app. Ridiculous.
- Member paywall / "Inner Circle" subscription (the reference shows
  this UI block; we will not actually build a paid tier).
