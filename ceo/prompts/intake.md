# Intake Prompt — Review Interview Template

_Version 1.1 — Updated 2026-04-27. Use this whenever Brandon initiates a new Johnson Reviews article._

## Purpose

Extract enough real visit detail to draft an honest 400–700 word Johnson Reviews post in Brandon's voice: specific, useful for families, warm when critical, and never fabricated.

Do not draft until you have enough to write a specific review. Do not ask Brandon to write anything; his job is to react and correct.

## First response to Brandon

Keep the first ask short enough to answer quickly:

```md
Got it — I'll turn this into a Johnson Reviews draft. Quick intake so I don't invent anything:

1. Place + location: what's the exact name, city, and neighborhood/area?
2. Visit context: when did you go, who was with you, and why were you there?
3. What happened: give me 3–5 specific memories — what you ordered/did, service moments, kid/family logistics, anything surprising.
4. Recommendation: would you go back? Who should go, and who should skip it?
5. Practical details: parking, reservations/wait, price/value, noise, stroller/kid menu/accessibility, best time to go.
6. Photos: do you have photos to use? Any kids in-frame? If yes, confirm which photos are okay to publish and we'll strip GPS metadata before publishing.
7. Anything to avoid saying? Any uncertainty I should mark as "fact-check before publish"?
```

Do **not** ask for a numeric rating unless Brandon volunteers one. Ratings may come later as a site feature.

## Venue-type follow-ups

Ask only 1–3 missing probes that matter for the review type.

### Restaurant / cafe

- What did you order, and what would you order again?
- Any item that was just okay or not worth it?
- What did the kids eat? Kids' menu, shared plates, or something else?
- Inside, patio, bar seating, view, noise level?
- Was it kid-friendly in practice: high chairs, space, patience from staff, bathrooms?
- Reservation needed? Walk-in realistic? Wait time?
- Parking situation and neighborhood context?
- Price/value: cheap, fair, expensive-but-worth-it, or overpriced?
- Best use case: date night, family dinner, brunch, pre-show, vacation stop, locals-only?

### Hotel / resort

- Room type, length of stay, and who traveled?
- Check-in, parking/valet, resort fee, and any surprise charges?
- Pool/kids/family amenities?
- Sleep quality: noise, beds, blackout, room size?
- Location tradeoff: what is nearby, what requires driving?
- What made it worth it vs. what could have been better?
- Would you book again at the same rate? At a higher rate?

### Theme park / attraction / entertainment

- What did you actually do, ride, see, or buy?
- Age range it works best for?
- How long did you spend there?
- Crowds, line strategy, tickets/reservations, parking?
- Food/bathrooms/stroller/accessibility?
- What worked for the kids' ages? What didn't?
- What would you do differently next time?

### Shopping

- Was this destination shopping or a place you wandered into?
- Anything you bought that was worth mentioning?
- Was it family-friendly or more of a quick adult stop?

## Photo check

Ask:

```md
Do you have photos? Even a Google Photos album link works. I'll suggest which images to use where. If kids are in any shots, tell me which ones are okay to publish and I'll strip geotag metadata before publish.
```

Rules:

- Every photo needs descriptive alt text.
- Strip GPS EXIF from every photo with kids in frame.
- Do not publish school/home/recurring-location photos.

## Legacy review migration intake

For old Google/WordPress reviews, do **not** assume ghostwritten copy is factually Brandon's memory. Ask:

```md
I found an old review for <place>. Before I migrate it, can you fact-check the core memory?

- Did you actually visit this place? Approx year/season?
- Who was with you?
- What do you genuinely remember ordering/doing?
- Does the old review claim anything that feels wrong or too polished?
- Should we refresh it, skip it, or mark it historical?
```

## Voice guardrails

- Use "we" by default; use "I" only for Brandon's individual perspective.
- Specificity beats superlatives.
- Family context should feel natural, not sentimental.
- Avoid: "must-visit," "hidden gem" unless Brandon says it, "foodie," "nestled," "boasts," "perfect blend," luxury-critic language, and Instagram-caption energy.
- Negative reviews should be honest, contextual, and not cruel.
- Never invent visit facts, dishes, dates, family details, ratings, or photos.

## Intake output format for agents

After intake, summarize before drafting:

```md
Draft brief for <place>

- Review type:
- Location:
- Visit timing/confidence:
- People/context:
- Strongest memory/details:
- Family/practical notes:
- Recommendation:
- Photos available / kid-photo risk:
- Facts still open:
- Draft angle:
```

If there are material open facts, draft only after marking them clearly in the draft or getting Brandon's answer.

## Draft step

Once Brandon has answered enough:

- Write a 400–700 word draft per `ceo/voice.md` and `ceo/templates/review-template.md`.
- Structure: hook → what we ordered/did → who it's for → what worked → what didn't → logistics → bottom line.
- Label it clearly: `DRAFT — <Place> — not published`.
- Before publish, run `ceo/checklists/publish-readiness.md`.
