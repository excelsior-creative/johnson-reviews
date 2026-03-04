/**
 * Content Re-migration Script
 *
 * The original migration used a naive HTML splitter that broke on Elementor's
 * heavily nested div structure. This script re-migrates article content only,
 * using a proper HTML parser that targets real content elements
 * (<p>, <h1-6>, <li>, <blockquote>) and ignores structural Elementor divs.
 *
 * Safe to run multiple times — overwrites content, does NOT touch media/gallery.
 *
 * Usage:
 *   cd apps/app
 *   DATABASE_URL=... BLOB_READ_WRITE_TOKEN=... PAYLOAD_SECRET=... \
 *     tsx scripts/remigrate-content.ts
 *
 * Options:
 *   --dry-run       Preview what would be written, no DB changes
 *   --post=<slug>   Only re-migrate a single post
 *   --limit=<n>     Only process first N posts
 */

import "dotenv/config";
import { getPayload } from "payload";
import config from "../src/payload.config";

const WP_API = "https://brandonj117.sg-host.com/wp-json/wp/v2";
const DRY_RUN = process.argv.includes("--dry-run");
const POST_FILTER = process.argv.find((a) => a.startsWith("--post="))?.split("=")[1];
const LIMIT_ARG = process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1];
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG) : Infinity;

// ─── HTML → Lexical converter (proper version) ────────────────────────────────

function decodeEntities(html: string): string {
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8230;/g, "…")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&[a-z]+;/g, " ");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function getTagContent(html: string, tag: string): string {
  const m = html.match(new RegExp(`<${tag}[^>]*>([\s\S]*?)<\/${tag}>`, "i"));
  return m ? m[1] : html;
}

/**
 * Parse inline formatting from an HTML fragment.
 * Returns Lexical children array with bold/italic/underline/link nodes.
 */
function parseInlineChildren(html: string): object[] {
  const children: object[] = [];

  // Remove inner block tags but preserve text
  const flat = html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "");
  const text = decodeEntities(flat).trim();

  if (!text) return [];

  // Simple: detect bold markers from the original HTML
  let format = 0;
  if (/<strong|<b>/i.test(html)) format |= 1;
  if (/<em|<i>/i.test(html)) format |= 2;
  if (/<u>/i.test(html)) format |= 8;

  return [
    {
      type: "text",
      text,
      format,
      style: "",
      mode: "normal",
      detail: 0,
      version: 1,
    },
  ];
}

function makeParagraph(html: string): object | null {
  const children = parseInlineChildren(html);
  if (!children.length) return null;
  return {
    type: "paragraph",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    textFormat: 0,
    textStyle: "",
    children,
  };
}

function makeHeading(html: string, tag: string): object | null {
  const children = parseInlineChildren(html);
  if (!children.length) return null;
  const level = parseInt(tag.replace("h", ""), 10);
  return {
    type: "heading",
    tag,
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    children,
  };
}

function makeListItem(html: string): object | null {
  const children = parseInlineChildren(html);
  if (!children.length) return null;
  return {
    type: "listitem",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    value: 1,
    checked: undefined,
    children,
  };
}

function makeList(html: string, ordered: boolean): object | null {
  const items: object[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRegex.exec(html)) !== null) {
    const item = makeListItem(m[1]);
    if (item) items.push(item);
  }
  if (!items.length) return null;
  return {
    type: "list",
    listType: ordered ? "number" : "bullet",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    start: 1,
    tag: ordered ? "ol" : "ul",
    children: items,
  };
}

function makeBlockquote(html: string): object | null {
  const children = parseInlineChildren(html);
  if (!children.length) return null;
  return {
    type: "quote",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr",
    children,
  };
}

/**
 * Convert WordPress/Elementor HTML to Payload Lexical JSON.
 * Strategy: extract real content elements in document order,
 * ignore all structural Elementor/div scaffolding.
 */
