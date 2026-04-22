# Review Intake — Interview Prompt

Use this when Brandon pings about a new place. Purpose: extract
enough specifics that a draft can be written in his voice
without fabricating anything.

Rules while interviewing:

- Ask short, scannable questions. Brandon is time-starved.
- **Never invent details.** If an answer is "I don't remember,"
  flag that section in the draft with `[?? Brandon — check]`.
- Accept short answers. Don't push for essays.
- One question at a time when on live chat. Batch when async.
- Always end by confirming: photos source + publish timing.

## The interview

### 1. The basics (always ask)

1. **Place name + city/neighborhood.**
2. **When did you go?** (Approximate month/year is fine. Exact
   date only if you have it.)
3. **Who were you with?** (Family? Which kids? Friends? Solo?
   Work?)
4. **What kind of visit?** (Quick stop, dinner out, road-trip
   detour, anniversary, pre-concert, hotel stay, theme-park
   day, shopping, etc.)

### 2. The story (pick 2–3 that fit)

5. **What's the one moment you'd tell a friend about?** The
   thing that would make them go, or make them skip.
6. **What did you order / do / see?** Specific names —
   "the carne asada burrito," "the lazy river," not "the food."
7. **What surprised you** — in a good or bad way?
8. **Anything that went wrong?** Wait, service miss, kid
   meltdown, surprise bill, lost reservation.
9. **Would you go back?** If yes, who should go? (Date night,
   families with little kids, families with teens, solo, groups,
   business.)

### 3. Logistics (the section other families actually need)

10. **Parking?** (Valet, free lot, street, garage, tricky.)
11. **Reservations?** (Needed / helpful / walk-in fine.)
12. **Kid-friendly?** (High chairs, kid menu, stroller-friendly,
    changing table, noise level, how long before the kids melt.)
13. **Price?** (Rough per-person or $-$$$$ dial. OK with
    "reasonable" or "not cheap" if you're not sure.)
14. **Wait time?** (How long, and whether it felt worth it.)
15. **Accessibility?** (If relevant.)

### 4. Photos + publish

16. **Google Photos album or folder?** (URL / share link, or "I'll
    send them later.")
17. **Any photos with the kids' faces clearly visible?** (We'll
    strip geotags; also confirm first-name usage is OK.)
18. **Any reason to hold the post?** (Still going back, surprise
    gift, wanting the restaurant's PR person's heads-up, etc.)

---

## What happens after the interview

1. Agent writes a draft per `/ceo/voice.md` and the structure in
   `/ceo/workflow.md`.
2. Draft lives in `/ceo/drafts/<slug>.md` (markdown) or as a
   Payload Post draft (if `NEXT_PUBLIC_SITE_URL` + Payload admin
   access is wired up for the agent).
3. Agent proposes 3–6 photos from the provided album, with alt
   text + captions, and flags any photos where kids' faces are
   visible (needs geotag strip + first-name sign-off).
4. Agent pings Brandon with "draft ready" in Slack.
5. Brandon redlines. Agent applies and publishes once approved.
6. Agent logs any redline patterns in `/ceo/voice.md` §8.

## Anti-patterns to watch for in the draft

Before handing a draft to Brandon, re-read it and strike any of
these (see `/ceo/voice.md` §4 for the full list):

- "hidden gem," "must-visit," "must-try," "best ever"
- "nestled in," "boasts," "culinary masterpiece,"
  "symphony of flavors," "perfect blend of"
- "wanderlust," "epic," "soul-stirring," "transformative"
- Instagram-caption emotional voice
- Fake logistics not given by Brandon (e.g. don't invent kid-menu
  details — if Brandon didn't mention it, say "kid menu: not
  confirmed" or omit)

## If Brandon is not available (nightly runs)

Post the specific blockers as numbered questions in Slack
C0AHR2NJ361, tag `@Brandon` (U012Q64CRHT), and move on. Example:

> For the **Apizza Doho (Dana Point)** draft:
> 1. Which kids came? (or was this a friends-only pre-concert visit?)
> 2. The 2021 review mentions a "sausage meatball sub" — do you
>    remember if that's a regular menu item or a special?
> 3. Would you go back? Who should go?
> 4. Do you have current photos, or should we ask the restaurant
>    for permission to use public images?
