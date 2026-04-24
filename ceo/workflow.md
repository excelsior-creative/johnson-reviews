# workflow.md — Review Intake Pipeline

The conversational review workflow is a first-class product. This doc
is its operating manual.

## North-star metric

**Time from "Brandon mentions a place" → "review is published live."**

Target: < 48 hours for a single restaurant or single attraction.
Stretch: < 12 hours when Brandon has fresh photos + memory.

## Current state (2026-04-24)

**Status: documented end-to-end; not yet exercised with Brandon.**
The intake prompt (`/ceo/prompts/intake.md`) now covers the full
cycle: interview → draft → photo proposal → redline → publish →
schema → internal links → cycle-time log. Publish-side infrastructure
(schema + metadata + canonical URLs) shipped 2026-04-24.

Next step is the first real cycle: Brandon mentions a place, the
agent runs the intake script, produces a draft, and we time the
north-star metric.

The infrastructure that exists:
- Payload CMS Posts collection with `_status: draft|published`,
  Lexical rich-text, `featuredImage`, slug auto-generation,
  revalidation on publish.
- Reviews collection (separate, for raw Google Reviews schema).
- Categories + Tags collections.
- Live preview in Payload admin.

The infrastructure that does NOT exist:
- Conversational intake script / prompt template.
- Review draft template (structure, sections).
- A "review queue" UI in Payload admin (currently just `/ceo/review-queue.md`).
- Photo proposal automation from Google Photos.
- A way for Brandon to redline a draft and have the agent ingest the
  redlines into voice.md.

## Target flow

1. **Brandon initiates.** Slack DM, ping in C0AHR2NJ361, or just a
   message "we went to X tonight." Optionally with a Google Photos
   album link or image folder.
2. **Agent interviews.** Asks specific, scannable questions:
   - **What stood out?** (the moment that made the trip)
   - **Would you go back? Who is it for?** (families, couples, solo,
     business, kids of what age)
   - **Best thing the kids did / ate / saw.**
   - **Best thing the adults ate / drank.**
   - **Any frustrations?** (wait, parking, service)
   - **Logistics other families would want:** parking, reservation,
     stroller-friendly, kid menu, wait time, walkable, restroom
     situation, high chair availability.
   - **What's the one specific detail that would only come from
     having actually been there?**
3. **Agent drafts.** ~500–700 words. Per `/ceo/voice.md`. Structure
   (working v1 — to be refined):
   - **Opening hook** — the moment or the geographic anchor.
   - **What we ordered / did.** Specific names of dishes or rides.
   - **Who it's for.** Family fit, age fit, occasion fit.
   - **What worked.** With at least one specific.
   - **What didn't.** Honest, warm.
   - **Logistics.** Parking, reservations, kid notes, accessibility.
   - **Bottom line.** Would go back? Who should go?
4. **Agent proposes photos.** From the Google Photos album, suggest
   3–6 images: one hero, several inline. With alt text and captions.
   **Strip geotags from any photo with the kids.**
5. **Brandon reviews.** Quick pass. Redlines voice + accuracy.
6. **Agent publishes.** Posts collection draft → published. Schema
   (Restaurant / TouristAttraction / LocalBusiness + Review +
   AggregateRating where appropriate). Updates internal links from
   related reviews. Updates category / location pages. Pings
   sitemap revalidation.
7. **Agent logs.** Update review-queue.md (move from "in progress"
   to "published"). Update redlines log in voice.md if Brandon
   changed anything. Note the cycle time.

## Friction points (to track as we run)

- _(empty — first night, nothing to log yet)_

## Improvements in progress

- Build the legacy-WP migration backlog into `/ceo/review-queue.md`
  from the 60+ slugs already in `reference/`. This is the lowest-
  friction starting point: Brandon went to all those places, the
  factual basis already exists, the migration "interview" is
  Brandon confirming or correcting the existing review.
  **Done 2026-04-20** — queue is populated.
- Build a Brandon-facing intake prompt template (in
  `/ceo/prompts/intake.md`) that the agent can use whenever Brandon
  initiates a new review. **Done 2026-04-24** — two-pass conversational
  interview + drafting rules + photo proposal rules + publish steps +
  legacy-migration variant + hard "never do" list.
- Wire per-page structured data (Schema.org `Review` for the Reviews
  collection, `BlogPosting` for Posts, with Brandon as `Person` author)
  into the slug pages. **Done 2026-04-24** — schema + `generateMetadata`
  now shipping on `/blog/[slug]` and `/reviews/[slug]`.
- Build a publish-readiness checklist (schema, alt text, internal
  links, geotag stripping, related-reviews block, category page
  refresh). See `/ceo/prompts/intake.md` §"Publish steps" —
  checklist lives there. **Done 2026-04-24.**

## Open questions for Brandon

1. **Where do you prefer to initiate reviews?** Slack DM, the
   C0AHR2NJ361 channel, email, voice memo? Pick one and we'll
   make it the canonical intake channel.
2. **Google Photos access** — willing to share an album link or
   give the agent a way to read one? Otherwise we operate text-only
   and you upload photos yourself at publish time.
3. **Approve-by-silence vs. explicit-approve** — for low-stakes
   review drafts (your own past Google reviews migrated to long
   form), is it OK if I publish after a quiet 24 hours, or do you
   want eyes on every single one?
