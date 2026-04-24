import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const payload = await getPayload({ config });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Fine Print"
        title="Privacy"
        italicPart="policy."
        subtitle="What we collect, what we don't, and what happens to it. Full text managed in the CMS."
      />
      <section style={{ padding: "60px 0 120px" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <div className="prose">
            {!siteSettings.privacyPolicy ? (
              <p className="italic" style={{ color: "var(--color-ink-dim)" }}>
                Privacy policy content has not been populated in the CMS yet.
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
