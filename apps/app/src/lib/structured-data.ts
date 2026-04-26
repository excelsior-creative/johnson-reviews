import type { Media, Post, Category } from "@/payload-types";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "./metadata";

/**
 * Brandon Johnson — Person schema (E-E-A-T signal)
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#author`,
    name: "Brandon Johnson",
    url: `${SITE_URL}/about`,
    jobTitle: "Google Local Guide Level 10",
    description:
      "Family travel and restaurant reviewer with 500+ published reviews and 27,000+ original photos on Google Maps.",
    sameAs: [
      "https://maps.google.com/localguides/profile",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Orange County",
      addressRegion: "CA",
      addressCountry: "US",
    },
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
    founder: { "@id": `${SITE_URL}/#author` },
    description: DEFAULT_DESCRIPTION,
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
 * Generate Article schema — uses Person author for E-E-A-T
 */
export function generateArticleSchema(article: Post) {
  const featuredImage = article.featuredImage as Media | undefined;
  const imageUrl = featuredImage?.url
    ? featuredImage.url.startsWith("http")
      ? featuredImage.url
      : `${SITE_URL}${featuredImage.url}`
    : "";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@id": `${SITE_URL}/#author`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    datePublished: article.publishedDate,
    dateModified: article.updatedAt,
    image: imageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

/**
 * Generate Restaurant review schema (LocalBusiness + Review).
 * Call this on posts that review a restaurant or local business.
 */
export function generateRestaurantReviewSchema(opts: {
  name: string;
  description?: string;
  address?: { locality?: string; region?: string; country?: string };
  rating?: number;
  ratingMax?: number;
  reviewBody?: string;
  articleUrl: string;
  datePublished?: string;
  image?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: opts.name,
    ...(opts.description && { description: opts.description }),
    ...(opts.image && { image: opts.image }),
  };

  if (opts.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...(opts.address.locality && {
        addressLocality: opts.address.locality,
      }),
      ...(opts.address.region && { addressRegion: opts.address.region }),
      ...(opts.address.country && {
        addressCountry: opts.address.country,
      }),
    };
  }

  if (opts.rating) {
    schema.review = {
      "@type": "Review",
      author: { "@id": `${SITE_URL}/#author` },
      datePublished: opts.datePublished,
      reviewBody: opts.reviewBody ?? opts.description,
      reviewRating: {
        "@type": "Rating",
        ratingValue: opts.rating,
        bestRating: opts.ratingMax ?? 10,
        worstRating: 1,
      },
      url: opts.articleUrl,
    };
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate combined global schema for every page
 */
export function generateGlobalSchema() {
  return combineSchemas(
    generatePersonSchema(),
    generateOrganizationSchema(),
    generateWebSiteSchema(),
  );
}

/**
 * Combine multiple schemas into a single graph
 */
export function combineSchemas(...schemas: (object | null)[]) {
  const validSchemas = schemas.filter(Boolean);
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
