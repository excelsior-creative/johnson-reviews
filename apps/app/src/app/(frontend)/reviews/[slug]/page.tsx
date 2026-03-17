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
          fill={i < rating ? "#DB7D2D" : "none"}
          stroke={i < rating ? "#DB7D2D" : "#6b7280"}
          strokeWidth="1.5"
          className="w-5 h-5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span
        className="ml-2 text-white/60 text-sm"
        style={{ fontFamily: '"Jost", sans-serif' }}
      >
        {rating} out of 5
      </span>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: "reviews",
      limit: 1000,
      select: { slug: true } as any,
    })
    return docs.map((r: any) => ({ slug: r.slug }))
  } catch {
    return []
  }
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  let review: any

  try {
    const { docs } = await payload.find({
      collection: "reviews",
      where: { slug: { equals: slug } },
      limit: 1,
    })
    review = docs[0]
  } catch (error) {
    console.error(`Failed to fetch review "${slug}":`, error)
  }

  if (!review) notFound()

  const photos: string[] = (review.photos ?? []).map((p: any) => p.url).filter(Boolean)

  return (
    <article className="py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#DB7D2D] text-sm mb-8 hover:underline"
            style={{ fontFamily: '"Jost", sans-serif' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Reviews
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1
              className="text-white text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-3"
              style={{ fontFamily: '"Oswald", sans-serif' }}
            >
              {review.businessName}
            </h1>

            {review.address && (
              <p
                className="text-white/50 text-sm mb-4"
                style={{ fontFamily: '"Jost", sans-serif' }}
              >
                📍 {review.address}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <StarRating rating={review.rating} />
              {review.reviewDate && (
                <span
                  className="text-[#DB7D2D] text-xs font-bold uppercase"
                  style={{ fontFamily: '"Unna", serif' }}
                >
                  {review.reviewDate}
                </span>
              )}
            </div>
          </header>

          {/* Review text */}
          {review.reviewText && (
            <div className="mb-12">
              <p
                className="text-white/80 text-base leading-relaxed whitespace-pre-wrap"
                style={{ fontFamily: '"Jost", sans-serif' }}
              >
                {review.reviewText}
              </p>
            </div>
          )}

          {/* Photo gallery */}
          {photos.length > 0 && (
            <div>
              <h2
                className="text-white text-xl font-medium mb-6"
                style={{ fontFamily: '"Oswald", sans-serif' }}
              >
                Photos
                <span className="text-white/40 text-base ml-2 font-normal">
                  ({photos.length})
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {photos.map((url, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-sm bg-[#1e1f20]"
                    style={{ paddingBottom: "75%" }}
                  >
                    <Image
                      src={url}
                      alt={`${review.businessName} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={80}
                      priority={i < 3}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </article>
  )
}
