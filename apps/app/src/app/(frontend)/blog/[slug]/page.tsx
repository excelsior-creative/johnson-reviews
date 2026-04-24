import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LexicalContent } from "@/components/LexicalContent";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Media, Post, Category, Tag } from "@/payload-types";
import { NewsletterInline } from "@/components/NewsletterInline";
import { generateArticleMetadata, absoluteUrl } from "@/lib/metadata";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/structured-data";

export const dynamic = "force-dynamic";

async function fetchPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    });
    return docs[0] as Post | undefined;
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}":`, error);
    return undefined;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }

  const featuredImage = post.featuredImage as Media | undefined;
  const tagNames = ((post.tags as Tag[]) ?? [])
    .map((t) => (typeof t === "object" ? t.name : null))
    .filter(Boolean) as string[];

  return generateArticleMetadata({
    title: post.title,
    description: post.excerpt ?? post.title,
    slug: post.slug ?? slug,
    pathPrefix: "/blog",
    ogImage: absoluteUrl(featuredImage?.url ?? undefined),
    publishedTime: post.publishedDate ?? post.createdAt ?? undefined,
    modifiedTime: post.updatedAt ?? undefined,
    keywords: tagNames.length > 0 ? tagNames : undefined,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) notFound();

  const featuredImage = post.featuredImage as Media | undefined;
  const categories = (post.categories as Category[]) ?? [];
  const tags = (post.tags as Tag[]) ?? [];
  const primaryCategory = categories[0];

  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "The Journal", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const pageSchema = combineSchemas(articleSchema, breadcrumbSchema);

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

  return (
    <article className="page-body">
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

      {/* Signature */}
      <section style={{ padding: "60px 0 100px" }}>
        <div className="container-jr text-center" style={{ maxWidth: 760 }}>
          <div className="meta mb-3">— End of dispatch —</div>
          <div className="signature" style={{ fontSize: 40 }}>
            Brandon J.
          </div>
        </div>
      </section>

      <NewsletterInline compact />

      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      )}
    </article>
  );
}
