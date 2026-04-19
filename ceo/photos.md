# Photos — standards and ingestion

## Privacy defaults (non-negotiable)

1. **Kids' photos: strip location metadata.** Any photo with any Johnson
   kid in it must have EXIF location (GPSLatitude, GPSLongitude,
   GPSAltitude) scrubbed before publish. No exceptions.
2. **Kids' photos at identifiable places (school, home, youth-sports
   venues, family events):** do not publish at all.
3. **Kids are not named by full name** unless Brandon has explicitly
   approved it for a specific post.
4. **When in doubt, don't publish.** Privacy > reach.

## Standards for published photos

- Format: WebP primary, JPEG fallback. Compressed.
- Responsive: at least 3 sizes (mobile, tablet, desktop).
- Alt text: describe the subject specifically. "A plate of fish tacos
  with lime and cabbage at [restaurant]" — not "delicious meal."
- Credit / attribution: photos are Brandon's unless noted. If a
  restaurant provided a photo, note that.
- No watermarks.
- No filters that misrepresent the actual experience (lighting cleanup
  OK, over-saturation not OK).

## Ingestion pipeline (target, not yet built)

1. Brandon drops a Google Photos album link in `review-queue.md` or
   pings the CEO in Slack.
2. CEO pulls the album manifest, generates thumbnails.
3. For each photo: detect if kids are present → apply strip-geotag step
   → note in the review draft. If the photo is at an identifiable
   location and kids are present, flag for Brandon.
4. Proposes 4–8 photos for the post with draft captions. Brandon
   approves / subs.
5. On approve: upload to `media/`, link to Payload `gallery` field,
   publish.

## Albums processed

- None yet. The legacy WordPress archive has its own images referenced
  at `brandonj117.sg-host.com` — those should be migrated to Payload
  `media` during the legacy triage pass.

## Current image hosts in code (to migrate)

- `brandonj117.sg-host.com/wp-content/uploads/...` — referenced in
  `Hero.tsx` and `CategoryGrid.tsx`. Should be moved to
  `apps/app/media/` or Vercel Blob. At minimum, `next/image` should be
  configured to load from that host (check `next.config.ts`).
