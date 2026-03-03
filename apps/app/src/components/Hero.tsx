import React from "react";
import Link from "next/link";

/**
 * Hero component - matches Johnson Reviews reference site.
 * Full-height dark hero with dramatic typography and shape divider.
 */
export const Hero = () => {
  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "800px",
        background: "linear-gradient(180deg, #191A1BE9 0%, #191A1B60 100%), url('https://brandonj117.sg-host.com/wp-content/uploads/2021/04/johnson-reviews2.jpg') center center / cover no-repeat",
      }}
    >
      {/* CSS animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroFadeInUp {
              from { opacity: 0; transform: translateY(30px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .hero-fade { animation: heroFadeInUp 0.7s ease-out forwards; }
            .hero-fade-1 { animation: heroFadeInUp 0.7s ease-out 0.15s forwards; opacity: 0; }
            .hero-fade-2 { animation: heroFadeInUp 0.7s ease-out 0.3s forwards; opacity: 0; }
            @media (prefers-reduced-motion: reduce) {
              .hero-fade, .hero-fade-1, .hero-fade-2 {
                animation: none; opacity: 1; transform: none;
              }
            }
            .hero-shape-divider {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              overflow: hidden;
              line-height: 0;
            }
            .hero-shape-divider svg {
              display: block;
              width: calc(100% + 1.3px);
              height: 40px;
            }
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center py-32 md:py-44">
        <h1
          className="hero-fade text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
          style={{ fontFamily: '"Dancing Script", cursive', fontWeight: 700 }}
        >
          Each Day as a New Destination
        </h1>
        <p
          className="hero-fade-1 text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: '"Jost", sans-serif' }}
        >
          In a world where consumers are more empowered than ever before, their voices, experiences, and opinions are what drive the success and growth of any business. Johnson Reviews is a platform for those voices that offers businesses an insight into the minds of their consumers.
        </p>
      </div>

      {/* Shape divider - fan shape to transition to the next section */}
      <div className="hero-shape-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 19.6" preserveAspectRatio="none">
          <path style={{ fill: "#191A1B", opacity: 0.33 }} d="M0 0L0 18.8 141.8 4.1 283.5 18.8 283.5 0z"/>
          <path style={{ fill: "#191A1B", opacity: 0.33 }} d="M0 0L0 12.6 141.8 4 283.5 12.6 283.5 0z"/>
          <path style={{ fill: "#191A1B", opacity: 0.33 }} d="M0 0L0 6.4 141.8 4 283.5 6.4 283.5 0z"/>
          <path style={{ fill: "#191A1B" }} d="M0 0L0 1.2 141.8 4 283.5 1.2 283.5 0z"/>
        </svg>
      </div>
    </section>
  );
};
