import React from "react";
import Link from "next/link";

const categories = [
  {
    number: "01",
    name: "Restaurants",
    href: "/blog?category=restaurants",
    tagline: "Where fire meets craftsmanship at the table.",
  },
  {
    number: "02",
    name: "Hotels & Resorts",
    href: "/blog?category=hotels-resorts",
    tagline: "Sanctuaries of hospitality, curated with care.",
  },
  {
    number: "03",
    name: "Entertainment",
    href: "/blog?category=entertainment",
    tagline: "Theatres, cinemas, and cultural escapes.",
  },
  {
    number: "04",
    name: "Shopping",
    href: "/blog?category=shopping",
    tagline: "Boutiques and bazaars worth the detour.",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#131313" }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#e5e2e1",
            }}
          >
            Trending Destinations
          </h2>
          <div
            className="w-24 h-[1px] mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #f2ca50 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Bordered grid (single-line uniform borders per "No-Line" rule — used
            sparingly here to form an editorial plate structure) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ border: "1px solid rgba(77,70,53,0.3)" }}
        >
          {categories.map((cat, i) => {
            const isLastCol = (i + 1) % 4 === 0;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative block p-10 md:p-12 transition-colors duration-500"
                style={{
                  borderRight: !isLastCol
                    ? "1px solid rgba(77,70,53,0.3)"
                    : "none",
                  borderBottom: "1px solid rgba(77,70,53,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1c1b1b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  className="block mb-8 transition-colors duration-500 group-hover:text-[#f2ca50]"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "2.5rem",
                    color: "#4d4635",
                  }}
                >
                  {cat.number}
                </span>
                <h4
                  className="font-bold mb-4"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.375rem",
                    color: "#e5e2e1",
                  }}
                >
                  {cat.name}
                </h4>
                <p
                  className="italic leading-relaxed"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "0.875rem",
                    color: "#d3c5ad",
                    lineHeight: "1.7",
                  }}
                >
                  {cat.tagline}
                </p>
                <span
                  className="mt-8 inline-flex items-center gap-2"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#f2ca50",
                  }}
                >
                  View Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="square" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
