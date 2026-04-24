import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-body">
      <section
        className="container-jr"
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 0",
          textAlign: "center",
        }}
      >
        <div className="kicker rise" style={{ marginBottom: 24 }}>
          Error · N° 404
        </div>
        <h1
          className="display rise-1 text-balance"
          style={{
            fontSize: "clamp(64px, 10vw, 160px)",
            lineHeight: 0.9,
            maxWidth: "14ch",
          }}
        >
          A page we{" "}
          <span
            className="display-italic"
            style={{ color: "var(--color-accent)" }}
          >
            haven&rsquo;t written.
          </span>
        </h1>
        <p
          className="rise-2 italic text-pretty"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            color: "var(--color-ink-dim)",
            maxWidth: 560,
            marginTop: 28,
            lineHeight: 1.55,
          }}
        >
          The address you tried doesn&rsquo;t lead anywhere. Head back to the
          lobby or browse the archive.
        </p>
        <div
          className="rise-3"
          style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/" className="btn btn-primary">
            Back to home <span className="arrow">→</span>
          </Link>
          <Link href="/reviews" className="btn">
            The Archive <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
