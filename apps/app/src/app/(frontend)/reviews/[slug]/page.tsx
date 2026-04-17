import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

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
          className="w-5 h-5"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span
        className="ml-3 text-[#e5e2e1]/60"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
        }}
      >
        {rating} of 5
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
      select: { slug: true } as any,
    });
    return docs.map((r: any) => ({ slug: r.slug }));
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
  const payload = await getPayload({ config });

  let review: any;

  try {
    const { docs } = await payload.find({
      collection: "reviews",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    review = docs[0];
  } catch (error) {
    console.error(`Failed to fetch review "${slug}":`, error);
  }

  if (!review) notFound();

  const photos: string[] = (review.photos ?? [])
    .map((p: any) => p.url)
    .filter(Boolean);

  return (
    <article className="py-20" style={{ backgroundColor: "#131313" }}>
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 mb-12 text-[#f2ca50] hover:text-[#d4af37] transition-colors"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All reviews
          </Link>

          {/* Header */}
          <header className="mb-12">
            {review.address && (
              <p
                className="mb-6 text-[#f2ca50]"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                }}
              >
                {review.address}
              </p>
            )}

            <h1
              className="font-bold leading-[0.95] mb-6 text-[#e5e2e1]"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {review.businessName}
            </h1>

            <div className="flex flex-wrap items-center gap-6">
              <StarRating rating={review.rating} />
              {review.reviewDate && (
                <span
                  className="text-[#d3c5ad]"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                  }}
                >
                  {review.reviewDate}
                </span>
              )}
            </div>

            <div className="gold-divider mt-10" />
          </header>

          {/* Review text */}
          {review.reviewText && (
            <div className="mb-16">
              <p
                className="whitespace-pre-wrap leading-relaxed text-[#e5e2e1]/85"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                }}
              >
                {review.reviewText}
              </p>
            </div>
          )}

          {/* Photo gallery */}
          {photos.length > 0 && (
            <div>
              <h2
                className="mb-8 text-[#e5e2e1] flex items-baseline gap-3"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Photographs
                <span
                  className="text-[#e5e2e1]/40"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                  }}
                >
                  {photos.length}
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((url, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden bg-[#1c1b1b]"
                    style={{ paddingBottom: "75%" }}
                  >
                    <Image
                      src={url}
                      alt={`${review.businessName} — photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={80}
                      priority={i < 3}
                      className="object-cover [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] transition-all duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
