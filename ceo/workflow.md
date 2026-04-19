# Review Intake Workflow

The conversational review workflow is a product we own. This doc is its
operating manual. Keep it current — what works, what Brandon keeps
redlining, where the friction is.

## North-star metric

**Time from "Brandon mentions a place" → "review is live."**
Current: not yet measured. The workflow isn't built.
Target (v1): under 48 hours of Brandon-time-elapsed for a typical
restaurant review, assuming he provides photos and answers 3–5
questions.

## The flow (target)

1. **Brandon initiates.** He pings the CEO agent (Slack, or by editing
   `review-queue.md` directly) with a place name and whatever raw
   material he has: a Google Photos album link, a voice memo, a text
   dump of memories, or just "we went here."
2. **Intake captures.** The place lands in `review-queue.md` with
   whatever state Brandon gave, and any photos get noted.
3. **CEO interviews.** The agent asks targeted questions that unlock a
   good review. For a restaurant:
   - What stood out (good or bad)?
   - What'd the kids eat? What'd they think?
   - Would you go back?
   - Who is this for — families? Couples? Solo? Date night? Quick
     lunch?
   - Any logistics other families should know (parking, reservations,
     stroller-friendly, kid menu, wait, price)?
   - Any moments / specific details worth remembering?
   For travel / experience: substitute the logistics questions (stroller
   terrain? wait times? shade? food availability? bathrooms?).
4. **Agent drafts.** In Brandon's voice per `voice.md`, following the
   structural defaults. Proposes photos from the album with
   captions. Puts the draft in Payload as a Posts doc with
   `_status: draft`.
5. **Brandon reviews.** Quick pass for accuracy and voice. Redlines.
6. **Publish.** Agent publishes, with schema (Restaurant or
   TouristAttraction + Review), internal links to related reviews,
   category/location page updates.
7. **Workflow learns.** If Brandon redlined a phrase, update
   `voice.md`. If a question was obviously missing, update the
   interview script above.

## Night-time question protocol

The CEO runs overnight. Brandon isn't around to answer live. When a
review is blocked on info only Brandon has:

- Queue the question in the Slack end-of-night summary under the
  "Questions for Brandon" section.
- Format: `🔴/🟡/🟢 [Place name] — [specific question]`.
- Batch. Morning-Brandon answers five questions in one shot.
- Also log the question in `review-queue.md` under the place and in
  `INBOX.md` for redundancy.

## Capabilities (what's built)

**Nothing yet.** As of Night 1, the workflow is conceptual. Built so far:
- `review-queue.md` skeleton.
- This operating doc.
- `voice.md` principles.

## In progress

- Nothing in flight for the workflow specifically. Redesign is taking
  precedence. Workflow is priority 2.

## Friction points (known)

- **No capture surface.** There's no Slack bot, no form, no intake
  route. Brandon has to either edit `review-queue.md` directly or ping
  the CEO in Slack and hope it's seen.
- **No voice calibration.** Without Brandon-written samples, drafts
  will sound generic-blog. See `voice.md`.
- **No photo pipeline.** No mechanism to pull images from a Google
  Photos album, strip geotags, compress, and attach to a draft. Privacy
  default for kid-containing photos is manual.

## Next improvements (in priority order)

1. Build a `ceo/review-queue.md`-based capture protocol that's easy
   for Brandon to append to from his phone.
2. Write the interview-question-bank by category (restaurant / hotel
   / experience / shopping) so drafts are consistent.
3. Prototype a photo intake: Brandon drops a Google Photos album link
   in the queue, the night CEO flags which photos look promising and
   generates alt text.
4. Build the Payload admin → "New review from workflow" shortcut that
   pre-fills structure.
