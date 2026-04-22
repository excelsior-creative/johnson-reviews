# Publish Checklist

Run every item before flipping a draft to `published` on Payload.
If any item can't be satisfied, park the draft and ask Brandon.

## Voice + accuracy

- [ ] Every factual claim traces to something Brandon said. No
      invented details, no imagined dishes or rooms, no
      "we loved the tiramisu" without Brandon confirming they had
      the tiramisu.
- [ ] Ban-list scrub passed (see `/ceo/voice.md` §4):
      no "hidden gem," no "must-visit," no "culinary masterpiece,"
      no "nestled in," no "wanderlust," etc.
- [ ] Opens with a concrete anchor (moment or geography), not a
      superlative.
- [ ] Family references are natural — "the kids," "our oldest" —
      not saccharine.
- [ ] Disappointments (if any) are honest with context. Not
      mean. Not snarky.
- [ ] Logistics section present (parking / reservation / kid
      notes / wait / price) — or explicitly marked "not
      confirmed" when Brandon didn't cover it.

## Structure

- [ ] 400–900 words (restaurants ~500–700; hotels and travel
      posts can run longer).
- [ ] Title is specific: includes the place name and usually a
      geography anchor. No clickbait.
- [ ] Excerpt (meta description) written — 120–160 chars,
      on-voice, no "hidden gem."
- [ ] Featured image set (or explicitly queued as a pending
      upload in the review-queue).
- [ ] Category assigned (at least one).
- [ ] Tags assigned (geography + place type + meal type if
      applicable).

## Images

- [ ] Every photo has alt text. Descriptive, not "food photo 1."
- [ ] **Geotags stripped from every photo that contains the
      kids.** Always. No exceptions.
- [ ] No photos where a kid is clearly tagged at a school,
      friend's home, or recurring daily location.
- [ ] First-name usage for kids ONLY if Brandon has signed off.
      Default: "the kids," "our oldest."
- [ ] Image files compressed, responsive (Next/Image handles most
      of this) and under ~300KB for hero.

## SEO + schema

- [ ] Slug: lowercase, hyphenated, contains place name + city.
      No "must-visit" style adjectives in the slug.
- [ ] Article JSON-LD emitting on the page (auto, via
      `generateArticleSchema`). Verify in Rich Results Test.
- [ ] Review JSON-LD emitting with itemReviewed typed correctly
      (Restaurant / LodgingBusiness / TouristAttraction /
      LocalBusiness / Place). Category slugs drive this; confirm
      the post has a matching category.
- [ ] Canonical URL set (Next Metadata handles this if
      `generateArticleMetadata` is used — verify on new pages).
- [ ] Internal links: at least one link to a related review or
      location hub where one exists.

## Publish mechanics

- [ ] Payload `_status: published` and `publishedDate` set.
- [ ] `afterChange` revalidation hook fires (check server log for
      "Revalidated: /blog/<slug>"). If missing, manually POST to
      `/api/revalidate` with the secret.
- [ ] Sitemap includes the new URL (next sitemap rebuild).
- [ ] Social draft queued in `/ceo/content-drafts/` for Brandon
      to post (Slack ping once it's ready).

## Log

- [ ] `/ceo/review-queue.md` — move from `drafting` → `published`
      with the cycle time in hours.
- [ ] `/ceo/voice.md` §8 — log any redlines Brandon made before
      publish.
- [ ] Tonight's journal entry — note the publish.
