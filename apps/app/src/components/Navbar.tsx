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
      {/* Wordmark — Cormorant Garamond, editorial style */}
      <Link href="/" className="flex-shrink-0 group">
        <span
          className="text-[#352F2C] text-xl tracking-[0.12em] uppercase transition-colors group-hover:text-[#52A3A9]"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 600, letterSpacing: "0.14em" }}
        >
          Johnson Reviews
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-7">
        {navbarItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={cn(
              "text-xs font-normal uppercase tracking-[0.12em] transition-colors whitespace-nowrap",
              pathname === item.path
                ? "text-[#52A3A9] border-b border-[#52A3A9] pb-0.5"
                : "text-[#6C6864] hover:text-[#52A3A9]"
            )}
            style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right — search icon */}
      <div className="hidden lg:flex items-center gap-3">
        <button
          onClick={openSearch}
          className="p-2 text-[#6C6864] hover:text-[#52A3A9] transition-colors cursor-pointer rounded-full hover:bg-[#CFD6D9]/30"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={openSearch}
          className="p-2 text-[#6C6864] hover:text-[#52A3A9] transition-colors cursor-pointer rounded-full"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-[#352F2C]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-[#CFD6D9] z-50 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col p-5 gap-5">
              {navbarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-xs uppercase tracking-[0.12em] font-normal py-1",
                    pathname === item.path ? "text-[#52A3A9]" : "text-[#6C6864]"
                  )}
                  style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
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
