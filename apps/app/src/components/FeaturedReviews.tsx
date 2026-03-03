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
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#191A1B]" style={{ minHeight: "600px" }}>
      {/* Left: featured large image */}
      <div className="relative" style={{ minHeight: "400px" }}>
        {featuredImage?.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || featured.title}
            fill
            className="object-cover"
            style={{ height: "600px" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#2a2b2c]" />
        )}
      </div>

      {/* Right: dark panel with featured reviews list */}
      <div
        className="flex flex-col justify-center px-[14.2%] py-16 bg-[#191A1B]"
      >
        <h2
          className="text-white text-3xl font-bold mb-8"
          style={{ fontFamily: '"Oswald", sans-serif', fontWeight: 700 }}
        >
          Featured Reviews
        </h2>

        <div className="flex flex-col gap-[43px]">
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
                  style={{ width: "32.5%" }}
                >
                  <div className="relative overflow-hidden" style={{ paddingBottom: "83%", width: "100%" }}>
                    {img?.url ? (
                      <Image
                        src={img.url}
                        alt={img.alt || post.title}
                        fill
                        sizes="20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#2a2b2c]" />
                    )}
                  </div>
                </Link>

                {/* Text */}
                <div className="flex-1">
                  <h3
                    className="text-white text-lg font-bold leading-snug mb-3 group-hover:text-[#DB7D2D] transition-colors"
                    style={{ fontFamily: '"Unna", serif' }}
                  >
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  {date && (
                    <span
                      className="text-[#DB7D2D] text-xs font-bold"
                      style={{ fontFamily: '"Unna", serif' }}
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
    </section>
  );
};
