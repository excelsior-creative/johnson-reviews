# INBOX — open asks for Brandon

Mirrored to Slack C0AHR2NJ361. When Brandon answers, mark
**[ANSWERED]** with the resolution in line and date.

## Open

### 🔴 Urgent

11. **Seven open draft PRs, none merged.** Six prior nightly runs
    have stacked up draft PRs, each re-attempting the same critical
    fixes (most painfully: `SITE_NAME = "Template Site"` is still
    leaking to OG cards, JSON-LD, RSS feed, and contact emails on the
    live site, despite being "fixed" in 4 separate draft PRs). The
    nightly CEO routine cannot make forward progress until something
    lands. **Question:** can you triage the open PR backlog?
    `/ceo/pr-triage.md` has the full inventory + a recommendation
    (TL;DR: merge **PR #17** as a single drop, close the other six as
    superseded). Or pick a different PR to merge — anything to break
    the loop. Tonight's run did **not** add another duplicate fix
    PR; it shipped distinct work (EXIF stripper utility + /ceo
    documentation refresh).

1. **Live site reachability.** WebFetch from the agent returned 403
   then ECONNREFUSED at both `johnsonreviews.com` and
   `www.johnsonreviews.com` during the 2026-04-20 run. Could be a
   Vercel firewall, Cloudflare WAF, or actual outage. **Question:**
   is the site up for you in a browser right now? If yes, what's
   the canonical URL (apex vs www) and is there a WAF rule we should
   whitelist agent traffic against? (Repeated from 2026-04-20 — has
   not been re-tested since.)

### 🟡 Needs decision

12. **"No affiliate links" promise is now in production copy.** The
    home page "On Method" quote shipped in PR #15 says: _"No press
    trips, no comped meals, no affiliate links. Just a long record
    of what we actually thought."_ This is gorgeous voice copy and
    pre-commits Johnson Reviews to a no-affiliate posture. The
    nightly routine and `/ceo/strategy.md` had affiliates as a
    Q3+ open question. **Question:** keep the no-affiliate promise
    as part of the brand (and we delete that whole roadmap branch),
    or soften the copy now while it's still early ("no comped
    meals, no quid-pro-quo" without committing on affiliates)?

13. **Design system migrated; ADR 0002 records it.** PR #15 (merged
    2026-04-23) replaced Gilded Legacy with the Johnson & Co. dark
    editorial system from `reference/design2/`. `/ceo/design-system.md`
    is rewritten to match. **No question — FYI.** I've classified
    this as 🟡 only because if you want to revert to Gilded Legacy
    or pick a different direction, now is the time to say so before
    more components compose against the new tokens.

2. **Off-brand placeholder copy.** _(repeated from 2026-04-20.)_
   Multiple open draft PRs propose replacing remaining off-brand
   strings (the "Johnson & Co." fabricated brand on /about, the
   stock Unsplash portrait posing as Brandon, the "Template Site"
   metadata leak). All of them are blocked on you merging anything.
   See ask #11 above.

3. **Voice doc — please redline.** _(repeated from 2026-04-20.)_
   `/ceo/voice.md` is now v0.1 — I added §3.1 capturing canonical
   on-brand examples observed in the new home page. Still need
   Brandon to fill §5 (the family — names, ages, kid interests).

4. **Audience positioning.** _(repeated from 2026-04-20.)_ OC/SoCal-
   first vs. national family-travel-first.

5. **Review intake channel.** _(repeated from 2026-04-20.)_ Slack DM,
   C0AHR2NJ361, email, or voice memo as the canonical front door?

6. **Google Photos access.** _(repeated from 2026-04-20.)_

7. **Approve-by-silence vs. explicit-approve** for legacy review
   migrations — _(repeated from 2026-04-20.)_

### 🟢 FYI

14. **EXIF GPS stripper utility shipped tonight.** New script at
    `apps/app/scripts/strip-exif-gps.ts`. Uses already-installed
    `sharp`. Run with `pnpm strip:exif <path-or-glob>` to strip GPS
    metadata from photos before upload. Always run on photos that
    contain the kids — privacy default per the CEO mandate. Doesn't
    touch any other metadata (camera, lens, date stay — they're
    E-E-A-T proof). See the script's header comment for usage.

8. **Legacy image dependency.** _(repeated from 2026-04-20 — still
   true on main; multiple open PRs propose the fix.)_ The site
   loads Hero + AsSeenIn images from `brandonj117.sg-host.com`.

9. **Suspicious components.** _(repeated 2026-04-20.)_
   `CalculatorSection` + `ServicesSection` are confirmed dead.
   Multiple open PRs delete them. Will land when any of those
   merges.

10. **Quarter OKRs.** _(repeated 2026-04-20.)_ `/ceo/okrs.md` targets
    are best-guess. Confirm or revise.

## Answered

_(empty — no asks have been answered yet across 6 nightly runs.)_
