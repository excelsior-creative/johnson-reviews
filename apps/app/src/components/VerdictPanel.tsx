import React from "react";

export interface VerdictRating {
  label: string;
  /** 0–10 score, one-decimal OK. */
  score: number;
}

interface VerdictPanelProps {
  ratings?: VerdictRating[] | null;
  overallScore?: number | null;
  heading?: string;
}

/**
 * "The Verdict" ratings panel.
 * Reference: /reference/design/johnson_reviews_review_detail_gold_edition/
 *
 * Renders a gold-accent heading, an optional overall score, and a 2x2 grid
 * of labeled rating bars. Scores are 0–10.
 *
 * Family-travel metric defaults (not haute-cuisine reference labels):
 * - Food
 * - Experience
 * - Value
 * - Kid-Friendly
 *
 * Renders nothing if no ratings are provided — graceful degradation
 * until Posts collection schema adds a `ratings` group.
 */
export const VerdictPanel = ({
  ratings,
  overallScore,
  heading = "The Verdict",
}: VerdictPanelProps) => {
  if (!ratings?.length) return null;

  return (
    <div
      className="p-10 md:p-16"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      <div className="flex items-baseline justify-between gap-6 mb-10 flex-wrap">
        <h2
          className="font-bold tracking-tight"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "#f2ca50",
          }}
        >
          {heading}
        </h2>
        {typeof overallScore === "number" && (
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#99907c",
              }}
            >
              Overall
            </span>
            <span
              className="font-bold"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "2.5rem",
                color: "#f2ca50",
                lineHeight: 1,
              }}
            >
              {overallScore.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
        {ratings.map((r) => (
          <Bar key={r.label} label={r.label} score={r.score} />
        ))}
      </div>
    </div>
  );
};

function Bar({ label, score }: { label: string; score: number }) {
  const pct = Math.max(0, Math.min(100, (score / 10) * 100));
  return (
    <div className="space-y-3">
      <div
        className="flex justify-between"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#d0c5af",
        }}
      >
        <span>{label}</span>
        <span>{score.toFixed(1)}</span>
      </div>
      <div
        className="h-[2px] w-full"
        style={{ backgroundColor: "#4d4635" }}
      >
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, #f2ca50 0%, #d4af37 100%)",
          }}
        />
      </div>
    </div>
  );
}
