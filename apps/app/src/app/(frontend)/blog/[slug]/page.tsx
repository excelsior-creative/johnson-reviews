import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LexicalContent } from "@/components/LexicalContent";
import Image from "next/image";
import { Media, Post } from "@/payload-types";

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  let post: Post | undefined;

  try {
    const { docs: posts } = await payload.find({
      collection: "posts",
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2, // populate gallery images
    });
    post = posts[0] as Post;
  } catch (error) {
    console.error(`Failed to fetch blog post "${slug}" during page render.`, error);
  }

  if (!post) {
    notFound();
  }

  const featuredImage = post.featuredImage as Media | undefined;

  // Build gallery images array from the gallery field
  const galleryImages =
    post.gallery
      ?.map((item) => {
        const img = typeof item.image === "object" ? (item.image as Media) : undefined;
        if (!img?.url) return null;
        return {
          url: img.url,
          alt: img.alt || post.title,
          caption: item.caption ?? undefined,
          width: img.width ?? undefined,
          height: img.height ?? undefined,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null) ?? [];

  return (
    <article className="py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured image */}
          {featuredImage?.url && (
            <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Post content */}
          <LexicalContent content={post.content} />

          {/* Photo Gallery */}
          {galleryImages.length > 0 && (
            <PhotoGallery
              images={galleryImages as { url: string; alt?: string; caption?: string }[]}
              title="Photo Gallery"
            />
          )}
        </div>
      </Container>
    </article>
  );
}
