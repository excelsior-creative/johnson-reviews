/**
 * WordPress → Payload CMS Migration Script
 *
 * Migrates all posts, categories, tags, and media from brandonj117.sg-host.com
 * into the Payload CMS instance.
 *
 * Usage:
 *   cd apps/app
 *   DATABASE_URL=<url> BLOB_READ_WRITE_TOKEN=<token> PAYLOAD_SECRET=<secret> tsx scripts/migrate-wp.ts
 *
 * Or with .env:
 *   tsx scripts/migrate-wp.ts
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../src/payload.config";
import slugify from "slugify";

const WP_BASE = "https://brandonj117.sg-host.com";
const WP_API = `${WP_BASE}/wp-json/wp/v2`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  status: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      slug: string;
      mime_type: string;
    }>;
  };
}

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
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

/** Download a URL and return a Buffer */
async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

/** Strip HTML tags, decode entities, normalise whitespace */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Convert WordPress HTML content to a minimal but valid Payload Lexical state.
 * Preserves paragraph boundaries and basic text formatting.
 */
function htmlToLexical(html: string): object {
  // Split into block-level chunks by common WP block tags
  const blocks = html
    .split(/<\/?(p|h[1-6]|li|blockquote|div|br)[^>]*>/gi)
    .map((chunk) => stripHtml(chunk))
    .filter((chunk) => chunk.length > 2);

  const children = blocks.map((text) => ({
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    textFormat: 0,
    textStyle: "",
    children: [
      {
        type: "text",
        format: 0,
        style: "",
        mode: "normal",
        detail: 0,
        text: text.trim(),
        version: 1,
      },
    ],
  }));

  // Always need at least one child
  if (children.length === 0) {
    children.push({
      type: "paragraph",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children: [
        {
          type: "text",
          format: 0,
          style: "",
          mode: "normal",
          detail: 0,
          text: "",
          version: 1,
        },
      ],
    });
  }

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children,
    },
  };
}

/** Guess mime type from URL extension */
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

