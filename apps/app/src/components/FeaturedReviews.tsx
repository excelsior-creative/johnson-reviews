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
    limit: 4,
    where: {
      _status: { equals: "published" },
    },
  });

  if (posts.length === 0) return null;

  const [featured, ...sidePosts] = posts;
  const featuredImage = featured.featuredImage as Media;

  const formattedFeaturedDate = featured.publishedDate
    ? new Date(featured.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <section className="py-24 md:py-32 px-8 md:px-16" style={{ backgroundColor: "#131313" }}>
      <div className="max-w-[1176px] mx-auto">
        {/* Section header */}
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
              Editor's Choice
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
              FEATURED REVIEWS
            </h2>
          </div>
          <Link
            href="/blog"
            className="transition-colors"
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

        {/* Asymmetric grid — large feature left, stacked list right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Featured large card — col-span-7 */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group md:col-span-7 relative block cursor-pointer"
          >
            <div
              className="overflow-hidden"
              style={{ aspectRatio: "16/10" }}
            >
              {featuredImage?.url ? (
                <Image
                  src={featuredImage.url}
                  alt={featuredImage.alt || featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-110 transition-all duration-700"
                />
              ) : (
                <div className="absolute inset-0" style={{ backgroundColor: "#20201f" }} />
              )}
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "#f2ca50",
                  }}
                >
                  Featured
                </span>
                <div className="h-[1px] w-10" style={{ backgroundColor: "#4d4635" }} />
                {formattedFeaturedDate && (
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(229,226,225,0.4)",
                    }}
                  >
                    {formattedFeaturedDate}
                  </span>
                )}
              </div>
              <h3
                className="font-bold group-hover:text-[#f2ca50] transition-colors"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  lineHeight: "1.2",
                  color: "#e5e2e1",
                  marginBottom: "1rem",
                }}
              >
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontStyle: "italic",
                    color: "rgba(229,226,225,0.55)",
                    fontSize: "0.9rem",
                    lineHeight: "1.7",
                    maxWidth: "38rem",
                  }}
                >
                  {featured.excerpt}
                </p>
              )}
            </div>
          </Link>

          {/* Side stack — col-span-5 */}
          <div className="md:col-span-5 flex flex-col gap-16">
            {sidePosts.map((post) => {
              const img = post.featuredImage as Media;
              const date = post.publishedDate
                ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-6 items-start cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{ width: "7.5rem", height: "7.5rem" }}
                  >
                    {img?.url ? (
                      <Image
                        src={img.url}
                        alt={img.alt || post.title}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full" style={{ backgroundColor: "#20201f" }} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          color: "#f2ca50",
                        }}
                      >
                        Review
                      </span>
                      {date && (
                        <span
                          style={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "10px",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "rgba(229,226,225,0.35)",
                          }}
                        >
                          {date}
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-bold group-hover:text-[#f2ca50] transition-colors mb-2"
                      style={{
                        fontFamily: '"Noto Serif", serif',
                        fontSize: "1.1rem",
                        lineHeight: "1.3",
                        color: "#e5e2e1",
                      }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p
                        className="line-clamp-2"
                        style={{
                          fontFamily: '"Noto Serif", serif',
                          fontStyle: "italic",
                          fontSize: "0.8rem",
                          color: "rgba(229,226,225,0.5)",
                          lineHeight: "1.6",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
