import React from "react";
import { Hero } from "@/components/Hero";
import { FeaturedReviews } from "@/components/FeaturedReviews";
import { TrendingDestinations } from "@/components/TrendingDestinations";
import { BlogSection } from "@/components/BlogSection";
import { CTASection } from "@/components/CTASection";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "#131313" }}>
      {/* 1. Hero — full-height dark hero */}
      <Hero />

      {/* 2. Editor's Choice — featured reviews */}
      <FeaturedReviews />

      {/* 3. Trending Destinations — numbered grid */}
      <TrendingDestinations />

      {/* 4. Latest Reviews — blog post grid */}
      <BlogSection title="Latest Reviews" limit={6} />

      {/* 5. Private Collection CTA — dark luxury email invite */}
      <CTASection />
    </div>
  );
}
