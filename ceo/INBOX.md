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

9. **Suspicious components.** `CalculatorSection` and
   `ServicesSection` exist in the codebase but I can't tell what
   they do on a reviews site. Probably dead code from the
   original WP-clone scaffold. I'll audit + propose removal next
   nightly run unless you want them kept.

10. **Quarter OKRs.** Drafted in `/ceo/okrs.md`. Targets are best-
    guess. Confirm or revise.

### Added 2026-04-22

11. 🟡 **Apizza Doho migration — 7 blocking questions.** First
    draft of the first legacy review migration lives at
    `/ceo/drafts/apizza-doho-dana-point.md`. Brandon-voice
    rewrite of the 2021 WP original, with 7 `[?? Brandon — ...]`
    inline gaps. Open questions:

    1. Concert venue that night? (Doheny? Laguna? Other?)
    2. Which pizza(s) did you order?
    3. Is the sausage meatball sub a regular menu item?
    4. Parking / reservation / price dial / kid setup — whatever
       you remember.
    5. Would you go back? Who would you send?
    6. Current photos, or should we request permission from the
       restaurant for their public images?
    7. Stamp this "Last visited: [year]" or refresh with a new
       visit?

    Answer whatever you remember; anything you don't, we'll mark
    "not confirmed" or omit. The remaining cycle time to publish
    is 15–30 minutes once I have your answers.

12. 🟢 **Google Maps contributor URL.** The Person schema uses
    `https://maps.google.com/maps/contrib/113321871517390024887`
    as your `sameAs`. **Is that your real Local Guide profile?**
    If not, paste the correct URL and I'll swap it.

## Answered

_(empty)_
