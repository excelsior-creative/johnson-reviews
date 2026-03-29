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
    <section className="py-8 px-4 md:px-10" style={{ backgroundColor: "#1c1b1b", borderBottom: "1px solid rgba(77,70,53,0.3)" }}>
      <div className="max-w-5xl mx-auto">
        <p
          className="text-center mb-6"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "rgba(229,226,225,0.4)",
          }}
        >
          as seen in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {pressLogos.map((logo, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
