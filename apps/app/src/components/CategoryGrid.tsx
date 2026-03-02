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
          style={{ minHeight: "240px" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${cat.image})` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
          {/* Border overlay */}
          <div className="absolute inset-0 border border-white/20" />
          {/* Label */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <span
              className="text-white text-xl font-bold text-center leading-tight"
              style={{ fontFamily: '"Jost", sans-serif', fontWeight: 700 }}
            >
              {cat.name}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
};
