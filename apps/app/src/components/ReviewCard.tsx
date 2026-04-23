import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ReviewCardProps {
  review: Record<string, unknown>;
  priority?: boolean;
  variant?: "default" | "horizontal";
}

export const ReviewCard = ({
  review,
  priority = false,
  variant = "default",
}: ReviewCardProps) => {
  const r = review as {
    id: string;
    slug: string;
    businessName: string;
    address?: string;
    category?: string;
    rating: number;
    reviewDate?: string;
    reviewText?: string;
    photos?: { url?: string }[];
  };
  const firstPhoto = r.photos?.[0]?.url;
  const blurb = r.reviewText
    ? r.reviewText.slice(0, 140) + (r.reviewText.length > 140 ? "…" : "")
    : null;
  const score = (r.rating * 2).toFixed(1);
  const cityFromAddress = r.address?.split(",").slice(-2, -1)[0]?.trim();

  if (variant === "horizontal") {
    return (
      <Link
        href={`/reviews/${r.slug}`}
        className="review-card group"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: 32,
          alignItems: "center",
        }}
      >
        <div className="photo" style={{ aspectRatio: "4 / 3" }}>
          {firstPhoto ? (
            <Image
              src={firstPhoto}
              alt={r.businessName}
              fill
              sizes="(max-width: 1024px) 50vw, 40vw"
              quality={80}
              priority={priority}
              className="object-cover"
            />
          ) : (
            <PlaceholderArt />
          )}
        </div>
        <div>
          <div className="cat">
            {r.category ?? "Field Review"}
            {cityFromAddress ? ` · ${cityFromAddress}` : ""}
          </div>
          <h3 style={{ fontSize: 32 }}>{r.businessName}</h3>
          {blurb && <div className="blurb" style={{ fontSize: 18 }}>{blurb}</div>}
          <div
            className="meta"
            style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 16 }}
          >
            <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em" }}>
              {score}
            </span>
            <span>{r.reviewDate ?? "—"} · By Brandon Johnson</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/reviews/${r.slug}`} className="review-card group">
      <div className="photo">
        {firstPhoto ? (
          <Image
            src={firstPhoto}
            alt={r.businessName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <PlaceholderArt />
        )}
      </div>
      <div className="cat">
        {r.category ?? "Field Review"}
        {cityFromAddress ? ` · ${cityFromAddress}` : ""}
      </div>
      <h3>{r.businessName}</h3>
      {r.address && <div className="location">{r.address}</div>}
      {blurb && <div className="blurb">&ldquo;{blurb}&rdquo;</div>}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span className="meta">{r.reviewDate ?? "—"}</span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            color: "var(--color-accent)",
            display: "flex",
            alignItems: "baseline",
            gap: 4,
          }}
        >
          {score}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "var(--color-ink-mute)",
            }}
          >
            /10
          </span>
        </span>
      </div>
    </Link>
  );
};

function PlaceholderArt() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "var(--color-bg-card)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-rule-strong)"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
  );
}
