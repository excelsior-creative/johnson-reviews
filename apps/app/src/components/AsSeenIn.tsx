import React from "react";

const pressLogos = [
  {
    name: "Google Local Guides",
    src: "/images/press/google-local-guides.png",
  },
  {
    name: "OpenTable",
    src: "/images/press/opentable.png",
  },
  {
    name: "Yelp",
    src: "/images/press/yelp.png",
  },
];

export const AsSeenIn = () => {
  return (
    <section
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: "#0e0e0e" }}
    >
      <div className="max-w-[1440px] mx-auto">
        <p
          className="text-center mb-10"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "#99907c",
          }}
        >
          As Seen In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {pressLogos.map((logo, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-7 md:h-9 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-500 grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
