import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PostCard } from "@/components/PostCard";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterInline } from "@/components/NewsletterInline";
import Link from "next/link";
import { Post, Category } from "@/payload-types";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categoryParam } = await searchParams;
  const payload = await getPayload({ config });

  let categories: Category[] = [];
  try {
    const res = await payload.find({
      collection: "categories",
      limit: 50,
      sort: "name",
    });
    categories = res.docs as Category[];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  const selectedCategory = categoryParam
    ? categories.find((c) => c.slug === categoryParam)
    : null;

  let posts: Post[] = [];
  try {
    const baseWhere = { _status: { equals: "published" } } as const;
    const where = selectedCategory
      ? { ...baseWhere, categories: { in: [selectedCategory.id] } }
      : baseWhere;
    const result = await payload.find({
      collection: "posts",
      sort: "-publishedDate",
      limit: 24,
      where: where as Parameters<typeof payload.find>[0]["where"],
    });
    posts = result.docs as Post[];
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="The Journal"
        title={selectedCategory ? selectedCategory.name : "Long-form"}
        italicPart={selectedCategory ? "" : "field reports."}
        subtitle={
          selectedCategory
            ? `Reviews in the ${selectedCategory.name} collection — written down so other families can decide what's worth the drive.`
            : "Reviews, dispatches, and editorials from the road. The long-form versions of what's on Google Maps — written when a place earned more than a paragraph."
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
              alignItems: "center",
              padding: "20px 0",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <span className="meta">Section</span>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              <Link
                href="/blog"
                className="nav-link"
                style={{
                  color: !selectedCategory
                    ? "var(--color-accent)"
                    : "var(--color-ink-dim)",
                  borderBottom: !selectedCategory
                    ? "1px solid var(--color-accent)"
                    : "1px solid transparent",
                  paddingBottom: 4,
                }}
              >
                All
              </Link>
              {categories.map((cat) => {
                const isActive = selectedCategory?.slug === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={`/blog?category=${cat.slug}`}
                    className="nav-link"
                    style={{
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-ink-dim)",
                      borderBottom: isActive
                        ? "1px solid var(--color-accent)"
                        : "1px solid transparent",
                      paddingBottom: 4,
                    }}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section style={{ padding: "80px 0 40px" }}>
          <div className="container-jr">
            <div className="kicker mb-8">Editor&rsquo;s Pick</div>
            <PostCard post={featured} variant="horizontal" priority />
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
              {rest.map((post, i) => (
                <PostCard key={post.id} post={post} priority={i < 2} />
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
              No reviews match this section.{" "}
              <Link
                href="/blog"
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
