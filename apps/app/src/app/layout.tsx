import { defaultMetadata } from "@/lib/metadata";
import { generateGlobalSchema } from "@/lib/structured-data";
import { VercelToolbar } from "@vercel/toolbar/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: {
    default: "Johnson Reviews - Every Day a New Destination",
    template: "%s | Johnson Reviews",
  },
  description:
    "Embark on a culinary journey with Johnson Reviews, your premier guide to discovering hidden gems and top-notch dining and experiences across various destinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchema = generateGlobalSchema();
  const shouldShowToolbar = process.env.NODE_ENV !== "production";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Jost:wght@300;400;500;600&family=Dancing+Script:wght@700&family=Unna:ital,wght@0,400;0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: "#191A1B", color: "#ffffff" }}>
        {children}
        {shouldShowToolbar && <VercelToolbar />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </body>
    </html>
  );
}
