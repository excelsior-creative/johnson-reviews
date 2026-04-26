import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { SearchProvider } from "@/components/SearchProvider";
import { generateGlobalSchema } from "@/lib/structured-data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const globalSchema = generateGlobalSchema();

  return (
    <div className="flex min-h-screen flex-col" data-theme="frontend">
      {globalSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      )}
      <Providers>
        <SearchProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SearchProvider>
      </Providers>
    </div>
  );
}
