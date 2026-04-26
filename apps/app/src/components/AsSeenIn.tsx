import React from "react";

// Honest framing: the only platform we can confirm Brandon writes on is
// Google Local Guides (Level 10, 500+ reviews). OpenTable + Yelp presence
// is unverified — queued as an INBOX question for Brandon. Until then
// we don't claim "As Seen In" on outlets we haven't been seen in.
const platforms = [
  {
    name: "Google Local Guides",
    src: "/press/google-local-guides.png",
    href: "https://maps.google.com/contrib",
  },
];

export const AsSeenIn = () => {
  return (
    <section
      style={{
        background: "var(--color-bg-raised)",
        borderTop: "1px solid var(--color-rule)",
        borderBottom: "1px solid var(--color-rule)",
        padding: "48px 0",
      }}
    >
      <div className="container-jr">
        <div className="kicker text-center mb-8">Where Brandon writes</div>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {platforms.map((logo) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={logo.name}
              src={logo.src}
              alt={`${logo.name} — Brandon Johnson, Level 10`}
              className="press-logo"
              loading="lazy"
              decoding="async"
            />
          ))}
          <div
            className="meta italic"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-ink-dim)",
              fontSize: 16,
              maxWidth: 380,
              textAlign: "left",
            }}
          >
            Level 10 · 500+ reviews · 27,000+ photos · 132M+ photo views.
            The site is the long-form version.
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .press-logo {
                height: 28px;
                width: auto;
                object-fit: contain;
                opacity: 0.55;
                filter: grayscale(100%);
                transition: opacity 0.4s ease, filter 0.4s ease;
              }
              .press-logo:hover { opacity: 0.95; filter: grayscale(20%); }
              @media (min-width: 768px) { .press-logo { height: 36px; } }
            `,
          }}
        />
      </div>
    </section>
  );
};
