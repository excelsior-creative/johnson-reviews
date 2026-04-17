import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Container } from "@/components/Container";
import { ReviewCard } from "@/components/ReviewCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const RATING_OPTIONS = [
  { label: "All", value: null },
  { label: "5 Star", value: 5 },
  { label: "4 Star", value: 4 },
  { label: "3 Star", value: 3 },
  { label: "2 Star", value: 2 },
  { label: "1 Star", value: 1 },
];

function GoldStars({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-[2px] align-middle">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#f2ca50"
          className="w-3 h-3"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

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
    <div className="py-24" style={{ backgroundColor: "#131313" }}>
      <Container>
        {/* Editorial header — kicker + serif title + champagne deck */}
        <header className="max-w-3xl mb-16">
          <span
            className="block mb-6 text-[#f2ca50]"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
            }}
          >
            The Field Notes
          </span>
          <h1
            className="font-bold leading-[0.95] mb-6 text-[#e5e2e1]"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Every place we&rsquo;ve eaten,
            <br />
            <span className="italic text-[#f2ca50]">slept, or wandered into.</span>
          </h1>
          <p
            className="text-lg leading-relaxed text-[#d3c5ad] italic max-w-2xl"
            style={{ fontFamily: '"Noto Serif", serif' }}
          >
            Real trips, honest verdicts. Filter by stars; the rest is on us.
          </p>
        </header>

        {/* Rating filters — Inter caps pills, gold gradient when active */}
        <div className="flex flex-wrap gap-3 mb-12">
          {RATING_OPTIONS.map((opt) => {
            const isActive = opt.value === ratingFilter;
            const href = opt.value ? `/reviews?rating=${opt.value}` : "/reviews";
            return (
              <Link
                key={opt.label}
                href={href}
                className={[
                  "inline-flex items-center gap-2 px-5 py-2 transition-colors uppercase tracking-[0.2em]",
                  isActive
                    ? "gilded-gradient text-[#3c2f00]"
                    : "border border-[#4d4635] text-[#e5e2e1]/70 hover:text-[#f2ca50] hover:border-[#f2ca50]",
                ].join(" ")}
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                {opt.value ? <GoldStars count={opt.value} /> : null}
                <span>{opt.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Count */}
        {totalDocs > 0 && (
          <p
            className="text-[#e5e2e1]/40 mb-10"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
            }}
          >
            Showing {reviews.length} of {totalDocs}
            {ratingFilter ? ` · ${ratingFilter} stars` : ""}
          </p>
        )}

        {/* Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <p
              className="text-[#d3c5ad] italic"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.25rem",
              }}
            >
              No reviews here yet — try another filter.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
