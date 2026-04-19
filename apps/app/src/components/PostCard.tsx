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
    <article
      className="group cursor-pointer h-full flex flex-col"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      <Link href={`/blog/${post.slug}`} className="h-full flex flex-col">
        {/* Thumbnail — grayscale to full color on hover */}
        <div className="relative overflow-hidden h-[280px] md:h-[320px]">
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              priority={priority}
              className="object-cover transition-all duration-700 [filter:grayscale(100%)] group-hover:[filter:grayscale(0%)] group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "#20201f" }}
            />
          )}
          {/* Subtle scrim */}
          <div
            className="absolute inset-0 transition-colors"
            style={{ background: "rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4 gap-4">
            <div>
              {primaryCategory && typeof primaryCategory === "object" && (
                <span
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#99907c",
                  }}
                >
                  {primaryCategory.name}
                </span>
              )}
              <h3
                className="font-bold leading-snug mt-2 group-hover:text-[#f2ca50] transition-colors"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1.25rem",
                  lineHeight: "1.3",
                  color: "#e5e2e1",
                }}
              >
                {post.title}
              </h3>
            </div>
          </div>

          {post.excerpt && (
            <p
              className="italic line-clamp-3 mb-6"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "0.875rem",
                color: "#d3c5ad",
                lineHeight: "1.7",
              }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Bottom meta */}
          {formattedDate && (
            <div className="mt-auto pt-4 flex items-center gap-3">
              <div
                className="h-[1px] w-8"
                style={{ backgroundColor: "#4d4635" }}
              />
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(229,226,225,0.4)",
                }}
              >
                {formattedDate}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};
