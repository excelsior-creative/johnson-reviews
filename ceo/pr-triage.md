# PR Triage — Open Drafts

_Created 2026-04-26 by the nightly CEO run after discovering 7 open
draft PRs from prior runs, none merged. Refresh this each night._

## Why this exists

Each prior nightly run opened a draft PR with that night's work. None
have been merged. Brandon's morning needs a clean inventory:
**what's in flight, what's redundant, what to merge first**. Without
this, future nightly runs keep duplicating fixes (the most common
casualty: the `SITE_NAME = "Template Site"` bug, attempted in 4
separate PRs and still live in main).

> **CEO recommendation:** **merge PR #17 first** as a single
> consolidated drop, close PRs #16 and #14 as superseded, close
> PRs #8 / #9 / #11 / #13 as pre-design-migration noise. Then this
> file goes empty and we start from a clean slate.

## Open PRs (newest → oldest)

### PR #17 — `claude/relaxed-hamilton-yGQ2L` (2026-04-25)
**Title:** "fix(brand+seo): Johnson Reviews metadata, JSON-LD, author E-E-A-T + workflow scaffolding"
**Base:** post-PR#15 (`e8c1c81`) — current with the new editorial system.
**Status:** ✅ **Merge candidate.**

What it ships:
- Critical: `SITE_NAME = "Template Site"` → `"Johnson Reviews"`,
  default description + keywords rewritten on-voice. Fixes OG cards,
  JSON-LD Organization, Twitter cards, RSS feed channel, transactional
  email footer.
- `lib/structured-data.ts` rewritten — Person/Author schema for
  Brandon, BlogPosting + Review + Breadcrumb wired on `/blog/[slug]`.
- Author bio block above the signature on review detail.
- Hero photo + AsSeenIn press logos copied into
  `apps/app/public/{hero,press}/`. Drops `brandonj117.sg-host.com`
  dependency.
- `AsSeenIn` rewritten — "Where Brandon writes," only confirmed
  platform (Google Local Guides), inline credentials.
- `/about` — fake Unsplash portrait → typographic "BJ" placeholder.
  Fabricated "Johnson & Co." brand → "Johnson Reviews."
- Deletes `CalculatorSection.tsx` and `ServicesSection.tsx`
  (zero references).
- `ceo/prompts/intake.md` v1, `ceo/templates/review-template.md`,
  `ceo/drafts/apizza-doho-dana-point.md` first legacy migration draft
  (BLOCKED on Brandon redline; not for publish without sign-off).
- 2026-04-25 journal + INBOX +5 + voice.md redlines log + workflow
  friction notes.

What it doesn't do:
- Doesn't update `/ceo/design-system.md` for the new editorial system
  (this run does that).
- Doesn't address the missing 404 / loading states.

### PR #16 — `claude/relaxed-hamilton-dEc8A` (2026-04-24)
**Base:** post-PR#15.
**Status:** 🟡 **Subsumed by PR #17 — close as duplicate.**

What it ships that's not in #17:
- Deletes more dead components: `AboutSection`, `CTASection`, `Header`
  (the standalone — Payload `globals/Header` is untouched), `Logo`.
- 2026-04-24 journal entry.

What overlaps #17:
- Same `SITE_NAME` rewrite.
- Same schema graph rewrite.
- Same intake prompt (slightly different wording).

**Recommendation:** Close #16. If Brandon wants the extra deletions
(`AboutSection`, `CTASection`, `Header`, `Logo`), they can be ported
into a follow-up after #17 lands.

### PR #14 — `claude/relaxed-hamilton-WXrQV` (2026-04-22)
**Base:** **pre-PR#15** (`1a257f2`) — based on Gilded Legacy era.
**Status:** 🟡 **Likely conflicts now. Close.**

What it ships:
- Same `SITE_NAME` rewrite, same schema rewrite, same intake prompt
  + apizza doho draft as #17 (#17 was iterated from this lineage).
