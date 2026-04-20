import React from "react";
import Link from "next/link";

/**
 * Hero — "The Art of the Critique"
 * Full-bleed image with editorial gold lede line, tight-tracking serif
 * display headline, and a gilded gradient CTA.
 */
export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "100vh",
        background:
          "url('/images/hero/johnson-reviews2.jpg') center center / cover no-repeat",
      }}
    >
      {/* Layered gradients — dark editorial */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to right, #131313 0%, rgba(19,19,19,0.6) 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to top, #131313 0%, transparent 40%, transparent 100%)",
        }}
      />

      {/* CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroFadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .hero-fade   { animation: heroFadeInUp 0.8s ease-out forwards; }
            .hero-fade-1 { animation: heroFadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
            .hero-fade-2 { animation: heroFadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
            @media (prefers-reduced-motion: reduce) {
              .hero-fade, .hero-fade-1, .hero-fade-2 {
                animation: none; opacity: 1; transform: none;
              }
            }
            .hero-btn-primary {
              background: linear-gradient(135deg, #f2ca50 0%, #d4af37 100%);
              color: #3c2f00;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            }
            .hero-btn-primary:hover {
              transform: translateY(-4px);
              box-shadow: 0 16px 48px rgba(242,202,80,0.25);
            }
            .hero-btn-outline {
              border: 1px solid #99907c;
              color: #f2ca50;
              transition: background-color 0.3s ease, transform 0.3s ease;
            }
            .hero-btn-outline:hover {
              background-color: #2a2a2a;
              transform: translateY(-4px);
            }
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-24 max-w-5xl pt-20">
        <div
          className="hero-fade mb-8 inline-flex items-center gap-4"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#f2ca50",
          }}
        >
          <span className="block h-[1px] w-12" style={{ backgroundColor: "#f2ca50" }} />
          <span>Brandon Johnson · Google Local Guide Level 10</span>
        </div>

        <h1
          className="hero-fade-1 font-bold tracking-tighter mb-8"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: "1.05",
            color: "#e5e2e1",
          }}
        >
          Real visits. <br />
          <span style={{ fontStyle: "italic", color: "#f2ca50" }}>Honest reviews.</span>
        </h1>

        <p
          className="hero-fade-1 mb-12 max-w-2xl leading-relaxed"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontStyle: "italic",
            color: "#d3c5ad",
            fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
          }}
        >
          Restaurants, hotels, and family travel — written up after we&rsquo;ve
          actually been there, with the kids, and brought back something worth
          saying.
        </p>

        <div className="hero-fade-2 flex flex-col sm:flex-row gap-6">
          <Link
            href="/blog"
            className="hero-btn-primary group inline-flex items-center justify-center gap-3 px-12 py-5"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Browse the Reviews
          </Link>
          <Link
            href="/about"
            className="hero-btn-outline inline-flex items-center justify-center gap-2 px-12 py-5"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            About the Johnsons
          </Link>
        </div>
      </div>
    </section>
  );
};
