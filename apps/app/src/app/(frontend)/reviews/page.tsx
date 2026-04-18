import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Container } from "@/components/Container";
import { ReviewCard } from "@/components/ReviewCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const RATING_OPTIONS: { label: string; value: number | null }[] = [
  { label: "All", value: null },
  { label: "5 Star", value: 5 },
  { label: "4 Star", value: 4 },
  { label: "3 Star", value: 3 },
  { label: "2 Star", value: 2 },
  { label: "1 Star", value: 1 },
];

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ rating?: string }>;
}) {
  const { rating: ratingParam } = await searchParams;
  const ratingFilter = ratingParam ? parseInt(ratingParam, 10) : null;

  const payload = await getPayload({ config });

  const whereClause =
    ratingFilter !== null ? { rating: { equals: ratingFilter } } : undefined;

  let reviews: any[] = [];
  let totalDocs = 0;

  try {
    const result = await payload.find({
      collection: "reviews",
      sort: "-rating",
      limit: 24,
      ...(whereClause ? { where: whereClause } : {}),
    });
    reviews = result.docs;
    totalDocs = result.totalDocs;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }

  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-[1440px]">
        {/* Editorial header — asymmetric, left-aligned */}
        <header className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span
              className="h-px w-12"
              style={{ backgroundColor: "#f2ca50" }}
            />
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#f2ca50",
              }}
            >
              The Review Index
            </span>
          </div>
          <h1
            className="font-bold tracking-tighter leading-none mb-6"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "#e5e2e1",
            }}
          >
            Every place we&rsquo;ve been.
          </h1>
          <p
            className="max-w-2xl leading-relaxed"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontStyle: "italic",
              color: "rgba(229,226,225,0.65)",
              fontSize: "1.125rem",
            }}
          >
            A running record of restaurants, hotels, and places the
            Johnsons actually went. Filter by rating, or just scroll.
          </p>
        </header>

        {/* Rating filter chips — reference "Sommelier Badge" pattern */}
        <div className="mb-12">
          <div
            className="mb-4"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#99907c",
            }}
          >
            Filter by rating
          </div>
          <div className="flex flex-wrap gap-3">
            {RATING_OPTIONS.map((opt) => {
              const isActive = opt.value === ratingFilter;
              const href = opt.value ? `/reviews?rating=${opt.value}` : "/reviews";
              return (
                <Link
                  key={opt.label}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className="px-5 py-2 transition-colors"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "10px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    backgroundColor: isActive ? "#d4af37" : "#353535",
                    color: isActive ? "#3c2f00" : "#d3c5ad",
                    border: "none",
                    borderRadius: 0,
                  }}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Count */}
        {totalDocs > 0 && (
          <p
            className="mb-12"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#99907c",
            }}
          >
            Showing {reviews.length} of {totalDocs}
            {ratingFilter ? ` — ${ratingFilter} star` : ""}
          </p>
        )}

        {/* Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div
            className="py-24 text-center"
            style={{ backgroundColor: "#1c1b1b" }}
          >
            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                fontStyle: "italic",
                fontSize: "1.125rem",
                color: "rgba(229,226,225,0.5)",
              }}
            >
              Nothing here yet.
            </p>
            <Link
              href="/reviews"
              className="inline-block mt-6 px-6 py-3"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#f2ca50",
                border: "1px solid rgba(242,202,80,0.4)",
              }}
            >
              Clear filters
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
