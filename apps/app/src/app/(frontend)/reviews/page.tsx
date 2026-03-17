import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Container } from "@/components/Container";
import Header from "@/components/Header";
import { ReviewCard } from "@/components/ReviewCard";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const RATING_OPTIONS = [
  { label: "All", value: null },
  { label: "⭐⭐⭐⭐⭐ 5 Star", value: 5 },
  { label: "⭐⭐⭐⭐ 4 Star", value: 4 },
  { label: "⭐⭐⭐ 3 Star", value: 3 },
  { label: "⭐⭐ 2 Star", value: 2 },
  { label: "⭐ 1 Star", value: 1 },
]

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ rating?: string }>
}) {
  const { rating: ratingParam } = await searchParams
  const ratingFilter = ratingParam ? parseInt(ratingParam, 10) : null

  const payload = await getPayload({ config })

  const whereClause =
    ratingFilter !== null
      ? { rating: { equals: ratingFilter } }
      : undefined

  let reviews: any[] = []
  let totalDocs = 0

  try {
    const result = await payload.find({
      collection: "reviews",
      sort: "-rating",
      limit: 24,
      ...(whereClause ? { where: whereClause } : {}),
    })
    reviews = result.docs
    totalDocs = result.totalDocs
  } catch (error) {
    console.error("Failed to fetch reviews:", error)
  }

  return (
    <div className="py-20">
      <Container>
        <Header
          badge="Google Reviews"
          title="All Reviews"
          subtitle="Real experiences from real places — a curated travel journal of reviews."
        />

        {/* Rating Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {RATING_OPTIONS.map((opt) => {
            const isActive = opt.value === ratingFilter
            const href = opt.value ? `/reviews?rating=${opt.value}` : "/reviews"
            return (
              <Link
                key={opt.label}
                href={href}
                className={[
                  "px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                  isActive
                    ? "bg-[#DB7D2D] text-white"
                    : "bg-[#1e1f20] text-white/70 hover:text-white hover:bg-[#2a2b2c]",
                ].join(" ")}
                style={{ fontFamily: '"Jost", sans-serif' }}
              >
                {opt.label}
              </Link>
            )
          })}
        </div>

        {/* Count */}
        {totalDocs > 0 && (
          <p
            className="text-center text-white/40 text-sm mb-8"
            style={{ fontFamily: '"Jost", sans-serif' }}
          >
            Showing {reviews.length} of {totalDocs} reviews
            {ratingFilter ? ` with ${ratingFilter}-star rating` : ""}
          </p>
        )}

        {/* Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-white/40" style={{ fontFamily: '"Jost", sans-serif' }}>
              No reviews found.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}
