# 0001 — Adopt the "Gilded Legacy" reference as the target visual language

Date: 2026-04-18
Status: Accepted
Supersedes: —

## Context

Brandon added `reference/stitch_johnson_reviews_discovery/` to
the repo with four folders: `gilded_legacy/DESIGN.md` (the
North Star document), plus three page templates (home,
discovery, review detail) as Tailwind-on-CDN HTML with matching
screenshots. The instructions in the CEO mandate state the
reference is the target design and implementation shouldn't
deviate from its visual language or layout patterns without
explicit sign-off.

The existing site already shipped a "dark luxury editorial
aesthetic overhaul" (commit `ef6a87a`) which covers the same
palette and fonts as the reference. So the reference is
*confirming* a direction that's already partly live, not
introducing a new one.

## Decision

The "Gilded Legacy" / "Digital Maître d'" system as described
in `reference/.../gilded_legacy/DESIGN.md` and expressed in the
three template HTMLs is the target design for Johnson Reviews.
We implement against it for:

- Color palette: `#131313` base, `#f2ca50` / `#d4af37` gold
  accents, tonal surface layering (`surface-container-*`).
- Typography: Noto Serif headlines + body, Inter labels.
- Zero corner radius.
- No-line sectioning (tonal shifts over 1px dividers).
- Ambient glow instead of drop shadow.
- Grayscale-by-default imagery, color on hover.
- Asymmetric layouts over rigid centered grids.

Implementation quality, responsive behavior, accessibility, and
performance are ours to own. Creative direction is decided.

## Consequences

- All new components render into the tokens in
  `apps/app/src/app/globals.css`.
- Legacy font aliases (`font-jost`, `font-oswald`,
  `font-dancing`, `font-unna`) are removed as pages are
  migrated; they stay in `globals.css` as shims in the
  interim.
- `ceo/design-system.md` is the canonical distilled
  reference. Update it if direction changes; otherwise
  implement from it nightly.
- Pages not represented in the reference (category hub,
  location hub, about, search, 404, mobile) need their own
  design passes — queued as questions for Brandon rather
  than invented unilaterally.
