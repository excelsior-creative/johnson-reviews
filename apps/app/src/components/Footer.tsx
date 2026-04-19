import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { SubscribeForm } from "./SubscribeForm";

export const Footer = async () => {
  let siteTitle = "Johnson Reviews";
  try {
    const payload = await getPayload({ config });
    const siteSettings = await payload.findGlobal({ slug: "site-settings" });
    siteTitle = siteSettings.siteTitle || siteTitle;
  } catch {
    // use default
  }

  const linkStyle = {
    fontFamily: '"Noto Serif", serif',
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    color: "rgba(229,226,225,0.7)",
  };

  return (
    <footer style={{ backgroundColor: "#131313" }}>
      {/* The Inner Circle — subscribe */}
      <section
        className="py-24 md:py-32 px-8 md:px-16"
        style={{ backgroundColor: "#0e0e0e" }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span
              className="block mb-4"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: "#f2ca50",
              }}
            >
              The Inner Circle
            </span>
            <h3
              className="font-bold leading-tight mb-6"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#e5e2e1",
              }}
            >
              Join the Private Collection
            </h3>
            <p
              className="italic leading-relaxed max-w-lg"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.05rem",
                color: "#d3c5ad",
              }}
            >
              Gain exclusive access to unpublished reviews, cellar consultations,
              and private table invitations across the globe.
            </p>
          </div>
          <div className="md:col-span-5">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div
        className="py-12 px-6 md:px-12"
        style={{ borderTop: "1px solid rgba(77,70,53,0.15)" }}
      >
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div
              className="font-bold"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.25rem",
                color: "#d4af37",
              }}
            >
              {siteTitle}
            </div>
            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(229,226,225,0.5)",
              }}
            >
              © {new Date().getFullYear()} {siteTitle}. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="/terms"
              className="transition-colors hover:text-[#d4af37]"
              style={linkStyle}
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#d4af37]"
              style={linkStyle}
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-[#d4af37]"
              style={linkStyle}
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-[#d4af37]"
              style={linkStyle}
            >
              Press
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
