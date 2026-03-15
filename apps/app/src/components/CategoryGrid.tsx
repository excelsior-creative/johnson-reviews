import React from "react";
import Link from "next/link";

const categories = [
  {
    name: "Restaurants",
    href: "/blog?category=restaurants",
    image: "https://brandonj117.sg-host.com/wp-content/uploads/2023/10/restaurant.jpg",
  },
  {
    name: "Hotels & Resorts",
    href: "/blog?category=hotels-resorts",
    image: "https://brandonj117.sg-host.com/wp-content/uploads/2023/10/resorts.jpg",
  },
  {
    name: "Entertainment",
    href: "/blog?category=entertainment",
    image: "https://brandonj117.sg-host.com/wp-content/uploads/2023/10/entertainment.jpg",
  },
  {
    name: "Shopping",
    href: "/blog?category=shopping",
    image: "https://brandonj117.sg-host.com/wp-content/uploads/2023/10/shopping.jpg",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className="relative group overflow-hidden"
          style={{ minHeight: "260px" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-108"
            style={{ backgroundImage: `url(${cat.image})` }}
          />
          {/* Warm overlay — taupe/blush tint */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: "linear-gradient(180deg, rgba(108,104,100,0.35) 0%, rgba(53,47,44,0.72) 100%)",
            }}
          />
          {/* Teal hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
            style={{ backgroundColor: "#52A3A9" }}
          />
          {/* Border */}
          <div className="absolute inset-0 border border-white/15" />

          {/* Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            {/* Decorative top line */}
            <div
              className="w-6 h-px bg-[#D5C17A] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <span
              className="text-white text-base text-center leading-tight tracking-[0.18em] uppercase"
              style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 300, fontSize: "13px" }}
            >
              {cat.name}
            </span>
            <div
              className="w-6 h-px bg-[#D5C17A] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </Link>
      ))}
    </section>
  );
};
