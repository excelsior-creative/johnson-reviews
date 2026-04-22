import React from "react";
import Link from "next/link";

/**
 * AuthorBio — Brandon Johnson author card for post detail pages.
 * E-E-A-T signal: real person, verifiable credentials, public profile.
 * Portrait is a graceful gold monogram until Brandon provides a photo.
 */
export const AuthorBio = () => {
  return (
    <div
      className="p-8"
      style={{
        backgroundColor: "#20201f",
        boxShadow: "0 32px 64px rgba(0,0,0,0.25)",
      }}
    >
      <span
        className="block mb-5"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "#99907c",
        }}
      >
        Reviewed by
      </span>

      <div className="flex items-center gap-5 mb-5">
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)",
            color: "#3c2f00",
            fontFamily: '"Noto Serif", serif',
            fontSize: "1.75rem",
            fontWeight: 700,
          }}
          aria-hidden="true"
        >
          BJ
        </div>
        <div>
          <p
            className="font-bold"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "1.125rem",
              color: "#e5e2e1",
              lineHeight: 1.2,
            }}
          >
            Brandon Johnson
          </p>
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              color: "#d3c5ad",
              marginTop: "4px",
            }}
          >
            Google Local Guide · Level 10
          </p>
        </div>
      </div>

      <p
        className="italic"
        style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: "0.9rem",
          color: "#d3c5ad",
          lineHeight: "1.6",
        }}
      >
        Orange County&ndash;based family traveler. 500+ reviews and
        27,000+ photos on Google Maps. Pays his own tabs. Only writes
        up places he&rsquo;s actually been.
      </p>

      <Link
        href="/about"
        className="inline-flex items-center gap-2 mt-5 transition-colors hover:text-[#f2ca50]"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "#f2ca50",
        }}
      >
        More about Brandon <span>&rarr;</span>
      </Link>
    </div>
  );
};
