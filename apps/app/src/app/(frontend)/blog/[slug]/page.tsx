import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LexicalContent } from "@/components/LexicalContent";
import { ReviewDetailHero } from "@/components/ReviewDetailHero";
import { ConciergeSidebar } from "@/components/ConciergeSidebar";
import { VerdictPanel, VerdictRating } from "@/components/VerdictPanel";
import Image from "next/image";
import { Media, Post, Category } from "@/payload-types";

export const dynamic = "force-dynamic";

/**
 * Review / post detail page.
 * Layout per /reference/design/johnson_reviews_review_detail_gold_edition/:
 *   - Full-bleed editorial hero (ReviewDetailHero)
 *   - 8-col narrative column (drop-cap lead paragraph via .review-prose)
 *   - Inline 2-up image fragment (first two gallery images, staggered)
 *   - Verdict ratings panel (renders when ratings present)
 *   - 4-col Concierge sidebar (sticky, renders when venue details present)
 *   - Remaining gallery images rendered in PhotoGallery below
 *
 * Venue metadata + ratings are optional — they render gracefully when
 * absent. Posts schema extension is queued as the next infrastructure step.
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  let post: Post | undefined;

  try {
    const { docs: posts } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      depth: 2,
    });
    post = posts[0] as Post;
  } catch (error) {
    console.error(
      `Failed to fetch blog post "${slug}" during page render.`,
      error
    );
  }

  if (!post) {
    notFound();
  }

  const featuredImage = post.featuredImage as Media | undefined;
  const categories = (post.categories as Category[] | undefined) ?? [];
  const primaryCategory = categories[0];

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const galleryImages =
    post.gallery
      ?.map((item) => {
        const img =
          typeof item.image === "object" ? (item.image as Media) : undefined;
        if (!img?.url) return null;
        return {
          url: img.url,
          alt: img.alt || post.title,
          caption: item.caption ?? undefined,
          width: img.width ?? undefined,
          height: img.height ?? undefined,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null) ?? [];

  const inlineFragment = galleryImages.slice(0, 2);
  const galleryRest = galleryImages.slice(2);

  // Venue metadata — currently not in Posts schema. Pulled via loose
  // optional lookup so future schema additions light the sidebar up
  // automatically without another template change.
  const venue = (post as unknown as Record<string, unknown>).venue as
    | { address?: string; priceTier?: string; hours?: string; websiteUrl?: string }
    | undefined;

  // Ratings — also not in Posts schema yet. Same pattern.
  const ratingsRaw = (post as unknown as Record<string, unknown>).ratings as
    | Partial<Record<"food" | "experience" | "value" | "kidFriendly" | "service" | "vibe", number>>
    | undefined;
  const ratings: VerdictRating[] | undefined = ratingsRaw
    ? (
        [
          { label: "Food", score: ratingsRaw.food },
          { label: "Experience", score: ratingsRaw.experience },
          { label: "Value", score: ratingsRaw.value },
          { label: "Kid-Friendly", score: ratingsRaw.kidFriendly },
          { label: "Service", score: ratingsRaw.service },
          { label: "Vibe", score: ratingsRaw.vibe },
        ].filter(
          (r): r is VerdictRating => typeof r.score === "number"
        )
      )
    : undefined;
  const overallScore =
    ratings && ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
      : undefined;

  return (
    <article>
      <ReviewDetailHero
        title={post.title}
        tagline={post.excerpt}
        image={featuredImage}
        category={primaryCategory?.name}
        date={formattedDate}
      />

      <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Narrative column */}
          <div className="lg:col-span-8 space-y-12">
            <LexicalContent
              content={post.content}
              className="review-prose"
            />

            {/* Inline 2-up image fragment — staggered */}
            {inlineFragment.length === 2 && (
              <div className="grid grid-cols-2 gap-6 md:gap-8 py-4 md:py-8">
                {inlineFragment.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden ${
                      i === 1 ? "mt-8 md:mt-12" : ""
                    }`}
                    style={{
                      backgroundColor: "#1c1b1b",
                      height: "clamp(220px, 38vw, 400px)",
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || post.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* The Verdict (optional) */}
            <VerdictPanel ratings={ratings} overallScore={overallScore} />
          </div>

          {/* Concierge sidebar (optional) */}
          <aside className="lg:col-span-4">
            <ConciergeSidebar
              address={venue?.address}
              priceTier={venue?.priceTier}
              hours={venue?.hours}
              categoryLabel={primaryCategory?.name}
              websiteUrl={venue?.websiteUrl}
            />
          </aside>
        </div>
      </section>

      {/* Remaining gallery */}
      {galleryRest.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-8 md:px-12 pb-16 md:pb-24">
          <PhotoGallery
            images={
              galleryRest as { url: string; alt?: string; caption?: string }[]
            }
            title="More Photos"
          />
        </section>
      )}
    </article>
  );
}
