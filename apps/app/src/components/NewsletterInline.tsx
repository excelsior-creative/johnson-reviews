"use client";

import React, { useState } from "react";

interface NewsletterInlineProps {
  compact?: boolean;
  eyebrow?: string;
  headline?: React.ReactNode;
  copy?: React.ReactNode;
  successCopy?: string;
  meta?: string;
}

export function NewsletterInline({
  compact = false,
  eyebrow = "The Dispatch",
  headline,
  copy = "One honest review, one place worth the trip, one note from the field. No sponsors, no affiliate links. Unsubscribe any Sunday you'd like.",
  successCopy = "Welcome to the Dispatch. See you Sunday.",
  meta = "4,281 readers · Free · Reader-supported",
}: NewsletterInlineProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <section
      style={{
        padding: compact ? "60px 0" : "120px 0",
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
        background: "var(--color-bg-raised)",
      }}
    >
      <div
        className="container-jr text-center"
        style={{ maxWidth: 720, margin: "0 auto" }}
      >
        <div className="kicker mb-6">{eyebrow}</div>
        <h2
          className="display text-balance"
          style={{ fontSize: compact ? 44 : 64 }}
        >
          {headline ?? (
            <>
              Arrives{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-accent)" }}
              >
                Sundays.
              </span>
            </>
          )}
        </h2>
        <p
          className="italic text-pretty"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            color: "var(--color-ink-dim)",
            marginTop: 20,
            lineHeight: 1.55,
          }}
        >
          {copy}
        </p>

        {submitted ? (
          <div
            className="fade-in"
            style={{
              marginTop: 32,
              padding: "20px 0",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 20,
              color: "var(--color-accent)",
            }}
          >
            {successCopy}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 40,
              display: "flex",
              gap: 0,
              maxWidth: 480,
              margin: "40px auto 0",
              borderBottom: "1px solid var(--color-rule-strong)",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--color-ink)",
                fontFamily: "var(--font-serif)",
                fontSize: 20,
                padding: "14px 4px",
                fontStyle: "italic",
              }}
            />
            <button
              type="submit"
              className="btn btn-ghost"
              style={{ padding: "14px 4px" }}
            >
              Subscribe <span className="arrow">→</span>
            </button>
          </form>
        )}

        <div className="meta" style={{ marginTop: 24 }}>
          {meta}
        </div>
      </div>
    </section>
  );
}
