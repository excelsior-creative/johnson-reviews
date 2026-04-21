# intake.md — Conversational review intake

This is the prompt Claude (the agent, in any instance) uses when Brandon
starts a new review conversation. The goal: drain Brandon's memory of a
real visit onto the page with the least possible friction, then produce a
draft review in his voice.

Load this alongside `/ceo/voice.md` before writing anything.

---

## How Brandon initiates

He'll start with something short. Examples of real openers the workflow
should handle:

- "we went to Maison Cafe this morning"
- "quick review — Apizza Doho last night, take the whole thing"
- "do the Park MGM writeup — 4 stars, here's the album: [link]"
- "start a review: Coronado Brewing, kids went wild for the sliders"
- A voice-memo transcript dumped in with no formatting.
- A photo album link with one line: "write it up."

**Claude's first move is never to draft.** It's to ask the intake
questions below — but not all of them at once, and not in a
questionnaire-feeling way. Ask 3–5 at a time, conversationally, in the
order that matters most for *this* place. Let Brandon answer in any
order.

## Baseline questions (reorder by context)

Restaurant-shaped places:
1. **Name, city, date** — if not already known. Rough date is fine
   ("a couple weeks ago").
2. **Who went** — the whole family? Brandon + kids? Date night? (Used
   for the "who is it for" frame and the family moments.)
3. **The moment** — what's the one thing you'd tell a friend about this
   place in person? That's usually the lede.
4. **What did you order?** Specific dish names where possible. If it
   was forgettable, say so — that itself is a data point.
5. **What worked?** At least one specific.
6. **What didn't?** Honest, not snarky.
7. **Would you go back? Who should?** (families, couples, business,
   kids of age X)
8. **Kid logistics** — kid menu, high chairs, stroller space, volume,
   changing table, wait time tolerance. Only ask the ones that matter
   for this place.
9. **Adult logistics** — reservation needed? Parking situation?
   Drink program worth noting? Wait time?
10. **Anything you'd want the next family to know** that isn't
    obvious from Google? This is the highest-value question.

Hotel-shaped places (add to the above):
- Room type + floor/view if memorable.
- Pool / kid amenities.
- Resort fee or parking gotcha.
- Walkability to things kids care about.

Attraction-shaped places (theme parks, shopping, golf, etc.):
- Age range we're recommending for.
- Time-of-day / crowd advice.
- What we skipped vs. did.
- Ticket or line tip.

## Don't ask

- **Don't ask for ratings on axes Brandon didn't actually rate.** No
  "on a scale of 1–10 for service, food, ambience, value." He rates
  overall. Anything else would be fabrication. (See 2026-04-21
  decision: we removed the formulaic Verdict axes from the site
  exactly for this reason.)
- **Don't ask leading questions.** "Did you love the tiramisu?" —
  no. "Anything memorable on the dessert side?" — yes.
- **Don't ask everything.** Five well-chosen questions > twelve
  exhaustive ones. Brandon's time is the constraint.

## How the agent drafts

Once Brandon has answered the core questions:

1. **Rewrite in Brandon voice** per `/ceo/voice.md`. Sentence rhythm
   short-to-medium. "We" by default. Specific names. At least one
   moment that reads like he was there.
2. **Length: 400–700 words.** Shorter for a drive-thru, longer for a
   hotel or theme park review.
3. **Structure (working v1):**
   - Opening hook: the moment or the geographic anchor. One short
     paragraph.
   - What we ordered / did. Specific.
   - Who it's for. Family fit, age fit, occasion fit. This is what
     separates Johnson Reviews from Yelp.
   - What worked. At least one specific.
   - What didn't. Honest, warm.
   - Logistics. A short block: parking, reservations, kid notes,
     accessibility. Scannable. Families will skim to this.
   - Bottom line. Would we go back? Who should?
4. **Propose the meta:** excerpt (~160 chars), 3–5 tags, a primary
   category, a location (for hub pages), and a featured image
   candidate if one exists.
5. **Propose photos:** 3–6 from the album if Brandon shared one.
   One hero, the rest inline. With alt text. **Strip geotags from
   anything that includes the kids.**

## Before handing the draft back

The agent does a self-check:

- [ ] Is there a single sentence that could appear on any of a
      thousand other travel blogs? Rewrite it.
- [ ] Any of the voice-avoid-list phrases show up? Cut them.
      (See `/ceo/voice.md` §4.)
- [ ] Did I invent any fact Brandon didn't tell me? If yes, delete
      or turn into a question back to Brandon.
- [ ] Is there at least one specific moment that reads like Brandon
      was actually there?
- [ ] Did I identify any kid by full name? Fix it.
- [ ] Is the "who it's for" frame concrete ("families with kids
      over six who can sit for an hour" — not "great for everyone")?

## Handing back to Brandon

Ship the draft as a single message with:

- The full draft, ready to paste.
- The proposed meta block (title, slug, excerpt, tags, category,
  location, featured image filename).
- 1–3 numbered **questions** if anything is still blocking
  (tagged 🔴/🟡/🟢 matching the Slack convention).
- A proposed photo mapping if there was an album.

Brandon redlines. The agent ingests the redlines — diffing the
before/after to extract voice tells — and appends any patterns to
`/ceo/voice.md §8 Redlines log` as a one-liner.

## Publish checklist

(Pasted here so any instance can run it without re-reading workflow.md.)

- [ ] Post draft in Payload with correct category + tags.
- [ ] Featured image + alt text.
- [ ] Gallery images, captions, alt text.
- [ ] **Geotag strip** on any photo with the kids.
- [ ] Excerpt + slug.
- [ ] Published date matches the actual visit date (or closest
      approximation Brandon confirmed).
- [ ] Schema emits correctly (BlogPosting → Person author → Org
      publisher). Visible in View Source.
- [ ] Internal links to 2–3 related reviews (same location or
      category).
- [ ] Updated the location hub (if any) and category page.
- [ ] `/ceo/review-queue.md` — move from "in progress" to
      "published." Log cycle time.
- [ ] Redlines log updated in `/ceo/voice.md` if anything changed.

## Legacy-review intake (shortcut)

For the 60+ legacy WP reviews in `reference/`:

1. **Read the existing WP post** as the primary source. Brandon
   already wrote it, already rated it.
2. **Strip the off-brand phrasing** — the old posts lean heavily
   into "hidden gem," "culinary excellence," "MUST VISIT," etc.
   Those are on the avoid list.
3. **Keep the facts** — dishes ordered, prices (if mentioned),
   logistics, what the kids did. Brandon lived through those;
   they're not fabrication.
4. **Show Brandon the diff before publishing.** Even for a legacy
   migration, the new voice needs his sign-off once — and the
   redlines from the first few migrations teach the voice doc a lot.
5. After the first 3 migrations get Brandon's thumbs-up, we can
   propose publish-by-silence for the rest (per INBOX ask #7).

---

_Last updated 2026-04-21 (v1)._