/** Safe filename from URL */
function filenameFromUrl(url: string): string {
  return url.split("?")[0].split("/").pop() ?? "image.jpg";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function migrate() {
  console.log("🚀 Starting WordPress → Payload migration\n");

  const payload = await getPayload({ config });

  // ── 1. Get or create admin user ──────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? "b@exct.io";
  const existingUsers = await payload.find({
    collection: "users",
    where: { email: { equals: adminEmail } },
    limit: 1,
  });

  let adminUserId: string | number;
  if (existingUsers.docs.length > 0) {
    adminUserId = existingUsers.docs[0].id;
    console.log(`✓ Admin user found: ${adminEmail} (id=${adminUserId})`);
  } else {
    const adminPassword = process.env.ADMIN_PASSWORD ?? "Change-me-123!";
    const user = await payload.create({
      collection: "users",
      data: {
        email: adminEmail,
        password: adminPassword,
        name: "Admin",
        role: "admin",
      },
    });
    adminUserId = user.id;
    console.log(`✓ Created admin user: ${adminEmail} (id=${adminUserId})`);
  }

  // ── 2. Fetch WP categories ───────────────────────────────────────────────
  console.log("\n📁 Migrating categories...");
  const wpCategories = await fetchJSON<WPTerm[]>(
    `${WP_API}/categories?per_page=100`
  );
  const categoryIdMap: Record<number, string | number> = {}; // WP id → Payload id

  for (const wpCat of wpCategories) {
    if (wpCat.slug === "uncategorized") continue; // skip uncategorized

    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: wpCat.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      categoryIdMap[wpCat.id] = existing.docs[0].id;
      console.log(`  ↻ Skipped (exists): ${wpCat.name}`);
    } else {
      const cat = await payload.create({
        collection: "categories",
        data: { name: wpCat.name, slug: wpCat.slug },
      });
      categoryIdMap[wpCat.id] = cat.id;
      console.log(`  ✓ Created: ${wpCat.name}`);
    }
  }

  // ── 3. Fetch WP tags ─────────────────────────────────────────────────────
  console.log("\n🏷️  Migrating tags...");
  const wpTags = await fetchJSON<WPTerm[]>(`${WP_API}/tags?per_page=100`);
  const tagIdMap: Record<number, string | number> = {};

  for (const wpTag of wpTags) {
    const existing = await payload.find({
      collection: "tags",
      where: { slug: { equals: wpTag.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      tagIdMap[wpTag.id] = existing.docs[0].id;
    } else {
      const tag = await payload.create({
        collection: "tags",
        data: {
          name: wpTag.name,
          slug: wpTag.slug,
        },
      });
      tagIdMap[wpTag.id] = tag.id;
    }
  }
  console.log(`  ✓ ${wpTags.length} tags ready`);

  // ── 4. Fetch all WP posts ─────────────────────────────────────────────────
  console.log("\n📄 Fetching all posts from WordPress...");
  const wpPosts = await fetchJSON<WPPost[]>(
    `${WP_API}/posts?per_page=100&_embed=1&status=publish`
  );
  console.log(`  Found ${wpPosts.length} posts\n`);

  // ── 5. Migrate each post ──────────────────────────────────────────────────
  console.log("📝 Migrating posts...");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const wp of wpPosts) {
    const title = stripHtml(wp.title.rendered);
    const slug = wp.slug;

    // Check for duplicates
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      console.log(`  ↻ Skipped (exists): ${title}`);
      skipped++;
      continue;
    }

    try {
      // ── Featured image ──────────────────────────────────────────────────
      let featuredImageId: string | number | undefined;

      const featuredMedia = wp._embedded?.["wp:featuredmedia"]?.[0];
      if (featuredMedia?.source_url) {
        try {
          const imgUrl = featuredMedia.source_url;
          const imgBuffer = await downloadBuffer(imgUrl);
          const imgFilename = filenameFromUrl(imgUrl);
          const imgMime = featuredMedia.mime_type ?? mimeFromUrl(imgUrl);

          const media = await payload.create({
            collection: "media",
            data: {
              alt: title,
            },
            file: {
              data: imgBuffer,
              mimetype: imgMime,
              name: imgFilename,
              size: imgBuffer.length,
            },
          });
          featuredImageId = media.id;
        } catch (imgErr) {
          console.warn(`    ⚠ Could not download featured image: ${(imgErr as Error).message}`);
        }
      }

      // ── Map categories / tags ──────────────────────────────────────────
      const payloadCategoryIds = wp.categories
        .map((id) => categoryIdMap[id])
        .filter(Boolean);

      const payloadTagIds = wp.tags
        .map((id) => tagIdMap[id])
        .filter(Boolean);

      // ── Convert content ────────────────────────────────────────────────
      const lexicalContent = htmlToLexical(wp.content.rendered);
      const excerptText = stripHtml(wp.excerpt.rendered);

      // ── Create post ────────────────────────────────────────────────────
      await payload.create({
        collection: "posts",
        data: {
          title,
          slug,
          content: lexicalContent,
          excerpt: excerptText,
          ...(featuredImageId ? { featuredImage: featuredImageId } : {}),
          author: adminUserId,
          categories: payloadCategoryIds as (string | number)[],
          tags: payloadTagIds as (string | number)[],
          publishedDate: wp.date,
          _status: "published",
        },
      });

      console.log(`  ✓ [${++created}/${wpPosts.length}] ${title}`);
    } catch (err) {
      console.error(`  ✗ FAILED: ${title} — ${(err as Error).message}`);
      errors++;
    }
  }

  // ── 6. Summary ────────────────────────────────────────────────────────────
  console.log("\n" + "─".repeat(60));
  console.log("✅ Migration complete!");
  console.log(`   Created : ${created}`);
  console.log(`   Skipped : ${skipped} (already existed)`);
  console.log(`   Errors  : ${errors}`);
  console.log("─".repeat(60));

  process.exit(0);
}

migrate().catch((err) => {
  console.error("💥 Fatal error:", err);
  process.exit(1);
});
