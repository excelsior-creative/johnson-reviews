import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PageHeader } from "@/components/PageHeader";
import { ReviewCard } from "@/components/ReviewCard";
import { NewsletterInline } from "@/components/NewsletterInline";
import Link from "next/link";

export const dynamic = "force-dynamic";

const RATING_OPTIONS = [
  { label: "All", value: null },
  { label: "5 ★", value: 5 },
  { label: "4 ★", value: 4 },
  { label: "3 ★", value: 3 },
  { label: "2 ★", value: 2 },
  { label: "1 ★", value: 1 },
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

  const featured = reviews[0];
  const rest = reviews.slice(1);

  const avgScore =
    reviews.length > 0
      ? (
          reviews.reduce(
            (s, r) => s + (((r as { rating?: number }).rating ?? 0) * 2),
            0,
          ) / reviews.length
        ).toFixed(1)
      : "—";

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="The Section · Field Reports"
        title="Every place"
        italicPart="we've written up."
        subtitle="Restaurants, hotels, attractions, and shops — drawn from Brandon's Google Local Guide profile and the long-form posts on the site. Filter by rating below."
        meta={
          <>
            <div>
              <div className="meta">Total Reviews</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 32,
                  color: "var(--color-accent)",
                  marginTop: 6,
                }}
              >
                {totalDocs}
              </div>
            </div>
            <div>
              <div className="meta">Average Score</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 32,
                  color: "var(--color-accent)",
                  marginTop: 6,
                }}
              >
                {avgScore}
              </div>
            </div>
            <div>
              <div className="meta">Showing</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 32,
                  color: "var(--color-accent)",
                  marginTop: 6,
                }}
              >
                {reviews.length}
              </div>
            </div>
          </>
        }
      />

      {/* Sticky filter bar */}
      <section
        style={{
          position: "sticky",
          top: 64,
          zIndex: 20,
          background: "rgba(15,13,11,0.92)",
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-jr">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 0",
              flexWrap: "wrap",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span className="meta">Rating</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {RATING_OPTIONS.map((opt) => {
                  const isActive = opt.value === ratingFilter;
                  const href = opt.value
                    ? `/reviews?rating=${opt.value}`
                    : "/reviews";
                  return (
                    <Link
                      key={opt.label}
                      href={href}
                      className={`pill ${isActive ? "active" : ""}`}
                    >
                      {opt.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="meta">
              {reviews.length} of {totalDocs}
              {ratingFilter ? ` · ${ratingFilter}-star` : ""}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section style={{ padding: "80px 0 40px" }}>
          <div className="container-jr">
            <div className="kicker" style={{ marginBottom: 32 }}>
              Editor&rsquo;s Pick
            </div>
            <ReviewCard review={featured} variant="horizontal" priority />
          </div>
        </section>
      )}

      {/* Grid */}
      <section style={{ padding: "40px 0 120px" }}>
        <div className="container-jr">
          {rest.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                columnGap: 48,
                rowGap: 80,
              }}
              className="post-grid"
            >
              {rest.map((review, i) => (
                <ReviewCard
                  key={(review as { id: string }).id}
                  review={review}
                  priority={i < 2}
                />
              ))}
            </div>
          ) : (
            <div
              className="text-center italic"
              style={{
                padding: "80px 0",
                fontFamily: "var(--font-serif)",
                color: "var(--color-ink-dim)",
                fontSize: 22,
              }}
            >
              No reviews match this rating.{" "}
              <Link
                href="/reviews"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "underline",
                }}
              >
                Clear filter
              </Link>
            </div>
          )}
        </div>
      </section>

      <NewsletterInline compact />
    </div>
  );
}
