# Backlog

Tagged ideas, bugs, and opportunities. Not committed; sort and
promote into roadmap when ready.

## site

- [ ] Audit `CalculatorSection` and `ServicesSection` components —
  unclear what they do on a reviews site. Possibly dead code from
  the original WP-clone template.
- [ ] Audit `AboutSection` — verify it isn't double-rendering with
  the dedicated `/about` page.
- [ ] Verify `SubscribeForm` is wired to a real provider (likely not).
- [ ] Replace press-logo source URLs in `AsSeenIn.tsx` from the
  legacy `brandonj117.sg-host.com` host with assets we own. Right
  now the redesign depends on the old SG-Host server staying up.
- [ ] Same for the Hero background image — it's loaded from
  `brandonj117.sg-host.com/wp-content/...`. Needs to be moved into
  `apps/app/public` or Payload Media.
- [ ] Footer link audit (tap each one).
- [ ] 404 page design.
- [ ] Loading / Suspense skeleton design.

## workflow

- [ ] Build `/ceo/prompts/intake.md` — the standard interview prompt
  template the agent uses when Brandon initiates a review.
- [ ] Build `/ceo/templates/review-template.md` — the structural
  skeleton for every review draft.
- [ ] Publish-readiness checklist (schema, alt text, internal links,
  geotag stripping).
- [x] ✅ Photo metadata stripper CLI:
  `apps/app/scripts/strip-exif-gps.ts` shipped 2026-04-26
  (`pnpm strip:exif <path>`). Strips GPS tags from JPEG/PNG/WebP/AVIF.
  Pre-upload tool, not a Payload hook yet — that's a follow-up.
- [ ] Wrap the stripper in a Payload `beforeChange` hook on the Media
  collection so photos flagged `contains-kids: true` are auto-stripped
  on upload.

## content

- [ ] Migrate the 60+ legacy WP reviews — see `/ceo/review-queue.md`.
- [ ] Refresh year stamps where appropriate (some legacy reviews are
  3+ years old; either timestamp them as historical or note "last
  visited" date).

## seo

- [ ] Restaurant / TouristAttraction / LocalBusiness + Review schema
  on every Post.
- [ ] AggregateRating schema on location hubs.
- [ ] BreadcrumbList schema everywhere.
- [ ] Internal-link automation: every published review automatically
  gets 3 related-review links based on category/location/tag overlap.
- [ ] Sitemap audit + GSC verification.

## monetization

- [ ] Affiliate strategy proposal for Brandon (booking sites,
  travel gear, restaurant delivery).
- [ ] Display ad provider research (Mediavine, Raptive,
  Journey by Ezoic) — gated on traffic threshold.
- [ ] Sponsored-post disclosure template + page.

## brand

- [ ] About page rewrite on-voice.
- [ ] Author bio block (Brandon credentials, Local Guide stats).
- [ ] Logo / wordmark audit — is "Johnson Reviews" set in
  Noto Serif consistently across nav + footer + favicon?
- [ ] Favicon / app icons / social card images.
