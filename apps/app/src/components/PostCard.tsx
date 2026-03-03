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
    <article className="group bg-[#191A1B] overflow-hidden">
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
            <div className="absolute inset-0 bg-[#2a2b2c] flex items-center justify-center">
              <span className="text-white/30 text-sm">No image</span>
            </div>
          )}
          {/* Category badge */}
          {primaryCategory && typeof primaryCategory === 'object' && (
            <div
              className="absolute top-0 left-0 bg-[#191A1B] text-white text-[10px] font-bold uppercase tracking-[2px] px-3 py-1.5"
              style={{ fontFamily: '"Jost", sans-serif' }}
            >
              {primaryCategory.name}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="pt-5 pb-0">
          <h3
            className="text-white font-medium leading-snug mb-5 group-hover:text-[#DB7D2D] transition-colors"
            style={{
              fontFamily: '"Oswald", sans-serif',
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "1.4",
            }}
          >
            {post.title}
          </h3>

          {post.excerpt && (
            <p
              className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3"
              style={{ fontFamily: '"Jost", sans-serif' }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="pt-3 border-t border-[#E7E7E7]/10">
          {formattedDate && (
            <span
              className="text-[#DB7D2D] text-xs font-bold uppercase"
              style={{ fontFamily: '"Unna", serif' }}
            >
              {formattedDate}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
};
