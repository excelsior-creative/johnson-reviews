"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
          Error · Something broke
        </div>
        <h1
          className="display rise-1 text-balance"
          style={{ fontSize: "clamp(48px, 7vw, 96px)", maxWidth: "14ch" }}
        >
          The press{" "}
          <span
            className="display-italic"
            style={{ color: "var(--color-accent)" }}
          >
            jammed.
          </span>
        </h1>
        <p
          className="rise-2 italic text-pretty"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            color: "var(--color-ink-dim)",
            maxWidth: 520,
            marginTop: 28,
            lineHeight: 1.55,
          }}
        >
          Something went sideways on our end. Try again, or head back and come at it from another angle.
        </p>
        <div
          className="rise-3"
          style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
        >
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again <span className="arrow">→</span>
          </button>
          <Link href="/" className="btn">
            Back to home <span className="arrow">→</span>
          </Link>
        </div>
        {error.digest && (
          <div
            className="meta"
            style={{ marginTop: 32, color: "var(--color-ink-mute)" }}
          >
            Ref: {error.digest}
          </div>
        )}
      </section>
    </div>
  );
}
