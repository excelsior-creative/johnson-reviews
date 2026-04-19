# Roadmap

Rolling initiative list. Now / Next / Later. Re-prioritize weekly.

## Now (this week)

### Redesign — close the gaps vs. `reference/design/`

The visual foundation (colors, type, dark aesthetic) shipped in an
earlier dark-luxury PR. Remaining work, in ship order:

1. **Review detail page (`/blog/[slug]`)** — implement reference's
   `johnson_reviews_review_detail_gold_edition`: drop cap lead
   paragraph, Concierge sidebar (address / price / hours / category),
   Verdict rating bars (Food / Experience / Value / Kid-Friendly),
   two-column image gallery fragment. **Started Night 1.**
2. **Reviews page (`/reviews`)** — purge legacy orange `#DB7D2D` and
   Jost font tokens. Align filters + grid to reference Discovery
   page's bento aesthetic (but adapted for star-rating filter, not
   cuisine-architecture).
3. **Blog index page (`/blog`)** — replace generic "All Articles"
   header with editorial layout per reference. Sidebar filters
   (category / location), bento-style featured + grid.
4. **Hero + Footer copy voice pass** — remove haute-cuisine-critic
   clichés ("uncompromising palate," "standard of taste") and replace
   with Brandon's voice. **Blocked on Brandon's answer to the
   design-vs-voice question.**
5. **Navbar reconciliation** — reference shows 3 serif nav items
   (Reviews / Trending / About). Current shows 6 Inter-caps items. Pick
   one and ship it. Ask Brandon.

### /ceo bootstrap

All required docs created Night 1. Iterate as we learn.

## Next (next 2–4 weeks)

- **Review intake workflow v1.** Capture → interview script →
  Payload draft → Brandon review → publish. See `workflow.md`.
- **Photo pipeline with geotag scrubbing.** Any photo containing kids
  must have location metadata stripped before publish.
- **Schema pass.** Restaurant / TouristAttraction / Review JSON-LD on
  every review. AggregateRating at category hubs where ≥ 3 reviews.
- **Category / location hub pages.** Real editorial pages, not just
  tag routes.
- **Legacy WP archive triage.** One pass on `reference/*` folders:
  keep-and-rewrite vs. kill-with-301 vs. leave.

## Later (this quarter, lower priority)

- Performance: image CDN, Lighthouse audit, font-display tuning.
- Accessibility audit (contrast on gold-on-dark, focus rings, keyboard
  nav).
- Search — real full-text, not just in-memory filter.
- Payload admin polish: "New Review" workflow button, preview parity
  with redesign.
- Email capture (double opt-in, no sends until Brandon says send).
- SEO: internal-link graph audit, 404 sweep, sitemap.
