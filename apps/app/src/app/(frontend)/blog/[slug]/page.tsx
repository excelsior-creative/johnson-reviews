import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LexicalContent } from "@/components/LexicalContent";
import Image from "next/image";
import Link from "next/link";
import { Media, Post, Category, Tag } from "@/payload-types";
import { NewsletterInline } from "@/components/NewsletterInline";
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
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
      where: { slug: { equals: slug } },
      depth: 2,
    });
    post = posts[0] as Post;
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}":`, error);
  }

  if (!post) notFound();

  const featuredImage = post.featuredImage as Media | undefined;
  const categories = (post.categories as Category[]) ?? [];
  const tags = (post.tags as Tag[]) ?? [];
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
          alt: img.alt || post!.title,
          caption: item.caption ?? undefined,
          width: img.width ?? undefined,
          height: img.height ?? undefined,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null) ?? [];

  const postSchema = combineSchemas(
    generateArticleSchema(post),
    generateReviewSchema(post),
    generateBreadcrumbSchema(post),
  );

  return (
    <article className="page-body">
      {postSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      )}
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "min(82vh, 880px)",
          overflow: "hidden",
        }}
      >
        {featuredImage?.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover ken-burns"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "var(--color-bg-card)" }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,13,11,0.5) 0%, rgba(15,13,11,0.1) 30%, rgba(15,13,11,0.96) 100%)",
          }}
        />
        <div className="absolute" style={{ bottom: 80, left: 0, right: 0 }}>
          <div className="container-jr">
            <div className="kicker rise mb-6">
              {primaryCategory?.name ?? "The Journal"}
              {formattedDate ? ` · ${formattedDate}` : ""}
            </div>
            <h1
              className="display rise-1 text-balance"
              style={{
                fontSize: "clamp(48px, 8vw, 124px)",
                maxWidth: "16ch",
                lineHeight: 0.95,
              }}
            >
              {post.title}
            </h1>
            {post.excerpt && (
              <p
                className="rise-2 italic max-w-3xl text-pretty"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.6vw, 24px)",
                  color: "var(--color-ink-dim)",
                  marginTop: 24,
                  lineHeight: 1.45,
                }}
              >
                {post.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Author byline */}
      <section style={{ padding: "60px 0 0" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #3a2f25, #6b5842)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--color-accent)",
                fontSize: 18,
              }}
            >
              BJ
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 16 }}>
                By Brandon Johnson
              </div>
              <div className="meta" style={{ marginTop: 2 }}>
                Editor {formattedDate ? `· ${formattedDate}` : ""}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <LexicalContent content={post.content} dropCap />
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section style={{ padding: "40px 0 80px" }}>
          <div className="container-jr">
            <PhotoGallery
              images={galleryImages as { url: string; alt?: string; caption?: string }[]}
              title="From the visit."
            />
          </div>
        </section>
      )}

      {/* Tags + back row */}
      {tags.length > 0 && (
        <section
          style={{
            padding: "60px 0",
            borderTop: "1px solid var(--color-rule)",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-jr" style={{ maxWidth: 1000 }}>
            <div
              className="between"
              style={{ flexWrap: "wrap", gap: 24, alignItems: "center" }}
            >
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <span className="meta">Tags</span>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {tags.map((tag) =>
                    typeof tag === "object" ? (
                      <Link
                        key={tag.id}
                        href={`/blog?tag=${tag.slug ?? tag.id}`}
                        className="meta"
                        style={{
                          color: "var(--color-ink-dim)",
                          border: "1px solid var(--color-rule-strong)",
                          padding: "8px 14px",
                          transition: "color 0.2s, border-color 0.2s",
                        }}
                      >
                        {tag.name}
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
              <Link href="/blog" className="btn btn-ghost">
                Back to The Journal <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Author bio — E-E-A-T signal */}
      <section style={{ padding: "80px 0 60px" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: 32,
              alignItems: "start",
              padding: "40px 0",
              borderTop: "1px solid var(--color-rule)",
              borderBottom: "1px solid var(--color-rule)",
            }}
            className="author-bio-grid"
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #3a2f25, #6b5842)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--color-accent)",
                fontSize: 44,
              }}
            >
              BJ
            </div>
            <div>
              <div className="kicker mb-3">About the reviewer</div>
              <div
                className="display"
                style={{ fontSize: 28, lineHeight: 1.2 }}
              >
                Brandon Johnson
              </div>
              <p
                className="text-pretty"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  color: "var(--color-ink-dim)",
                  lineHeight: 1.6,
                  marginTop: 14,
                }}
              >
                Family travel + restaurant reviewer based in Orange County,
                California. Google Local Guide Level 10 with 500+ reviews,
                27,000+ original photos, and 132M+ photo views. Every
                place on this site is somewhere we&rsquo;ve actually been —
                usually with the kids.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link href="/about" className="btn btn-ghost">
                  More about Brandon <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 640px) {
                .author-bio-grid {
                  grid-template-columns: 1fr !important;
                  gap: 24px !important;
                  text-align: left;
                }
              }
            `,
          }}
        />
      </section>

      {/* Signature */}
      <section style={{ padding: "20px 0 100px" }}>
        <div className="container-jr text-center" style={{ maxWidth: 760 }}>
          <div className="meta mb-3">— End of dispatch —</div>
          <div className="signature" style={{ fontSize: 40 }}>
            Brandon J.
          </div>
        </div>
      </section>

      <NewsletterInline compact />
    </article>
  );
}
