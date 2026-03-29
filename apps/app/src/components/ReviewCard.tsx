import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ReviewCardProps {
  review: any;
  priority?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < rating ? "#f2ca50" : "none"}
          stroke={i < rating ? "#f2ca50" : "#4d4635"}
          strokeWidth="1.5"
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export const ReviewCard = ({ review, priority = false }: ReviewCardProps) => {
  const firstPhoto = review.photos?.[0]?.url as string | undefined;
  const truncatedText = review.reviewText
    ? review.reviewText.slice(0, 150) +
      (review.reviewText.length > 150 ? "…" : "")
    : null;

  return (
    <article
      className="group overflow-hidden flex flex-col"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      {/* Thumbnail */}
      <Link href={`/reviews/${review.slug}`}>
        <div className="relative overflow-hidden" style={{ paddingBottom: "56.25%" }}>
          {firstPhoto ? (
            <Image
              src={firstPhoto}
              alt={review.businessName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              priority={priority}
              className="object-cover [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105 transition-all duration-700"
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
                stroke="currentColor"
                style={{ color: "rgba(229,226,225,0.2)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <StarRating rating={review.rating} />

        <Link href={`/reviews/${review.slug}`}>
          <h3
            className="mt-4 font-bold leading-snug group-hover:text-[#f2ca50] transition-colors"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "1.2rem",
              fontWeight: 700,
              lineHeight: "1.3",
              color: "#e5e2e1",
            }}
          >
            {review.businessName}
          </h3>
        </Link>

        {review.address && (
          <p
            className="mt-1 leading-relaxed"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.75rem",
              color: "rgba(229,226,225,0.45)",
            }}
          >
            {review.address}
          </p>
        )}

        {truncatedText && (
          <p
            className="mt-3 text-sm leading-relaxed flex-1"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontStyle: "italic",
              color: "rgba(229,226,225,0.6)",
            }}
          >
            {truncatedText}
            {review.reviewText?.length > 150 && (
              <Link
                href={`/reviews/${review.slug}`}
                className="ml-1 hover:underline text-xs"
                style={{ color: "#f2ca50" }}
              >
                Read more
              </Link>
            )}
          </p>
        )}

        {/* Meta */}
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(77,70,53,0.4)" }}
        >
          {review.reviewDate && (
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#f2ca50",
              }}
            >
              {review.reviewDate}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
