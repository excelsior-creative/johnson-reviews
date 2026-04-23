# Photos — Ingestion + Privacy

## Ingestion

The current site loads many images directly from
`brandonj117.sg-host.com/wp-content/...` (the legacy SG-Host
WordPress server). This is fragile — if SG-Host expires or
Brandon pulls the plug, the site breaks visually overnight.

**Action items (in backlog):**
- Mirror all referenced legacy images into `apps/app/public` or
  Payload Media before SG-Host is decommissioned.
- For new reviews, ingest from Google Photos shared albums (when
  Brandon grants access) or from a folder Brandon drops into
  `apps/app/uploads/` for processing.

## Standards

| Property         | Standard                                                 |
|------------------|----------------------------------------------------------|
| Format           | AVIF preferred, WebP fallback, JPEG legacy               |
| Hero width       | 2400px max, served responsive via Next.js `<Image>`      |
| Inline width     | 1600px max                                               |
| Compression      | Lossy, q≈80                                              |
| Color profile    | sRGB                                                     |
| Alt text         | Required. Descriptive. Includes location + subject.      |
| Caption          | Optional. Italic Noto Serif.                             |
| Geotags          | **Stripped on every photo with the kids.** No exceptions. |
| EXIF             | Camera/lens metadata OK to keep (E-E-A-T proof). Times OK. Locations conditionally — see below. |

## Privacy rules (extending /ceo/voice.md §6)

- **Photos containing the kids:** strip GPS EXIF before publishing.
  Always.
- **Photos at home or at recurring locations (school, sports
  practice, grandparents' house):** never publish.
- **Photos at restaurants / hotels / theme parks / public spaces:**
  fine to publish with kids visible if Brandon has okayed the photo,
  but still strip GPS metadata if kids are in frame.
- **Photos of food, places, scenery (no kids):** GPS metadata is
  fine and actually helps E-E-A-T (proof of visit).

## Albums processed

_(empty — nothing ingested yet by the agent)_

| Album / Source | Date received | Reviews tied | Photos uploaded | Notes |
|----------------|---------------|--------------|-----------------|-------|
| —              | —             | —            | —               | —     |

## Tooling status

- Payload Media collection exists and works for upload.
- No automated EXIF stripper yet. Backlog: `scripts/strip-exif.ts`.
- No automated photo proposal from a Google Photos album yet.
  Backlog.
