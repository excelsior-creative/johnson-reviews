# ADR 0002 — Johnson & Co. dark editorial supersedes Gilded Legacy

**Date:** 2026-04-26 (recording the change after the fact)
**Status:** Accepted
**Supersedes:** ADR 0001 (visual direction component only — copy
direction in 0001 still stands)

## Context

On 2026-04-23, PR #15 ("feat: migrate to dark editorial design system
from reference/design2") landed on main, authored by Timmy with a
sibling Claude Code session
(`claude/design-system-update-n1v5r`). It replaced the Gilded Legacy
visual system shipped in PR #10 with a new "Johnson & Co. Dark
Editorial" system sourced from a new reference folder at
`reference/design2/Johnson Reviews/`.

The 2026-04-26 nightly run (this run) is the first to record the
change in `/ceo`. ADR 0001 still pointed at Gilded Legacy as the
visual-system source of truth. `/ceo/design-system.md` had the same
gap. This ADR closes that gap.

## What changed visually

| Aspect              | Gilded Legacy (PR #10)                | Johnson & Co. (PR #15)                       |
|---------------------|---------------------------------------|----------------------------------------------|
| Reference folder    | `stitch_johnson_reviews_discovery/`   | `design2/Johnson Reviews/`                   |
| Page base           | `#131313` (cool ink)                  | `#0f0d0b` (warm bourbon ink)                 |
| Body text           | `#e5e2e1`                             | `#ece4d3` (warmer cream)                     |
| Primary accent      | `#f2ca50` / `#d4af37` (cool gold)     | `#c9a961` (warm gold)                        |
| Headline serif      | Noto Serif                            | Playfair Display                             |
| Mono                | _(none)_                              | JetBrains Mono                               |
| Script              | _(none)_                              | Caveat (Brandon's signature sign-off)        |
| Geometry            | 0px corners, no-line rule             | 0px corners, hairline rules used liberally   |
| Component primitives| Tailwind-driven                       | `globals.css` provides `.display`, `.eyebrow`, `.meta`, `.kicker`, `.prose`, `.btn`, `.score-disc`, `.tag`, `.photo`, etc. |

Functionally: warmer, deeper, more clearly editorial-publication
in feel; less Michelin-critic, less nightclub, more "Sunday paper
travel section." Better fit for Brandon's family-travel + restaurant
brand.

## Decision

**Adopt** the Johnson & Co. editorial system as the canonical visual
reference. `reference/design2/Johnson Reviews/` is the source of
truth.

**Preserve** `reference/stitch_johnson_reviews_discovery/` in the
repo as historical material, but treat it as superseded.

**Rewrite** `/ceo/design-system.md` to reflect the new system in
full. Done in this commit.

## What remains from ADR 0001

ADR 0001's *copy* decision still stands: keep the visual reference,
rewrite all luxury-critic placeholder copy in Brandon's voice. The
new editorial system landed with much better default copy than
Gilded Legacy did (e.g. the "We visit every place at our own
expense" method quote on the home page is honest and on-voice). But
some pages still ship off-brand strings — multiple open PRs (#14,
#16, #17) propose specific fixes. See `/ceo/pr-triage.md`.

## Consequences

- Future nightly runs use `/ceo/design-system.md` (now rewritten) as
  the design reference, not the old Gilded Legacy doc or ADR 0001.
- New components / pages should compose from the `globals.css`
  primitives (`.display`, `.eyebrow`, `.meta`, `.kicker`, etc.)
  rather than ad-hoc Tailwind chains.
- Any new copy proposals should match the on-voice baseline already
  shipped in the home page (the "On Method" quote, the Hero
  "Real visits. *Honest reviews.*" framing, the Archive CTA "Seven
  years. Five hundred *reviews.*").
- `/ceo/voice.md` §3 has been updated to capture canonical
  on-brand examples observed in the new system.

## Supersession plan

If Brandon directs another visual change, supersede this ADR rather
than editing it. Capture the new direction in
`/ceo/design-system.md` and link the new ADR back to this one.
