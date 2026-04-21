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

11. **Google Local Guide profile URL.** Tonight I wired author +
    Person schema and the bio block. I did **not** invent the
    URL. Please drop it in — once you do, set
    `NEXT_PUBLIC_LOCAL_GUIDE_URL=<url>` in Vercel env and both the
    sidebar link + schema `sameAs` will light up automatically.

12. **Confirm ADR 0002 — no fabricated rating axes.** I killed the
    "Ambience / Service / Value" verdict block on review pages
    because the scores were synthesized from the overall rating
    (not you rating them). If you want real facet ratings, they
    have to come from you rating them explicitly at intake. See
    `/ceo/decisions/0002-no-fabricated-rating-axes.md`.

### 🟢 FYI

8. **Legacy image dependency.** The site currently loads many
   images (including the Hero background and "As Seen In" logos)
   from the old `brandonj117.sg-host.com` server. If SG-Host
   expires, the site breaks visually. I'll backlog a migration
   into Payload Media; flagging so you don't accidentally cancel
   that hosting.

9. ~~**Suspicious components.**~~ **[ANSWERED 2026-04-21 by agent]**
   `CalculatorSection` (commercial RE depreciation calculator),
   `ServicesSection` (generic services scaffold), and
   `AboutSection` (template "about us pitching Payload/Next.js as
   the product") were all dead code with zero imports. Deleted
   in tonight's PR.

10. **Quarter OKRs.** Drafted in `/ceo/okrs.md`. Targets are best-
    guess. Confirm or revise.

13. **Legacy reviews are not in Payload.** Clarifying the
    review-queue assumption from 2026-04-20: the seed only
    creates template sample posts; `scripts/import-reviews.ts`
    populates the `reviews` collection from Google. There is no
    WP → Posts importer. Each legacy migration is a
    conversational pass per the new workflow in
    `/ceo/prompts/intake.md`.

14. **SEO metadata was wildly broken.** Before tonight, every page
    emitted `"Template Site"` as the site name and `"Built with
    Next.js & Payload CMS"` as the tagline in OG tags, Twitter
    cards, Organization schema, RSS, and contact emails. Root
    layout overrode the title but nothing else. Fixed tonight.
    No action needed — just explaining why the PR touches so
    many metadata-adjacent files.

## Answered

- ~~#9 (suspicious components)~~ — closed 2026-04-21 by agent;
  all three were dead code, deleted.
