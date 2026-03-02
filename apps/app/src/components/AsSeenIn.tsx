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
    <section className="bg-white py-6 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <p
          className="text-center text-xs uppercase tracking-[5px] text-gray-500 mb-5"
          style={{ fontFamily: '"Jost", sans-serif' }}
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
              className="h-10 md:h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
