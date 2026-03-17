import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ReviewCardProps {
  review: any
  priority?: boolean
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < rating ? "#DB7D2D" : "none"}
          stroke={i < rating ? "#DB7D2D" : "#6b7280"}
          strokeWidth="1.5"
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export const ReviewCard = ({ review, priority = false }: ReviewCardProps) => {
  const firstPhoto = review.photos?.[0]?.url as string | undefined
  const truncatedText = review.reviewText
    ? review.reviewText.slice(0, 150) + (review.reviewText.length > 150 ? '…' : '')
    : null

  return (
    <article className="group bg-[#1e1f20] overflow-hidden rounded-sm flex flex-col">
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
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-[#2a2b2c] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <StarRating rating={review.rating} />

        <Link href={`/reviews/${review.slug}`}>
          <h3
            className="mt-3 text-white font-medium leading-snug group-hover:text-[#DB7D2D] transition-colors"
            style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "1.3",
            }}
          >
            {review.businessName}
          </h3>
        </Link>

        {review.address && (
          <p
            className="mt-1 text-white/50 text-xs leading-relaxed"
            style={{ fontFamily: '"Jost", sans-serif' }}
          >
            {review.address}
          </p>
        )}

        {truncatedText && (
          <p
            className="mt-3 text-white/70 text-sm leading-relaxed flex-1"
            style={{ fontFamily: '"Jost", sans-serif' }}
          >
            {truncatedText}
            {review.reviewText?.length > 150 && (
              <Link
                href={`/reviews/${review.slug}`}
                className="ml-1 text-[#DB7D2D] hover:underline text-xs"
              >
                Read more
              </Link>
            )}
          </p>
        )}

        {/* Meta */}
        <div className="mt-4 pt-3 border-t border-[#E7E7E7]/10">
          {review.reviewDate && (
            <span
              className="text-[#DB7D2D] text-xs font-bold uppercase"
              style={{ fontFamily: '"Unna", serif' }}
            >
              {review.reviewDate}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
