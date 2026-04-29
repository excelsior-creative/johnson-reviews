import React from "react";

type AuthorBioBlockProps = {
  date?: string | null;
  context?: "post" | "review";
};

export function AuthorBioBlock({
  date,
  context = "review",
}: AuthorBioBlockProps) {
  const label = context === "post" ? "Written by" : "Reviewed by";

  return (
    <aside
      aria-label="About Brandon Johnson"
      style={{
        border: "1px solid var(--color-rule)",
        background:
          "linear-gradient(135deg, rgba(201,169,97,0.08), rgba(255,255,255,0.02))",
        padding: 28,
        marginBottom: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 18,
        }}
        className="author-bio-block"
      >
        <div
          aria-hidden="true"
          style={{
            width: 54,
            height: 54,
            minWidth: 54,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3a2f25, #6b5842)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            color: "var(--color-accent)",
            fontSize: 20,
            border: "1px solid var(--color-rule-strong)",
          }}
        >
          BJ
        </div>
        <div>
          <div className="kicker" style={{ marginBottom: 10 }}>
            {label} Brandon Johnson{date ? ` · ${date}` : ""}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 3vw, 34px)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Honest notes from an OC family traveler.
          </h2>
          <p
            style={{
              color: "var(--color-ink-dim)",
              lineHeight: 1.7,
              margin: "14px 0 0",
            }}
          >
            Brandon Johnson is a Google Local Guide and Orange County dad who
            turns real family meals, hotel stays, and day trips into practical
            reviews. If a detail is not confirmed from the visit, it stays out
            of the story.
          </p>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (max-width: 640px) {
            .author-bio-block { flex-direction: column; }
          }`,
        }}
      />
    </aside>
  );
}
