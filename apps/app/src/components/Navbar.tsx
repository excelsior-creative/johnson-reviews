"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Search, Bookmark } from "lucide-react";
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-20 glass-panel"
      style={{ borderBottom: "1px solid rgba(77,70,53,0.4)" }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-headline font-bold tracking-tighter hover:opacity-80 transition-opacity"
          style={{ color: "#f2ca50", fontFamily: '"Noto Serif", serif' }}
        >
          JOHNSON REVIEWS
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navbarItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "text-xs font-label uppercase tracking-widest transition-colors whitespace-nowrap",
                "font-label",
                pathname === item.path ? "text-[#f2ca50]" : "text-[#e5e2e1]/70 hover:text-[#f2ca50]"
              )}
              style={{ fontFamily: '"Inter", sans-serif', letterSpacing: "0.15em" }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side icons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={openSearch}
            className="p-2 text-[#e5e2e1]/70 hover:text-[#f2ca50] transition-colors cursor-pointer rounded-full hover:bg-[#353535]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 transition-colors group"
            style={{ border: "1px solid rgba(77,70,53,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#f2ca50")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(77,70,53,0.5)")}
          >
            <Bookmark className="h-4 w-4 text-[#e5e2e1]/70 group-hover:text-[#f2ca50] transition-colors" />
            <span
              className="text-[10px] uppercase tracking-widest text-[#e5e2e1]/70 group-hover:text-[#f2ca50] transition-colors"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Sign In
            </span>
          </button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={openSearch}
            className="p-2 text-[#e5e2e1]/70 hover:text-[#f2ca50] transition-colors cursor-pointer rounded-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#e5e2e1]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 z-50 overflow-hidden lg:hidden"
            style={{
              background: "rgba(19,19,19,0.97)",
              borderBottom: "1px solid rgba(77,70,53,0.4)",
            }}
          >
            <div className="flex flex-col p-6 gap-5">
              {navbarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-sm uppercase tracking-widest font-label py-1 transition-colors",
                    pathname === item.path ? "text-[#f2ca50]" : "text-[#e5e2e1]/70"
                  )}
                  style={{ fontFamily: '"Inter", sans-serif' }}
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
