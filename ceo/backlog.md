# Backlog

Tag each item. Use #site #workflow #content #seo #monetization
#brand #infra.

## #site

- Mobile viewport audit — reference HTML only shows desktop;
  we own responsive behavior. Test every template down to
  375px.
- Dark-mode-only toggle removal check: the Tailwind config has
  `darkMode: "class"` inherited from the reference, but the
  site is exclusively dark. Make sure we're not double-
  themed.
- Remote image host `brandonj117.sg-host.com` used in
  `Hero.tsx` background — migrate to an image stored in our
  Vercel Blob so we don't depend on a third-party host.
- `apps/app/src/app/(frontend)/reviews/page.tsx` uses
  ad-hoc hex colors (`#DB7D2D`, `#1e1f20`) and legacy `Jost`
  font — being fixed in first-run PR.
- Navbar has a "Sign In" button; no auth flow exists yet.
  Either build sign-in (bookmarks) or remove the button for
  now.
- Investigate whether the `framer-motion` usage in Navbar
  (`m` + `AnimatePresence`) is wired to a `LazyMotion`
  provider. If not, it'll fail silently in production.

## #workflow

- Convention for Brandon's Slack intake — a specific
  channel / emoji? Or just free-text?
- Decide on the voice-note ingestion path.
- Define the "question batch" Slack message format.

## #content

- Rewrite target list — see `review-queue.md`.
- Category taxonomy audit: current nav says
  Restaurants / Hotels & Resorts / Shopping / Entertainment.
  Does that cover Disneyland / theme parks? Vegas hotels?
  Need Brandon's take (🟡-1).
- 404 / empty state copy in Brandon's voice.
- About page — needs Brandon's actual bio.

## #seo

- Connect Google Search Console, Bing Webmaster.
- Schema audit on existing pages (Google Rich Results test).
- Internal link graph: every published review should link
  to ≥2 siblings.
- Location hub pages.

## #monetization

- Defer until traffic + authority are real.

## #brand

- Logo treatment lock-in: reference shows "Johnson Reviews"
  in Noto Serif gold at tracking-tighter. Current build
  uses uppercase "JOHNSON REVIEWS". Reference mixes cases
  ("Johnson Reviews"). Pick one — need Brandon.
- Favicon / social card audit.
- Voice guide finalization with real Brandon writing.

## #infra

- CI: is there a Vercel preview? GitHub Actions?
- Observability: Sentry is installed (`@payloadcms/plugin-
  sentry`); confirm it's connected to a project.
- Test scaffolding: there's no test runner in `package.json`.
  Add something lightweight (Vitest + Playwright for smoke).
