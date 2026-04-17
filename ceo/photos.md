# Photos — ingest standards & status

## Hard rules (privacy default)

1. **Strip EXIF on any photo containing the kids before publishing.**
   GPS coordinates in particular. Use `sharp().withMetadata({})` or
   an explicit `exif: {}` strip pass. This is non-negotiable.
2. **No photos that geo-tag the family home, the kids' school, or
   any frequent recurring location.** Even with EXIF stripped, if
   the visual content is clearly identifying, leave it out.
3. **No full-face hero shots of the kids.** Side, back, or generic
   ("kids at the table" framed wide) is fine. Direct portraits are
   off-limits unless Brandon has explicitly approved that
   individual image.
4. **No full names of kids in alt text or captions.** Generic
   ("our oldest, our youngest") only.

## Pipeline (current — manual)

Brandon attaches images directly into Payload's Media collection.
EXIF stripping is *not yet enforced at upload*. Until the upload
hook is in place, manually verify any kid-containing photo before
hitting publish.

## Pipeline (target — v1)

- Brandon shares a Google Photos album link.
- Pipeline pulls images, runs through `sharp` to:
  - Strip EXIF entirely.
  - Generate WebP + AVIF at multiple widths
    (640 / 1024 / 1536 / 2048).
  - Apply mild grayscale-only-on-thumb preview where the design
    calls for it.
- Pipeline runs a face-detection pass; if a face is detected on a
  short subject (likely a kid), flag for human review.
- Pipeline proposes 4–8 photos for the review with draft alt text
  and caption.

## Albums processed

(empty — populate as we ingest)

## Standards

- **Format:** WebP (primary) + AVIF (progressive enhancement) +
  JPEG fallback. Already supported by `next/image`.
- **Compression:** quality 80 for content photos, 70 for hero
  backgrounds.
- **Aspect ratios:** 16:9 hero, 4:3 grid, 3:2 inline. Use
  `aspect-[16/9]` etc., not arbitrary heights.
- **Alt text:** descriptive, not decorative. "Plate of seared
  scallops on a cedar plank" not "food."
- **Caption:** optional, italicized, body font. Use to add
  context the image alone can't convey.
- **No watermark** on photos. The byline + page header is the
  attribution.
