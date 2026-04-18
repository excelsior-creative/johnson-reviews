# Photos

How Google Photos content reaches the site and how we handle
it. Updated when Brandon shares the first album and we codify
the actual workflow.

## Privacy defaults (non-negotiable)

- **Strip EXIF/GPS metadata** from every photo that includes
  the kids before publishing. Use `sharp` (already a
  dependency) or `exiftool -all= -overwrite_original` in a
  script. Verify with `exiftool` post-strip.
- **No full-face shots of the kids** unless Brandon has
  explicitly okayed the specific image.
- **No school / home geotag signals** — if a photo shows a
  school uniform, a house number, a mailbox, crop or skip.
- **No kid full names** anywhere in alt text, captions,
  filenames, or URLs.

## Current status (2026-04-18)

No Google Photos albums have been processed yet. Existing
images on the site come from the WordPress migration — those
were already publicly posted in the old site, but we should
re-audit them with the kids-privacy rules above. Open the
question to Brandon (🟢-8 in tonight's journal).

## Proposed ingestion flow (draft, not yet validated)

1. Brandon shares a Google Photos album link per trip/venue.
2. CEO downloads the originals into
   `ceo/photos-intake/<slug>/originals/` (gitignored).
3. Metadata strip + compression:
   - Strip EXIF/GPS (`sharp.withMetadata({ exif: {} })` or
     exiftool).
   - Generate responsive renditions (Next.js `Image` will do
     this at request time if we serve through Vercel, so we
     just need base uploads to be reasonable size: 2400px
     long edge, JPEG quality 82, progressive).
   - WebP/AVIF handled by Next.
4. Upload to Vercel Blob via the existing
   `@payloadcms/storage-vercel-blob` adapter.
5. CEO drafts alt text per image: descriptive, not keyword-
   stuffed. Example: "The exterior of Maison Cafe at golden
   hour, with outdoor seating under string lights." Not
   "Maison Cafe Dana Point best breakfast Orange County."
6. CEO proposes which images go where in the draft: hero,
   gallery fragment, concierge sidebar, inline illustrations.
7. Brandon green-lights; draft ships.

## Alt-text guidelines

- Describe what's in the image for a reader who can't see it.
- Include location context when relevant (e.g. "the
  oceanfront patio at Chart House, Dana Point").
- Don't start with "Image of" or "Photo of".
- Don't include the kids' names.
- If a person's face is prominent and they're not public-
  figure staff, just "a family at the table" is enough.

## Open questions

See `INBOX.md` 🟡-6.
