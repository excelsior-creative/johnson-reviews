# Review intake workflow

## North-star metric

Time from "Brandon mentions a place" → "review is live, on-brand,
indexed, internally linked."

## Current state

**v0 — not built yet.** Reviews currently flow in either by hand
(Brandon types into Payload admin) or via the WordPress migration
(`scripts/migrate-wp.ts`, `scripts/migrate-galleries.ts`,
`scripts/remigrate-content.ts`). There's no conversational pipeline,
no question-template, no draft staging, no automated photo proposal.

Until v1 ships, the manual loop is:
1. Brandon @-mentions a place in Slack or just tells the CEO
   instance about it during a session.
2. CEO logs the mention to `review-queue.md`.
3. CEO asks (in nightly Slack batch) the gap-filling questions.
4. Brandon answers in his own time.
5. CEO drafts in Brandon's voice → posts draft to Slack as a
   markdown blob (not yet to Payload — keeps the redline loop tight).
6. Brandon redlines.
7. CEO updates `voice.md` with anything redlined.
8. CEO publishes via Payload admin (programmatically).

## v1 design (to build)

**Storage.** A new Payload collection: `ReviewDrafts` (or a `status`
field on `Reviews` with values: `intake`, `drafted`, `awaiting-review`,
`approved`, `published`). Probably the latter — single source of
truth, one publish event.

**Intake form.** A private `/admin/intake` route or a CLI script that
prompts Brandon (or accepts a paste-dump) and structures it into
fields the drafter can use:
- Establishment name, address, city, cuisine/category.
- Date(s) of visit. Who was there.
- Standout dish(es), standout moment(s), frustration(s).
- Star rating.
- Logistics notes (parking, reservations, kid-friendliness, etc.).
- Photo source (Google Photos album URL or local folder).
- Free-form "what else stood out" textarea.

**Conversational mode.** A standalone Claude Agent SDK script
(`scripts/intake.ts`) that:
- Loads `voice.md`, `strategy.md`, the review template.
- Walks Brandon through the questions interactively.
- Asks follow-ups when answers are thin ("you said it was great
  for the kids — what specifically did they react to?").
- Writes a structured intake JSON to disk + creates a `ReviewDrafts`
  row in Payload via the local API.

**Drafting prompt.** A system prompt assembled from `voice.md`'s ban
list, format conventions, and a few exemplar published reviews.
Output: structured markdown that maps onto the Payload Review
schema. Stays as a draft until Brandon approves.

**Photo proposal.** When a Google Photos album URL is supplied:
- Pull the album (Google Photos API or shared-link scrape).
- Strip EXIF (esp. GPS) on any image that contains kids.
- Suggest 4–8 photos with proposed alt-text + caption.
- Brandon picks / replaces.

**Publish step.** Sets status → `published`, generates the slug,
inserts the schema.org JSON-LD (`Restaurant`, `Review`,
`AggregateRating`, etc.), updates the relevant category and city
hub pages, fires sitemap regeneration.

## Friction points (running list — populate from real loops)

- Voice drift on first drafts. Mitigation: keep `voice.md` updated
  with every redline; include the ban list in the drafter prompt
  every time.
- Logistics gaps. Brandon often won't remember parking specifics
  weeks later. Mitigation: add "logistics" to the question template
  even when not naturally surfaced.
- Photo dump format inconsistency (link, folder, attachment).
  Mitigation: accept all, normalize on intake.

## Improvements in flight

- (none yet — workflow is still the v0 manual loop)

## Improvements queued

- Build the v1 intake CLI (Claude Agent SDK script).
- Add `status` enum to Reviews collection.
- Build the photo-proposal step.
- Build the schema.org block on publish.
- Build a Slack slash-command (`/jr-intake "Apizza Doho — Dana Point"`)
  that opens the intake conversation right in DMs with Brandon.
