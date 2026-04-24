import React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  italicPart?: string;
  subtitle?: string;
  meta?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  italicPart,
  subtitle,
  meta,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="container-jr">
        {eyebrow && <div className="eyebrow rise mb-7">{eyebrow}</div>}
        <h1
          className="display rise-1 text-balance"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            maxWidth: "16ch",
          }}
        >
          {title}
          {italicPart && (
            <>
              <br />
              <span
                className="display-italic"
                style={{ color: "var(--color-ink-dim)" }}
              >
                {italicPart}
              </span>
            </>
          )}
        </h1>
        {subtitle && (
          <p
            className="rise-2 italic text-pretty"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 22,
              color: "var(--color-ink-dim)",
              maxWidth: 720,
              marginTop: 28,
              lineHeight: 1.45,
            }}
          >
            {subtitle}
          </p>
        )}
        {meta && (
          <div
            className="rise-3"
            style={{
              marginTop: 40,
              display: "flex",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {meta}
          </div>
        )}
      </div>
    </header>
  );
}
