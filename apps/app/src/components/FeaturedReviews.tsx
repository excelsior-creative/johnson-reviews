import React from "react";
import { getPayload } from "payload";
import config from "@/payload.config";
import { Post } from "@/payload-types";
import { PostCard } from "./PostCard";

/**
 * Two-up "Also This Month" — horizontal editorial cards drawn
 * from the most recent published posts.
 */
export const FeaturedReviews = async () => {
  const payload = await getPayload({ config });

  const { docs: posts } = await payload.find({
    collection: "posts",
    sort: "-publishedDate",
    limit: 2,
    where: { _status: { equals: "published" } },
  });

  if (posts.length === 0) return null;

  return (
    <section style={{ padding: "40px 0 120px" }}>
      <div className="container-jr">
        <div
          className="between"
          style={{ marginBottom: 40, alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
        >
          <div className="kicker">Also This Month</div>
          <div
            className="meta italic"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink-dim)", textTransform: "none", letterSpacing: 0, fontSize: 16 }}
          >
            Two more places worth your evening.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
          }}
          className="featured-grid"
        >
          {(posts as Post[]).map((post) => (
            <PostCard key={post.id} post={post} variant="horizontal" />
          ))}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `@media (max-width: 900px) { .featured-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`,
          }}
        />
      </div>
    </section>
  );
};
