import React from "react";
import { cn } from "@/lib/utils";

const Header = ({
  className,
  title,
  subtitle,
  badge,
}: {
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start space-y-6 mb-16 md:mb-20 tracking-tight",
        className
      )}
    >
      {badge && (
        <div className="inline-flex items-center gap-4">
          <span
            className="block h-[1px] w-12"
            style={{ backgroundColor: "#f2ca50" }}
          />
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "#f2ca50",
            }}
          >
            {badge}
          </span>
        </div>
      )}
      {title && (
        <h1
          className="font-bold leading-[1.05]"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            color: "#e5e2e1",
          }}
        >
          {title}
        </h1>
      )}
      {subtitle && (
        <p
          className="max-w-3xl italic leading-relaxed"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "clamp(1rem, 1.25vw, 1.25rem)",
            color: "#d3c5ad",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
