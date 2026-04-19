import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ReviewCardProps {
  review: Record<string, unknown>;
  priority?: boolean;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < rating ? "#f2ca50" : "none"}
          stroke={i < rating ? "#f2ca50" : "#4d4635"}
          strokeWidth="1.5"
          className="w-3.5 h-3.5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export const ReviewCard = ({ review, priority = false }: ReviewCardProps) => {
  const r = review as {
    id: string;
    slug: string;
    businessName: string;
    address?: string;
    rating: number;
    reviewDate?: string;
    reviewText?: string;
    photos?: { url?: string }[];
  };
  const firstPhoto = r.photos?.[0]?.url;
  const truncatedText = r.reviewText
    ? r.reviewText.slice(0, 140) + (r.reviewText.length > 140 ? "…" : "")
    : null;

  return (
    <article
      className="group overflow-hidden flex flex-col h-full"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      <Link href={`/reviews/${r.slug}`} className="flex flex-col h-full">
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden"
          style={{ height: "260px" }}
        >
          {firstPhoto ? (
            <Image
              src={firstPhoto}
              alt={r.businessName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              priority={priority}
              className="object-cover transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: "#20201f" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#4d4635"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          )}
          {/* Subtle scrim */}
          <div
            className="absolute inset-0 transition-colors group-hover:bg-transparent"
            style={{ background: "rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4 gap-3">
            <div className="min-w-0">
              {r.address && (
                <span
                  className="block mb-1 truncate"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#99907c",
                  }}
                >
                  {r.address}
                </span>
              )}
              <h3
                className="font-bold leading-snug group-hover:text-[#f2ca50] transition-colors"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1.25rem",
                  lineHeight: "1.3",
                  color: "#e5e2e1",
                }}
              >
                {r.businessName}
              </h3>
            </div>
            <div className="flex-shrink-0 text-right">
              <span
                className="block font-bold"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1.25rem",
                  color: "#f2ca50",
                }}
              >
                {r.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <StarRow rating={r.rating} />
          </div>

          {truncatedText && (
            <p
              className="italic flex-1"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "0.875rem",
                color: "#d3c5ad",
                lineHeight: "1.7",
              }}
            >
              {truncatedText}
            </p>
          )}

          {r.reviewDate && (
            <div
              className="mt-6 pt-4"
              style={{ borderTop: "1px solid rgba(77,70,53,0.3)" }}
            >
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#99907c",
                }}
              >
                {r.reviewDate}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};
