import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  italicPart?: string;
}

/**
 * Page-level section header used on inner routes (about, blog, contact, etc.).
 * Renders in the editorial typography system: kicker eyebrow, large serif
 * title with optional italic accent line, and subtitle.
 */
const Header = ({
  className,
  title,
  subtitle,
  badge,
  italicPart,
}: HeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start space-y-7 mb-16 md:mb-20",
        className,
      )}
    >
      {badge && (
        <div className="kicker rise inline-flex items-center gap-3">
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 24,
              height: 1,
              background: "var(--color-accent)",
            }}
          />
          {badge}
        </div>
      )}
      {title && (
        <h1
          className="display rise-1 text-balance"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            maxWidth: "18ch",
          }}
        >
          {title}
          {italicPart && (
            <>
              {" "}
              <span
                className="display-italic"
                style={{ color: "var(--color-accent)" }}
              >
                {italicPart}
              </span>
            </>
          )}
        </h1>
      )}
      {subtitle && (
        <p
          className="rise-2 italic max-w-3xl text-pretty"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(17px, 1.4vw, 22px)",
            color: "var(--color-ink-dim)",
            lineHeight: 1.55,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
