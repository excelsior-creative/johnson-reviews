"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Search } from "lucide-react";
import { useSearch } from "./SearchProvider";

const navbarItems = [
  { name: "About", path: "/about" },
  { name: "Restaurants", path: "/blog?category=restaurants" },
  { name: "Hotels & Resorts", path: "/blog?category=hotels-resorts" },
  { name: "Shopping", path: "/blog?category=shopping" },
  { name: "Entertainment", path: "/blog?category=entertainment" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { openSearch } = useSearch();

  return (
    <nav className="relative w-full flex justify-between items-center py-5 px-4 md:px-8">
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        {/* Text logo fallback - matches the white SVG logo style */}
        <span
          className="text-white text-xl font-bold tracking-wide"
          style={{ fontFamily: '"Oswald", sans-serif' }}
        >
          JOHNSON REVIEWS
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-6">
        {navbarItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={cn(
              "text-sm font-medium transition-colors whitespace-nowrap hover:text-[#DB7D2D]",
              pathname === item.path ? "text-[#DB7D2D]" : "text-white/80"
            )}
            style={{ fontFamily: '"Jost", sans-serif' }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right side icons */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={openSearch}
          className="p-2 text-white/70 hover:text-[#DB7D2D] transition-colors cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile hamburger */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={openSearch}
          className="p-2 text-white/70 hover:text-[#DB7D2D] transition-colors cursor-pointer rounded-full"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#191A1B] border-b border-white/10 z-50 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navbarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-1",
                    pathname === item.path ? "text-[#DB7D2D]" : "text-white/80"
                  )}
                  style={{ fontFamily: '"Jost", sans-serif' }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
