---
title: Sitemap and schema coverage audit
status: ready
risk_tier: R2
owner: Quinn
reviewer: Peter
approval_evidence: "Brandon asked Peter in Slack thread C0AHR2NJ361 / 1777339258.868489 on 2026-04-27 to move the project forward; this audit is read-only/reporting unless a follow-up implementation spec is approved."
---

# Sitemap and schema coverage audit

## Outcome

Produce a concise audit of Johnson Reviews sitemap, robots/feed, metadata, and structured-data coverage so the next SEO implementation can be scoped from facts instead of guesses.

## Background

`ceo/roadmap.md` and `ceo/seo.md` both identify schema coverage and sitemap audit as next-month / audit-candidate work. Open draft PRs mention schema work but are conflicting, so Quinn should first map current coverage on the current branch/main and report gaps.

## Scope

- Inspect sitemap, robots, feed, metadata, and structured-data code paths.
- Identify which page types currently emit schema and which do not.
- Check whether Review/Restaurant/Hotel/TouristAttraction/LocalBusiness, Person, WebSite, Organization, and BreadcrumbList targets from `ceo/seo.md` are covered.
- Identify dead or stale sitemap routes if visible from code.
- Produce an audit note under `ceo/audits/` with findings, risks, and recommended implementation slices.

## Non-goals

- Do not implement schema changes in this spec.
- Do not deploy or submit anything to Google Search Console.
- Do not modify production data or CMS content.
- Do not resolve conflicting stale PRs except to reference them as prior art.

## Acceptance criteria

- Audit file exists under `ceo/audits/`.
- Audit names the exact files inspected.
- Audit maps schema targets from `ceo/seo.md` to current status: present, partial, missing, or unknown.
- Audit lists the top 3 implementation recommendations with risk tier and suggested owner.
- Audit calls out any verification commands run and their results.

## Verification plan

1. Inspect relevant source files: sitemap, robots, feed, metadata, structured data, review detail route/components.
2. Run lightweight static checks where practical (`pnpm tsc` or targeted build only if environment is ready).
3. Document findings and any commands that could not be run.
4. Peter reviews the audit and converts the highest-value fix into a separate implementation spec.

## Restart notes

- Likely files to inspect include `apps/app/src/app/sitemap.ts`, `apps/app/src/app/robots.ts`, `apps/app/src/app/feed.xml`, `apps/app/src/lib/metadata.ts`, and `apps/app/src/lib/structured-data.ts`, but verify actual paths with file search.
- Stale draft PRs #13, #14, #16, and #17 may include schema attempts; treat them as references, not as ready work.
