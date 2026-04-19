# 0001 — Follow reference visuals; keep Brandon's voice in copy

**Date:** 2026-04-19
**Status:** accepted (provisional — confirm with Brandon)

## Context

The reference design in `reference/design/` is a "Gilded Legacy" dark,
gold, serif, editorial aesthetic (see `ceo/design-system.md`). The
sample copy in the reference is haute-cuisine-critic — "The Art of
the Critique," "uncompromising palate," "Michelin II," "€280 tasting
menus," "L'Ambroisie." That tone has no overlap with Brandon's actual
brand: a family travel blogger who reviews Disneyland, Starbucks,
Raising Cane's, Orange County restaurants, and family vacations.

The CEO instructions say:
- Follow the reference design's visual language and layout patterns;
  don't deviate without Brandon's sign-off.
- Voice is sacred. Write like Brandon, not like a generic travel
  blogger.

These two things are not in conflict if we read the reference as
*visual direction*: palette, typography, layout, component
vocabulary — yes, ship. The fake restaurant names and critic-voice
copy in the reference: no, those are filler.

## Decision

**Implement the reference's visual language and layout patterns
faithfully.** Palette, typography, component vocabulary, spacing
rhythm, page templates — all follow `design-system.md`.

**Do NOT carry the reference's copy into the site.** Hero taglines,
footer copy, sidebar labels, button labels, and any editorial prose
use Brandon's voice per `voice.md`. Where the reference uses
"Sommelier Badge" / "Critic's Choice" / "Gastronomy," adapt to
family-travel equivalents (e.g., "Editor's Pick" / "Food" /
"Kid-Friendly").

## Consequences

- Current live copy like "Elevating the standard of taste… an
  uncompromising palate" on the Hero needs a voice pass — flagged
  to Brandon, not shipped tonight.
- Rating metric labels on the new review-detail template are
  family-travel adapted (Food / Experience / Value / Kid-Friendly),
  not the reference's haute-cuisine labels.
- If Brandon confirms otherwise — i.e., the brand is actually
  pivoting upmarket to a fine-dining critic persona — supersede this
  decision record and we'll rework copy back toward the reference's
  tone.
