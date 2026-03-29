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
  badge = "Selection",
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
    <section className="py-24 md:py-32 px-8 md:px-16" style={{ backgroundColor: "#1c1b1b" }}>
      <div className="max-w-[1176px] mx-auto">
        {/* Editorial section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span
              className="block mb-4"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "#f2ca50",
              }}
            >
              {badge}
            </span>
            <h2
              className="font-bold tracking-tighter"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#e5e2e1",
                lineHeight: "1",
              }}
            >
              {title.toUpperCase()}
            </h2>
          </div>
          <Link
            href="/blog"
            className="transition-colors hover:text-[#f2ca50]"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(229,226,225,0.5)",
              borderBottom: "1px solid #4d4635",
              paddingBottom: "0.375rem",
            }}
          >
            View All Reviews
          </Link>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-4 px-10 py-4 font-label uppercase text-xs font-bold transition-all group hover:bg-[#f2ca50] hover:border-[#f2ca50] hover:text-[#3c2f00]"
            style={{
              fontFamily: '"Inter", sans-serif',
              letterSpacing: "0.2em",
              border: "1px solid rgba(229,226,225,0.3)",
              color: "#e5e2e1",
            }}
          >
            More Stories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
