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
    <article className="group bg-white overflow-hidden border border-[#CFD6D9]/60 hover:border-[#52A3A9]/40 transition-colors">
      <Link href={`/blog/${post.slug}`}>
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ paddingBottom: "66%" }}>
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-[#F4DDCD]/40 flex items-center justify-center">
              <span className="text-[#6C6864]/40 text-sm">No image</span>
            </div>
          )}
          {/* Category badge */}
          {primaryCategory && typeof primaryCategory === "object" && (
            <div
              className="absolute top-0 left-0 bg-white text-[#6C6864] text-[9px] font-normal uppercase tracking-[0.22em] px-3 py-1.5"
              style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
            >
              {primaryCategory.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-5 pt-5 pb-0">
          <h3
            className="text-[#352F2C] font-normal leading-snug mb-4 group-hover:text-[#52A3A9] transition-colors"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "1.45rem",
              fontWeight: 500,
              lineHeight: "1.35",
            }}
          >
            {post.title}
          </h3>

          {post.excerpt && (
            <p
              className="text-[#6C6864] text-sm leading-relaxed mb-4 line-clamp-3"
              style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 300 }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="px-5 pb-5 pt-3 border-t border-[#CFD6D9]/60 flex items-center justify-between">
          {formattedDate && (
            <span
              className="text-[#D5C17A] text-[10px] uppercase tracking-[0.18em]"
              style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
            >
              {formattedDate}
            </span>
          )}
          <span
            className="text-[#52A3A9] text-[10px] uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            Read →
          </span>
        </div>
      </Link>
    </article>
  );
};
