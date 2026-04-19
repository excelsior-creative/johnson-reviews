import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import Header from "@/components/Header";

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <div
      className="pt-28 md:pt-40 pb-24 md:pb-32"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Header badge="Fine Print" title="Terms of Service" />

        <div className="max-w-3xl">
          {!siteSettings.termsOfService ? (
            <p
              className="italic"
              style={{
                fontFamily: '"Noto Serif", serif',
                color: "#99907c",
                fontSize: "1.125rem",
                lineHeight: "1.7",
              }}
            >
              Terms of service content has not been populated in the CMS yet.
            </p>
          ) : (
            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                color: "#e5e2e1",
                fontSize: "1.125rem",
                lineHeight: "1.8",
              }}
            >
              Content is driven by the Site Settings global in the backend.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
