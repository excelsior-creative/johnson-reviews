import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Post, Media } from "@/payload-types";

export const FeaturedReviews = async () => {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedDate",
    limit: 3,
    where: {
      _status: { equals: "published" },
    },
  });

  if (posts.length === 0) return null;

  const [featured, ...sidePosts] = posts;
  const featuredImage = featured.featuredImage as Media;

  return (
    <section className="bg-[#F4DDCD]/20 py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "600px" }}>
        {/* Left: featured large image */}
        <div className="relative" style={{ minHeight: "400px" }}>
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || featured.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#CFD6D9]/40" />
          )}
          {/* Warm tint overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(244,221,205,0.15) 0%, transparent 60%)" }}
          />
        </div>

        {/* Right: cream panel with featured reviews list */}
        <div className="flex flex-col justify-center px-10 md:px-[10%] py-16 bg-[#F9F7F4] border-l border-[#CFD6D9]/50">
          {/* Section eyebrow */}
          <p
            className="text-[#52A3A9] text-[10px] uppercase tracking-[0.32em] mb-4"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            Editor&apos;s Picks
          </p>
          <h2
            className="text-[#352F2C] mb-2"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            }}
          >
            Featured Reviews
          </h2>
          {/* Gold rule */}
          <div className="flex items-center gap-3 mb-10">
            <div style={{ width: 32, height: 1, background: "#D5C17A" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
              <rect x="2.5" y="0" width="3.54" height="3.54" fill="#D5C17A" transform="rotate(45 2.5 0)" />
            </svg>
            <div style={{ width: 32, height: 1, background: "#D5C17A" }} />
          </div>

          <div className="flex flex-col gap-8">
            {posts.map((post) => {
              const img = post.featuredImage as Media;
              const date = post.publishedDate
                ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <article key={post.id} className="group flex gap-5 items-start">
                  {/* Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex-shrink-0"
                    style={{ width: "30%" }}
                  >
                    <div className="relative overflow-hidden border border-[#CFD6D9]/50" style={{ paddingBottom: "83%", width: "100%" }}>
                      {img?.url ? (
                        <Image
                          src={img.url}
                          alt={img.alt || post.title}
                          fill
                          sizes="20vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#CFD6D9]/30" />
                      )}
                    </div>
                  </Link>

                  {/* Text */}
                  <div className="flex-1">
                    <h3
                      className="text-[#352F2C] font-medium leading-snug mb-2 group-hover:text-[#52A3A9] transition-colors"
                      style={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontSize: "1.15rem",
                        lineHeight: 1.3,
                      }}
                    >
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {date && (
                      <span
                        className="text-[#D5C17A] text-[10px] uppercase tracking-[0.16em]"
                        style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
                      >
                        {date}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
