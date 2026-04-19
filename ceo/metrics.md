# Metrics

What we know. Updated each night.

## Baseline — TBD

As of Night 1 (2026-04-19), we have not instrumented metric collection.
Placeholders:

| Metric | Value | Source | Last measured |
|---|---|---|---|
| Reviews published (lifetime) | ~70 (legacy WP archive) | estimated from `reference/*` folders | — |
| Reviews published (on new Payload stack) | unknown (need count via `payload find`) | Payload `posts` collection | — |
| Monthly organic visits | unknown | GA4 / GSC | — |
| Indexed pages | unknown | `site:johnsonreviews.com` in Google | — |
| Top query position | unknown | GSC | — |
| Domain Rating / Authority | unknown | Ahrefs / Moz | — |
| Email list size | 0 (no list yet) | — | — |
| Affiliate clicks | 0 (no affiliates yet) | — | — |
| Revenue | $0 | — | — |
| Social: Instagram | unknown | — | — |
| Social: X/Twitter | unknown | — | — |
| Social: Facebook | unknown | — | — |

## Nightly delta (once instrumented)

Format once we have baseline:

```
### YYYY-MM-DD
- Published: +N
- New words in library: +N
- Organic visits (rolling 7d): N (Δ +N)
- New backlinks: N (sources: ...)
```

## Asks for Brandon

- GA4 property access (or confirmation that we have it).
- GSC property access.
- Ahrefs / Moz / Semrush account info (if any).
- Current subscriber count / social follower counts.
