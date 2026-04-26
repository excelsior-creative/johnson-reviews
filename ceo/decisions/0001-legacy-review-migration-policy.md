# Decision 0001 — Legacy Review Migration Policy

**Date:** 2026-04-26  
**Status:** PROPOSED — awaiting Brandon sign-off  
**Supersedes:** nothing  
**Area:** Content

---

## Context

The repo contains 60+ legacy WordPress review slugs in `reference/`. These reviews were published on the old SG-Host site, but investigation shows they were **written by a ghostwriter** ("Hanns Bida Camay" is the schema author, not Brandon Johnson). The voice is generic travel-blog AI/ghostwriter style — "nestled," "culinary masterpiece," "must-visit," "unforgettable dining experience" — and lacks family context, specific Brandon-voice details, and often lacks honesty about what didn't work.

Examples reviewed tonight:
- **Apizza Doho** — mentions "a group of friends before a concert." No family context. Ghostwriter voice.
- **Chart House Dana Point** — no family details, pure generics about "prime rib" and "ocean views."

These reviews are not publishable as-is because:
1. They may contain invented details the ghostwriter added.
2. They don't sound like Brandon. Publishing them would poison the brand voice.
3. Some facts may be stale (these are 2+ years old).

---

## Decision Options

**Option A: Verify and refresh with Brandon's input**  
For each legacy review, send Brandon a short "verify this" message with the old text and ask: (1) does this match your memory? (2) any corrections? (3) anything missing? Then the agent rewrites in Brandon's voice using his confirmed facts.

**Option B: Treat old content as raw notes only**  
Use the legacy reviews only as a rough skeleton — location, category, date — and block migration until Brandon provides his actual memories through the intake workflow.

**Option C: Skip legacy migrations entirely; only write new content**  
Focus on new reviews from Brandon's real-time experiences. Old legacy content gets quietly retired.

---

## Recommendation

**Option A** — but throttled. One batch of 5 reviews per week maximum. Brandon spends 5 minutes scanning a condensed "fact-check list" for each review (not re-reading the full old post), confirms or corrects, and the agent rewrites from scratch in his voice. This is sustainable and protects the brand.

**Not Option B** — Too slow and creates a backlog bottleneck.  
**Not Option C** — Those 60+ reviews represent real Johnson visits that deserve to live somewhere. Wasting that history is a mistake.

---

## Pending Brandon Input

Brandon needs to decide:
1. Confirm Option A is the right approach.
2. For the first batch (Dana Point cluster), answer: "Do you remember going to Apizza Doho, Chart House, Maison Cafe, and Ramos House in Dana Point? Rough time frames? Any details you recall?"
3. Are any of these places closed now?
4. Were the facts in the old ghostwritten posts at least directionally right, even if badly written? (Did you actually have the sausage meatball sub at Apizza Doho?)

---

## Impact if Approved

- Slows the migration timeline (can't automate in bulk).
- Protects the brand voice and Brandon's credibility.
- Creates a repeatable pattern that works for all 60+ reviews over time.
