import React from "react";
import Link from "next/link";

/**
 * Editorial split hero — large serif title with italic accent word,
 * subtitle in italic dim serif, score-disc + verdict + CTA on the right
 * column. Photo lives in the second column at 4:5.
 */
export const Hero = () => {
  const heroSrc =
    "https://brandonj117.sg-host.com/wp-content/uploads/2021/04/johnson-reviews2.jpg";

  return (
    <section className="relative overflow-hidden" style={{ padding: "60px 0 100px" }}>
      <div className="container-jr">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Editorial column */}
          <div>
            <div className="kicker rise" style={{ marginBottom: 28 }}>
              The Feature · Spring MMXXVI
            </div>

            <h1
              className="display rise-1 text-balance"
              style={{ fontSize: "clamp(56px, 7vw, 112px)" }}
            >
              Real visits.{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-accent)" }}
              >
                Honest reviews.
              </span>
            </h1>

            <div
              className="rise-1"
              style={{
                marginTop: 14,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.22em",
                color: "var(--color-ink-mute)",
                textTransform: "uppercase",
              }}
            >
              Orange County, California · Est. 2019
            </div>

            <p
              className="rise-2 italic text-pretty"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 24,
                color: "var(--color-ink-dim)",
                marginTop: 32,
                lineHeight: 1.5,
                maxWidth: 540,
              }}
            >
              Restaurants, hotels, and family travel — written up after we&rsquo;ve
              actually been there, with the kids, and brought back something
              worth saying.
            </p>

            <div
              className="rise-3"
              style={{
                marginTop: 40,
                display: "flex",
                alignItems: "center",
                gap: 28,
                flexWrap: "wrap",
              }}
            >
              <div
                className="score-disc lg"
                aria-label="Editor's verdict score"
              >
                <div className="score">9.4</div>
                <div className="of">Out of 10</div>
              </div>

              <div
                style={{
                  borderLeft: "1px solid var(--color-rule-strong)",
                  paddingLeft: 24,
                }}
              >
                <div className="meta">The Verdict</div>
                <div
                  className="italic"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 20,
                    marginTop: 8,
                    color: "var(--color-accent)",
                  }}
                >
                  Five hundred places. Worth your evening.
                </div>
                <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/blog" className="btn">
                    Browse the Reviews <span className="arrow">→</span>
                  </Link>
                  <Link href="/about" className="btn btn-ghost">
                    About the Johnsons <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="rise-2 photo" style={{ aspectRatio: "4 / 5" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroSrc}
              alt="Brandon Johnson on the road"
              className="ken-burns"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 860px) {
              .hero-grid { grid-template-columns: minmax(0, 1fr) !important; }
              .hero-grid > .photo { aspect-ratio: 4 / 3 !important; order: -1; }
            }
          `,
        }}
      />
    </section>
  );
};
