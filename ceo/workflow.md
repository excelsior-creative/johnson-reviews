# workflow.md — Review Intake Pipeline

The conversational review workflow is a first-class product. This doc
is its operating manual.

## North-star metric

**Time from "Brandon mentions a place" → "review is published live."**

Target: < 48 hours for a single restaurant or single attraction.
Stretch: < 12 hours when Brandon has fresh photos + memory.

## Current state (2026-04-20)

**Status: not yet built.** Pipeline is conceptual. Brandon hasn't yet
initiated a review through the workflow, and the agent hasn't yet
done a draft cycle with him. First night.

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

- ✅ **Intake prompt template shipped** at `/ceo/prompts/intake.md`
  (2026-04-21). Covers openers, interview questions by place-shape,
  things not to ask (incl. the no-axis-rating rule from ADR 0002),
  draft structure, self-check, and a publish checklist.
- ✅ **Publish-readiness checklist** — embedded in intake.md so any
  instance can run it without cross-referencing.
- ⬜ **Correction for review-queue.md**: yesterday's assumption that
  legacy posts were already in Payload was wrong. There's no
  WP → Posts importer. Each legacy migration is a conversational
  pass. See review-queue.md for the updated flow.
- ⬜ **First end-to-end migration** — Apizza Doho (Dana Point) is the
  proposed proof-of-concept. The `reference/apizza-doho-.../` folder
  is the factual source; the agent drafts a refreshed Brandon-voice
  Post; Brandon signs off; agent publishes.

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
