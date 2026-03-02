import React from "react";
import { Hero } from "@/components/Hero";
import { AsSeenIn } from "@/components/AsSeenIn";
import { CategoryGrid } from "@/components/CategoryGrid";
import { BlogSection } from "@/components/BlogSection";
import { FeaturedReviews } from "@/components/FeaturedReviews";
import { QuickStats } from "@/components/QuickStats";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col bg-[#191A1B]">
      {/* 1. Hero — full-height dark hero with dancing script headline */}
      <Hero />

      {/* 2. As Seen In — white bar with press logos */}
      <AsSeenIn />

      {/* 3. Category Grid — 4-column photo grid */}
      <CategoryGrid />

      {/* 4. Latest Reviews — 3-col post grid, dark background */}
      <BlogSection title="Latest Reviews" limit={6} />

      {/* 5. Featured Reviews — split layout: big image left, list right */}
      <FeaturedReviews />

      {/* 6. Quick Stats — animated counters on dark bg */}
      <QuickStats />
    </div>
  );
}
