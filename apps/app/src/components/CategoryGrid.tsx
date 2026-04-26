import React from "react";
import Link from "next/link";

const categories = [
  {
    region: "Sit-down dinners, brunch, taquerías",
    name: "Restaurants",
    href: "/blog?category=restaurants",
  },
  {
    region: "Where the Johnsons actually slept",
    name: "Hotels & Resorts",
    href: "/blog?category=hotels-resorts",
  },
  {
    region: "Theme parks, golf, concerts",
    name: "Entertainment",
    href: "/blog?category=entertainment",
  },
  {
    region: "Big-box and boutique stops",
    name: "Shopping",
    href: "/blog?category=shopping",
  },
];

export const CategoryGrid = () => {
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="container-jr">
        <div
          className="between"
          style={{ marginBottom: 48, alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 12 }}>
              Browse By Section
            </div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
              The{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-ink-dim)" }}
              >
                atlas.
              </span>
            </h2>
          </div>
          <Link href="/reviews" className="btn btn-ghost">
            The Full Archive <span className="arrow">→</span>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 1,
            background: "var(--color-rule)",
            border: "1px solid var(--color-rule)",
          }}
          className="atlas-grid"
        >
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="atlas-cell group"
              style={{
                background: "var(--color-bg)",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 240,
                transition: "background-color 0.3s ease",
              }}
            >
              <div>
                <div className="meta">{cat.region}</div>
                <div
                  className="display"
                  style={{ fontSize: "clamp(24px, 2.4vw, 32px)", marginTop: 12 }}
                >
                  {cat.name}
                </div>
              </div>
              <div
                style={{
                  marginTop: 24,
                }}
              >
                <div className="meta inline-flex items-center gap-2">
                  Browse <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .atlas-cell:hover { background: var(--color-bg-raised) !important; }
              @media (max-width: 1024px) { .atlas-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
              @media (max-width: 640px)  { .atlas-grid { grid-template-columns: 1fr !important; } }
            `,
          }}
        />
      </div>
    </section>
  );
};
