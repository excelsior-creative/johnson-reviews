import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { AsSeenIn } from "@/components/AsSeenIn";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BlogSection } from "@/components/BlogSection";
import { FeaturedReviews } from "@/components/FeaturedReviews";
import { QuickStats } from "@/components/QuickStats";
import { NewsletterInline } from "@/components/NewsletterInline";
import { SectionReveal } from "@/components/SectionReveal";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="page-body">
      {/* Hero — editorial split */}
      <Hero />

      {/* Press strip */}
      <SectionReveal variant="fade">
        <AsSeenIn />
      </SectionReveal>

      {/* The Latest — review grid */}
      <SectionReveal>
        <BlogSection
          badge="The Latest"
          title="Reviews"
          italicPart="this month."
          limit={6}
        />
      </SectionReveal>

      {/* Editorial method quote — full bleed */}
      <section
        style={{
          padding: "100px 0",
          background: "var(--color-bg-raised)",
          borderTop: "1px solid var(--color-rule)",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div
          className="container-jr text-center"
          style={{ maxWidth: 960, margin: "0 auto" }}
        >
          <div className="kicker mb-8">On Method</div>
          <blockquote
            className="display text-balance"
            style={{
              fontSize: "clamp(28px, 3.6vw, 52px)",
              lineHeight: 1.22,
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;We visit every place{" "}
            <span
              className="display-italic"
              style={{ color: "var(--color-accent)" }}
            >
              at our own expense
            </span>
            , often more than once. No press trips, no comped meals, no
            affiliate links. Just a long record of what we actually thought.&rdquo;
          </blockquote>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <div
              style={{ width: 40, height: 1, background: "var(--color-accent)" }}
            />
            <div className="meta">Brandon Johnson, Editor</div>
            <div
              style={{ width: 40, height: 1, background: "var(--color-accent)" }}
            />
          </div>
        </div>
      </section>

      {/* Atlas — browse by section */}
      <SectionReveal>
        <CategoryGrid />
      </SectionReveal>

      {/* Two-up featured */}
      <SectionReveal>
        <FeaturedReviews />
      </SectionReveal>

      {/* Dispatch newsletter */}
      <NewsletterInline />

      {/* Stats — counters */}
      <QuickStats />

      {/* Archive CTA */}
      <SectionReveal>
        <section style={{ padding: "120px 0" }}>
          <div className="container-jr text-center">
          <div className="kicker mb-6">Est. 2019</div>
          <h2
            className="display text-balance"
            style={{
              fontSize: "clamp(40px, 5.6vw, 80px)",
              maxWidth: "16ch",
              margin: "0 auto",
            }}
          >
            Seven years. Five hundred{" "}
            <span
              className="display-italic"
              style={{ color: "var(--color-accent)" }}
            >
              reviews.
            </span>
          </h2>
          <p
            className="italic text-pretty"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 22,
              color: "var(--color-ink-dim)",
              maxWidth: 640,
              margin: "28px auto 0",
              lineHeight: 1.5,
            }}
          >
            Every restaurant, hotel, and place we&rsquo;ve written about since
            the beginning. Filterable, searchable, sortable.
          </p>
            <div style={{ marginTop: 40 }}>
              <Link href="/reviews" className="btn">
                Enter the Archive <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
}
