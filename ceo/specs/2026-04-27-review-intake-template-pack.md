---
title: Review intake template pack
status: completed
risk_tier: R2
owner: Peter
reviewer: Quinn
completed: 2026-04-27
approval_evidence: "Brandon asked Peter in Slack thread C0AHR2NJ361 / 1777339258.868489 on 2026-04-27 to move the project forward; this is internal workflow documentation only."
---

# Review intake template pack

## Outcome

Create the missing review intake workflow artifacts so new Johnson Reviews content can be drafted consistently without re-asking basic questions every time.

## Background

`ceo/backlog.md` lists three workflow items that are prerequisites for repeatable content production:

- `ceo/prompts/intake.md`
- `ceo/templates/review-template.md`
- publish-readiness checklist covering schema, alt text, internal links, and geotag stripping

The current `ceo/INBOX.md` still asks Brandon to choose a canonical intake channel. This spec should not block on that decision; it should produce channel-agnostic templates with a placeholder for the final front door.

## Scope

- Create `ceo/prompts/intake.md` with the standard interview/intake prompt for a new review.
- Create `ceo/templates/review-template.md` with the review draft structure.
- Create `ceo/checklists/publish-readiness.md` for pre-publish review checks.
- Align prompts/templates with `ceo/voice.md`, `ceo/strategy.md`, `ceo/seo.md`, and `ceo/photos.md`.
- Include child/privacy/photo safety reminders, especially for geotags and photos containing kids.

## Non-goals

- Do not publish any reviews.
- Do not select the canonical intake channel for Brandon.
- Do not implement CMS fields or code.
- Do not request new credentials or Google Photos access.
- Do not decide the legacy review migration policy.

## Acceptance criteria

- All three artifacts exist and are usable by an agent starting a new review draft.
- The intake prompt captures visit facts, memory confidence, family/kid details, ratings, photos, location, date/season, price/value, accessibility, and do/don't recommend guidance.
- The review template has clear sections for title, dek, metadata, intro, experience, family notes, practical details, verdict, SEO/schema notes, photo checklist, and open facts.
- Publish checklist includes schema, alt text, internal links, affiliate/sponsored disclosure if applicable, geotag stripping, kid-photo safety, and final Brandon approval gate.
- Quinn can follow the template without asking Peter for missing process context.

## Verification plan

1. Cross-check created files against `ceo/voice.md`, `ceo/strategy.md`, `ceo/seo.md`, and `ceo/photos.md`.
2. Run markdown/link sanity by reading the files and checking referenced paths exist.
3. Quinn reviews whether a new review can be drafted from the pack without hidden assumptions.

## Implementation slices

1. Read the voice/strategy/SEO/photo docs.
2. Draft `ceo/prompts/intake.md`.
3. Draft `ceo/templates/review-template.md`.
4. Draft `ceo/checklists/publish-readiness.md`.
5. Verify referenced paths and add a short journal note.

## Restart notes

- If Brandon later chooses Slack DM/channel/email/voice memo as the intake front door, update the top section of `ceo/prompts/intake.md` only.
- Keep this documentation-only unless a follow-up spec explicitly asks for CMS/code automation.
