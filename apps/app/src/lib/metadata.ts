import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "https://johnsonreviews.com";
export const SITE_NAME = "Johnson Reviews";
export const SITE_TAGLINE = "Honest reviews from a family that travels.";
export const DEFAULT_DESCRIPTION =
  "Family travel and restaurant reviews from Brandon Johnson — Google Local Guide Level 10, 500+ reviews, based in Orange County, California. Real visits, honest takes, logistics other families actually need.";

export const DEFAULT_KEYWORDS = [
  "family travel",
  "restaurant reviews",
  "Orange County restaurants",
  "family-friendly dining",
  "travel blog",
  "Brandon Johnson",
  "Johnson Reviews",
];

export const AUTHOR_NAME = "Brandon Johnson";
export const AUTHOR_URL = `${SITE_URL}/about`;
export const AUTHOR_JOB_TITLE = "Google Local Guide Level 10, Family Travel Reviewer";
export const AUTHOR_SAME_AS: string[] = [
  // Brandon: add your public profiles here and they'll land in structured data.
  // Examples:
  // "https://www.google.com/maps/contrib/<your-google-local-guide-id>",
  // "https://twitter.com/<handle>",
  // "https://www.instagram.com/<handle>",
];

export const DEFAULT_OG_IMAGE = "/og-image.jpg";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
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
 * Absolute-ify a URL. If it's already absolute, return as-is; otherwise prepend SITE_URL.
 */
export function absoluteUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

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
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const image = absoluteUrl(ogImage) ?? absoluteUrl(DEFAULT_OG_IMAGE)!;

  return {
    title,
    description,
    keywords: keywords ?? DEFAULT_KEYWORDS,
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

export function generateArticleMetadata({
  title,
  description,
  slug,
  pathPrefix = "/blog",
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
  pathPrefix?: string;
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[] | string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${pathPrefix}/${slug}`;
  const image = absoluteUrl(ogImage) ?? absoluteUrl(DEFAULT_OG_IMAGE)!;
  const kw = Array.isArray(keywords)
    ? keywords
    : keywords
      ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : DEFAULT_KEYWORDS;

  return {
    title,
    description,
    keywords: kw,
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
