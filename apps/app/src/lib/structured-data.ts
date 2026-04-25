import type { Category, Media, Post, Tag } from "@/payload-types";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./metadata";

const AUTHOR_ID = `${SITE_URL}/about#brandon`;
const AUTHOR_NAME = "Brandon Johnson";
const AUTHOR_DESCRIPTION =
  "Family travel + restaurant reviewer based in Orange County, California. Google Local Guide Level 10 with 500+ reviews and 27,000+ photos.";
const AUTHOR_URL = `${SITE_URL}/about`;

/**
 * Generate Person schema for Brandon — referenced by Article + Review schema.
 * Single source of truth for author E-E-A-T signal.
 */
export function generateAuthorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    description: AUTHOR_DESCRIPTION,
    knowsAbout: [
      "Family travel",
      "Restaurant reviews",
      "Orange County dining",
      "Theme park travel",
      "Hotel reviews",
    ],
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
    },
    description: DEFAULT_DESCRIPTION,
    founder: { "@id": AUTHOR_ID },
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

/**
 * Generate Article schema for a Post
 */
export function generateArticleSchema(article: Post) {
  const featuredImage = article.featuredImage as Media | undefined;
  const imageUrl = absoluteImage(featuredImage?.url);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt ?? undefined,
    author: { "@id": AUTHOR_ID },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    datePublished: article.publishedDate ?? article.createdAt,
    dateModified: article.updatedAt,
    image: imageUrl ? [imageUrl] : undefined,
    keywords: keywordsFor(article),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

/**
 * Generate BreadcrumbList for a post.
 */
export function generateBreadcrumbSchema(article: Post) {
  const categories = (article.categories as Category[]) ?? [];
  const primary = categories[0];
  const items: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }> = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Reviews",
      item: `${SITE_URL}/blog`,
    },
  ];
  if (primary?.slug) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: primary.name,
      item: `${SITE_URL}/blog?category=${primary.slug}`,
    });
  }
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: article.title,
    item: `${SITE_URL}/blog/${article.slug}`,
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Map a Post's primary category to an itemReviewed @type for Review schema.
 * Falls back to LocalBusiness when we can't classify.
 */
type ReviewedType =
  | "Restaurant"
  | "Hotel"
  | "TouristAttraction"
  | "LocalBusiness";

function classifyPost(article: Post): ReviewedType {
  const cats = (article.categories as Category[]) ?? [];
  const tags = (article.tags as Tag[]) ?? [];
  const haystack = [
    ...cats.map((c) => `${c.name} ${c.slug ?? ""}`),
    ...tags.map((t) => `${t.name} ${t.slug ?? ""}`),
    article.title,
  ]
    .join(" ")
    .toLowerCase();

  if (/(restaurant|cafe|café|brunch|dining|food|cuisine|pizz|sushi|grill|bar|kitchen)/i.test(haystack)) {
    return "Restaurant";
  }
  if (/(hotel|resort|motel|inn|stay|lodge|airbnb)/i.test(haystack)) {
    return "Hotel";
  }
  if (/(disneyland|park|attraction|seaworld|museum|cinema|theater|theatre|golf)/i.test(haystack)) {
    return "TouristAttraction";
  }
  return "LocalBusiness";
}

/**
 * Generate Review schema (Restaurant/Hotel/TouristAttraction/LocalBusiness +
 * Review) for a Post that represents a review of a place. Caller passes
 * the rating + business name explicitly via `reviewMeta` when known.
 *
 * If the Post has no explicit rating in `reviewMeta`, no rating is emitted —
 * Google rejects fabricated ratings.
 */
export function generateReviewSchema(
  article: Post,
  reviewMeta?: {
    businessName?: string;
    address?: string;
    rating?: number;
    bestRating?: number;
    visitDate?: string;
  },
) {
  const itemType = classifyPost(article);
  const featuredImage = article.featuredImage as Media | undefined;
  const imageUrl = absoluteImage(featuredImage?.url);

  const itemReviewed: Record<string, unknown> = {
    "@type": itemType,
    name: reviewMeta?.businessName ?? article.title,
  };
  if (reviewMeta?.address) {
    itemReviewed.address = reviewMeta.address;
  }
  if (imageUrl) {
    itemReviewed.image = imageUrl;
  }

  const review: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed,
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": `${SITE_URL}/#organization` },
    name: article.title,
    headline: article.title,
    reviewBody: article.excerpt ?? undefined,
    datePublished: article.publishedDate ?? article.createdAt,
    url: `${SITE_URL}/blog/${article.slug}`,
  };

  if (typeof reviewMeta?.rating === "number") {
    review.reviewRating = {
      "@type": "Rating",
      ratingValue: reviewMeta.rating,
      bestRating: reviewMeta.bestRating ?? 10,
      worstRating: 1,
    };
  }

  return review;
}

/**
 * Generate combined global schema for every page
 */
export function generateGlobalSchema() {
  return combineSchemas(
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateAuthorSchema(),
  );
}

/**
 * Combine multiple schemas into a single graph
 */
export function combineSchemas(...schemas: (object | null | undefined)[]) {
  const validSchemas = schemas.filter(
    (s): s is object => s !== null && s !== undefined,
  );
  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];

  return {
    "@context": "https://schema.org",
    "@graph": validSchemas.map((schema) => {
      const { "@context": _, ...rest } = schema as { "@context"?: string };
      return rest;
    }),
  };
}

function absoluteImage(url: string | null | undefined) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url}`;
}

function keywordsFor(article: Post): string | undefined {
  const cats = (article.categories as Category[]) ?? [];
  const tags = (article.tags as Tag[]) ?? [];
  const all = [
    ...cats.map((c) => c.name),
    ...tags.map((t) => t.name),
  ].filter(Boolean);
  return all.length ? all.join(", ") : undefined;
}
