---
title: Author bio block on Posts
status: ready
risk_tier: R2
owner: Devon
reviewer: Quinn
approval_evidence: "Brandon asked Peter in Slack thread C0AHR2NJ361 / 1777339258.868489 on 2026-04-27 to move the project forward; production deploy still requires deploy-gate verification because the site is public."
---

# Author bio block on Posts

## Outcome

Every published review detail page includes a credible, honest Brandon Johnson author/reviewer block that improves E-E-A-T without inventing credentials or stats.

## Background

`ceo/roadmap.md` lists Author bio block as a Now item. `ceo/backlog.md` also flags author bio / reviewer-trust signals as brand work. Several stale draft PRs mention author-bio/schema work, but they are currently draft + conflicting, so implementation should start by inspecting whether any salvageable code exists before writing fresh code.

## Scope

- Add or finalize an Author/Reviewed-by block on Post/review detail pages.
- Copy should be honest and on-voice per `ceo/voice.md`.
- Include Brandon identity, Local Guide positioning, and a short family/OC reviewer angle.
- Use real numbers only if already present in durable repo content or supplied by Brandon; otherwise use non-numeric phrasing.
- Add/adjust structured data only if the current schema model clearly supports it without expanding scope.
- Make the block responsive and visually compatible with the Gilded Legacy design system.

## Non-goals

- Do not publish or migrate legacy reviews.
- Do not hardcode unverified Google Local Guide stats.
- Do not redesign the entire review detail page.
- Do not touch auth, moderation, payments, user accounts, or CMS permissions.
- Do not deploy to production without the separate deploy gate.

## Acceptance criteria

- Review detail pages render a visible author/reviewer block near the article content.
- The copy avoids fabricated claims such as unverified review counts, awards, publications, or family details.
- If stats are unknown, the UI gracefully uses honest generic copy.
- The block works on mobile and desktop.
- Existing post pages continue to build/render.
- Any schema changes validate syntactically and do not duplicate conflicting Person/Review nodes.
- Quinn can verify by visiting at least one review detail route locally or in preview.

## Verification plan

1. Inspect current review detail implementation and stale draft PRs #13/#14/#17 for reusable author-bio/schema code.
2. Run `pnpm tsc` and `pnpm build` or document any pre-existing failures with exact output.
3. Manual smoke test one review detail route locally or via preview.
4. Quinn reviews copy honesty, schema shape, responsive layout, and regression risk.

## Implementation slices

1. Discovery: locate Post detail route/components and existing author/schema code; note salvageable stale PR work if any.
2. Component: create/reuse a small AuthorBio/ReviewerBio component with safe fallback copy.
3. Integration: place it on review detail pages and wire any available real profile fields.
4. Verification: run checks and capture screenshots/notes for Quinn.

## Restart notes

- Start from `main` or a fresh branch after pulling latest.
- Current open draft PRs #13, #14, and #17 may contain related author/schema attempts but are conflicting; cherry-pick only if it is cleaner than fresh implementation.
- If Brandon supplies exact Local Guide stats later, update the copy in a separate small follow-up.
