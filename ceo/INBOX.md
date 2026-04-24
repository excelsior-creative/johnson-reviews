# INBOX — open asks for Brandon

Mirrored to Slack C0AHR2NJ361. When Brandon answers, mark
**[ANSWERED]** with the resolution in line and date.

## Open

### 🔴 Urgent

1. **Live site reachability.** WebFetch from the agent returned 403
   then ECONNREFUSED at both `johnsonreviews.com` and
   `www.johnsonreviews.com` during this run (2026-04-20). Could be a
   Vercel firewall, Cloudflare WAF, or actual outage. **Question:**
   is the site up for you in a browser right now? If yes, what's
   the canonical URL (apex vs www) and is there a WAF rule we
   should whitelist agent traffic against?

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

10. **Quarter OKRs.** Drafted in `/ceo/okrs.md`. Targets are best-
    guess. Confirm or revise.

11. **Dead scaffold components removed** (2026-04-24). Deleted six
    unused components (`CalculatorSection`, `ServicesSection`,
    `AboutSection`, `CTASection`, `Header` (the component — the
    Payload global `globals/Header` is untouched), `Logo`). These
    were Next.js/Payload/agency-scaffold leftovers. If you actually
    wanted any of them, yell; otherwise this is FYI.

12. **Author profile links (`sameAs`).** Added a Person schema for
    you (E-E-A-T signal) in `/lib/structured-data.ts`. The `sameAs`
    array is currently empty — if you send me your public profile
    URLs (Google Local Guide contrib page, Twitter/X, Instagram,
    LinkedIn, Facebook — whatever you want associated), I'll drop
    them into `AUTHOR_SAME_AS` in `/lib/metadata.ts` so Google can
    link your web presence to the Johnson Reviews author entity.

## Answered

_(empty)_
