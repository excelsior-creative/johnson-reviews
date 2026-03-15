import React from "react";
import Link from "next/link";

/**
 * Hero — Option A: The Luxury Traveler
 * Full-height editorial hero with warm overlay, Cormorant Garamond headline,
 * and an elegant shape divider into the cream background.
 */
export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "820px",
        background: [
          "linear-gradient(180deg, rgba(249,247,244,0.12) 0%, rgba(108,104,100,0.55) 60%, rgba(249,247,244,0.85) 100%)",
          "url('https://brandonj117.sg-host.com/wp-content/uploads/2021/04/johnson-reviews2.jpg') center center / cover no-repeat",
        ].join(", "),
      }}
    >
      {/* CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes luxuryFadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .lux-fade   { animation: luxuryFadeUp 0.8s cubic-bezier(.22,.8,.36,1) forwards; }
            .lux-fade-1 { animation: luxuryFadeUp 0.8s cubic-bezier(.22,.8,.36,1) 0.18s forwards; opacity: 0; }
            .lux-fade-2 { animation: luxuryFadeUp 0.8s cubic-bezier(.22,.8,.36,1) 0.36s forwards; opacity: 0; }
            @media (prefers-reduced-motion: reduce) {
              .lux-fade, .lux-fade-1, .lux-fade-2 { animation: none; opacity: 1; transform: none; }
            }
            .hero-shape {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              overflow: hidden;
              line-height: 0;
            }
            .hero-shape svg {
              display: block;
              width: calc(100% + 1.3px);
              height: 52px;
            }
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center py-40 md:py-52">
        {/* Eyebrow */}
        <p
          className="lux-fade text-[#D5C17A] text-xs uppercase tracking-[0.28em] mb-6"
          style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
        >
          Your Premier Review Guide
        </p>

        {/* Headline */}
        <h1
          className="lux-fade-1 text-[#F9F7F4] leading-[1.12] mb-8"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontWeight: 600,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            textShadow: "0 2px 24px rgba(53,47,44,0.22)",
          }}
        >
          Each Day as a<br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>New Destination</em>
        </h1>

        {/* Decorative gold rule */}
        <div className="lux-fade-1 flex items-center justify-center gap-4 mb-8">
          <div style={{ width: 48, height: 1, background: "#D5C17A", opacity: 0.8 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <rect x="4" y="0" width="5.66" height="5.66" rx="0.5" fill="#D5C17A" opacity="0.8" transform="rotate(45 4 0)" />
          </svg>
          <div style={{ width: 48, height: 1, background: "#D5C17A", opacity: 0.8 }} />
        </div>

        {/* Subtext */}
        <p
          className="lux-fade-2 text-[#F9F7F4]/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 300 }}
        >
          In a world where consumer voices drive success, Johnson Reviews is your trusted platform for discovering hidden gems and exceptional experiences.
        </p>

        {/* CTA */}
        <div className="lux-fade-2 mt-10 flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/blog"
            className="inline-block border border-[#D5C17A] text-[#D5C17A] px-9 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-[#D5C17A] hover:text-[#352F2C] transition-all"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            Explore Reviews
          </Link>
          <Link
            href="/about"
            className="inline-block text-[#F9F7F4]/70 text-xs uppercase tracking-[0.2em] hover:text-[#D5C17A] transition-colors"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            Our Story →
          </Link>
        </div>
      </div>

      {/* Shape divider — smooth fan into cream background */}
      <div className="hero-shape">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 19.6" preserveAspectRatio="none">
          <path style={{ fill: "#F9F7F4", opacity: 0.3 }} d="M0 0L0 18.8 141.8 4.1 283.5 18.8 283.5 0z"/>
          <path style={{ fill: "#F9F7F4", opacity: 0.3 }} d="M0 0L0 12.6 141.8 4 283.5 12.6 283.5 0z"/>
          <path style={{ fill: "#F9F7F4", opacity: 0.5 }} d="M0 0L0 6.4 141.8 4 283.5 6.4 283.5 0z"/>
          <path style={{ fill: "#F9F7F4" }} d="M0 0L0 1.2 141.8 4 283.5 1.2 283.5 0z"/>
        </svg>
      </div>
    </section>
  );
};
