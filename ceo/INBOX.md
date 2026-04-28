# INBOX — open asks for Brandon

Mirrored to Slack C0AHR2NJ361. When Brandon answers, mark
**[ANSWERED]** with the resolution in line and date.

## Open

### 🔴 Urgent

17. **Vercel/builds are failing because generated Payload types are missing** (added 2026-04-28). PR #22 is docs/planning-only and mergeable, but its Vercel check fails during `next build` with `Cannot find module '@/payload-types'` from `apps/app/src/app/(frontend)/blog/[slug]/page.tsx`. Repo facts: `apps/app/src/payload.config.ts` writes `apps/app/src/payload-types.ts`, PR #7 removed payload types from tracking, no `payload-types.ts` exists in the checkout, and app files still import `@/payload-types`. **Decision/action needed:** approve a ready spec to add a reliable Payload type-generation/build strategy, or confirm Vercel should bypass builds for docs-only PRs until this is fixed.

11. **Vercel is not deploying from main** (added 2026-04-26). The live site at johnsonreviews.com is running an old build — the copy rewrites from PR #12 (merged ~2026-04-20) are still not live on production. The site is showing "EACH DAY AS A NEW DESTINATION" and luxury-critic copy we replaced weeks ago. **Please check your Vercel dashboard:** is auto-deploy from `main` enabled? Is production pointed at the right branch? The fix is probably one button in Vercel — but it has to be you who does it.

1. **Live site reachability.** WebFetch from the agent returned 403
   then ECONNREFUSED at both `johnsonreviews.com` and
   `www.johnsonreviews.com` during this run (2026-04-20). Could be a
   Vercel firewall, Cloudflare WAF, or actual outage. **Question:**
   is the site up for you in a browser right now? If yes, what's
   the canonical URL (apex vs www) and is there a WAF rule we
   should whitelist agent traffic against?

### 🟡 Needs decision

16. **Ready-spec queue is empty after BOS bootstrap** (added 2026-04-27). `ceo/next.md` now explicitly says no ready specs are queued and agents must stop when fewer than two ready items exist. I did not implement roadmap/backlog work tonight. **Decision needed:** approve converting these existing backlog/roadmap items into specs and adding the first two to `ceo/next.md`: (A) Author bio block on Posts for E-E-A-T, (B) Review intake template pack (`ceo/prompts/intake.md`, `ceo/templates/review-template.md`, publish-readiness checklist), (C) Sitemap + schema coverage audit.

2. **Off-brand placeholder copy.** The current site copied the
   reference-design's *placeholder* luxury-critic copy verbatim
   ("Established 1984," "Sommelier's Ledger," "uncompromising
   palate," etc.). I'm rewriting these tonight to honest
   placeholder copy that reads like a family travel + restaurant
   reviewer. **Question:** approve the new copy direction once
   you see the diff in the PR? (If not, revert is one click.)
   See voice.md §3–4 for the rubric I'm using.

3. **Voice doc — please redline.** `/ceo/voice.md` is v0 inferred
   from priors. Sections 3 (phrasing patterns), 4 (avoid list), and
   5 (the family) are best-guess. **Question:** read the doc and
   redline anything that's wrong. Especially the family section —
   I've left names blank rather than guess.

4. **Audience positioning.** Per strategy.md: am I right that the
   primary audience is OC/SoCal traveling families, with national
   family-travel a secondary? Or is the national lens primary?

5. **Review intake channel.** Where do you want to initiate a new
   review — Slack DM, the C0AHR2NJ361 channel, email, voice memo?
   Pick one and we'll make it the canonical front door.

6. **Google Photos access.** Willing to share an album link or
   give the agent a Google Photos read scope? Otherwise we run
   text-only and you upload at publish.

7. **Approve-by-silence vs explicit-approve** for legacy review
   migrations — for low-stakes refreshes of existing Google
   reviews into long-form posts, OK if I publish after a quiet
   24 hours, or eyes on every one?

### 🟢 FYI

8. **Legacy image dependency.** The site currently loads many
   images (including the Hero background and "As Seen In" logos)
   from the old `brandonj117.sg-host.com` server. If SG-Host
   expires, the site breaks visually. I'll backlog a migration
   into Payload Media; flagging so you don't accidentally cancel
   that hosting.

9. **Suspicious components.** `CalculatorSection` and
   `ServicesSection` exist in the codebase but I can't tell what
   they do on a reviews site. Probably dead code from the
   original WP-clone scaffold. I'll audit + propose removal next
   nightly run unless you want them kept.

10. **Quarter OKRs.** Drafted in `/ceo/okrs.md`. Targets are best-
    guess. Confirm or revise.

12. **Legacy review ghostwriter issue** (added 2026-04-26). 🟡 The 60+ old reviews in `reference/` were written by a hired ghostwriter ("Hanns Bida Camay" is the schema author), not you. The voice is generic AI/ghostwriter style — "nestled," "culinary masterpiece," "must-visit," no family context. **This creates a brand and accuracy risk if we just migrate them.** See `ceo/decisions/0001-legacy-review-migration-policy.md` for the full analysis. I'm recommending we verify each old review with you before migrating. **Decision needed:** do you want to (A) verify-and-refresh (send you a fact-check for each batch), (B) skip old reviews entirely and only publish new ones, or (C) something else?

13. **Dana Point cluster fact-check** (added 2026-04-26). 🟡 For the first migration batch, I need to know: did you actually go to **Apizza Doho** in Dana Point? The old review says "a group of friends before a concert on the beach" — is that your memory? Same question for **Chart House, Maison Cafe + Market, and Ramos House Cafe**. Even rough memory ("yeah we went there maybe 2022, the pizza was good, kids liked it") is enough to start a real draft.

14. **"FEATURED CRITIQUE" label in Payload CMS** (added 2026-04-26). 🟢 FYI: the live home page shows a "FEATURED CRITIQUE" badge near the hero area. This string doesn't exist in the codebase files — it's coming from the CMS (probably a Page Hero block or a post marked as featured). Please check your Payload admin (`/admin`) — look at the home Page content and any published posts for a field called "badge," "eyebrow," or similar. Letting you know in case you want to change it now vs. waiting for the new build to deploy.

15. **QuickStats real numbers** (added 2026-04-26). 🟢 FYI: the QuickStats section on the live site shows "Level 0+" and zeroes for photo views, points, and reviews. These should reflect your real Google Local Guide stats. What are your current numbers? (Level, approximate review count, approximate photo views) — I'll hardcode them as accurate honest stats.

## Answered

_(empty)_
