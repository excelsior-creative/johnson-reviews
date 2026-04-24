import type { Media, Post } from "@/payload-types";
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  AUTHOR_SAME_AS,
  AUTHOR_URL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./metadata";

/**
 * Stable @id anchors for the site knowledge graph.
 */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const AUTHOR_ID = `${SITE_URL}/#brandon`;

/**
 * Person schema for Brandon — the primary E-E-A-T signal for the site.
 * Attached as author on every post/review.
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    jobTitle: AUTHOR_JOB_TITLE,
    description:
      "Brandon Johnson — Google Local Guide Level 10 with 500+ reviews and 27,000+ contributed photos. Family traveler and restaurant reviewer based in Orange County, California.",
    knowsAbout: [
      "Family travel",
      "Restaurant reviews",
      "Orange County dining",
      "Southern California travel",
      "Las Vegas travel",
      "Family-friendly hotels",
      "Disneyland",
    ],
    sameAs: AUTHOR_SAME_AS,
    worksFor: { "@id": ORG_ID },
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
    founder: { "@id": AUTHOR_ID },
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
 * Article (BlogPosting) schema for a Post. Uses Brandon as Person author
 * (E-E-A-T). Publisher is the Organization.
 */
export function generateArticleSchema(article: Post) {
  const featuredImage = article.featuredImage as Media | undefined;
  const imageUrl = absoluteUrl(featuredImage?.url ?? undefined);
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt ?? undefined,
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": ORG_ID },
    datePublished: article.publishedDate ?? article.createdAt,
    dateModified: article.updatedAt,
    image: imageUrl,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };
}

/**
 * BreadcrumbList helper.
 *
 * items: ordered list of { name, url (absolute or site-relative) }.
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
      item: absoluteUrl(item.url),
    })),
  };
}

/**
 * Map a free-form category label to a Schema.org place type.
 * Defaults to LocalBusiness.
 */
export function categoryToSchemaType(
  category?: string | null,
): "Restaurant" | "LodgingBusiness" | "TouristAttraction" | "LocalBusiness" {
  if (!category) return "LocalBusiness";
  const c = category.toLowerCase();
  if (/restaurant|cafe|café|coffee|pizza|sushi|bar|grill|dining|bakery|brew/.test(c))
    return "Restaurant";
  if (/hotel|resort|motel|lodging|inn|stay|suites?/.test(c)) return "LodgingBusiness";
  if (/park|attraction|museum|zoo|aquarium|theme|tour|beach|golf/.test(c))
    return "TouristAttraction";
  return "LocalBusiness";
}

/**
 * Review schema for a Reviews-collection document (or any {businessName,
 * rating, address, category}-shaped object). Rating is normalized to a
 * 10-point scale on the page, so we pass through the normalized value.
 *
 * `ratingValue` is the 0–10 public score; `bestRating` is 10.
 */
export function generateReviewSchema(args: {
  businessName: string;
  slug: string;
  pathPrefix?: string;
  category?: string | null;
  address?: string | null;
  ratingValue: number;
  bestRating?: number;
  reviewBody?: string | null;
  reviewDate?: string | null;
  imageUrl?: string | null;
}) {
  const {
    businessName,
    slug,
    pathPrefix = "/reviews",
    category,
    address,
    ratingValue,
    bestRating = 10,
    reviewBody,
    reviewDate,
    imageUrl,
  } = args;

  const itemType = categoryToSchemaType(category);
  const pageUrl = `${SITE_URL}${pathPrefix}/${slug}`;
  const img = absoluteUrl(imageUrl ?? undefined);

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    url: pageUrl,
    itemReviewed: {
      "@type": itemType,
      name: businessName,
      address: address ?? undefined,
      image: img,
      url: pageUrl,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating,
      worstRating: 0,
    },
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": ORG_ID },
    reviewBody: reviewBody ?? undefined,
    datePublished: reviewDate ?? undefined,
  };
}

/**
 * Combined schema used in the site-wide <head>: Organization + WebSite + Person.
 */
export function generateGlobalSchema() {
  return combineSchemas(
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generatePersonSchema(),
  );
}

/**
 * Combine multiple schemas into a single @graph.
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
