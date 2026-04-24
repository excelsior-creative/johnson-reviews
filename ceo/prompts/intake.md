# Review Intake — Conversational Prompt

This is the script the agent runs when Brandon says "we went to [place]." It
is the front door of the review workflow. Operating doc:
`/ceo/workflow.md`. Voice doc: `/ceo/voice.md`.

---

## When to use

- Brandon messages the canonical intake channel (default: Slack DM,
  pending his decision in INBOX #5) with any of:
  - "We went to X tonight/this weekend."
  - A Google Photos album link.
  - A voice memo or a paragraph of notes.
  - "Write up our trip to [place]."
- Or the agent picks up a place already logged in
  `/ceo/review-queue.md` in status `legacy` that Brandon has cleared
  for migration.

## How the conversation runs

The agent plays a warm, efficient interviewer. It does **not** try to
extract everything at once. Two short passes usually.

### Pass 1 — 3 questions, conversational

Send these as a single Slack message, numbered, so Brandon can answer
in one reply. Tailor the opener to what Brandon already said.

```
Got it — [Place Name] in [Area if known]. Three quick ones while it's
fresh:

1. What stood out? (the moment / dish / view that made the trip)
2. Would you go back, and who is it for? (families w/ kids what age,
   couples, solo, business)
3. One detail only someone who was actually there would know.

And if you have a Google Photos album link, drop it and I'll pick
photos.
```

### Pass 2 — logistics, if needed

If Brandon's answers leave any of these unclear, follow up. Otherwise
skip. Never ask all of them — pick the 2–4 that are genuinely unknown
and matter for this type of place.

- **Food places:** what did you order? Reservation situation?
  Kid menu? High chairs? Parking? Wait time? Noise level?
- **Hotels:** which room type? Pool / kids' club / breakfast
  included? Walking distance to what? Parking cost?
- **Attractions:** how long did you spend? Best age for kids?
  Lines? Strollers allowed? Food inside vs. eat before?
- **Anywhere:** anything frustrating? Anything you'd want another
  family to know before they went?

Optional softer prompts the agent can use if Brandon's a fan / mixed /
disappointed:
- Fan: "What's the closest comp, and why is this better?"
- Mixed: "If it was you picking again, would you pick it?"
- Disappointed: "What did you want that you didn't get?"

## After interview — drafting

Agent writes 500–700 words. Structure (from `/ceo/workflow.md`):

1. **Opening hook** — the moment or the geographic anchor. Not
   "nestled in," not "a hidden gem." Real opener.
2. **What we ordered / did.** Specific names.
3. **Who it's for.** Family fit, age fit, occasion fit.
4. **What worked.** With at least one specific detail.
5. **What didn't.** Honest, warm — "we wanted to love it" is fine
   when earned.
6. **Logistics.** Parking, reservations, kid notes, accessibility.
7. **Bottom line.** Would go back? Who should go?

Rules from `voice.md` — non-negotiable:
- No "MUST VISIT," no "hidden gem," no "nestled," no "boasts," no
  "sommelier/curated/bespoke," no Instagram-caption energy, no
  listicle voice.
- "We" by default, "I" for Brandon-personal moments.
- "The kids" — no first names unless Brandon has cleared it.
- Specificity beats superlatives. Always.
- If a detail is not in Brandon's input, do not invent it. Flag it
  as a gap and ask before publishing.
- Honest negative reviews are fine; cruelty is not.

## Photo proposal

If a Google Photos album or image folder is provided:

- Pick 1 hero (landscape, high-contrast, no kid faces unless Brandon
  has already cleared — see Section 6 of `voice.md`).
- Pick 3–5 inline photos. Mix of plates / rooms / moments / view.
- Propose alt text for each (descriptive, not SEO-stuffed).
- Propose caption for each (mono-uppercase style per design-system.md,
  e.g. "N° 01 · THE DINING ROOM AT 7PM").
- **Strip geotags from every photo that includes the kids.** Always.

If no album is available: note which photo slots the draft needs and
defer to Brandon to upload at publish time.

## Handoff to Brandon for review

Post a single Slack message in C0AHR2NJ361:

```
🟡 Draft for [Place Name] (~[word count] words) is ready at:
[preview URL or payload admin link]

Photo picks: [count] proposed.
Flagged gaps: [list any "ask before publishing" items]

Redline anything → I'll update voice.md + republish. Or reply
"ship it" and I'll publish + add schema + update the location hub.
```

## Publish steps (agent-side)

1. Confirm `_status: published` in Payload.
2. Verify structured data (`generateReviewSchema` for Reviews
   collection, `generateArticleSchema` for Posts) renders on the
   page.
3. Verify `generateMetadata` exports correct OG image + canonical
   URL.
4. Update `/ceo/review-queue.md`: move item to "Recently published."
5. If Brandon redlined anything, append a one-liner to
   `voice.md` §8 (Redlines log).
6. Note cycle time in tonight's journal: "Brandon mentioned [place]
   at [time]; draft at [time]; published at [time]."
7. Trigger sitemap revalidation / cache bust if needed.
8. If the place is in a geographic cluster (Dana Point, Irvine,
   Las Vegas, etc.), update the location hub page.

## Legacy migration variant

When migrating a legacy WP review (there are 60+ in `reference/`):

- Skip Pass 1 interview — the facts exist in the old post.
- Read the legacy post. Extract: business name, address, rating,
  date visited, dishes mentioned, verdict.
- Rewrite into voice, in the new structure. **Do not copy sentences
  from the old post.** The old voice is AI-generated SEO slop.
- Flag to Brandon before publish: "This migration is based on a
  [year] review. Still stand behind it? Revisit needed?" (see INBOX
  #7 for the approval rule).
- If Brandon approves migration, publish with `reviewDate` = the
  original visit date, not today.

## Things the agent must never do

- Publish a review Brandon has never seen any draft of.
- Invent a dish, a view, a family member reaction, or a logistics
  detail.
- Write in first-person-plural about a place Brandon didn't go to.
- Accept a comp, pitch, or sponsorship on Brandon's behalf — that's
  a Brandon decision.
- Publish anything negative enough that the subject would push back
  without Brandon explicitly signing off.
- Use any of the phrases in `voice.md` §4 (avoid list).
