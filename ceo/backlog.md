# Backlog

Ideas, bugs, opportunities. Not promises. Pull from here to Roadmap when
prioritized.

## Site

- [ ] `Hero.tsx` has a hardcoded background image from
      `brandonj117.sg-host.com` — legacy WP host. Replace with a proper
      asset in `media/` and ship responsive versions.
- [ ] `CategoryGrid.tsx` images also point at `brandonj117.sg-host.com`.
      Same issue.
- [ ] `LexicalContent.tsx` default `className` uses `prose-li:marker:text-[#DB7D2D]`
      and `prose-blockquote:border-[#DB7D2D]` — legacy orange. Should be
      `#f2ca50`.
- [ ] `Reviews/page.tsx` uses legacy orange `#DB7D2D` for active filter
      chips and `Jost` font. Needs reskin to gold + Inter.
- [ ] Footer copy ("Elevating the standard of taste… uncompromising
      palate") is off-brand haute-cuisine-critic voice. Rewrite in
      Brandon's voice after voice.md calibrates.
- [ ] Hero copy ("Elevating the standard of taste… every experience
      deserves to be remembered") — same.
- [ ] Mobile nav: test focus trap, escape-closes, and scroll lock on
      open.
- [ ] 404 / not-found page: custom designed, matches system.
- [ ] `blog/page.tsx` still uses the generic `Header` component with
      "All Articles" copy. Needs editorial hero.

## Workflow

- [ ] Interview question bank by category (restaurant / hotel /
      experience / shopping / travel).
- [ ] Slack intake protocol: how does Brandon append to
      `review-queue.md` from his phone?
- [ ] Google Photos ingestion — link → pull image manifest → strip
      geotags → propose photos to use.
- [ ] Payload admin "New Review from Workflow" shortcut that pre-fills
      the schema per `voice.md` structural defaults.

## SEO / content

- [ ] JSON-LD: Restaurant, TouristAttraction, LocalBusiness, Review,
      AggregateRating — none implemented yet on review posts.
- [ ] Sitemap — exists but should be audited for coverage after the
      redesign ships.
- [ ] Redirect table for the 70+ legacy WP URLs in `reference/*` (most
      of those slugs do not currently have live Next.js routes).
- [ ] Open Graph + Twitter card defaults — verify on review posts.

## Brand / content

- [ ] Collect Brandon-confirmed voice samples. Priority 0 for voice.md
      calibration.
- [ ] About page rewrite — currently likely generic.
- [ ] Family photo policy doc (which kids can appear, when faces
      should be obscured, geotag rule) — in `photos.md`.

## Infra / dev

- [ ] `.gitignore.tmp` empty file at repo root — stray, should be
      deleted.
- [ ] Stray `.DS_Store` files tracked (root, apps/app/, apps/app/src/,
      packages/). Clean up.
- [ ] `payload-types.ts` is gitignored (good) but that means new
      collections don't surface types at review time. Document the
      local regeneration step in README.
- [ ] Unused legacy files in `reference/*` (zip + HTML dumps of old
      WordPress site) — keep for 301 map, then prune.

## Monetization (parked)

- [ ] Identify top affiliates: OpenTable, Resy (restaurants); Booking
      / Expedia / Marriott / Hilton (hotels); Get Your Guide /
      Viator (experiences); REI / travel gear.
- [ ] Programmatic ad baseline (Mediavine / Raptive thresholds).
- [ ] Sponsored stay / press trip policy (disclosure rules, editorial
      independence) — before anything is accepted.