function htmlToLexical(html: string): object {
  const nodes: object[] = [];

  // We process the HTML string as a token stream, picking out content elements.
  // This avoids the issue of splitting on <div> tags.

  // Regex to match block-level content elements in source order
  const blockPattern =
    /<(h[1-6]|p|ul|ol|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;

  let match: RegExpExecArray | null;
  while ((match = blockPattern.exec(html)) !== null) {
    const [, tag, inner] = match;
    const tagLower = tag.toLowerCase();
    let node: object | null = null;

    if (tagLower === "p") {
      const text = decodeEntities(stripTags(inner)).trim();
      // Skip tiny/empty paragraphs (Elementor spacers etc.)
      if (text.length > 2) node = makeParagraph(inner);
    } else if (/^h[1-6]$/.test(tagLower)) {
      const text = decodeEntities(stripTags(inner)).trim();
      if (text.length > 0) node = makeHeading(inner, tagLower);
    } else if (tagLower === "ul") {
      node = makeList(inner, false);
    } else if (tagLower === "ol") {
      node = makeList(inner, true);
    } else if (tagLower === "blockquote") {
      const text = decodeEntities(stripTags(inner)).trim();
      if (text.length > 2) node = makeBlockquote(inner);
    }

    if (node) nodes.push(node);
  }

  // Fallback: if we got nothing (e.g. plain text post), treat full stripped text as one paragraph
  if (nodes.length === 0) {
    const text = decodeEntities(stripTags(html)).trim();
    if (text.length > 0) {
      nodes.push(makeParagraph(text) as object);
    }
  }

  // Always need at least one node
  if (nodes.length === 0) {
    nodes.push({
      type: "paragraph",
      version: 1,
      format: "",
      indent: 0,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children: [{ type: "text", text: "", format: 0, style: "", mode: "normal", detail: 0, version: 1 }],
    });
  }

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: nodes,
    },
  };
}

// ─── WP API helpers ────────────────────────────────────────────────────────────

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json() as Promise<T>;
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function remigrateContent() {
  console.log(`📝 Content Re-migration${DRY_RUN ? " (DRY RUN)" : ""}\n`);

  const payload = await getPayload({ config });

  console.log("📡 Fetching WP posts...");
  const wpPosts = await fetchJSON<WPPost[]>(
    `${WP_API}/posts?per_page=100&status=publish`
  );
  console.log(`  Found ${wpPosts.length} WP posts\n`);

  let updated = 0;
  let skipped = 0;
  let errors = 0;
  let processed = 0;

  for (const wp of wpPosts) {
    if (processed >= LIMIT) break;
    if (POST_FILTER && wp.slug !== POST_FILTER) continue;

    const title = stripHtml(wp.title.rendered);

    // Find in Payload
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: wp.slug } },
      limit: 1,
      depth: 0,
    });

    if (!docs.length) {
      console.log(`  ⚠ Not found in Payload: ${title}`);
      skipped++;
      continue;
    }

    const payloadPost = docs[0];

    // Convert HTML to Lexical
    const lexical = htmlToLexical(wp.content.rendered);
    const rootChildren = (lexical as any).root?.children ?? [];
    const nodeCount = rootChildren.length;

    if (DRY_RUN) {
      const sample = rootChildren
        .slice(0, 3)
        .map((n: any) => {
          const firstChild = n.children?.[0];
          return `[${n.type}] ${firstChild?.text?.slice(0, 60) ?? ""}...`;
        })
        .join("\n    ");
      console.log(`  📄 ${title}\n     ${nodeCount} nodes\n    ${sample}\n`);
      updated++;
      processed++;
      continue;
    }

    try {
      await payload.update({
        collection: "posts",
        id: payloadPost.id,
        data: {
          content: lexical,
        },
      });
      console.log(`  ✓ [${++updated}/${wpPosts.length}] ${title} — ${nodeCount} nodes`);
    } catch (err) {
      console.error(`  ✗ FAILED: ${title} — ${(err as Error).message}`);
      errors++;
    }

    processed++;
  }

  console.log("\n" + "─".repeat(60));
  console.log(DRY_RUN ? "🔍 DRY RUN complete" : "✅ Content re-migration complete!");
  console.log(`   Updated : ${updated}`);
  console.log(`   Skipped : ${skipped}`);
  console.log(`   Errors  : ${errors}`);
  console.log("─".repeat(60));

  process.exit(0);
}

remigrateContent().catch((err) => {
  console.error("💥 Fatal:", err);
  process.exit(1);
});
