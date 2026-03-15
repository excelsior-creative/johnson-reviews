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
  badge,
  limit = 6,
}: BlogSectionProps = {}) => {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedDate",
    limit,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  if (posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#F9F7F4]">
      <div className="max-w-[1176px] mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-14">
          {badge && (
            <p
              className="text-[#52A3A9] text-[10px] uppercase tracking-[0.32em] mb-4"
              style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
            >
              {badge}
            </p>
          )}
          <h2
            className="text-[#352F2C] leading-tight"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "0.02em",
            }}
          >
            {title}
          </h2>
          {/* Elegant gold rule */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <div style={{ width: 40, height: 1, background: "#D5C17A" }} />
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
              <rect x="3" y="0" width="4.24" height="4.24" rx="0.3" fill="#D5C17A" transform="rotate(45 3 0)" />
            </svg>
            <div style={{ width: 40, height: 1, background: "#D5C17A" }} />
          </div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </div>

        {/* More stories CTA */}
        <div className="flex justify-center mt-4">
          <Link
            href="/blog"
            className="inline-block border border-[#352F2C] text-[#352F2C] bg-transparent px-10 py-3.5 text-[10px] uppercase tracking-[0.24em] hover:bg-[#52A3A9] hover:border-[#52A3A9] hover:text-white transition-all"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            View All Reviews
          </Link>
        </div>
      </div>
    </section>
  );
};
