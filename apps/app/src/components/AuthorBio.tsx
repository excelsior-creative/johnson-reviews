import Link from "next/link";
import {
  AUTHOR_DESCRIPTION,
  AUTHOR_LOCAL_GUIDE_URL,
  AUTHOR_NAME,
  AUTHOR_URL,
} from "@/lib/metadata";

/**
 * E-E-A-T signal — shows Brandon as the human author of every review.
 * `compact` renders the sidebar variant used on post detail; default
 * renders the full in-line variant used after the article body.
 */
export function AuthorBio({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="p-8"
        style={{
          backgroundColor: "#1c1b1b",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <p
          className="mb-4"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#99907c",
          }}
        >
          Written by
        </p>
        <h3
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "1.25rem",
            color: "#e5e2e1",
            marginBottom: "0.75rem",
          }}
        >
          {AUTHOR_NAME}
        </h3>
        <p
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "0.9rem",
            lineHeight: "1.6",
            color: "#d3c5ad",
            marginBottom: "1.5rem",
          }}
        >
          Google Local Guide · Level 10 · 500+ reviews · 27,000+ photos. Based
          in Orange County, CA.
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href={AUTHOR_URL}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#f2ca50",
            }}
            className="hover:underline"
          >
            About the Johnsons →
          </Link>
          {AUTHOR_LOCAL_GUIDE_URL && (
            <a
              href={AUTHOR_LOCAL_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#99907c",
              }}
              className="hover:text-[#f2ca50]"
            >
              Google Local Guide profile →
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <aside
      className="mt-16 p-10 md:p-12"
      style={{
        backgroundColor: "#1c1b1b",
        boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
      }}
      aria-labelledby="author-bio-heading"
    >
      <p
        className="mb-4"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
          color: "#f2ca50",
        }}
      >
        About the reviewer
      </p>
      <h2
        id="author-bio-heading"
        style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: "1.75rem",
          color: "#e5e2e1",
          marginBottom: "1rem",
        }}
      >
        {AUTHOR_NAME}
      </h2>
      <p
        style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: "1rem",
          lineHeight: "1.7",
          color: "#d3c5ad",
          marginBottom: "1.5rem",
          maxWidth: "60ch",
        }}
      >
        {AUTHOR_DESCRIPTION}
      </p>
      <div className="flex flex-wrap gap-6">
        <Link
          href={AUTHOR_URL}
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#f2ca50",
          }}
          className="hover:underline"
        >
          About the Johnsons →
        </Link>
        {AUTHOR_LOCAL_GUIDE_URL && (
          <a
            href={AUTHOR_LOCAL_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "#99907c",
            }}
            className="hover:text-[#f2ca50]"
          >
            Google Local Guide profile →
          </a>
        )}
      </div>
    </aside>
  );
}
