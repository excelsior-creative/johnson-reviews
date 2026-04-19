"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Local Guide Level", prefix: "", value: 10, suffix: "+" },
  { label: "Photo Views", prefix: "", value: 132010497, suffix: "+" },
  { label: "Guide Points", prefix: "", value: 112222, suffix: "+" },
  { label: "Photos Shared", prefix: "", value: 27497, suffix: "+" },
  { label: "Reviews Published", prefix: "", value: 500, suffix: "+" },
];

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

interface StatCardProps {
  label: string;
  prefix: string;
  value: number;
  suffix: string;
  inView: boolean;
}

const StatCard = ({ label, prefix, value, suffix, inView }: StatCardProps) => {
  const count = useCounter(value, 2000, inView);
  return (
    <div className="text-left">
      <p
        className="font-bold tracking-tighter mb-3"
        style={{
          fontFamily: '"Noto Serif", serif',
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          color: "#f2ca50",
          lineHeight: "1",
        }}
      >
        {prefix}
        {formatNumber(count)}
        {suffix}
      </p>
      <div
        className="h-[1px] w-10 mb-3"
        style={{ backgroundColor: "#4d4635" }}
      />
      <p
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "#99907c",
        }}
      >
        {label}
      </p>
    </div>
  );
};

export const QuickStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#131313" }}
      id="stats"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <span
            className="block mb-4"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#f2ca50",
            }}
          >
            The Sommelier&rsquo;s Ledger
          </span>
          <h2
            className="font-bold max-w-3xl"
            style={{
              fontFamily: '"Noto Serif", serif',
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#e5e2e1",
              lineHeight: "1.05",
            }}
          >
            A Quiet Tally of Crossings.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
