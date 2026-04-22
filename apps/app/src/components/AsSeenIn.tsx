import React from "react";

const credentials = [
  { label: "Google Local Guide", value: "Level 10" },
  { label: "Google Maps", value: "500+ reviews" },
  { label: "Photos contributed", value: "27,000+" },
  { label: "Based in", value: "Orange County, CA" },
];

/**
 * Credentials strip under the hero. Replaces the previous "As Seen In" logo
 * bar, which implied press coverage Brandon hasn't actually received. Text-
 * only is honest (every stat is verifiable on his Google Maps profile),
 * self-hosted (no third-party image dependency), and on-brand.
 */
export const AsSeenIn = () => {
  return (
    <section
      className="py-14 px-6 md:px-12"
      style={{
        backgroundColor: "#0e0e0e",
        borderTop: "1px solid rgba(77,70,53,0.15)",
        borderBottom: "1px solid rgba(77,70,53,0.15)",
      }}
      aria-label="Brandon Johnson credentials"
    >
      <div className="max-w-[1440px] mx-auto">
        <p
          className="text-center mb-8"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "#99907c",
          }}
        >
          Built on a decade of public reviews
        </p>
        <ul className="flex flex-wrap items-stretch justify-center gap-x-12 gap-y-8 md:gap-x-16 list-none">
          {credentials.map((c) => (
            <li key={c.label} className="text-center">
              <p
                className="font-bold mb-2"
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                  color: "#f2ca50",
                  lineHeight: 1,
                }}
              >
                {c.value}
              </p>
              <p
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: "#99907c",
                }}
              >
                {c.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
