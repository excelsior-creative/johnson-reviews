import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Fine Print"
        title="Terms of"
        italicPart="service."
        subtitle="The boring but necessary stuff. By using this site you agree to the terms below — full text managed in the CMS."
      />
      <section style={{ padding: "60px 0 120px" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <div className="prose">
            {!siteSettings.termsOfService ? (
              <p className="italic" style={{ color: "var(--color-ink-dim)" }}>
                Terms of service content has not been populated in the CMS yet.
              </p>
            ) : (
              <p>Content is driven by the Site Settings global in the backend.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
