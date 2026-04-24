import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PostCard } from "./PostCard";
import Link from "next/link";

interface BlogSectionProps {
  title?: string;
  badge?: string;
  italicPart?: string;
  limit?: number;
}

export const BlogSection = async ({
  title = "Reviews",
  italicPart = "this month.",
  badge = "The Latest",
  limit = 6,
}: BlogSectionProps = {}) => {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedDate",
    limit,
    where: { _status: { equals: "published" } },
  });

  if (posts.length === 0) return null;

  return (
    <section style={{ padding: "40px 0 100px" }}>
      <div className="container-jr">
        {/* Editorial section header */}
        <div
          className="between"
          style={{ marginBottom: 40, alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 12 }}>
              {badge}
            </div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
              {title}{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-ink-dim)" }}
              >
                {italicPart}
              </span>
            </h2>
          </div>
          <Link href="/blog" className="btn btn-ghost">
            View all reviews <span className="arrow">→</span>
          </Link>
        </div>

        {/* Post grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            columnGap: 48,
            rowGap: 80,
          }}
          className="post-grid"
        >
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 1024px) { .post-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
              @media (max-width: 640px)  { .post-grid { grid-template-columns: 1fr !important; row-gap: 56px !important; } }
            `,
          }}
        />
      </div>
    </section>
  );
};
