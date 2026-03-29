"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Local Guides", prefix: "Level ", value: 10, suffix: "+", span: "col" },
  { label: "Photo Views", prefix: "", value: 132010497, suffix: "+", span: "col" },
  { label: "Local Guide Points", prefix: "", value: 112222, suffix: "+", span: "col" },
  { label: "Photos Shared", prefix: "", value: 27497, suffix: "+", span: "half" },
  { label: "Reviews", prefix: "", value: 500, suffix: "+", span: "half" },
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
    <div className="text-center">
      <p
        className="text-xs font-bold uppercase tracking-[2px] mb-3"
        style={{ color: "#f2ca50", fontFamily: '"Inter", sans-serif' }}
      >
        {label}
      </p>
      <p
        className="text-4xl md:text-5xl text-white font-bold tracking-tighter"
        style={{ fontFamily: '"Noto Serif", serif' }}
      >
        {prefix}
        {formatNumber(count)}
        {suffix}
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
      className="relative py-[70px] overflow-hidden"
      style={{ backgroundColor: "#1c1b1b" }}
      id="stats"
    >
      {/* Subtle blob background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(https://brandonj117.sg-host.com/wp-content/uploads/2021/03/blob_bgnd-1.png)",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4">
        {/* Section title */}
        <h2
          className="text-center text-white text-3xl md:text-4xl font-bold uppercase mb-14 tracking-tighter"
          style={{ fontFamily: '"Noto Serif", serif' }}
        >
          Quick Stats
        </h2>

        {/* Row 1: 3 stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {stats.slice(0, 3).map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>

        {/* Row 2: 2 stats centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-0 md:px-[10%]">
          {stats.slice(3).map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};
