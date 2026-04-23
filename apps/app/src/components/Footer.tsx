import React from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Wordmark } from "./Wordmark";

export const Footer = async () => {
  let siteTitle = "Johnson & Co.";
  try {
    const payload = await getPayload({ config });
    const siteSettings = await payload.findGlobal({ slug: "site-settings" });
    if (siteSettings?.siteTitle) siteTitle = siteSettings.siteTitle;
  } catch {
    // use default
  }

  return (
    <footer className="footer-jr" style={{ marginTop: 120 }}>
      <div className="container-jr">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 60,
          }}
        >
          {/* Brand column */}
          <div className="footer-col">
            <div style={{ textAlign: "left" }}>
              <Wordmark />
            </div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 17,
                color: "var(--color-ink-dim)",
                marginTop: 20,
                maxWidth: 360,
                lineHeight: 1.55,
              }}
            >
              An independent review publication covering restaurants, hotels,
              and places worth the trip. Written by Brandon Johnson since 2019.
              No sponsored content. No affiliate links.
            </p>
          </div>

          <div className="footer-col">
            <h4>Sections</h4>
            <ul>
              <li>
                <Link href="/blog?category=restaurants">Restaurants</Link>
              </li>
              <li>
                <Link href="/blog?category=hotels-resorts">Hotels</Link>
              </li>
              <li>
                <Link href="/blog?category=entertainment">Travel</Link>
              </li>
              <li>
                <Link href="/reviews">The Archive</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>The Publication</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/blog">The Journal</Link>
              </li>
              <li>
                <Link href="/about">Method</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
              </li>
              <li>
                <a href="/feed.xml">RSS</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteTitle}
          </span>
          <span className="hidden md:inline">
            Set in Playfair · Inter · JetBrains Mono
          </span>
          <span style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Link href="/terms" className="hover:text-[color:var(--color-accent)] transition-colors">
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[color:var(--color-accent)] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="hover:text-[color:var(--color-accent)] transition-colors"
            >
              Contact
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
