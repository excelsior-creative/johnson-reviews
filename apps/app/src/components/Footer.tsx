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
    <footer className="bg-[#352F2C]">
      {/* Main footer */}
      <div className="border-t border-white/10 py-14 px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Wordmark */}
          <div className="mb-4">
            <span
              className="text-[#F9F7F4] text-xl tracking-[0.14em] uppercase"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600 }}
            >
              {siteTitle}
            </span>
          </div>

          {/* Tagline */}
          <p
            className="text-[#CFD6D9]/60 text-[10px] uppercase tracking-[0.28em] mb-6"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            Every Day a New Destination
          </p>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div style={{ width: 32, height: 1, background: "#D5C17A", opacity: 0.6 }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
              <rect x="2.5" y="0" width="3.54" height="3.54" fill="#D5C17A" opacity="0.6" transform="rotate(45 2.5 0)" />
            </svg>
            <div style={{ width: 32, height: 1, background: "#D5C17A", opacity: 0.6 }} />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-3 mb-8">
            <a
              href="https://instagram.com/johnsonreviews"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#CFD6D9]/25 flex items-center justify-center text-[#CFD6D9]/70 hover:text-[#52A3A9] hover:border-[#52A3A9] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/xjohnsonreviews"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#CFD6D9]/25 flex items-center justify-center text-[#CFD6D9]/70 hover:text-[#52A3A9] hover:border-[#52A3A9] transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/johnsonreviews"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#CFD6D9]/25 flex items-center justify-center text-[#CFD6D9]/70 hover:text-[#52A3A9] hover:border-[#52A3A9] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
              </svg>
            </a>
          </div>

          {/* Subscribe */}
          <p
            className="text-[#CFD6D9]/60 text-xs mb-4 tracking-wide"
            style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 300 }}
          >
            Sign up and receive fresh reviews, guides, and updates.
          </p>
          <SubscribeForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 px-4 text-center">
        <p
          className="text-[#CFD6D9]/40 text-xs"
          style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 300 }}
        >
          © {new Date().getFullYear()} {siteTitle}. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2 text-xs">
          <Link href="/privacy" className="text-[#CFD6D9]/35 hover:text-[#52A3A9] transition-colors text-[10px] tracking-[0.1em]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-[#CFD6D9]/35 hover:text-[#52A3A9] transition-colors text-[10px] tracking-[0.1em]">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};
