import React from "react";

interface ScoreDiscProps {
  score: number;
  size?: "sm" | "md" | "lg";
  /** Score is on a 0-10 scale. Pass `outOf` to render a different denominator (e.g. 5). */
  outOf?: number;
}

export function ScoreDisc({ score, size = "md", outOf = 10 }: ScoreDiscProps) {
  const cls = size === "md" ? "score-disc" : `score-disc ${size}`;
  return (
    <div className={cls}>
      <div className="score">{score.toFixed(1)}</div>
      <div className="of">Out of {outOf}</div>
    </div>
  );
}
