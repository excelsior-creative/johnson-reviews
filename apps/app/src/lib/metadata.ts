import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://johnsonreviews.com";
export const SITE_NAME = "Johnson Reviews";
export const SITE_TAGLINE = "Real visits. Honest reviews.";
export const DEFAULT_DESCRIPTION =
  "Brandon Johnson — Google Local Guide Level 10, 500+ reviews — and his family write honest, specific reviews of the restaurants, hotels, and places they actually visit. Based in Orange County, California.";

export const AUTHOR_NAME = "Brandon Johnson";
export const AUTHOR_DESCRIPTION =
  "Brandon Johnson is a family traveler and restaurant reviewer based in Orange County, California. He's a Google Local Guide (Level 10) with 500+ reviews and 27,000+ photos contributed, writing long-form reviews of the places the Johnson family actually visits.";
export const AUTHOR_URL = `${SITE_URL}/about`;
// Brandon's public Google Local Guide profile. Overridable via env so the
// real URL can be supplied without committing it here until Brandon confirms.
export const AUTHOR_LOCAL_GUIDE_URL =
  process.env.NEXT_PUBLIC_LOCAL_GUIDE_URL || "";

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

/**
 * Default metadata for the entire site
 */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "family travel blog",
    "restaurant reviews",
    "Orange County restaurants",
    "Google Local Guide",
    "Dana Point",
    "Irvine restaurants",
    "Las Vegas family travel",
    "Disneyland family reviews",
    "honest restaurant reviews",
    "kid-friendly restaurants",
  ],
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords || (defaultMetadata.keywords as string[]),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

/**
 * Generate article-specific metadata
 */
export function generateArticleMetadata({
  title,
  description,
  slug,
  ogImage,
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  slug: string;
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}/blog/${slug}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords || undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: author ? [author] : [AUTHOR_NAME],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}

