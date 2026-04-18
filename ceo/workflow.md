# Review Intake Workflow

The review pipeline is the #1 lever on the business. Brandon's
time is the bottleneck; this pipeline exists to collapse the
distance between "we went to X" and "review is live".

## Current capabilities (2026-04-18)

- Payload `reviews` collection exists with fields:
  `googleReviewId`, `businessName`, `slug`, `address`,
  `rating` (1–5), `reviewDate` (relative string), `reviewText`,
  `photos[].url`, `totalPhotoCount`. See
  `apps/app/src/collections/Reviews.ts`.
- WordPress migration scripts in `apps/app/scripts/`
  (`migrate-wp.ts`, `migrate-galleries.ts`,
  `remigrate-content.ts`) — the legacy review backlog is
  already in the Payload DB.
- Frontend: `/reviews` index (needs redesign alignment — fixed
  in first-run PR), `/reviews/[slug]` detail.
- **No conversational intake surface yet.** Brandon currently
  has no first-party UI that says "describe a place, I'll
  draft."

## Target intake flow

```
(Brandon) mention place     →    (CEO) ask clarifying questions
          ▲                                ▼
          │                    (CEO) draft in Brandon's voice
          │                                ▼
 (Brandon) redline              (CEO) propose photo selections
          │                                ▼
          └─────── redlines ──── (CEO) ship: publish + schema +
                                        internal linking +
                                        category updates
```

Brandon-facing surfaces to build (rough priority):

1. **Slack intake** — Brandon drops a message in the CEO
   channel: "we went to Maison Cafe this weekend, they had a
   new lemon tart." CEO picks it up the next night, writes up
   a question batch, and drafts once unblocked. This is the
   fastest path and uses infrastructure that already exists.
2. **Voice-note ingest** — Brandon dictates a 2-minute memory
   dump into his phone; dropped into a shared Drive folder;
   CEO transcribes + asks follow-ups. Needs a Drive mount or
   folder convention. Not blocking; design later.
3. **Google Photos album handoff** — Brandon shares a Photos
   album link per trip. CEO picks images, writes captions,
   strips metadata. Needs photos.md operating rules finalized.
4. **Admin UI for queue** — a minimal Payload admin view or
   a custom page at `/ceo/queue` (protected) listing drafts,
   their status, and what they're blocked on. Low priority
   until volume warrants it.

## Operating questions the CEO should always ask

Per Brandon's CLAUDE.md-style mandate:

- What stood out?
- What surprised you?
- Would you go back? Who would you send here?
- Was this good for families / couples / solo / groups?
- Any moment that made the trip?
- Any frustrations? What would have to change for you to come
  back?
- Kids: best thing they ate, best thing they did, how they
  handled it.
- Logistics other families want:
  parking / reservations / stroller-friendly / kid menu /
  wait time / noise level / cost per head.

## Draft template

See `voice.md` → "Structure template (provisional)". Every
draft should have:

- **Lede**: 30-second take, who was there, when.
- **Logistics block**: address, hours, price, parking, kids,
  reservations.
- **The visit**: 2–4 concrete paragraphs.
- **Food / main event**: specific items, specific verdicts.
- **Verdict**: would-we-go-back + who-it's-for sentence, and
  (once signed off) the 5-axis scorecard.

## Publish checklist

- [ ] Voice check: read out loud, no banned vocabulary
      (see voice.md).
- [ ] Schema: Review + Restaurant/LocalBusiness/
      TouristAttraction + AggregateRating injected via
      `lib/structured-data.ts`.
- [ ] Alt text on every image, descriptive not keyword-stuffed.
- [ ] Geotag stripped from any photo containing the kids
      (see `photos.md`).
- [ ] Internal links: at least 2 related reviews (same
      location or same cuisine/category) in the body.
- [ ] Category + tag assigned in Payload.
- [ ] Sitemap regen picks it up (sitemap.ts is dynamic, so
      automatic on next build).
- [ ] Listed on `/reviews` index after publish.

## North-star metric

**Hours from "Brandon mentions a place" to "review is live."**

Target progression (aspirational):
- Q1 baseline: unknown (measure it).
- Q2: <72 hours median for a review Brandon pre-approved.
- Q3: <24 hours when Brandon answers the question batch
  promptly.

## Current friction

(Populate after first real review moves through.)

- Reference voice drift — until voice.md has real Brandon
  writing in it, drafts will sound too "critic-y".
- No formal queue UI — using `review-queue.md` as the system
  of record for now.
- No photo handoff convention yet — first Google Photos album
  Brandon shares will define the pattern.
