# Metrics

What we know — and (mostly) what we don't yet.

## Traffic

- **Source:** Vercel Web Analytics — not yet wired in
  `apps/app/src/app/(frontend)/layout.tsx`. Wire next run.
- **Google Search Console:** not yet connected.
- **Plausible / Fathom:** none.

## Reviews

- **Total in collection:** ~80 legacy WP-imported (per the
  `feat: add Reviews collection, seed script, and frontend pages`
  commit). Verify exact count next run via `payload count`.
- **Published this quarter:** 0 net-new under the new CEO regime.
- **Drafts in flight:** 0.

## Email list

- No list yet. `SubscribeForm` exists but POSTs nowhere —
  `// TODO: wire up to email provider`.
- Resend is installed via `@payloadcms/email-resend` for
  transactional only.

## Affiliate / monetization

- $0. No active affiliate programs.
- No display ads.

## Social

- Unknown handles + follower counts. Brandon to confirm:
  - Twitter/X
  - Instagram
  - Facebook
  - LinkedIn (probably less relevant)
  - TikTok (?)

## North-star metric (proposed)

Weekly count of **published reviews with photos and schema markup**.
Until we wire Search Console, this is the controllable signal that
correlates with the long-term game.

## To-collect (next 2 nights)

- Connect Vercel Analytics.
- Get GSC verification.
- Run `payload count` to nail exact review counts by category.
- Ask Brandon for current social handles + follower counts.
