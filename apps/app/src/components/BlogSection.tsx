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
    <section className="py-20 md:py-28 bg-[#191A1B]">
      <div className="max-w-[1176px] mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-4">
          <h2
            className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wide"
            style={{ fontFamily: '"Oswald", sans-serif', fontWeight: 700 }}
          >
            {title}
          </h2>
          {/* Decorative divider */}
          <div className="flex justify-center mt-5 mb-8">
            <div className="w-[50px] h-[3px] bg-white/60" />
          </div>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-10">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} priority={index === 0} />
          ))}
        </div>

        {/* More stories CTA */}
        <div className="flex justify-center mt-8">
          <Link
            href="/blog"
            className="inline-block border-2 border-white/60 text-white bg-transparent px-[45px] py-[18px] text-xs font-bold uppercase tracking-[2px] hover:bg-[#DB7D2D] hover:border-[#DB7D2D] hover:text-white transition-all"
            style={{ fontFamily: '"Oswald", sans-serif' }}
          >
            More Stories
          </Link>
        </div>
      </div>
    </section>
  );
};
