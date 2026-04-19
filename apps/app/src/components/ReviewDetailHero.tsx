import React from "react";
import Image from "next/image";
import { Media } from "@/payload-types";

interface ReviewDetailHeroProps {
  title: string;
  tagline?: string | null;
  image?: Media;
  category?: string;
  date?: string | null;
  location?: string | null;
  ratingLabel?: string | null;
}

/**
 * Full-bleed editorial hero for a review detail page.
 * Reference: /reference/design/johnson_reviews_review_detail_gold_edition/
 *
 * - 80vh (~ reference's h-[870px]), full-width image
 * - Grayscale + brightness reduction for editorial feel
 * - Eyebrow pills (category tag + optional location)
 * - Giant Noto Serif headline
 * - Italic gold tagline drawn from post.excerpt
 */
export const ReviewDetailHero = ({
  title,
  tagline,
  image,
  category,
  date,
  location,
  ratingLabel,
}: ReviewDetailHeroProps) => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "min(870px, 80vh)", minHeight: "520px" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              filter: "grayscale(20%) brightness(0.4)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#1c1b1b" }}
          />
        )}
      </div>

      {/* Gradient fade to page bg at the bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #131313 0%, rgba(19,19,19,0.2) 40%, transparent 70%)",
        }}
      />

      {/* Content — bottom-left, max 1920px frame */}
      <div className="relative h-full max-w-[1920px] mx-auto px-8 md:px-12 flex flex-col justify-end pb-16 md:pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow pills row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {ratingLabel && (
              <span
                className="px-4 py-1"
                style={{
                  backgroundColor: "#353535",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "#d3c5ad",
                  textTransform: "uppercase",
                }}
              >
                {ratingLabel}
              </span>
            )}
            {category && (
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "#f2ca50",
                  textTransform: "uppercase",
                }}
              >
                {category}
              </span>
            )}
            {location && (
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "#f2ca50",
                  textTransform: "uppercase",
                }}
              >
                · {location}
              </span>
            )}
            {date && (
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  color: "rgba(229,226,225,0.5)",
                  textTransform: "uppercase",
                }}
              >
                · {date}
              </span>
            )}
          </div>

          {/* Headline */}
          <h1
            className="font-bold leading-[1.05] tracking-tighter mb-4"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              color: "#e5e2e1",
            }}
          >
            {title}
          </h1>

          {/* Tagline / excerpt */}
          {tagline && (
            <p
              className="italic max-w-2xl"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                lineHeight: "1.5",
                color: "rgba(242,202,80,0.8)",
              }}
            >
              {tagline}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
