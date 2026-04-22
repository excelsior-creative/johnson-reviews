import type { Category, Media, Post } from "@/payload-types";
import {
  AUTHOR_LOCATION,
  AUTHOR_NAME,
  AUTHOR_TITLE,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./metadata";

const PERSON_ID = `${SITE_URL}/#brandon`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Brandon Johnson — author identity used across Article and Review schemas.
 * Signals E-E-A-T: he's a real person, a Level 10 Google Local Guide, based
 * in Orange County, with a public reviewer profile on Google Maps.
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR_NAME,
    jobTitle: AUTHOR_TITLE,
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/brandon.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orange County",
      addressRegion: "CA",
      addressCountry: "US",
    },
    homeLocation: AUTHOR_LOCATION,
    knowsAbout: [
      "restaurant reviews",
      "family travel",
      "Orange County dining",
      "Las Vegas travel",
      "Disneyland",
      "hotels",
    ],
    sameAs: [
      "https://maps.google.com/maps/contrib/113321871517390024887",
    ],
  };
}

/**
 * Organization schema for Johnson Reviews as a publisher.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 512,
      height: 512,
    },
    description: DEFAULT_DESCRIPTION,
    founder: { "@id": PERSON_ID },
  };
}

/**
 * WebSite schema with SearchAction.
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": ORGANIZATION_ID },
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
 * Given a post's categories, return the best-fit schema.org @type for the
 * thing being reviewed. Default to "Place" — the most generic reviewable
 * entity — rather than faking a Restaurant without address/telephone data.
 */
function itemReviewedTypeFromCategories(categories: Category[] | undefined):
  | "Restaurant"
  | "LodgingBusiness"
  | "TouristAttraction"
  | "LocalBusiness"
  | "Place" {
  if (!categories?.length) return "Place";
  const slugs = categories
    .map((c) => (typeof c === "object" ? c.slug?.toLowerCase() : ""))
    .filter(Boolean);
  if (slugs.some((s) => /restaurant|dining|cafe|bar|pizza|food/.test(s))) {
    return "Restaurant";
  }
  if (slugs.some((s) => /hotel|resort|lodging|stay/.test(s))) {
    return "LodgingBusiness";
  }
  if (slugs.some((s) => /attraction|park|theme|entertainment|museum/.test(s))) {
    return "TouristAttraction";
  }
  if (slugs.some((s) => /shop|retail|store/.test(s))) {
    return "LocalBusiness";
  }
  return "Place";
}

/**
 * Article schema for a post. Uses Person (Brandon) as the author so Google
 * can attribute expertise to a real reviewer, and Organization as publisher.
 */
export function generateArticleSchema(post: Post) {
  const featuredImage = post.featuredImage as Media | undefined;
  const imageUrl = featuredImage?.url ? `${SITE_URL}${featuredImage.url}` : "";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    image: imageUrl || undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Review schema for a post that reviews a specific place. Optional — only
 * emit when we actually know enough to describe the reviewed entity (name
 * + excerpt minimum). Rating is intentionally optional; we'll backfill once
 * Posts carry a structured rating field.
 */
export function generateReviewSchema(post: Post, itemName?: string) {
  const name = itemName?.trim();
  if (!name) return null;

  const categories = (post.categories as Category[] | undefined) || [];
  const itemType = itemReviewedTypeFromCategories(categories);

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${SITE_URL}/blog/${post.slug}#review`,
    itemReviewed: {
      "@type": itemType,
      name,
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    datePublished: post.publishedDate,
    reviewBody: post.excerpt || undefined,
    url: `${SITE_URL}/blog/${post.slug}`,
  };
}

/**
 * Combined global schema emitted on every page.
 */
export function generateGlobalSchema() {
  return combineSchemas(
    generatePersonSchema(),
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  );
}

/**
 * Combine multiple schemas into a single @graph. Accepts nullables so
 * callers can conditionally include schemas (e.g. review when it exists).
 */
export function combineSchemas(...schemas: (object | null | undefined)[]) {
  const validSchemas = schemas.filter(Boolean) as object[];
  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];

  return {
    "@context": "https://schema.org",
    "@graph": validSchemas.map((schema) => {
      const { "@context": _ctx, ...rest } = schema as { "@context"?: string };
      return rest;
    }),
  };
}
