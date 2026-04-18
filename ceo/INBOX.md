# INBOX — Open asks for Brandon

Duplicated to the night's journal entry. Clear items when
Brandon answers. Do not delete old answers — annotate them
with the date and move them to "resolved".

---

## 🟡 needs decision

### 🟡-1 · Category taxonomy · opened 2026-04-18

Current nav: **Restaurants / Hotels & Resorts / Shopping /
Entertainment / Contact**. Reference nav is leaner
(**Reviews / Trending / About**). Also: there's no "Theme
Parks" category but Disneyland is a significant share of
the backlog, and "Travel" / "Road Trips" is missing.

Question: do we (a) simplify to a 3-item nav and use
category pages behind `/reviews`, or (b) add Theme Parks +
Travel categories to the current nav, or (c) keep as-is?

### 🟡-2 · Hero copy · opened 2026-04-18

Live hero headline: "EACH DAY AS A NEW DESTINATION", sub:
"Elevating the standard of taste through rigorous analysis
and an uncompromising palate — every experience deserves to
be remembered."

That subcopy is in critic-voice, not Johnson-family-voice.
Suggested rewrite (for approval, not shipped):

> Headline: **"One family. Every trip. Honest reviews."**
> or: **"Where the Johnsons have been."**
>
> Sub: "Restaurants, hotels, theme parks, road trips —
> reviewed by a real family that actually went."

Please redline. Or send 2–3 sentences in your own words and
I'll fit them into the hero layout.

### 🟡-3 · Verdict scorecard axes · opened 2026-04-18

The reference review detail has a "Verdict" card with bars
for Gastronomy / Ambience / Service / Wine Program (1–10
scale). Family-travel re-axis proposal:

- **Food**
- **Vibe**
- **Service**
- **Kid-friendliness**
- **Value**

Scale: 1–10 (to match reference visual density).

Approve? Different axes? Skip the scorecard entirely?

### 🟡-4 · Analytics + Search Console · opened 2026-04-18

Need access / confirmation:

- Is Google Search Console set up for johnsonreviews.com? If
  yes, please add the CEO-ops email or send me the
  verification path.
- Analytics tool preference: **GA4**, **Plausible**,
  **Vercel Analytics**, or none?
- Any affiliate networks (Amazon, Expedia, Booking) already
  enrolled I should know about?

### 🟡-5 · Review queue priority · opened 2026-04-18

The WordPress-migrated backlog has ~70 legacy reviews that
are almost certainly AI-generated (headline patterns like
"Culinary Sojourn at Ramos House Cafe Where Every Bite Is
Art" aren't yours). Two questions:

1. Are you okay with those being **temporarily unpublished**
   or marked `noindex` while we rewrite them, to avoid
   shipping off-voice content under your byline?
2. Which trips / places from 2024–26 do you want written up
   first as fresh-from-scratch reviews? Even a list of 5
   helps me start the question batches.

### 🟡-6 · Google Photos handoff · opened 2026-04-18

For the first album you share:

1. Preferred handoff — shared Google Photos album link, or
   a Drive folder?
2. On kid privacy: my default is to **strip EXIF/GPS from
   every photo with the kids, no full names, no
   school/home identifiers**. Confirm that's the rule, or
   tighten / loosen?
3. Do any of the kids have approved "face-on-the-internet"
   status, or are we crop-from-behind / in-the-background
   by default?

## 🟢 FYI / low priority

### 🟢-7 · Proposed Q2 OKRs · opened 2026-04-18

Drafted in `ceo/okrs.md`. Five objectives:
1. Ship the redesign.
2. Build the conversational intake workflow.
3. Rebuild content library in your voice.
4. SEO foundation.
5. Metrics visibility.

Skim when you get a sec; push back on anything that feels
off. Until you push back I'll execute against these.

### 🟢-8 · Legacy review photos · opened 2026-04-18

The WP migration pulled in old photos. Some almost certainly
contain the kids with original EXIF intact. Two options:

1. I run a one-shot script that strips EXIF from every
   image in the `media` table (safe, non-destructive — I'll
   keep originals).
2. We only strip as we rewrite each review.

(1) is the safer default. OK to proceed?

### 🟢-9 · Nav "Sign In" button · opened 2026-04-18

Current navbar has a "Sign In" / bookmark button but no
auth exists. Cosmetic from the reference. Three options:

1. Remove it (cleanest, one-line change).
2. Build a minimal sign-in + bookmarks-for-later feature
   (larger project, real business value if you want a
   returning audience).
3. Keep as decoration (not recommended — users will click it).

Assume (1) unless you say otherwise.

---

## Resolved

_(none yet)_
