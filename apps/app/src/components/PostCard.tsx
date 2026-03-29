import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post, Media, Category } from "@/payload-types";

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export const PostCard = ({ post, priority = false }: PostCardProps) => {
  const featuredImage = post.featuredImage as Media;
  const categories = post.categories as Category[];
  const primaryCategory = categories?.[0] as Category | undefined;

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="group cursor-pointer" style={{ backgroundColor: "#131313" }}>
      <Link href={`/blog/${post.slug}`}>
        {/* Thumbnail — grayscale to full color on hover */}
        <div className="relative overflow-hidden" style={{ paddingBottom: "66%" }}>
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              priority={priority}
              className="object-cover [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-110 transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0" style={{ backgroundColor: "#20201f" }} />
          )}

          {/* Category badge */}
          {primaryCategory && typeof primaryCategory === "object" && (
            <div
              className="absolute top-0 left-0 px-3 py-1.5 z-10"
              style={{
                backgroundColor: "#131313",
                color: "#e5e2e1",
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {primaryCategory.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-6">
          {/* Category + date meta row */}
          <div className="flex items-center gap-3 mb-4">
            {primaryCategory && typeof primaryCategory === "object" && (
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#f2ca50",
                }}
              >
                {primaryCategory.name}
              </span>
            )}
            {primaryCategory && formattedDate && (
              <div className="h-[1px] w-8" style={{ backgroundColor: "#4d4635" }} />
            )}
            {formattedDate && (
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(229,226,225,0.4)",
                }}
              >
                {formattedDate}
              </span>
            )}
          </div>

          <h3
            className="font-bold leading-snug mb-4 group-hover:text-[#f2ca50] transition-colors"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "1.375rem",
              lineHeight: "1.3",
              color: "#e5e2e1",
            }}
          >
            {post.title}
          </h3>

          {post.excerpt && (
            <p
              className="text-sm leading-relaxed line-clamp-3"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontStyle: "italic",
                color: "rgba(229,226,225,0.5)",
              }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Bottom divider */}
        <div className="mt-5" style={{ borderTop: "1px solid rgba(77,70,53,0.3)" }} />
      </Link>
    </article>
  );
};
