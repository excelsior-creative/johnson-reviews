import React from "react";
import Link from "next/link";

/**
 * Hero component — dark luxury editorial style.
 * Full-height with Noto Serif headline, gold accents, gradient overlay.
 */
export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "90vh",
        background:
          "url('https://brandonj117.sg-host.com/wp-content/uploads/2021/04/johnson-reviews2.jpg') center center / cover no-repeat",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #131313 0%, rgba(19,19,19,0.75) 50%, rgba(19,19,19,0.25) 100%)",
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
              background-color: #f2ca50;
              color: #3c2f00;
              transition: background-color 0.2s ease;
            }
            .hero-btn-primary:hover { background-color: #d4af37; }
            .hero-btn-outline {
              border: 1px solid rgba(242,202,80,0.4);
              color: #f2ca50;
              transition: border-color 0.2s ease, background-color 0.2s ease;
            }
            .hero-btn-outline:hover {
              border-color: #f2ca50;
              background-color: rgba(242,202,80,0.06);
            }
          `,
        }}
      />

      {/* Content — left-aligned editorial */}
      <div className="relative z-10 w-full px-8 md:px-16 max-w-4xl pt-20">
        <span
          className="hero-fade block mb-6"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "#f2ca50",
          }}
        >
          Featured Critique
        </span>
        <h1
          className="hero-fade-1 font-bold tracking-tighter leading-none mb-8"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: "0.9",
            color: "#e5e2e1",
          }}
        >
          EACH DAY AS A<br />
          <span style={{ fontStyle: "italic", color: "#f2ca50" }}>
            NEW DESTINATION
          </span>
        </h1>
        <p
          className="hero-fade-1 mb-10 max-w-xl leading-relaxed"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontStyle: "italic",
            color: "rgba(229,226,225,0.7)",
            fontSize: "1.125rem",
          }}
        >
          &ldquo;Elevating the standard of taste through rigorous analysis and an
          uncompromising palate — every experience deserves to be
          remembered.&rdquo;
        </p>
        <div className="hero-fade-2 flex flex-col sm:flex-row gap-4">
          <Link
            href="/blog"
            className="hero-btn-primary group inline-flex items-center gap-4 px-8 py-4"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Explore Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="hero-btn-outline inline-flex items-center gap-2 px-8 py-4"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            About the Critic
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade to page bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-0"
        style={{
          background: "linear-gradient(to bottom, transparent, #131313)",
        }}
      />
    </section>
  );
};
