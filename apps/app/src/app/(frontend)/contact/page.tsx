import React from "react";
import Header from "@/components/Header";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

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
    <div className="flex-shrink-0 mt-1" style={{ color: "#f2ca50" }}>
      {icon}
    </div>
    <div>
      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.625rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "#99907c",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: "0.95rem",
          color: "#d3c5ad",
          lineHeight: "1.6",
        }}
      >
        {value}
      </p>
    </div>
  </div>
);

export default function ContactPage() {
  return (
    <div
      className="pt-28 md:pt-40 pb-24 md:pb-32"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Header
          badge="Correspondence"
          title="A Private Line."
          subtitle="For press, private tables, reservation intelligence, or the return of a lost fountain pen. Dispatches are answered in the order received."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mt-16">
          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-8">
              <InfoRow
                icon={<Mail className="w-5 h-5" />}
                label="Email"
                value="editor@johnsonreviews.com"
              />
              <InfoRow
                icon={<Phone className="w-5 h-5" />}
                label="Telephone"
                value="+1 (555) 000-0000"
              />
              <InfoRow
                icon={<MapPin className="w-5 h-5" />}
                label="Correspondence Address"
                value={
                  <>
                    14 Avenue Montaigne
                    <br />
                    Orange County, California
                  </>
                }
              />
            </div>

            <div
              className="p-10"
              style={{
                backgroundColor: "#20201f",
                boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
              }}
            >
              <span
                className="block mb-3"
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#f2ca50",
                }}
              >
                Office Hours
              </span>
              <p
                className="italic"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1rem",
                  color: "#d3c5ad",
                  lineHeight: "1.7",
                }}
              >
                Tuesday — Saturday
                <br />
                09:00 — 17:00 Pacific
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 md:p-12"
              style={{ backgroundColor: "#1c1b1b" }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
