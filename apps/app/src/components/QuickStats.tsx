"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Local Guide Level", value: 10, suffix: "" },
  { label: "Photo Views", value: 132010497, suffix: "+" },
  { label: "Guide Points", value: 112222, suffix: "+" },
  { label: "Photos Shared", value: 27497, suffix: "+" },
  { label: "Reviews Published", value: 500, suffix: "+" },
];

function formatNumber(n: number) {
  return n.toLocaleString("en-US");
}

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(target);
      return;
    }
    let raf = 0;
    let startTime: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(ease(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

const StatCard = ({
  label,
  value,
  suffix,
  inView,
}: {
  label: string;
  value: number;
  suffix: string;
  inView: boolean;
}) => {
  const count = useCounter(value, 1800, inView);
  return (
    <div>
      <div
        className="display"
        style={{
          fontSize: "clamp(36px, 4vw, 56px)",
          color: "var(--color-accent)",
          letterSpacing: "-0.02em",
        }}
      >
        {formatNumber(count)}
        {suffix}
      </div>
      <div
        className="meta"
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid var(--color-rule)",
        }}
      >
        {label}
      </div>
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
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "100px 0",
        background: "var(--color-bg-raised)",
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <div className="container-jr">
        <div
          className="between"
          style={{ marginBottom: 64, alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}
        >
          <div>
            <div className="kicker" style={{ marginBottom: 12 }}>
              From the field, since MMXIX
            </div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
              Years of reviews,{" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-ink-dim)" }}
              >
                photos, and visits.
              </span>
            </h2>
          </div>
          <div
            className="meta italic"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink-dim)", textTransform: "none", letterSpacing: 0, fontSize: 16 }}
          >
            Drawn from Brandon&rsquo;s Google Local Guide profile.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 32,
          }}
          className="stats-grid"
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} inView={inView} />
          ))}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; row-gap: 48px !important; } }
              @media (max-width: 640px)  { .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; row-gap: 40px !important; } }
            `,
          }}
        />
      </div>
    </section>
  );
};
