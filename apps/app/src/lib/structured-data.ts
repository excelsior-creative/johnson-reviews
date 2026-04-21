import type { Media, Post } from "@/payload-types";
import {
  AUTHOR_DESCRIPTION,
  AUTHOR_LOCAL_GUIDE_URL,
  AUTHOR_NAME,
  AUTHOR_URL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./metadata";

const PERSON_ID = `${SITE_URL}/#person-brandon`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Brandon — the author of record for every review on the site.
 * Emitted once as a referenced node so Article/Review schemas can point to it.
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    description: AUTHOR_DESCRIPTION,
    jobTitle: "Family travel and restaurant reviewer",
    sameAs: AUTHOR_LOCAL_GUIDE_URL ? [AUTHOR_LOCAL_GUIDE_URL] : undefined,
    knowsAbout: [
      "Family travel",
      "Restaurant reviews",
      "Orange County dining",
      "Hotel reviews",
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
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

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": ORG_ID },
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
 * BlogPosting schema for a long-form review post. Author is the Person
 * (Brandon), not the Organization, so Google sees the human byline.
 */
export function generateArticleSchema(article: Post) {
  const featuredImage = article.featuredImage as Media | undefined;
  const imageUrl = featuredImage?.url
    ? absolutize(featuredImage.url)
    : `${SITE_URL}${"/og-image.jpg"}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt ?? undefined,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    datePublished: article.publishedDate ?? article.createdAt,
    dateModified: article.updatedAt,
    image: imageUrl,
    url: `${SITE_URL}/blog/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Review + about (Restaurant/LocalBusiness/TouristAttraction) pair for a
 * structured Review collection entry. `businessType` picks the about-entity
 * @type — defaults to LocalBusiness.
 */
export function generateReviewSchema(args: {
  slug: string;
  businessName: string;
  rating: number;
  reviewText?: string;
  reviewDate?: string;
  datePublishedISO?: string;
  address?: string;
  imageUrls?: string[];
  businessType?: "Restaurant" | "LocalBusiness" | "TouristAttraction" | "Hotel";
}) {
  const {
    slug,
    businessName,
    rating,
    reviewText,
    datePublishedISO,
    address,
    imageUrls = [],
    businessType = "LocalBusiness",
  } = args;

  const itemId = `${SITE_URL}/reviews/${slug}#item`;
  const reviewId = `${SITE_URL}/reviews/${slug}#review`;

  const absolutizedPhotos = imageUrls.map(absolutize);

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": reviewId,
    url: `${SITE_URL}/reviews/${slug}`,
    itemReviewed: {
      "@type": businessType,
      "@id": itemId,
      name: businessName,
      address: address ?? undefined,
      image: absolutizedPhotos.length ? absolutizedPhotos : undefined,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    reviewBody: reviewText,
    datePublished: datePublishedISO,
    inLanguage: "en-US",
  };
}

/**
 * BreadcrumbList generator — pass ordered segments.
 */
export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Global schema — included on every page. Establishes Person, Organization,
 * and WebSite so all other schemas can reference them by @id.
 */
export function generateGlobalSchema() {
  return combineSchemas(
    generatePersonSchema(),
    generateOrganizationSchema(),
    generateWebSiteSchema()
  );
}

export function combineSchemas(...schemas: (object | null | undefined)[]) {
  const validSchemas = schemas.filter(Boolean) as object[];
  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];

  return {
    "@context": "https://schema.org",
    "@graph": validSchemas.map((schema) => {
      const { "@context": _omit, ...rest } = schema as {
        "@context"?: string;
      };
      return rest;
    }),
  };
}

function absolutize(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${SITE_URL}${url}`;
  return url;
}
