import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin } from "lucide-react";
import { NewsletterInline } from "@/components/NewsletterInline";

export const revalidate = 3600;

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-5">
    <div
      className="flex-shrink-0 mt-1"
      style={{ color: "var(--color-accent)" }}
    >
      {icon}
    </div>
    <div>
      <div className="meta mb-2">{label}</div>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 18,
          color: "var(--color-ink-dim)",
          lineHeight: 1.6,
        }}
      >
        {value}
      </p>
    </div>
  </div>
);

export default function ContactPage() {
  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Get in touch"
        title="Drop us"
        italicPart="a line."
        subtitle="Press, partnership, restaurant or hotel pitch, or just a tip on a place we should try — write in. We read everything."
      />

      <section style={{ padding: "60px 0 120px" }}>
        <div className="container-jr">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 7fr",
              gap: 80,
              alignItems: "start",
            }}
            className="contact-grid"
          >
            {/* Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <InfoRow
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value="hello@johnsonreviews.com"
                />
                <InfoRow
                  icon={<MapPin className="w-5 h-5" />}
                  label="Based in"
                  value="Orange County, California"
                />
              </div>

              <div
                style={{
                  background: "var(--color-bg-raised)",
                  border: "1px solid var(--color-rule)",
                  padding: 32,
                }}
              >
                <div className="kicker mb-3">Response Time</div>
                <p
                  className="italic text-pretty"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17,
                    color: "var(--color-ink-dim)",
                    lineHeight: 1.7,
                  }}
                >
                  Most messages get a reply within a couple of days. For press
                  inquiries, please mention your outlet and deadline.
                </p>
              </div>
            </div>

            {/* Form */}
            <div
              style={{
                background: "var(--color-bg-raised)",
                border: "1px solid var(--color-rule)",
                padding: "48px 56px",
              }}
              className="contact-form-wrap"
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <NewsletterInline compact />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              .contact-form-wrap { padding: 32px !important; }
            }
          `,
        }}
      />
    </div>
  );
}
