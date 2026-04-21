# ADR 0002 — No fabricated rating axes

- Status: Accepted
- Date: 2026-04-21
- Supersedes: n/a
- Related: `/ceo/voice.md` §7 (Things Brandon would never do)

## Context

The review detail page (`apps/app/src/app/(frontend)/reviews/[slug]/page.tsx`)
was rendering a "**The Verdict**" panel with four rating axes:
**Overall / Ambience / Service / Value**. Three of those four were
not sourced from any Brandon input. They were computed from the
single overall star rating via a formula:

```ts
const base = rating * 20;
const rows = [
  { label: "Overall",  value: base },
  { label: "Ambience", value: Math.max(60, base - 5) },
  { label: "Service",  value: Math.min(100, base + 2) },
  { label: "Value",    value: Math.max(60, base - 3) },
];
```

The UI presented those synthesized numbers as if Brandon had rated
them. Readers had no way to distinguish real ratings from
synthesized ones. This is fabrication.

## Decision

Remove the fabricated axes immediately. The review page shows only
the single rating Brandon actually gave (on Google, 1–5 stars), plus
a one-line note that the review was originally posted on Google
Local Guide.

Schema.org `Review` emission uses the real rating only. No synthesized
facet reviews.

## Rationale

The brand bet is honesty + specificity. Invented numbers — even
ones plausibly close to the overall rating — are the opposite.
They also create legal/defamation exposure if a low synthetic
"Service" score lands on a restaurant page and the owner disputes
it. Brandon never made the statement.

## Consequences

- The review page is shorter. Acceptable — visual density is not
  the value.
- If we later want real facet ratings, they must come from Brandon
  explicitly rating each facet at intake time. This is listed as
  a future workflow improvement, not today's work.
- The `reviews` collection schema (Payload) stays single-rating.
  No migration needed.

## Implementation

- `apps/app/src/app/(frontend)/reviews/[slug]/page.tsx` — Verdict
  block replaced with honest rating summary.
- `apps/app/src/lib/structured-data.ts` — `generateReviewSchema`
  emits only the real `reviewRating`.
- `/ceo/prompts/intake.md` — explicit "don't ask" note: no
  axis-rating questions during intake.

## Supersession

If Brandon later opts to rate facets (e.g. because a specific
review type would benefit), we write a new ADR and change course
explicitly, with visible UI differentiation between facets Brandon
rated and those he didn't.
