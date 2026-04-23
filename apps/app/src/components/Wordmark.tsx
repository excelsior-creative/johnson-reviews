import React from "react";

export function Wordmark({
  size = 22,
  subtitle = "Reviews · Est. 2019",
}: {
  size?: number;
  subtitle?: string;
}) {
  return (
    <div className="text-center">
      <div className="wordmark" style={{ fontSize: size }}>
        Johnson <span className="amp">&amp;</span> Co.
      </div>
      {subtitle && <div className="wordmark-sub">{subtitle}</div>}
    </div>
  );
}
