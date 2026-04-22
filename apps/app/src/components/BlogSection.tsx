import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PostCard } from "./PostCard";
import Link from "next/link";

interface BlogSectionProps {
  title?: string;
  badge?: string;
  limit?: number;
}

export const BlogSection = async ({
  title = "Latest Reviews",
  badge = "From the reviews",
  limit = 6,
}: BlogSectionProps = {}) => {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedDate",
    limit,
    where: {
      _status: { equals: "published" },
    },
  });

  if (posts.length === 0) return null;

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Editorial section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <div>
            <span
              className="block mb-4"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#f2ca50",
              }}
            >
              {badge}
            </span>
            <h2
              className="font-bold"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#e5e2e1",
                lineHeight: "1.05",
              }}
            >
              {title}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 pb-1 transition-colors hover:text-[#f2ca50]"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#d3c5ad",
              borderBottom: "1px solid rgba(77,70,53,0.6)",
            }}
          >
            View All Reviews
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
