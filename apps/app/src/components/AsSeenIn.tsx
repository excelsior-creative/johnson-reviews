import React from "react";

const pressLogos = [
  {
    name: "Google Local Guides",
    src: "https://brandonj117.sg-host.com/wp-content/uploads/2021/03/220-2209071_a-special-offer-from-google-local-guides-google.png",
  },
  {
    name: "OpenTable",
    src: "https://brandonj117.sg-host.com/wp-content/uploads/2021/03/OTLogo_fullhor_r1a-01-2.png",
  },
  {
    name: "Yelp",
    src: "https://brandonj117.sg-host.com/wp-content/uploads/2023/08/yelp.png",
  },
  {
    name: "Google Local Guides",
    src: "https://brandonj117.sg-host.com/wp-content/uploads/2023/08/220-2209071_a-special-offer-from-google-local-guides-google-1.png",
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
        <div className="kicker text-center mb-8">As Seen In</div>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {pressLogos.map((logo, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="press-logo"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .press-logo {
                height: 28px;
                width: auto;
                object-fit: contain;
                opacity: 0.5;
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
