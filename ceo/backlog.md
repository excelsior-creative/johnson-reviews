# Backlog

Tagged ideas, bugs, and opportunities. Not committed; sort and
promote into roadmap when ready.

## site

- [x] ~~Audit `CalculatorSection` and `ServicesSection` components.~~
  Deleted 2026-04-25; confirmed unreferenced.
- [ ] Audit `AboutSection` — verify it isn't double-rendering with
  the dedicated `/about` page.
- [ ] Verify `SubscribeForm` is wired to a real provider (likely not).
- [x] ~~Replace press-logo source URLs in `AsSeenIn.tsx`.~~ Localized
  to `/press/*.png` 2026-04-25.
- [x] ~~Hero background image moved off SG-Host.~~ Now
  `/hero/brandon-on-the-road.jpg`.
- [ ] Footer link audit (tap each one).
- [ ] 404 page design.
- [ ] Loading / Suspense skeleton design.
- [ ] **Audit `reference/design2/` vs current implementation.** PR #15
  shipped a "design2" pivot between nightly runs; verify what's actually
  rendering matches design2 and rewrite `/ceo/design-system.md`
  accordingly once Brandon confirms which is canonical (INBOX #11).
- [ ] Apply the JSON-LD pipeline to `/reviews/[slug]` (Reviews
  collection — separate Google Reviews schema). Currently only
  `/blog/[slug]` ships per-post schema.
- [ ] Build a visible Breadcrumb component matching the JSON-LD
  breadcrumb structure.
- [ ] `/location/[slug]` route + Dana Point hub page (proof of
  concept). Apizza Doho draft references it.

## workflow

- [x] ~~Build `/ceo/prompts/intake.md`.~~ Shipped 2026-04-25 v1.
- [x] ~~Build `/ceo/templates/review-template.md`.~~ Shipped
  2026-04-25 v1.
- [x] ~~Publish-readiness checklist.~~ Lives in the bottom of
  `templates/review-template.md`.
- [ ] Photo metadata stripper script: `apps/app/scripts/strip-exif.ts`
  that runs on uploads to Payload Media for any photo flagged
  "contains-kids."
- [ ] Bridge from `/ceo/drafts/<slug>.md` Markdown frontmatter to a
  Payload Posts insert (or import script). Right now the path from
  draft → published is manual.

## content

- [ ] Migrate the 60+ legacy WP reviews — see `/ceo/review-queue.md`.
- [ ] Refresh year stamps where appropriate (some legacy reviews are
  3+ years old; either timestamp them as historical or note "last
  visited" date).

## seo

- [x] ~~Restaurant / TouristAttraction / LocalBusiness + Review schema
  on every Post.~~ Schema generators shipped 2026-04-25 in
  `lib/structured-data.ts`; rendered on `/blog/[slug]`. Coverage =
  100% of Posts going forward; legacy posts still pending migration.
- [x] ~~BreadcrumbList schema.~~ Shipped 2026-04-25 on `/blog/[slug]`.
  TODO: extend to `/blog`, `/about`, `/contact`, `/reviews/[slug]`.
- [ ] AggregateRating schema on location hubs (depends on hubs
  existing).
- [ ] Internal-link automation: every published review automatically
  gets 3 related-review links based on category/location/tag overlap.
- [ ] Sitemap audit + GSC verification.
- [ ] Author Person schema verification in Google's Rich Results test
  once the live site is reachable from the agent (INBOX #1).

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
