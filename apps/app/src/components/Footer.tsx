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

  return (
    <footer style={{ backgroundColor: "#1c1b1b" }}>
      {/* Main footer body */}
      <div
        className="py-20 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(77,70,53,0.4)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-2">
            <h2
              className="font-bold tracking-tighter mb-6"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.5rem",
                color: "#f2ca50",
              }}
            >
              JOHNSON REVIEWS
            </h2>
            <p
              className="leading-relaxed mb-8 max-w-md"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontStyle: "italic",
                color: "rgba(229,226,225,0.5)",
                fontSize: "0.9rem",
              }}
            >
              Elevating the standard of taste through rigorous analysis, an
              uncompromising palate, and a deep respect for the culinary arts.
            </p>
            <div className="flex gap-6">
              {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="transition-colors hover:text-[#f2ca50]"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(229,226,225,0.4)",
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#f2ca50",
              }}
            >
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About", href: "/about" },
                { name: "Restaurants", href: "/blog?category=restaurants" },
                { name: "Hotels & Resorts", href: "/blog?category=hotels-resorts" },
                { name: "Shopping", href: "/blog?category=shopping" },
                { name: "Entertainment", href: "/blog?category=entertainment" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-[#e5e2e1]"
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      color: "rgba(229,226,225,0.5)",
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#f2ca50",
              }}
            >
              The Collection
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontStyle: "italic",
                color: "rgba(229,226,225,0.5)",
              }}
            >
              Sign up for fresh news, updates, and exclusive access.
            </p>
            <SubscribeForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-6 px-8 md:px-16"
        style={{ borderTop: "1px solid rgba(77,70,53,0.2)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "rgba(229,226,225,0.3)",
            }}
          >
            © {new Date().getFullYear()} {siteTitle}. All Rights Reserved.
          </p>
          <div className="flex gap-6 items-center">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#f2ca50]"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(229,226,225,0.3)",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#f2ca50]"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(229,226,225,0.3)",
              }}
            >
              Terms of Service
            </Link>
            <p
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "rgba(229,226,225,0.3)",
              }}
            >
              Designed for the Uncompromising Palate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
