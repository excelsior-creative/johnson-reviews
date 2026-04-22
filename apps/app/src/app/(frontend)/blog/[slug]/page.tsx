import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LexicalContent } from "@/components/LexicalContent";
import { AuthorBio } from "@/components/AuthorBio";
import Image from "next/image";
import Link from "next/link";
import { Media, Post, Category, Tag } from "@/payload-types";
import {
  combineSchemas,
  generateArticleSchema,
  generateReviewSchema,
} from "@/lib/structured-data";

export const dynamic = "force-dynamic";

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
      where: {
        slug: {
          equals: slug,
        },
      },
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
  const categories = (post.categories as Category[]) || [];
  const tags = (post.tags as Tag[]) || [];
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

  const articleSchema = generateArticleSchema(post);
  const reviewSchema = generateReviewSchema(post, post.title);
  const postSchema = combineSchemas(articleSchema, reviewSchema);

  return (
    <article style={{ backgroundColor: "#131313" }}>
      {postSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      )}
      {/* Hero — full-bleed image with title overlay */}
      <section className="relative w-full overflow-hidden pt-24 md:pt-28">
        <div
          className="relative w-full"
          style={{ height: "clamp(60vh, 80vh, 870px)" }}
        >
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "grayscale(20%) brightness(0.4)" }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "#1c1b1b" }}
            />
          )}

          {/* Bottom gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #131313 0%, transparent 60%)",
            }}
          />

          {/* Title block positioned at bottom */}
          <div className="absolute inset-0 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-12 md:pb-20">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {primaryCategory &&
                  typeof primaryCategory === "object" && (
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
                      {primaryCategory.name}
                    </span>
                  )}
                {formattedDate && (
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#f2ca50",
                    }}
                  >
                    {formattedDate}
                  </span>
                )}
              </div>
              <h1
                className="font-bold leading-[1.05] mb-4 tracking-tighter"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                  color: "#e5e2e1",
                }}
              >
                {post.title}
              </h1>
              {post.excerpt && (
                <p
                  className="italic max-w-2xl"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)",
                    color: "rgba(242,202,80,0.85)",
                    lineHeight: "1.5",
                  }}
                >
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content + sidebar grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Narrative */}
          <div className="lg:col-span-8">
            <LexicalContent content={post.content} dropCap />

            {/* Tags */}
            {tags.length > 0 && (
              <div
                className="mt-16 pt-10"
                style={{ borderTop: "1px solid rgba(77,70,53,0.3)" }}
              >
                <span
                  className="block mb-5"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "#99907c",
                  }}
                >
                  Tags
                </span>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) =>
                    typeof tag === "object" ? (
                      <span
                        key={tag.id}
                        className="inline-block px-4 py-2"
                        style={{
                          backgroundColor: "#353535",
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.625rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          color: "#d3c5ad",
                        }}
                      >
                        {tag.name}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div className="mt-16">
                <PhotoGallery
                  images={
                    galleryImages as {
                      url: string;
                      alt?: string;
                      caption?: string;
                    }[]
                  }
                  title="Photo Gallery"
                />
              </div>
            )}
          </div>

          {/* Sidebar — at-a-glance facts + author */}
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
                  At a glance
                </h3>

                <div className="space-y-6">
                  {categories.length > 0 && (
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
                        Category
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((c) =>
                          typeof c === "object" ? (
                            <Link
                              key={c.id}
                              href={`/blog?category=${c.slug}`}
                              className="transition-colors hover:text-[#f2ca50]"
                              style={{
                                fontFamily: '"Noto Serif", serif',
                                fontSize: "0.9rem",
                                color: "#d3c5ad",
                              }}
                            >
                              {c.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  )}

                  {formattedDate && (
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
                        Published
                      </p>
                      <p
                        style={{
                          fontFamily: '"Noto Serif", serif',
                          fontSize: "0.9rem",
                          color: "#d3c5ad",
                        }}
                      >
                        {formattedDate}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Author card — E-E-A-T signal */}
              <AuthorBio />

              {/* Back link */}
              <Link
                href="/blog"
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