- New `AuthorBio.tsx` component (gold BJ monogram).
- Hero falls back to gradient if no `NEXT_PUBLIC_HERO_IMAGE_URL`.
- AsSeenIn rewritten as text-only credentials strip.
- `ceo/prompts/publish-checklist.md` — voice + structure + images +
  SEO checklist.

**Recommendation:** Close #14. The good ideas (AuthorBio, hero
gradient fallback, publish checklist) can be salvaged separately
once #17 lands; rebasing #14 across the design migration is more
work than re-doing the patches on top of post-#17 main.

### PR #13 — `claude/relaxed-hamilton-IxfMu` (2026-04-21)
**Base:** **pre-PR#15** (`1a257f2`).
**Status:** 🟡 **Pre-redesign. Close.**

What it ships:
- Same `SITE_NAME` fix, same schema refactor, same kill-fabricated-
  Verdict + AuthorBio + intake workflow scope as later PRs.

**Recommendation:** Close #13. Fully subsumed by #14 → #16/#17 chain.

### PR #11 — `claude/relaxed-hamilton-mRXMx` (2026-04-19)
**Base:** **pre-PR#15** (`ba4f4b9`).
**Status:** 🔴 **Pre-redesign visual work. Close — superseded by PR #15.**

What it shipped:
- `/ceo` bootstrap (this work landed in PR #12).
- Editorial review-detail redesign (`ReviewDetailHero`, `VerdictPanel`,
  `ConciergeSidebar`, `.review-prose`) for the **old Gilded Legacy**
  reference. Visually superseded by PR #15.

**Recommendation:** Close #11. The component ideas (verdict panel,
concierge sidebar) might still be useful as patterns to revisit on
top of the new editorial system, but the code itself targets the old
palette.

### PR #9 — `claude/relaxed-hamilton-rh4je` (2026-04-18)
**Base:** **pre-PR#15** (`e956a55`).
**Status:** 🔴 **Pre-redesign. Close.**

What it shipped:
- `/ceo` bootstrap (landed via PR #12 lineage).
- `/reviews` index editorial reskin for the old Gilded Legacy palette.

**Recommendation:** Close #9. Visually superseded by PR #15.

### PR #8 — `claude/affectionate-goodall-U6bnx` (2026-04-17)
**Base:** **pre-PR#15** (`e956a55`).
**Status:** 🔴 **Pre-redesign. Close.**

What it shipped:
- `/ceo` bootstrap (landed via PR #12).
- Legacy palette purge (`#DB7D2D` orange, Jost/Oswald/Unna fonts) for
  Gilded Legacy. Almost certainly already moot in the new
  editorial system, since PR #15 rewrote everything.

**Recommendation:** Close #8.

## Summary recommendation for Brandon

1. **Open PR #17** in your browser, skim it, merge it. That single
   merge gets us:
   - Brand metadata fixed (no more "Template Site" leaking everywhere)
   - JSON-LD schema graph wired
   - Author bio + E-E-A-T signal on every post
   - Image-host independence (sg-host removed)
   - About-page fabrications removed
   - Two confirmed-dead components deleted
   - Review intake workflow prompt + template scaffolded
2. **Close PRs #8, #9, #11, #13, #14, #16** as superseded/duplicate
   (suggested comment: "Superseded by #17 / #15.").
3. Tomorrow's nightly run starts from a clean slate and tackles
   actual new ground (legacy review migrations, location hubs,
   404/loading states).

## Why this keeps happening

The pattern: each nightly agent reads `/ceo`, sees `metadata.ts`
shipping "Template Site" to OG cards, fixes it, opens a PR, and
goes to bed. The next nightly agent does the same thing because the
fix is still in a draft, not in main. We are stuck in this loop until
Brandon either:
- merges a PR, or
- explicitly tells the CEO routine "stop opening fix PRs for X until
  I've merged something."

Tonight's run made the choice to **not** add another duplicate fix
PR. Instead it's recording reality (this doc) and shipping one
distinct technical contribution (an EXIF stripping utility — see
`apps/app/scripts/strip-exif-gps.ts` — that no other open PR has).
