import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Post, Media } from "@/payload-types";

/**
 * Editor's Choice — asymmetric "bento" layout.
 * A large feature card (8 cols) with a floating meta card,
 * plus a tall secondary card (4 cols).
 */
export const FeaturedReviews = async () => {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedDate",
    limit: 2,
    where: {
      _status: { equals: "published" },
    },
  });

  if (posts.length === 0) return null;

  const [featured, secondary] = posts as [Post, Post | undefined];
  const featuredImage = featured.featuredImage as Media | undefined;
  const secondaryImage = secondary?.featuredImage as Media | undefined;

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#131313" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header — editorial split */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-xl">
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
              Curated Excellence
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
              Editor&rsquo;s Choice
            </h2>
          </div>
          <p
            className="italic leading-relaxed max-w-md"
            style={{
              fontFamily: '"Noto Serif", serif',
              color: "#99907c",
              fontSize: "1.05rem",
            }}
          >
            &ldquo;We do not merely eat; we witness the convergence of technique,
            tradition, and audacity.&rdquo;
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large feature */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group md:col-span-8 relative block overflow-hidden cursor-pointer"
            style={{ backgroundColor: "#1c1b1b" }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
              {featuredImage?.url ? (
                <Image
                  src={featuredImage.url}
                  alt={featuredImage.alt || featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-110"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: "#20201f" }}
                />
              )}
            </div>

            {/* Floating meta card (overlaps top-right) */}
            <div
              className="absolute top-0 right-0 p-6 md:p-8 max-w-sm w-full"
              style={{ pointerEvents: "none" }}
            >
              <div
                className="p-6"
                style={{
                  backgroundColor: "#131313",
                  borderLeft: "4px solid #f2ca50",
                  boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
                }}
              >
                <span
                  className="block mb-2"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#99907c",
                  }}
                >
                  Critic&rsquo;s Choice
                </span>
                <h3
                  className="font-bold mb-2 group-hover:text-[#f2ca50] transition-colors"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.5rem",
                    lineHeight: "1.2",
                    color: "#e5e2e1",
                  }}
                >
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p
                    className="italic line-clamp-2"
                    style={{
                      fontFamily: '"Noto Serif", serif',
                      fontSize: "0.8rem",
                      color: "#d3c5ad",
                      lineHeight: "1.6",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>

          {/* Secondary tall */}
          {secondary && (
            <Link
              href={`/blog/${secondary.slug}`}
              className="group md:col-span-4 relative block overflow-hidden cursor-pointer"
              style={{ backgroundColor: "#1c1b1b", minHeight: "400px" }}
            >
              <div className="absolute inset-0 overflow-hidden">
                {secondaryImage?.url ? (
                  <Image
                    src={secondaryImage.url}
                    alt={secondaryImage.alt || secondary.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: "#20201f" }}
                  />
                )}
                {/* Bottom gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, #131313 0%, transparent 60%)",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 p-8 right-0">
                <div
                  className="inline-block px-4 py-1 mb-4"
                  style={{ backgroundColor: "#353535" }}
                >
                  <span
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.625rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "#f2ca50",
                    }}
                  >
                    Latest
                  </span>
                </div>
                <h3
                  className="font-bold group-hover:text-[#f2ca50] transition-colors"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.5rem",
                    lineHeight: "1.2",
                    color: "#e5e2e1",
                  }}
                >
                  {secondary.title}
                </h3>
                {secondary.excerpt && (
                  <p
                    className="italic line-clamp-2 mt-2"
                    style={{
                      fontFamily: '"Noto Serif", serif',
                      fontSize: "0.8rem",
                      color: "#d3c5ad",
                      lineHeight: "1.6",
                    }}
                  >
                    {secondary.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
