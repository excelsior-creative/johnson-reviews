# Review Template — v1

The structural skeleton every review draft follows. Lengths are targets,
not laws. Voice rules in `/ceo/voice.md` are non-negotiable. Schema rules
at the bottom drive the JSON-LD generated at publish time.

---

## Frontmatter (for /ceo/drafts/<slug>.md)

```yaml
---
title: "[The honest, non-clickbait title]"
slug: "[kebab-case]"
status: "drafting"  # drafting | review | approved | published
visitedDate: "YYYY-MM-DD"  # most recent visit
publishedTarget: "YYYY-MM-DD"  # when we plan to publish
location:
  name: "[Business name as displayed]"
  city: "[City]"
  state: "[State]"
  address: "[Street, optional]"
itemType: "Restaurant | Hotel | TouristAttraction | LocalBusiness"
rating: 8.5  # out of 10, optional, only if Brandon gave a number
categories: ["restaurants"]   # match Payload Categories slugs
tags: ["dana-point", "italian", "kid-friendly"]
photos:
  - role: "hero"
    file: "apizza-doho-hero.jpg"
    alt: "[Descriptive — restaurant name + scene]"
    containsKids: false
  - role: "inline"
    file: "apizza-doho-pizza.jpg"
    alt: "[Descriptive]"
    containsKids: false
sourceLegacy: "reference/[slug]/index.html"  # if migration
---
```

`containsKids: true` triggers EXIF GPS stripping at publish time.

---

## Section 1 — Opener (60–120 words)

Start with **the moment** or the **geographic anchor**, not a thesis. One
of these patterns works:

- **The moment.** "We'd been there twenty minutes when [the host walked
  out from the kitchen with...]"
- **The drive.** "[Place] sits [X minutes] off the [highway/PCH/wherever].
  We were [going to / coming from] [X] when we ducked in."
- **The reason.** "[Family member] had been asking about [X] since [Y].
  We finally went."

Avoid:
- Thesis statements ("[Restaurant] is the kind of place...").
- Lists of accolades.
- Anything resembling a press release.

## Section 2 — What we ordered / did (120–200 words)

The specifics. Real dish names. Real ride names. Real rooms. Family
context where it shows up naturally — "the kids got the cheese pizza,
which they did not split."

If we ordered something we'd never order again, say so. If we ordered
the special and it was special, say what made it special.

## Section 3 — What worked (80–140 words)

At least one detail that proves we were there. Not "the service was
attentive." More like "the server caught that our youngest needed a
high chair before we asked, and showed up with a plate of bread that
hadn't been on the menu."

If the kitchen, the room, the staff, the patio, the view — pick the
one or two that actually mattered and write them.

## Section 4 — What didn't (40–120 words, optional but usually included)

Honest, warm. "We wanted to love the [X]" is the right energy. If
nothing disappointed, say so once: "Nothing fell short on this visit.
We've been twice; both times solid."

Skip if there's truly nothing to say. Don't manufacture a complaint.

## Section 5 — Logistics for other families (80–140 words, structured)

Use a tight bulleted block — this is the SEO-rich, parent-rich part:

- **Reservations:** [Yes/No/recommended]
- **Parking:** [Lot, valet, street, time-restricted]
- **Kid-friendliness:** [High chair, kid menu, stroller-OK, change table]
- **Wait time:** [What we experienced]
- **Volume / vibe:** [Loud, quiet, dim, bright]
- **Best for:** [Date night, Sunday brunch with cousins, after-school
  treat, etc.]

Skip rows we don't have data for. Don't fabricate.

## Section 6 — Bottom line (40–80 words)

Two sentences. The verdict.
- Would we go back? Score (if we have one).
- Who should go.

Example: "We'll be back. Best for: Sunday brunch with grandparents in
town, when nobody wants to drive far. 8.5 out of 10 — confident rec."

---

## Photo plan

- **Hero (1)**: 4:5 or 16:9. The room, the dish, or the family
  arriving — whatever sets the scene. Caption optional.
- **Inline (1–3)**: dishes, rooms, details. Captions short, italic,
  serif.
- **Gallery (3–8)**: the rest. Lightbox.

Standards in `/ceo/photos.md`. Privacy rules in `/ceo/voice.md` §6.

---

## Schema generation (handled automatically at publish)

The publish step runs `generateReviewSchema(post, reviewMeta)` from
`apps/app/src/lib/structured-data.ts` with:

- `itemType` from frontmatter (Restaurant / Hotel / TouristAttraction /
  LocalBusiness — auto-classified from Categories+Tags as fallback)
- `businessName` from frontmatter `location.name`
- `address` from frontmatter `location.address` if present
- `rating` from frontmatter `rating` if present (out of 10)
- `visitDate` from frontmatter `visitedDate`

Combined with `generateArticleSchema()` and `generateBreadcrumbSchema()`
into a single JSON-LD `@graph`. **No fabricated ratings** — if rating
isn't provided, the schema simply omits it (Google penalizes invented
ratings).

---

## Internal linking checklist (pre-publish)

- [ ] Link to the location hub (e.g. `/location/dana-point`) if it
      exists — else queue for the next location-hub run.
- [ ] Link to the category hub (e.g. `/blog?category=restaurants`).
- [ ] Link to 3 related reviews (same location > same category > same
      cuisine).
- [ ] Update the reverse: edit the 3 related reviews to add this one as
      a related-review link.

## Publish checklist

- [ ] Voice pass — no `/ceo/voice.md` §4 violations.
- [ ] Specificity pass — at least one moment that's clearly Brandon's.
- [ ] Photo pass — alt text present, EXIF GPS stripped on any photo
      with kids in frame.
- [ ] Schema pass — `itemType` set, `rating` set if known.
- [ ] Internal-link pass — see above.
- [ ] Sitemap revalidation triggered (Payload `afterChange` hook should
      do it; verify).
- [ ] Update `/ceo/review-queue.md` row to `published`.
- [ ] Note cycle time in `/ceo/workflow.md` — north-star metric.
