# Metrics — what we know

_v0, 2026-04-20. The agent has no tool access to GA / GSC / Vercel
analytics yet. Brandon: please share or grant._

## Brandon's Google Local Guide profile (per `QuickStats`)

- **Level:** 10+
- **Photo views:** 132,010,497+
- **Guide points:** 112,222+
- **Photos shared:** 27,497+
- **Reviews published (Google):** 500+

## Site

- **Published Posts (Payload):** unknown — need to query Payload at
  build time or expose a count endpoint. (Backlog item.)
- **Pages indexed in Google:** unknown — need GSC.
- **Organic sessions / month:** unknown — need GA or Plausible.
- **Top landing pages:** unknown.
- **Domain Rating / DA:** unknown.

## Audience

- **Email subscribers:** unknown. `SubscribeForm` exists but its
  provider wiring isn't verified.
- **Social followers (IG / X / FB / Threads):** unknown.
- **Newsletter open rate:** N/A — no list.

## Revenue

- **Affiliate clicks:** 0 / unwired.
- **Affiliate revenue:** $0.
- **Display ad revenue:** $0 / not enrolled.
- **Sponsored content revenue:** unknown.

## Things to wire up (in priority order)

1. Brandon connects the agent to GSC + GA / Plausible (or grants
   read access via a service account / API key).
2. A `/ceo/admin/stats` route or a nightly export of Payload counts
   (drafts vs published, by category, by location).
3. Vercel deployment health: latest deploy status, build time,
   error rate, latency.
