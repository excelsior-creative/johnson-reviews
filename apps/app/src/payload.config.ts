import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { sentryPlugin } from "@payloadcms/plugin-sentry";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Categories } from "@/collections/Categories";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Posts } from "@/collections/Posts";
import { Tags } from "@/collections/Tags";
import { Users } from "@/collections/Users";
import { ContentGenerationSettings } from "@/globals/ContentGenerationSettings";
import { Footer } from "@/globals/Footer";
import { Header } from "@/globals/Header";
import { SiteSettings } from "@/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (!process.env.PAYLOAD_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("PAYLOAD_SECRET must be set in production");
  }
  console.warn(
    "WARNING: PAYLOAD_SECRET is not set. This will cause issues in production."
  );
}

if (process.env.NODE_ENV === "production" && !process.env.DATABASE_URL) {
  console.warn("WARNING: No remote database URL set in production.");
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Posts, Pages, Media, Categories, Tags],
  globals: [SiteSettings, ContentGenerationSettings, Header, Footer],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ...(process.env.NODE_ENV !== "production"
      ? ["http://localhost:3000", "http://127.0.0.1:3000"]
      : []),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  email: resendAdapter({
    defaultFromAddress:
      process.env.RESEND_DEFAULT_FROM_ADDRESS || "noreply@yourdomain.com",
    defaultFromName: process.env.RESEND_DEFAULT_FROM_NAME || "Your App Name",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  plugins: [
    vercelBlobStorage({
      // Only enable when token is in the expected vercel_blob_rw_ format
      // JWT tokens (eyJ...) are a newer format but may be incompatible with this adapter version
      enabled: !!(
        process.env.BLOB_READ_WRITE_TOKEN &&
        process.env.BLOB_READ_WRITE_TOKEN.startsWith("vercel_blob_rw_")
      ),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
    searchPlugin({
      collections: ["posts"],
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        slug: originalDoc.slug,
        excerpt: originalDoc.excerpt,
        status: originalDoc._status,
      }),
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: "excerpt", type: "textarea" },
          { name: "slug", type: "text" },
          { name: "status", type: "text" },
        ],
      },
    }),
    sentryPlugin({
      enabled: !!process.env.SENTRY_DSN,
    }),
    seoPlugin({
      collections: ["posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: any) =>
        doc?.title
          ? `${doc.title} | ${process.env.NEXT_PUBLIC_SITE_NAME || "Your Site"}`
          : process.env.NEXT_PUBLIC_SITE_NAME || "Your Site",
      generateDescription: ({ doc }: any) => doc?.excerpt || "",
    }),
    redirectsPlugin({
      collections: ['posts', 'pages'],
      overrides: {
        access: {
          read: () => true,
        },
      },
    }),
  ],
});
