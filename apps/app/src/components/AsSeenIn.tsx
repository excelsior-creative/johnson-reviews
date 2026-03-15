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
    <section className="bg-[#F9F7F4] py-8 px-4 md:px-10 border-b border-[#CFD6D9]/60">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow label */}
        <p
          className="text-center text-[10px] uppercase tracking-[0.38em] text-[#6C6864] mb-6"
          style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
        >
          As Seen In
        </p>
        {/* Decorative rule */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div style={{ width: 32, height: 1, background: "#D5C17A" }} />
        </div>
        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {pressLogos.map((logo, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-8 md:h-10 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
