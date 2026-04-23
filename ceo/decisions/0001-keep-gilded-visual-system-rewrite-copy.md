# ADR 0001 — Keep the Gilded Legacy visual system; rewrite all placeholder copy in Brandon's voice

**Date:** 2026-04-20
**Status:** Accepted (provisional, awaiting Brandon sign-off on copy direction)
**Supersedes:** —

## Context

The reference design at `reference/stitch_johnson_reviews_discovery/`
specifies a "Gilded Legacy" visual system: dark ink base, gold and
champagne accents, Noto Serif headlines, Inter labels, sharp
(0px-radius) corners, asymmetric layouts. The reference HTML
templates also contain *example* copy in a fictional luxury
restaurant-critic voice ("Established 1984," "Sommelier's Ledger,"
"Editor's Choice," "The Art of the Critique," "uncompromising
palate," etc.).

PR #10 ("Gilded Legacy design system") shipped both the visual
system AND the example copy verbatim into production components.
Examples found tonight:

- Hero: "Established 1984," "Elevating the Standard of Taste
  through rigorous analysis and an uncompromising palate."
- About page: a fake biography claiming the site was "Established
  in 1984 as a pocket notebook" that "visits anonymously" and
  "pays its own tabs" and operates as a "lifelong field critic."
- Contact page: a fake address (14 Avenue Montaigne) and a fake
  phone number (+1 (555) 000-0000).

Brandon Johnson is a real person — a Google Local Guide Level 10
based in Orange County who reviews family-friendly restaurants and
travel destinations. The luxury-critic copy is fabrication. Some of
it (the fake address and phone) is actively misleading.

## Decision

**Keep** the Gilded Legacy visual system in full (colors, fonts,
spacing, components, asymmetric layouts).

**Replace** all luxury-critic placeholder copy with honest copy in
Brandon's voice — anchored on facts that are demonstrably true
about Brandon (Google Local Guide Level 10, 500+ reviews, 27,000+
photos shared, OC-based, family travel) and avoiding any claim the
agent cannot verify.

## Rationale

The CEO mandate is explicit: the visual reference is law, the voice
is sacred. The agent owns implementation; Brandon owns creative
direction; voice trumps placeholder strings. The reference design's
visual treatment is gorgeous and works for a personal-brand
publication. The reference design's copy is just stock placeholder
that the design tool emitted — not direction Brandon ever signed
off on.

Leaving the fake biography and fake contact info in production was
a clear-and-present brand integrity issue (and on the contact page,
a UX issue).

## Consequences

- All page-level copy on home, about, contact, reviews index,
  reviews [slug], and blog [slug] now reads as Brandon Johnson
  family travel + restaurant blog. Visual system is unchanged.
- Brandon must redline `/ceo/voice.md` (v0 inferred) and approve
  the new copy in the PR diff. If Brandon disagrees with any
  specific phrasing, he can override and the change goes back into
  voice.md as a redline.
- Future CEO runs will use voice.md as the rubric for any new copy
  on category hubs, location hubs, error pages, etc.

## Supersession plan

Update this ADR if Brandon directs a different copy posture (e.g.
returns to the luxury-critic framing, picks a different audience
positioning, or asks for a more or less casual register).
