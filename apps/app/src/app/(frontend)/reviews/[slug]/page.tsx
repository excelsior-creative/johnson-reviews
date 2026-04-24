import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ScoreDisc } from "@/components/ScoreDisc";
import { ReviewCard } from "@/components/ReviewCard";
import { NewsletterInline } from "@/components/NewsletterInline";

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "reviews",
      limit: 1000,
      select: { slug: true } as never,
    });
    return docs.map((r: { slug: string }) => ({ slug: r.slug }));
  } catch {
    return [];
  }
}

type ReviewRecord = {
  id: string;
  slug: string;
  businessName: string;
  rating: number;
  reviewText?: string;
  reviewDate?: string;
  address?: string;
  category?: string;
  photos?: { url: string }[];
};

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  let review: ReviewRecord | undefined;
  let related: ReviewRecord[] = [];

  try {
    const { docs } = await payload.find({
      collection: "reviews",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    review = docs[0] as unknown as ReviewRecord;
  } catch (error) {
    console.error(`Failed to fetch review "${slug}":`, error);
  }

  if (!review) notFound();

  try {
    const { docs } = await payload.find({
      collection: "reviews",
      sort: "-rating",
      limit: 4,
      where: { slug: { not_equals: slug } },
    });
    related = docs as unknown as ReviewRecord[];
  } catch {
    // ignore
  }

  const photos = (review.photos ?? []).map((p) => p.url).filter(Boolean);
  const hero = photos[0];
  const score = review.rating * 2;
  const cityFromAddress = review.address?.split(",").slice(-2, -1)[0]?.trim();
  const verdict =
    score >= 9
      ? "Essential. Worth the trip."
      : score >= 8
        ? "A confident recommendation."
        : score >= 6
          ? "Worth knowing about."
          : "Mixed feelings, honestly told.";

  const paragraphs = (review.reviewText ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const lead = paragraphs[0];
  const body = paragraphs.slice(1);

  return (
    <article className="page-body">
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "min(82vh, 880px)",
          overflow: "hidden",
        }}
      >
        {hero ? (
          <Image
            src={hero}
            alt={review.businessName}
            fill
            priority
            sizes="100vw"
            className="object-cover ken-burns"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "var(--color-bg-card)" }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,13,11,0.5) 0%, rgba(15,13,11,0.1) 30%, rgba(15,13,11,0.96) 100%)",
          }}
        />
        <div
          className="absolute"
          style={{ bottom: 80, left: 0, right: 0 }}
        >
          <div className="container-jr">
            <div className="kicker rise" style={{ marginBottom: 24 }}>
              The {review.category ?? "Field"} Review
              {review.reviewDate ? ` · ${review.reviewDate}` : ""}
            </div>
            <h1
              className="display rise-1 text-balance"
              style={{
                fontSize: "clamp(48px, 8vw, 124px)",
                maxWidth: "16ch",
                lineHeight: 0.95,
              }}
            >
              {review.businessName}
            </h1>
            {review.address && (
              <div
                className="rise-2 italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.6vw, 24px)",
                  color: "var(--color-ink-dim)",
                  marginTop: 24,
                  maxWidth: 760,
                  lineHeight: 1.4,
                }}
              >
                {review.address}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section
        style={{
          borderBottom: "1px solid var(--color-rule)",
          background: "var(--color-bg-raised)",
        }}
      >
        <div className="container-jr">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr 1fr 1fr auto",
              gap: 48,
              alignItems: "center",
              padding: "40px 0",
            }}
            className="meta-bar"
          >
            <ScoreDisc score={score} size="lg" />
            <div>
              <div className="meta">Location</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  marginTop: 8,
                }}
              >
                {cityFromAddress ?? review.address ?? "—"}
              </div>
            </div>
            <div>
              <div className="meta">Section</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  marginTop: 8,
                }}
              >
                {review.category ?? "Field Review"}
              </div>
            </div>
            <div>
              <div className="meta">Visited</div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  marginTop: 8,
                }}
              >
                {review.reviewDate ?? "—"}
              </div>
            </div>
            <div className="text-right">
              <div className="meta">Verdict</div>
              <div
                className="italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 28,
                  color: "var(--color-accent)",
                  marginTop: 6,
                }}
              >
                {score >= 8 ? "Yes." : score >= 6 ? "Probably." : "Maybe."}
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `@media (max-width: 900px) {
              .meta-bar {
                grid-template-columns: auto 1fr !important;
                gap: 24px !important;
              }
            }`,
          }}
        />
      </section>

      {/* Article body */}
      <section style={{ padding: "100px 0 40px" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 48,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #3a2f25, #6b5842)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--color-accent)",
                fontSize: 18,
              }}
            >
              BJ
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 16 }}>
                By Brandon Johnson
              </div>
              <div className="meta" style={{ marginTop: 2 }}>
                Editor {review.reviewDate ? `· ${review.reviewDate}` : ""}
              </div>
            </div>
          </div>

          {lead && (
            <div className="prose">
              <p className="drop-cap">{lead}</p>
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pull quote */}
      {body.length > 0 && (
        <section style={{ padding: "40px 0 80px" }}>
          <div className="container-jr" style={{ maxWidth: 1000 }}>
            <div
              className="text-center"
              style={{
                borderTop: "1px solid var(--color-rule-strong)",
                borderBottom: "1px solid var(--color-rule-strong)",
                padding: "60px 0",
              }}
            >
              <div className="kicker mb-5">A Note</div>
              <blockquote
                className="display display-italic text-balance"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 50px)",
                  lineHeight: 1.22,
                }}
              >
                &ldquo;{verdict}&rdquo;
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {photos.length > 1 && (
        <section style={{ padding: "40px 0 80px" }}>
          <div className="container-jr">
            <div
              className="between"
              style={{ marginBottom: 32, alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}
            >
              <div>
                <div className="kicker mb-3">Photo Notes</div>
                <h3 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                  From the visit.
                </h3>
              </div>
              <div className="meta">
                Photographed by Brandon Johnson · {photos.length} photos
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gridAutoRows: 180,
                gap: 16,
              }}
              className="gallery-grid"
            >
              {photos.slice(0, 6).map((src, i) => {
                const layouts = [
                  { gridColumn: "span 4", gridRow: "span 2" },
                  { gridColumn: "span 2", gridRow: "span 1" },
                  { gridColumn: "span 2", gridRow: "span 1" },
                  { gridColumn: "span 2", gridRow: "span 2" },
                  { gridColumn: "span 2", gridRow: "span 2" },
                  { gridColumn: "span 2", gridRow: "span 2" },
                ];
                return (
                  <div key={src} className="photo group" style={layouts[i]}>
                    <Image
                      src={src}
                      alt={`${review!.businessName} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      quality={80}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="caption"
              style={{ marginTop: 20, justifyContent: "space-between" }}
            >
              <span>
                <span className="num">N° {String(photos.length).padStart(2, "0")}</span>{" "}
                Plates, rooms, and moments from the visit
              </span>
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html: `@media (max-width: 900px) {
                  .gallery-grid {
                    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                    grid-auto-rows: 200px !important;
                  }
                  .gallery-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
                }`,
              }}
            />
          </div>
        </section>
      )}

      {/* Particulars */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="container-jr" style={{ maxWidth: 1000 }}>
          <div
            style={{
              background: "var(--color-bg-raised)",
              border: "1px solid var(--color-rule)",
              padding: "60px",
            }}
            className="particulars"
          >
            <div className="kicker mb-8">The Particulars</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 40,
              }}
              className="particulars-grid"
            >
              {[
                ["Address", review.address ?? "—"],
                ["Section", review.category ?? "Field Review"],
                ["Visited", review.reviewDate ?? "—"],
                ["Score", `${score.toFixed(1)} / 10`],
                ["Visits", "Multiple"],
                ["Notable", "Family-friendly notes available on request"],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="meta">{label}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 19,
                      marginTop: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: "1px solid var(--color-rule)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div>
                <div className="meta">Our Verdict</div>
                <div
                  className="display display-italic"
                  style={{
                    fontSize: 28,
                    marginTop: 8,
                    color: "var(--color-accent)",
                  }}
                >
                  {verdict}
                </div>
              </div>
              <Link href="/reviews" className="btn">
                More Reviews <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @media (max-width: 768px) {
                  .particulars { padding: 32px !important; }
                  .particulars-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
                }
              `,
            }}
          />
        </div>
      </section>

      {/* Signature */}
      <section style={{ padding: "40px 0 100px" }}>
        <div
          className="container-jr text-center"
          style={{ maxWidth: 760 }}
        >
          <div className="meta mb-3">— End of review —</div>
          <div className="signature" style={{ fontSize: 40 }}>
            Brandon J.
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section
          style={{
            padding: "60px 0 100px",
            borderTop: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-jr">
            <div className="kicker mb-6">More From The Field</div>
            <h3
              className="display mb-12"
              style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
            >
              Related{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-ink-dim)" }}
              >
                reviews.
              </span>
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                columnGap: 48,
                rowGap: 80,
              }}
              className="post-grid"
            >
              {related.slice(0, 3).map((r) => (
                <ReviewCard key={r.id} review={r as unknown as Record<string, unknown>} />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterInline compact />
    </article>
  );
}
