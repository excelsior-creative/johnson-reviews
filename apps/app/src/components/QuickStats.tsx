"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Local Guides Level", prefix: "Level ", value: 10, suffix: "+" },
  { label: "Photo Views", prefix: "", value: 132010497, suffix: "+" },
  { label: "Local Guide Points", prefix: "", value: 112222, suffix: "+" },
  { label: "Photos Shared", prefix: "", value: 27497, suffix: "+" },
  { label: "Reviews", prefix: "", value: 500, suffix: "+" },
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
  const count = useCounter(value, 2400, inView);
  return (
    <div className="text-center px-4">
      {/* Decorative gold micro-line */}
      <div className="flex justify-center mb-4">
        <div style={{ width: 24, height: 1, background: "#D5C17A" }} />
      </div>
      <p
        className="text-[#352F2C] font-normal mb-2"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "clamp(2rem, 4vw, 3.25rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {prefix}
        {formatNumber(count)}
        {suffix}
      </p>
      <p
        className="text-[#6C6864] text-[10px] uppercase tracking-[0.22em]"
        style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 400 }}
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
      className="relative py-20 md:py-28 overflow-hidden"
      id="stats"
      style={{ backgroundColor: "#F4DDCD", backgroundImage: "none" }}
    >
      {/* Very subtle blush texture blob — desaturated */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://brandonj117.sg-host.com/wp-content/uploads/2021/03/blob_bgnd-1.png)",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(1) brightness(1.4)",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p
            className="text-[#52A3A9] text-[10px] uppercase tracking-[0.32em] mb-4"
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            By the Numbers
          </p>
          <h2
            className="text-[#352F2C]"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            A Legacy of Discovery
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ width: 36, height: 1, background: "#D5C17A" }} />
            <svg width="5" height="5" viewBox="0 0 5 5" fill="none">
              <rect x="2.5" y="0" width="3.54" height="3.54" fill="#D5C17A" transform="rotate(45 2.5 0)" />
            </svg>
            <div style={{ width: 36, height: 1, background: "#D5C17A" }} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-8">
          {stats.slice(0, 3).map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-10 max-w-xl mx-auto">
          {stats.slice(3).map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
