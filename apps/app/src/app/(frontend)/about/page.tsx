import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NewsletterInline } from "@/components/NewsletterInline";

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className="page-body">
      {/* Editorial split intro */}
      <section style={{ padding: "120px 0 80px" }}>
        <div className="container-jr">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
            className="about-grid"
          >
            <div>
              <div className="kicker rise mb-7">About the Publication</div>
              <h1
                className="display rise-1 text-balance"
                style={{ fontSize: "clamp(48px, 6.5vw, 96px)" }}
              >
                An independent review publication,{" "}
                <span
                  className="display-italic"
                  style={{ color: "var(--color-accent)" }}
                >
                  run by one person.
                </span>
              </h1>
              <p
                className="rise-2 italic text-pretty"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  color: "var(--color-ink-dim)",
                  marginTop: 32,
                  lineHeight: 1.55,
                }}
              >
                Johnson &amp; Co. is the review project of Brandon Johnson — a
                Google Maps Level 10 Local Guide with 500+ reviews, 27,000+
                original photos, and 132 million photo views. Started in 2019 as
                a personal notebook, it&rsquo;s now a working publication.
              </p>
            </div>
            <div className="rise-2 photo" style={{ aspectRatio: "4 / 5" }}>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
                alt="Brandon Johnson"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "80px 0",
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-jr">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 40,
            }}
            className="stats-grid"
          >
            {[
              ["500+", "Reviews published"],
              ["27,000+", "Original photographs"],
              ["132M+", "Photo views"],
              ["Level 10", "Google Local Guide"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  className="display"
                  style={{
                    fontSize: "clamp(36px, 4vw, 64px)",
                    color: "var(--color-accent)",
                  }}
                >
                  {n}
                </div>
                <div
                  className="meta"
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid var(--color-rule)",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section style={{ padding: "120px 0" }}>
        <div className="container-jr" style={{ maxWidth: 760 }}>
          <div className="kicker mb-8">The Method</div>
          <h2
            className="display"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            How we{" "}
            <span
              className="display-italic"
              style={{ color: "var(--color-accent)" }}
            >
              do this.
            </span>
          </h2>
          <div className="prose" style={{ marginTop: 48 }}>
            <p className="drop-cap">
              Every place written about on this site has been visited at our own
              expense. We don&rsquo;t take press trips. We don&rsquo;t accept
              comped meals. We don&rsquo;t run sponsored content or affiliate
              links. This is the editorial line, and it isn&rsquo;t going to
              change.
            </p>
            <p>
              We usually visit a place more than once before writing about it.
              For restaurants, we aim for at least two visits — enough to see
              the kitchen on a regular night and on a busy one. For hotels, we
              stay a minimum of two nights.
            </p>
            <p>
              Scores are a 10-point scale, calibrated against the full archive.
              A 9+ means we&rsquo;d rearrange a trip to go back. An 8-range
              score is a confident recommendation. Anything below 7, we
              generally don&rsquo;t publish.
            </p>
          </div>
        </div>
      </section>

      {/* Three principles */}
      <section
        style={{
          padding: "80px 0 120px",
          background: "var(--color-bg-raised)",
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-jr">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 60,
            }}
            className="principles-grid"
          >
            {[
              [
                "No Sponsors.",
                "Every visit is paid for by us. No free meals, no press trips, no “experiences” gifted in exchange for coverage.",
              ],
              [
                "No Affiliates.",
                "No booking links, no referral commissions, no Amazon tags. When we point you somewhere, we have no financial stake in it.",
              ],
              [
                "No Shortcuts.",
                "We revisit before we re-publish. Scores update when places change. Reviews get edited when we’re wrong.",
              ],
            ].map(([t, d]) => (
              <div key={t}>
                <div
                  className="display"
                  style={{ fontSize: 36, marginBottom: 16 }}
                >
                  {t.slice(0, -1)}
                  <span style={{ color: "var(--color-accent)" }}>.</span>
                </div>
                <div
                  className="text-pretty"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17,
                    color: "var(--color-ink-dim)",
                    lineHeight: 1.55,
                  }}
                >
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editor note */}
      <section style={{ padding: "120px 0" }}>
        <div
          className="container-jr text-center"
          style={{ maxWidth: 760 }}
        >
          <div className="kicker mb-8">A Note from the Editor</div>
          <p
            className="italic text-pretty"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 24,
              lineHeight: 1.55,
              color: "var(--color-ink),",
            }}
          >
            I started writing these reviews for myself and for friends who kept
            asking. I kept writing them because it turned out to be the kind of
            work that pays attention back. If you&rsquo;ve read this far, thank
            you. If you ever want to argue with a score, the address is in the
            footer.
          </p>
          <div style={{ marginTop: 48 }}>
            <div className="signature" style={{ fontSize: 44 }}>
              Brandon J.
            </div>
            <div className="meta" style={{ marginTop: 12 }}>
              Editor · Orange County, California
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <Link href="/contact" className="btn">
              Get in touch <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <NewsletterInline compact />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              .principles-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              .stats-grid { grid-template-columns: 1fr 1fr !important; row-gap: 40px !important; }
            }
          `,
        }}
      />
    </div>
  );
}
