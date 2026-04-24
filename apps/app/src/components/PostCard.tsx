import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Post, Media, Category } from "@/payload-types";

interface PostCardProps {
  post: Post;
  priority?: boolean;
  variant?: "default" | "horizontal";
}

export const PostCard = ({
  post,
  priority = false,
  variant = "default",
}: PostCardProps) => {
  const featuredImage = post.featuredImage as Media | undefined;
  const categories = post.categories as Category[] | undefined;
  const primaryCategory = categories?.[0] as Category | undefined;

  const formattedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const cityHint = primaryCategory?.name ?? "Field Review";

  if (variant === "horizontal") {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="review-card group"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div className="photo" style={{ aspectRatio: "4 / 3" }}>
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              sizes="(max-width: 1024px) 50vw, 40vw"
              quality={80}
              priority={priority}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "var(--color-bg-card)" }} />
          )}
        </div>
        <div>
          <div className="cat">{cityHint}</div>
          <h3 style={{ fontSize: 32 }}>{post.title}</h3>
          {post.excerpt && (
            <div className="blurb" style={{ fontSize: 18 }}>
              {post.excerpt}
            </div>
          )}
          {formattedDate && (
            <div className="meta" style={{ marginTop: 20 }}>
              {formattedDate} · By Brandon Johnson
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="review-card group">
      <div className="photo">
        {featuredImage?.url ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "var(--color-bg-card)" }} />
        )}
      </div>
      <div className="cat">{cityHint}</div>
      <h3>{post.title}</h3>
      {post.excerpt && (
        <p className="blurb" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          &ldquo;{post.excerpt}&rdquo;
        </p>
      )}
      {formattedDate && (
        <div
          className="meta"
          style={{
            marginTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span>{formattedDate}</span>
          <span style={{ color: "var(--color-accent)" }}>Read review →</span>
        </div>
      )}
    </Link>
  );
};
