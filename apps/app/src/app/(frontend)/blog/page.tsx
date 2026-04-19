import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PostCard } from "@/components/PostCard";
import Header from "@/components/Header";
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

  // Load categories for the sidebar filter
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

  // Find selected category object (if any) by slug
  const selectedCategory = categoryParam
    ? categories.find((c) => c.slug === categoryParam)
    : null;

  // Fetch posts
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

  return (
    <div className="pt-28 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Header
          badge="The Discovery"
          title={
            selectedCategory ? selectedCategory.name : "The Search For Perfection."
          }
          subtitle={
            selectedCategory
              ? `Reviews in the ${selectedCategory.name} collection, each a dispatch from the field.`
              : "Reviews, dispatches, and editorials from the road — insights on restaurants, hotels, and stages we've judged worthy of note."
          }
        />

        <div className="grid grid-cols-12 gap-12 md:gap-16">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3 space-y-12">
            <div>
              <h3
                className="mb-6"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#99907c",
                }}
              >
                Collections
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/blog"
                    className="flex justify-between items-center transition-colors"
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.875rem",
                      color: !selectedCategory ? "#f2ca50" : "rgba(229,226,225,0.7)",
                    }}
                  >
                    <span>All Reviews</span>
                    {!selectedCategory && (
                      <span style={{ color: "#f2ca50" }}>•</span>
                    )}
                  </Link>
                </li>
                {categories.map((cat) => {
                  const isActive = selectedCategory?.slug === cat.slug;
                  return (
                    <li key={cat.id}>
                      <Link
                        href={`/blog?category=${cat.slug}`}
                        className="flex justify-between items-center transition-colors hover:text-[#f2ca50]"
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.875rem",
                          color: isActive
                            ? "#f2ca50"
                            : "rgba(229,226,225,0.7)",
                        }}
                      >
                        <span>{cat.name}</span>
                        {isActive && (
                          <span style={{ color: "#f2ca50" }}>•</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3
                className="mb-6"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#99907c",
                }}
              >
                Experience Tiers
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Editorial Pick", "Hidden Gem", "Michelin Starred"].map(
                  (tier) => (
                    <span
                      key={tier}
                      className="inline-block px-4 py-2 transition-colors"
                      style={{
                        border: "1px solid rgba(77,70,53,0.6)",
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                        color: "#e5e2e1",
                      }}
                    >
                      {tier}
                    </span>
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <section className="col-span-12 lg:col-span-9">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} priority={i < 2} />
                ))}
              </div>
            ) : (
              <div className="py-20">
                <p
                  className="italic"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    color: "#99907c",
                    fontSize: "1.125rem",
                  }}
                >
                  No reviews match this selection.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
