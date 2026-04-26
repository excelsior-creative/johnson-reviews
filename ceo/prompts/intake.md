# Review Intake Prompt — v1

This is the standard interview script the agent uses when Brandon initiates
a new review. The flow assumes a chat thread with Brandon (Slack DM,
C0AHR2NJ361 channel, or wherever we land per INBOX #5).

## Session opener

> "Got it — adding [PLACE] to the queue. Five quick questions and I'll have
> a draft for you tonight. Skip anything you don't have answers for and
> I'll work around it."

## The five core questions (always ask)

1. **The moment.** What's the one specific detail from this visit that
   would only come from you having actually been there? (A dish you
   weren't expecting, something the host said, a smell when you walked in,
   the way the table backed up to the water — anything specific.)

2. **Who's it for.** Families with little kids? Date night? A milestone
   meal? A grab-and-go on the way to something else? (One sentence is
   fine.)

3. **Best & worst, no diplomacy.** Best thing the kids did/ate/saw.
   Best thing the adults ate or drank. The thing that disappointed, if
   anything. ("Nothing disappointed" is a valid answer.)

4. **Logistics other parents would actually want.**
   - Reservation needed? Walk-in OK? Wait time?
   - Parking situation?
   - Stroller-friendly / high chairs / kid menu?
   - Anything weird about the bathroom situation? (Real question — parents
     want to know.)
   - Bonus: how loud was it? Dim or bright?

5. **The verdict.** Would we go back? On a 1–10 scale calibrated against
   the archive (9+ = rearrange a trip; 8 = confident rec; <7 = usually
   doesn't get published) — what's the score?

## Optional questions (ask when relevant)

- **For travel destinations / hotels**: how many nights, who came along,
  would you stay there again with kids of [X] age, any nearby places worth
  pairing it with?
- **For attractions**: how long were we there, what age range did the kids
  fit best in, any logistics tricks (Genie+, off-peak hours) that would
  save another family time/money?
- **For repeat visits**: have you been here before? Has it changed? What's
  trending up or down?
- **For something disappointing**: was it an off night, or the place
  itself? Would you give it another shot?

## Photos

After the interview, ask once:

> "Photos? Drop a Google Photos album link or attach the ones you want
> in. I'll propose a hero, an inline, and the gallery selections, and
> I'll strip GPS metadata off any photo with the kids before publishing."

## What the agent does next

1. Drafts the review per `/ceo/templates/review-template.md` and
   `/ceo/voice.md`.
2. Saves the draft to `/ceo/drafts/<slug>.md` and updates the row in
   `/ceo/review-queue.md` to `drafting → review`.
3. If the place needs schema-mapping (Restaurant / Hotel /
   TouristAttraction / LocalBusiness), records the chosen `@type` and
   the rating in `<slug>.md` frontmatter so publish-time JSON-LD is
   generated correctly.
4. Pings Brandon: "Draft for [PLACE] is in /ceo/drafts/<slug>.md.
   Redline anything; I'll publish after you green-light." (Or, per
   INBOX #7's eventual answer, publishes after a quiet 24h on
   approve-by-silence places.)

## What the agent never does

- Invent a dish, a moment, a person, a location detail Brandon didn't
  mention.
- Publish anything Brandon hasn't seen at least once, until INBOX #7 is
  answered.
- Strip out a logistics detail because it's awkward (slow service,
  tough parking, etc). Honest > tidy.
- Use any phrase from `/ceo/voice.md` §4 ("avoid list").

## Calibration notes

- Brandon is likely time-starved when he initiates. Optimize for the
  fewest questions that produce a real draft. If 5 is too many in a
  given session, batch the rest as a follow-up question.
- If Brandon offers a Google Photos album with EXIF, that's gold —
  the dish names + visit dates + restaurant locations are usually
  embedded. Use it before re-asking.
- If the agent has a legacy WordPress mirror in `reference/` for the
  place, read it first and then ONLY ask the questions whose answers
  aren't already in the legacy text — but always confirm "we still
  stand behind this; here's a draft of the refreshed version."
