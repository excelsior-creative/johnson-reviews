"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Search } from "lucide-react";
import { useSearch } from "./SearchProvider";

const navbarItems = [
  { name: "Reviews", path: "/blog" },
  { name: "Restaurants", path: "/blog?category=restaurants" },
  { name: "Hotels", path: "/blog?category=hotels-resorts" },
  { name: "Entertainment", path: "/blog?category=entertainment" },
  { name: "About", path: "/about" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { openSearch } = useSearch();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(19,19,19,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 4px 48px rgba(229,226,225,0.06)",
      }}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-5 md:py-6 max-w-[1920px] mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="font-bold tracking-tighter hover:opacity-90 transition-opacity"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "clamp(1.25rem, 2vw, 1.875rem)",
            color: "#f2ca50",
          }}
        >
          Johnson Reviews
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navbarItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path.split("?")[0]));
            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "transition-colors duration-300 whitespace-nowrap",
                  isActive
                    ? "text-[#f2ca50] border-b-2 border-[#d4af37] pb-1"
                    : "text-[#e5e2e1] hover:text-[#d4af37]"
                )}
                style={{
                  fontFamily: '"Noto Serif", serif',
                  fontSize: "1.05rem",
                  letterSpacing: "0.015em",
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={openSearch}
            className="flex items-center gap-3 transition-colors border-b pb-1 pr-2"
            style={{ borderColor: "rgba(77,70,53,0.8)" }}
            aria-label="Search"
          >
            <Search className="h-4 w-4" style={{ color: "#99907c" }} />
            <span
              className="hidden xl:inline"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "rgba(229,226,225,0.6)",
              }}
            >
              Search
            </span>
          </button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={openSearch}
            className="p-2 text-[#e5e2e1]/70 hover:text-[#f2ca50] transition-colors"
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
              background: "rgba(19,19,19,0.98)",
              borderTop: "1px solid rgba(77,70,53,0.4)",
            }}
          >
            <div className="flex flex-col p-8 gap-6">
              {navbarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "transition-colors",
                    pathname === item.path
                      ? "text-[#f2ca50]"
                      : "text-[#e5e2e1] hover:text-[#f2ca50]"
                  )}
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.25rem",
                  }}
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
