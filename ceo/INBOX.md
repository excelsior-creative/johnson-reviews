# INBOX — open asks for Brandon

Mirrored to Slack C0AHR2NJ361. When Brandon answers, mark
**[ANSWERED]** with the resolution in line and date.

## Open

### 🔴 Urgent

1. **Live site reachability.** WebFetch from the agent returned 403
   then ECONNREFUSED at both `johnsonreviews.com` and
   `www.johnsonreviews.com` during the 2026-04-20 run. Re-checked
   2026-04-25 — same result. Two consecutive nights now. **Question:**
   is the site up for you in a browser right now? If yes, what's
   the canonical URL (apex vs www) and is there a WAF rule we
   should whitelist agent traffic against?

11. 🔴 **Which design system is current?** Between the 2026-04-20
    nightly run and 2026-04-25, PR #15 merged
    "feat: migrate to dark editorial design system from
    reference/design2." There are now three reference design folders
    (`stitch_johnson_reviews_discovery/`, `design/`, `design2/`) and
    `/ceo/design-system.md` references the original Gilded Legacy
    direction. **Question:** is `reference/design2/` the current
    target, and should I update `/ceo/design-system.md` to reflect it
    + audit live components against it next nightly run?

12. 🔴 **Brand commitment to no affiliates / no sponsors.** The
    homepage on-method blockquote and the `/about` "Three Principles"
    block publicly commit Johnson Reviews to "no press trips, no
    comped meals, no affiliate links, no booking links, no referral
    commissions, no Amazon tags." That's a strong public stake. The
    CEO mandate (priority 5) lists ads + affiliate relationships as
    eventual monetization. **Question:** confirm we want to keep this
    public commitment as-is, or do you want me to soften the language
    now (before the page accumulates more inbound trust on it) so
    affiliate relationships don't feel like a betrayal later?

13. 🟡 **OpenTable + Yelp on AsSeenIn.** I cut both from the press
    strip tonight because I couldn't confirm Brandon writes on
    either. Only Google Local Guides remained (which is the
    confirmed Level 10 platform). **Question:** if you do have
    OpenTable / Yelp profiles you'd like back on the home page, send
    URLs and I'll re-add. Otherwise we leave the strip as the
    single Google logo + the credentials line.

14. 🟡 **Apizza Doho draft for redline.** First legacy migration
    draft is at `/ceo/drafts/apizza-doho-dana-point.md`. The legacy
    WP post was AI-marketing voice (every clichГ© voice.md §4 calls
    out is in there), so I stripped to the verifiable core and
    flagged every unverifiable claim explicitly. **Specific
    questions in the draft:** (a) was this kids-along or
    adults-only? (b) when did we last go? (c) what's the rating?
    (d) anything we ordered besides the pizza + the sausage-meatball
    sub? (e) anything that disappointed? (f) parking + reservations?

15. 🟡 **Brandon portrait for /about.** I removed the Unsplash stock
    photo posing as your portrait (a stranger's face). Replaced
    with a typographic "BJ" placeholder in the gold accent. **Send a
    real photo when you have one** — square or 4:5, good light, no
    kids in frame is fine. I'll process and ship.

### 🟡 Needs decision

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

## Answered

_(empty)_
