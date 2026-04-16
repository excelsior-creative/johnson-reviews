# Design System: Gilded Legacy

## 1. Overview & Creative North Star: "The Digital Maître d’"
The North Star for this design system is **"The Digital Maître d’"**. Much like an exclusive concierge at a Michelin-starred establishment, the interface should feel invisible yet authoritative, guiding the user through high-end culinary critiques with quiet confidence.

To break the "template" look of standard review sites, we eschew the rigid, centered grid in favor of **intentional asymmetry**. Imagine the layout of a bespoke physical menu: generous margins, overlapping elements (e.g., a high-resolution dish photo partially covered by a floating `surface-container` card), and a dramatic typographic scale. This system isn't just about showing information; it’s about staging a premium experience.

---

## 2. Colors: The Palette of Prestige
The color strategy moves away from functional "utility" toward "tonal depth." We utilize a dark, ink-like base (`#131313`) to allow our gold and champagne accents to shimmer without feeling gaudy.

*   **The "No-Line" Rule:** We strictly prohibit 1px solid borders for sectioning. Definition must be achieved through background shifts. A section intended to feel "sunken" or secondary should use `surface-container-low`, while a primary content block sits on `surface`. This creates a seamless, high-end editorial flow.
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of fine parchment. An article body (`surface`) might contain a pull-quote card using `surface-container-lowest` to create a subtle, recessed "etched" effect.
*   **The "Glass & Gradient" Rule:** For floating navigation or modal overlays, use `surface-variant` with a 60% opacity and a `20px` backdrop-blur. 
*   **Signature Textures:** Main CTAs and featured ratings should utilize a subtle linear gradient from `primary` (#f2ca50) to `primary-container` (#D4AF37). This provides a metallic "sheen" that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Voice
We utilize **Noto Serif** as our primary voice to evoke the feeling of a legacy broadsheet or a leather-bound wine list. **Inter** is reserved strictly for high-utility labels to ensure legibility.

*   **Display-LG (3.5rem):** Used for restaurant names and major editorial titles. Its scale is intentionally disruptive to command immediate authority.
*   **Headline-MD (1.75rem):** Used for review headings. The high contrast between the `primary` gold text on the `#131313` background ensures "scannability" without sacrificing elegance.
*   **Body-LG (1rem):** Our workhorse for long-form reviews. Set with generous line-height (1.6) to ensure a relaxed reading experience.
*   **Label-MD (Inter, 0.75rem):** Used for metadata (e.g., "Date of Visit," "Price Tier"). Its sans-serif nature provides a modern, "concierge" precision against the romanticism of the serif headings.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, "elevation" is a matter of light and shadow, not lines and boxes.

*   **The Layering Principle:** Use `surface-container-highest` for elements that need to feel "closest" to the user (like a reservation prompt). Place it over `surface-dim` to create a natural, soft contrast.
*   **Ambient Shadows:** Traditional drop shadows are forbidden. If an element must float, use a shadow with a `48px` blur and `6%` opacity, tinted with `on-surface` (#e5e2e1). This creates an ambient glow rather than a harsh silhouette.
*   **The "Ghost Border" Fallback:** For input fields or interactive zones where boundaries are required for UX, use a "Ghost Border": `outline-variant` at 15% opacity. It should be felt, not seen.
*   **Zero Roundedness:** To maintain the "Gilded Legacy" prestige, all corners are set to `0px`. Sharp, architectural lines convey a sense of permanence and classic luxury.

---

## 5. Components: Bespoke Elements

### Buttons
*   **Primary:** A "Gilded" block. Background: `primary-container` gradient; Text: `on-primary` (All caps, `label-md`). 0px border radius.
*   **Secondary:** Ghost style. No background. "Ghost Border" using `outline`. Text: `primary`.
*   **Hover State:** Shift background from `primary-container` to `primary_fixed` with a subtle `2px` vertical lift.

### Cards & Lists (The Review Feed)
*   **The Layout:** Forbid divider lines. Separate reviews using `16` (5.5rem) vertical spacing.
*   **The Signature Card:** Use `surface-container-low`. The restaurant image should bleed to the edges, with the review title (`headline-sm`) overlapping the image in a `surface` container box.

### Signature Component: The "Sommelier Badge" (Chips)
*   Used for restaurant tags (e.g., "Rare Vintages," "Valet Parking").
*   **Style:** `surface-container-highest` background, `0px` radius, `label-sm` typography in `secondary`. No border.

### Input Fields
*   Underline-only style using `outline-variant`. On focus, the underline transitions to `primary` gold. Helper text must be in `body-sm`.

---

## 6. Do's and Don'ts

### Do:
*   **Do** embrace negative space. Use the `20` (7rem) spacing token to separate major editorial sections.
*   **Do** use "Champagne" accents (`secondary_fixed_dim`) for secondary text to keep the hierarchy sophisticated.
*   **Do** use large-scale imagery. The UI serves the photography, not the other way around.

### Don't:
*   **Don't** use 1px dividers. They clutter the editorial "purity" of the layout.
*   **Don't** use rounded corners. Sharp edges are a hallmark of high-end, bespoke tailoring.
*   **Don't** use pure white. Always use `on-surface` (#e5e2e1) to maintain the "muted" luxury atmosphere.
*   **Don't** center-align long-form body text. Keep it flush-left to mimic a column of a premium magazine.