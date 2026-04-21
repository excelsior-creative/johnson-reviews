import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthorBio } from "@/components/AuthorBio";
import { generatePageMetadata } from "@/lib/metadata";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateReviewSchema,
} from "@/lib/structured-data";

type ReviewDoc = {
  businessName: string;
  slug: string;
  rating: number;
  reviewText?: string;
  reviewDate?: string;
  address?: string;
  photos?: { url: string }[];
  createdAt?: string;
  updatedAt?: string;
};

async function fetchReview(slug: string): Promise<ReviewDoc | undefined> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "reviews",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return docs[0] as unknown as ReviewDoc | undefined;
  } catch (error) {
    console.error(`Failed to fetch review "${slug}":`, error);
    return undefined;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = await fetchReview(slug);
  if (!review) {
    return {
      title: "Review not found",
      robots: { index: false, follow: false },
    };
  }

  const firstPhoto = review.photos?.[0]?.url;
  const description =
    (review.reviewText || "").slice(0, 180).replace(/\s+/g, " ") ||
    `${review.businessName} — a Johnson Reviews write-up.`;

  return generatePageMetadata({
    title: review.businessName,
    description,
    path: `/reviews/${slug}`,
    ogImage: firstPhoto,
  });
}

function StarRating({ rating }: { rating: number }) {
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
          className="w-4 h-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span
        className="ml-3"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#99907c",
        }}
      >
        {rating} / 5
      </span>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "reviews",
      limit: 1000,
      select: { slug: true } as never,
    });
    return docs.map((r: { slug: string }) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await fetchReview(slug);

  if (!review) notFound();

  const photos: string[] = (review.photos ?? [])
    .map((p) => p.url)
    .filter(Boolean);

  const hero = photos[0];

  const schema = combineSchemas(
    generateReviewSchema({
      slug,
      businessName: review.businessName,
      rating: review.rating,
      reviewText: review.reviewText,
      reviewDate: review.reviewDate,
      datePublishedISO: review.createdAt,
      address: review.address,
      imageUrls: photos,
    }),
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Reviews", path: "/reviews" },
      { name: review.businessName, path: `/reviews/${slug}` },
    ])
  );

  return (
    <article style={{ backgroundColor: "#131313" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero image */}
      <section className="relative w-full pt-24 md:pt-28">
        <div
          className="relative w-full"
          style={{ height: "clamp(55vh, 70vh, 720px)" }}
        >
          {hero ? (
            <Image
              src={hero}
              alt={review.businessName}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "grayscale(15%) brightness(0.45)" }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "#1c1b1b" }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #131313 0%, transparent 65%)",
            }}
          />

          <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 md:pb-20">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className="inline-block px-4 py-1"
                  style={{
                    backgroundColor: "#353535",
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#d3c5ad",
                  }}
                >
                  Review
                </span>
                {review.reviewDate && (
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#f2ca50",
                    }}
                  >
                    {review.reviewDate}
                  </span>
                )}
              </div>
              <h1
                className="font-bold leading-[1.05] mb-4 tracking-tighter"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  color: "#e5e2e1",
                }}
              >
                {review.businessName}
              </h1>
              {review.address && (
                <p
                  className="italic"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.125rem",
                    color: "rgba(242,202,80,0.8)",
                  }}
                >
                  {review.address}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Narrative */}
          <div className="lg:col-span-8">
            <div className="mb-10">
              <StarRating rating={review.rating} />
            </div>

            {review.reviewText && (
              <div className="space-y-6">
                {review.reviewText
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((para, i) => (
                    <p
                      key={i}
                      className={i === 0 ? "drop-cap" : ""}
                      style={{
                        fontFamily: '"Noto Serif", serif',
                        fontSize: "1.125rem",
                        lineHeight: "1.8",
                        color: "#e5e2e1",
                      }}
                    >
                      {para}
                    </p>
                  ))}
              </div>
            )}

            {/* Rating summary — only what Brandon actually rated on Google.
                NOTE: the earlier "Verdict" panel synthesized Ambience / Service /
                Value scores from the overall rating via a formula. That's
                fabrication, and it's gone. If we want facet ratings later
                they need to come from Brandon's own scoring, not math. */}
            <div
              className="mt-16 p-10 md:p-16"
              style={{ backgroundColor: "#1c1b1b" }}
            >
              <p
                className="mb-4"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#99907c",
                }}
              >
                Brandon&rsquo;s rating
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <span
                  className="font-bold"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "3rem",
                    color: "#f2ca50",
                    lineHeight: 1,
                  }}
                >
                  {review!.rating}
                  <span style={{ fontSize: "1.25rem", color: "#99907c" }}>
                    {" "}
                    / 5
                  </span>
                </span>
                <StarRating rating={review!.rating} />
              </div>
              <p
                className="mt-4"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "0.95rem",
                  color: "#99907c",
                  fontStyle: "italic",
                }}
              >
                Originally posted on Google as part of Brandon&rsquo;s Local
                Guide profile.
              </p>
            </div>

            {/* Photo gallery */}
            {photos.length > 1 && (
              <div className="mt-16">
                <h2
                  className="font-bold mb-10"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.75rem",
                    color: "#e5e2e1",
                  }}
                >
                  Photo Gallery
                  <span
                    className="ml-3"
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.25em",
                      color: "#99907c",
                    }}
                  >
                    {photos.length} Photos
                  </span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((url, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden group"
                      style={{ paddingBottom: "75%", backgroundColor: "#1c1b1b" }}
                    >
                      <Image
                        src={url}
                        alt={`${review!.businessName} photo ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={80}
                        priority={i < 3}
                        className="object-cover transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — details + author */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-10">
              <div
                className="p-10"
                style={{
                  backgroundColor: "#20201f",
                  boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
                }}
              >
                <h3
                  className="font-bold mb-8"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.5rem",
                    color: "#e5e2e1",
                  }}
                >
                  The details
                </h3>

                <div className="space-y-6">
                  {review.address && (
                    <div>
                      <p
                        className="mb-2"
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.625rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.25em",
                          color: "#99907c",
                        }}
                      >
                        Address
                      </p>
                      <p
                        style={{
                          fontFamily: '"Noto Serif", serif',
                          fontSize: "0.9rem",
                          color: "#d3c5ad",
                          lineHeight: "1.5",
                        }}
                      >
                        {review.address}
                      </p>
                    </div>
                  )}

                  {review.reviewDate && (
                    <div>
                      <p
                        className="mb-2"
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.625rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.25em",
                          color: "#99907c",
                        }}
                      >
                        Date of Visit
                      </p>
                      <p
                        style={{
                          fontFamily: '"Noto Serif", serif',
                          fontSize: "0.9rem",
                          color: "#d3c5ad",
                        }}
                      >
                        {review.reviewDate}
                      </p>
                    </div>
                  )}

                  <div>
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.25em",
                        color: "#99907c",
                      }}
                    >
                      Rating
                    </p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>

              <AuthorBio compact />

              <Link
                href="/reviews"
                className="inline-flex items-center gap-3 transition-colors hover:text-[#f2ca50]"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#99907c",
                }}
              >
                <span>&larr;</span>
                Back to all reviews
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
