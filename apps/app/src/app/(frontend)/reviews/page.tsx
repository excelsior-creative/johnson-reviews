import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import Header from "@/components/Header";
import { ReviewCard } from "@/components/ReviewCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const RATING_OPTIONS = [
  { label: "All", value: null },
  { label: "Five Star", value: 5 },
  { label: "Four Star", value: 4 },
  { label: "Three Star", value: 3 },
  { label: "Two Star", value: 2 },
  { label: "One Star", value: 1 },
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

  let reviews: Record<string, unknown>[] = [];
  let totalDocs = 0;

  try {
    const result = await payload.find({
      collection: "reviews",
      sort: "-rating",
      limit: 24,
      ...(whereClause ? { where: whereClause } : {}),
    });
    reviews = result.docs as unknown as Record<string, unknown>[];
    totalDocs = result.totalDocs;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }

  return (
    <div className="pt-28 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Header
          badge="Field Dispatches"
          title="The Ledger of Judgement."
          subtitle="Real experiences from real places — a curated travel journal of reviews."
        />

        {/* Rating filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {RATING_OPTIONS.map((opt) => {
            const isActive = opt.value === ratingFilter;
            const href = opt.value
              ? `/reviews?rating=${opt.value}`
              : "/reviews";
            return (
              <Link
                key={opt.label}
                href={href}
                className="inline-block px-5 py-2 transition-all"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: isActive ? "#3c2f00" : "#e5e2e1",
                  background: isActive
                    ? "linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)"
                    : "transparent",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid rgba(77,70,53,0.6)",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>

        {totalDocs > 0 && (
          <p
            className="mb-12"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#99907c",
            }}
          >
            Showing {reviews.length} of {totalDocs}
            {ratingFilter ? ` — ${ratingFilter}-star rating` : ""}
          </p>
        )}

        {/* Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews.map((review, i) => (
              <ReviewCard
                key={(review as { id: string }).id}
                review={review}
                priority={i < 3}
              />
            ))}
          </div>
        ) : (
          <div className="py-20">
            <p
              className="italic"
              style={{
                fontFamily: '"Noto Serif", serif',
                color: "#99907c",
                fontSize: "1.125rem",
              }}
            >
              No entries in the ledger yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
