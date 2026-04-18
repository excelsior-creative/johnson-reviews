# 0002 — Reject the reference design's Michelin-critic copy

Date: 2026-04-18
Status: Accepted
Supersedes: —

## Context

The reference design's template HTMLs use high-end restaurant-
critic copy as placeholder content: "Sommelier Badge", "Three
Stars", "Critic's Choice", "Rare Vintages", "Private Dining",
"Michelin Starred", "The Inner Circle", "Grand Prix", "rigorous
analysis and an uncompromising palate", "Gastronomy / Wine
Program" verdict axes, etc.

Johnson Reviews' brand per `ceo/strategy.md` is a **family
travel blog**, not a Michelin guide. The audience is traveling
families and SoCal locals, not fine-dining critics. Copy that
sounds like the reference HTML would be actively hostile to the
brand — readers looking for "Disneyland with toddlers" aren't
served by prose about private-cellar consultations.

Observed drift: the live Hero (`apps/app/src/components/
Hero.tsx`) currently carries "Elevating the standard of taste
through rigorous analysis and an uncompromising palate" — this
is not Brandon's voice. Likely imported during the dark-luxury
aesthetic overhaul as convenient placeholder.

## Decision

Adopt the reference's **visual language** (ADR 0001). Reject
its **copy and voice**. Every string of user-visible text is
written from `ceo/voice.md`, not from the reference HTML.

Explicitly banned from our shipped UI:

- "Sommelier", "Critic", "Michelin", "Grand Prix", "Inner
  Circle", "Private Collection", "Rare Vintages"
- "Rigorous analysis", "uncompromising palate", "elevating"
- "Three Stars", single-critic-score positioning
- "Sommelier Badge" component names in our code. Use
  `Chip` or `Tag`.

Verdict scorecard: keep the **visual pattern** (5 horizontal
bars labelled by axis), re-axis to family-travel dimensions
(Food / Vibe / Service / Kid-friendliness / Value) pending
Brandon sign-off (INBOX 🟡-3).

Sidebar card: keep the **visual pattern** (Concierge card
with icon-labelled metadata rows and a prominent CTA), re-
label for family use cases (Directions, Reservations, etc.)
rather than "Reserve Table" / "Request Invitation".

## Consequences

- The Hero copy needs to be rewritten. Opened as 🟡-2 in
  INBOX; not shipping tonight because Brandon's real voice
  isn't yet captured in `voice.md` well enough for me to
  write on-voice without risking more drift.
- Future CEO runs must voice-check every shipped string
  against `voice.md`'s banned-vocabulary list.
- If the reference and this ADR conflict on copy, this ADR
  wins. If they conflict on visuals, the reference wins
  (per ADR 0001).
