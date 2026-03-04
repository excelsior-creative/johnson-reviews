/**
 * WordPress Gallery Migration Script
 *
 * Fetches post attachments (gallery images) from the WordPress site
 * and populates the `gallery` field on existing Payload posts.
 *
 * WordPress stores Elementor gallery images as post attachments
 * (media with parent = post_id, excluding the featured image).
 *
 * Usage:
 *   cd apps/app
 *   DATABASE_URL=<url> BLOB_READ_WRITE_TOKEN=<token> PAYLOAD_SECRET=<secret> \
 *     tsx scripts/migrate-galleries.ts
 *
 * Options:
 *   --dry-run   Print what would be migrated without making changes
 *   --post=<slug>  Only migrate a specific post (by slug)
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { Post, Media } from "../src/payload-types";

const WP_BASE = "https://brandonj117.sg-host.com";
const WP_API = `${WP_BASE}/wp-json/wp/v2`;

const DRY_RUN = process.argv.includes("--dry-run");
const POST_FILTER = process.argv.find((a) => a.startsWith("--post="))?.split("=")[1];

// ─── Types ────────────────────────────────────────────────────────────────────

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  featured_media: number;
}

interface WPMedia {
  id: number;
  source_url: string;
  slug: string;
  mime_type: string;
  alt_text?: string;
  caption?: { rendered: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json() as Promise<T>;
}

async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function filenameFromUrl(url: string): string {
  return url.split("?")[0].split("/").pop() ?? "image.jpg";
}

function mimeFromUrl(url: string): string {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };
  return map[ext] ?? "image/jpeg";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function migrateGalleries() {
  console.log(`🖼️  WordPress Gallery Migration${DRY_RUN ? " (DRY RUN)" : ""}\n`);

  const payload = await getPayload({ config });

  // Fetch all WP posts (we need WP post IDs to fetch their attachments)
  console.log("📡 Fetching WP post list...");
  const wpPosts = await fetchJSON<WPPost[]>(
    `${WP_API}/posts?per_page=100&status=publish`
  );
  console.log(`  Found ${wpPosts.length} WP posts\n`);

  let totalGalleryImages = 0;
  let postsWithGalleries = 0;
  let postsSkipped = 0;
  let errors = 0;

  for (const wpPost of wpPosts) {
    const slug = wpPost.slug;
    const title = stripHtml(wpPost.title.rendered);

    // Optional single-post filter
    if (POST_FILTER && slug !== POST_FILTER) continue;

    // Find the corresponding Payload post
    const { docs: payloadPosts } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    if (payloadPosts.length === 0) {
      console.log(`  ⚠ Post not found in Payload: ${title} (${slug})`);
      postsSkipped++;
      continue;
    }

    const payloadPost = payloadPosts[0] as Post;

    // Skip if gallery already populated
    const existingGallery = payloadPost.gallery;
    if (existingGallery && existingGallery.length > 0) {
      console.log(`  ↻ Skipped (gallery exists): ${title} — ${existingGallery.length} images`);
      postsSkipped++;
      continue;
    }

    // Fetch WP attachments for this post (these are the gallery images)
    let attachments: WPMedia[];
    try {
      attachments = await fetchJSON<WPMedia[]>(
        `${WP_API}/media?parent=${wpPost.id}&per_page=100`
      );
    } catch (err) {
      console.error(`  ✗ Failed to fetch attachments for ${title}: ${(err as Error).message}`);
      errors++;
      continue;
    }

    // Exclude the featured image from the gallery
    const galleryAttachments = attachments.filter(
      (a) => a.id !== wpPost.featured_media
    );

    if (galleryAttachments.length === 0) {
      // No gallery images beyond the featured image
      continue;
    }

    console.log(`\n  📸 ${title}`);
    console.log(`     ${galleryAttachments.length} gallery images found`);

    if (DRY_RUN) {
      for (const a of galleryAttachments) {
        console.log(`     → ${a.source_url}`);
      }
      totalGalleryImages += galleryAttachments.length;
      postsWithGalleries++;
      continue;
    }

    // Download and upload each gallery image to Payload media
    const galleryItems: { image: number; caption?: string }[] = [];

    for (const attachment of galleryAttachments) {
      try {
        // Check if this media already exists (by filename)
        const filename = filenameFromUrl(attachment.source_url);
        const existing = await payload.find({
          collection: "media",
          where: { filename: { equals: filename } },
          limit: 1,
        });

        let mediaId: string | number;

        if (existing.docs.length > 0) {
          mediaId = (existing.docs[0] as Media).id;
          console.log(`     ↻ Reusing: ${filename}`);
        } else {
          // Download and upload
          const buffer = await downloadBuffer(attachment.source_url);
          const mime = attachment.mime_type ?? mimeFromUrl(attachment.source_url);

          const media = await payload.create({
            collection: "media",
            data: {
              alt: attachment.alt_text || title,
            },
            file: {
              data: buffer,
              mimetype: mime,
              name: filename,
              size: buffer.length,
            },
          });

          mediaId = media.id;
          console.log(`     ✓ Uploaded: ${filename}`);
        }

        const captionText = attachment.caption?.rendered
          ? stripHtml(attachment.caption.rendered)
          : undefined;

        galleryItems.push({
          image: mediaId as number,
          ...(captionText ? { caption: captionText } : {}),
        });
      } catch (imgErr) {
        console.warn(`     ⚠ Failed: ${attachment.source_url} — ${(imgErr as Error).message}`);
      }
    }

    if (galleryItems.length === 0) {
      console.log(`     ⚠ No gallery items uploaded for ${title}`);
      continue;
    }

    // Update the Payload post with the gallery
    try {
      await payload.update({
        collection: "posts",
        id: payloadPost.id,
        data: {
          gallery: galleryItems,
        },
      });

      console.log(`     ✅ Gallery saved: ${galleryItems.length} images`);
      totalGalleryImages += galleryItems.length;
      postsWithGalleries++;
    } catch (updateErr) {
      console.error(`     ✗ Failed to update post: ${(updateErr as Error).message}`);
      errors++;
    }
  }

  // ── Summary ─────────────────────────────────────────────────────────────
  console.log("\n" + "─".repeat(60));
  console.log(DRY_RUN ? "🔍 DRY RUN complete (no changes made)" : "✅ Gallery migration complete!");
  console.log(`   Posts with galleries : ${postsWithGalleries}`);
  console.log(`   Total gallery images : ${totalGalleryImages}`);
  console.log(`   Posts skipped        : ${postsSkipped}`);
  console.log(`   Errors               : ${errors}`);
  console.log("─".repeat(60));

  process.exit(0);
}

migrateGalleries().catch((err) => {
  console.error("💥 Fatal error:", err);
  process.exit(1);
});
