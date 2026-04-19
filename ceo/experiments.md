# Experiments

Hypotheses we're testing. Success criteria. Results.

## Format

```
### EXP-NNNN — Title
- **Status:** proposed | running | completed | abandoned
- **Hypothesis:** If we do X, then Y will happen, because Z.
- **Success criteria:** (measurable)
- **Started:** YYYY-MM-DD
- **Ended:** YYYY-MM-DD
- **Result:** …
- **Decision:** ship / revert / iterate
```

## Proposed

### EXP-0001 — Voice calibration from Brandon samples

- **Status:** proposed
- **Hypothesis:** Drafts generated with 2–3 actual Brandon-written
  samples seeded into the prompt will feel on-voice to Brandon
  without heavy redlining.
- **Success criteria:** Brandon's redline rate on the next 3 drafts
  is < 30% of sentences (vs. higher without samples).
- **Blocked on:** Brandon providing samples.

### EXP-0002 — Drop-cap + Concierge sidebar review detail template

- **Status:** running (Night 1)
- **Hypothesis:** Reference review detail layout (drop cap lead,
  Concierge metadata sidebar, verdict ratings) will feel editorial
  and drive longer time-on-page than the current plain prose layout.
- **Success criteria:** Once live + instrumented, avg time-on-page
  +25% vs. pre-redesign baseline on the top 10 review URLs.
- **Shipped:** Night 1 (template), measurement pending.
