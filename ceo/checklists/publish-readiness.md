# Publish-Readiness Checklist

Use before publishing or requesting production deployment for any Johnson Reviews article. This checklist is intentionally stricter than a normal blog post because the site is public, reputation-bearing, and may include family photos.

## 1. Factual accuracy

- `[ ]` Brandon confirmed the visit happened.
- `[ ]` Date/season is accurate or clearly framed as approximate/historical.
- `[ ]` Dishes, rooms, amenities, prices, and service moments came from Brandon or verified source material.
- `[ ]` No ghostwriter/legacy claims were migrated without Brandon fact-checking.
- `[ ]` Any uncertain detail is either removed or marked for final answer before publish.
- `[ ]` Rating/verdict reflects Brandon's actual recommendation.

## 2. Voice and brand

- `[ ]` Reads like Brandon: specific, warm, practical, family-aware.
- `[ ]` Uses "we" by default where family context applies.
- `[ ]` Avoids banned language from `ceo/voice.md`: "must-visit," "hidden gem" unless explicitly approved, "foodie," "nestled," "boasts," "perfect blend," luxury-critic copy, and Instagram-caption energy.
- `[ ]` Negative comments are honest and contextual, not cruel.
- `[ ]` No family names/details beyond what Brandon has approved.

## 3. SEO and structure

- `[ ]` Title is search-friendly and honest.
- `[ ]` Dek/meta description gives the practical value and verdict.
- `[ ]` City/area appears early in the intro where relevant.
- `[ ]` Primary and secondary keywords are natural, not stuffed.
- `[ ]` Headings make the review skimmable.
- `[ ]` Internal links added to relevant category/location/related reviews where available.
- `[ ]` No dead or placeholder links.

## 4. Schema / metadata

- `[ ]` Correct schema type selected: Restaurant, Hotel, TouristAttraction, LocalBusiness, or generic Review as appropriate.
- `[ ]` Place name, address, official URL, and geo fields are verified if included.
- `[ ]` Review author is Brandon Johnson.
- `[ ]` Rating fields are included only if Brandon supplied/approved them.
- `[ ]` BreadcrumbList is present or intentionally deferred.
- `[ ]` JSON-LD validates syntactically.
- `[ ]` Schema does not duplicate/conflict with existing page-level structured data.

## 5. Photos and privacy

- `[ ]` Every image has descriptive alt text.
- `[ ]` Every image source is available in a durable location, not only dependent on legacy SG-Host unless explicitly accepted.
- `[ ]` Photos with kids have GPS EXIF stripped before upload/publish.
- `[ ]` No photos reveal school, home, recurring activities, or sensitive routines.
- `[ ]` Brandon approved any photo with kids visible.
- `[ ]` Food/place/scenery photos preserve or remove GPS intentionally based on privacy and proof-of-visit tradeoff.
- `[ ]` Hero image dimensions/compression are reasonable for performance.

## 6. Disclosure and monetization

- `[ ]` Comped meal/stay/experience disclosed if applicable.
- `[ ]` Affiliate links disclosed if applicable.
- `[ ]` Sponsored-post language included if applicable.
- `[ ]` No agent accepted comps, commitments, or partner terms on Brandon's behalf.
- `[ ]` Any monetization/legal/PII-sensitive change is treated as R4 and escalated before publish.

## 7. Technical checks

- `[ ]` Local route renders without obvious errors.
- `[ ]` Mobile layout checked.
- `[ ]` No console/runtime errors observed in smoke test, or errors are documented as pre-existing.
- `[ ]` `pnpm tsc` run or explicit reason documented.
- `[ ]` `pnpm build` run or explicit reason documented.
- `[ ]` Preview URL checked if available.

## 8. Approval gate

- `[ ]` Brandon approved final factual content and verdict.
- `[ ]` Quinn reviewed if this is going through agent workflow.
- `[ ]` Production deploy blocker in `ceo/INBOX.md` is resolved before claiming anything is live.
- `[ ]` If Vercel/main auto-deploy is uncertain, report "ready for deploy" only — do not claim "published/live."

## Final release note template

```md
Ready for publish: <review title>

Verified:
- Facts/voice:
- SEO/schema:
- Photos/privacy:
- Technical checks:

Open risk:
- <none or blocker>

Approval needed:
- Brandon final content approval
- Deploy gate if production release is requested
```
