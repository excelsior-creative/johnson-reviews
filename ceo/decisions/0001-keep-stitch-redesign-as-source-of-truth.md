# 0001 — Keep `stitch_johnson_reviews_discovery` as the redesign
source of truth

- **Date:** 2026-04-17
- **Status:** accepted
- **Author:** CEO instance (first run)

## Context

Brandon committed `reference/stitch_johnson_reviews_discovery/`
on 2026-04-16 (`e956a55 chore: add design`). It contains four
artifacts:

- `gilded_legacy/DESIGN.md` — the design-system manifesto.
- `johnson_reviews_home_gold_edition/code.html` + screen.
- `johnson_reviews_discovery_gold_edition/code.html` + screen.
- `johnson_reviews_review_detail_gold_edition/code.html` + screen.

The system prompt says: *"Treat the reference folder as read-only
source material. Do not deviate from the reference design's visual
language or layout patterns without Brandon's sign-off."*

A prior commit (`ef6a87a — feat: dark luxury editorial aesthetic
overhaul`) already implemented the bulk of the design tokens and
home-page layout against this reference.

## Decision

This reference folder is the canonical visual/layout source for the
redesign. We implement faithfully. We do not "reinterpret."

`/ceo/design-system.md` is the implementation-side mirror — what's
been translated into Tailwind tokens and components. When the two
diverge, the reference wins on visual/layout questions; the
implementation doc wins on Tailwind-token specifics.

## Carve-outs (where we own the decisions)

- Implementation quality (responsive breakpoints, accessibility,
  performance, fit-and-finish) — ours.
- Empty / loading / error states the reference doesn't show — ours.
- Page types the reference doesn't show (city hub, About) — ours,
  designed to feel like the same system.
- **Copy.** The reference's placeholder copy is fine-dining-critic
  voice. Brand voice is family-warm. We do not preserve the
  reference's literal words. See `voice.md`.

## Supersession protocol

If Brandon ships a newer reference, capture it as a new decision
record (0002, 0003…), update `design-system.md` and the diff in a
journal entry, and update `roadmap.md` to absorb the new direction.

The original reference folder stays read-only.
