"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { useSearch } from "./SearchProvider";
import { Wordmark } from "./Wordmark";

const leftLinks = [
  { name: "Restaurants", path: "/blog?category=restaurants" },
  { name: "Hotels", path: "/blog?category=hotels-resorts" },
  { name: "Travel", path: "/blog?category=entertainment" },
];

const rightLinks = [
  { name: "Reviews", path: "/reviews" },
  { name: "Journal", path: "/blog" },
  { name: "About", path: "/about" },
];

const allLinks = [...leftLinks, ...rightLinks];

function isActive(pathname: string, search: string, path: string) {
  const [base, query] = path.split("?");
  if (query) {
    const expected = new URLSearchParams(query).get("category");
    const current = new URLSearchParams(search).get("category");
    return pathname.startsWith(base) && expected === current;
  }
  return pathname === base || (base !== "/" && pathname.startsWith(base + "/"));
}

export const Navbar = () => {
  const pathname = usePathname() ?? "/";
  const [search] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { openSearch } = useSearch();

  return (
    <header className="relative z-50">
      {/* Issue bar */}
      <div className="issue-bar">
        <div className="container-jr between" style={{ paddingBlock: 8 }}>
          <span>Issue № XLVII · April MMXXVI</span>
          <span className="hidden md:inline">Orange County · California</span>
          <span>72°F · Clear</span>
        </div>
      </div>

      {/* Sticky nav */}
      <nav className="nav-jr">
        <div className="container-jr">
          <div
            className="nav-inner"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              padding: "18px 0",
              gap: 24,
            }}
          >
            {/* Left section links */}
            <div className="nav-left flex items-center gap-7">
              {leftLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.path}
                  className={`nav-link ${isActive(pathname, search, l.path) ? "active" : ""}`}
                >
                  {l.name}
                </Link>
              ))}
            </div>

            {/* Center wordmark */}
            <Link href="/" aria-label="Johnson & Co. — Home" className="block">
              <Wordmark />
            </Link>

            {/* Right utility */}
            <div className="nav-right flex items-center gap-7 justify-end">
              {rightLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.path}
                  className={`nav-link ${isActive(pathname, search, l.path) ? "active" : ""}`}
                >
                  {l.name}
                </Link>
              ))}
              <button
                onClick={openSearch}
                className="nav-link search inline-flex items-center"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden nav-link"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
              style={{
                background: "var(--color-bg-raised)",
                borderTop: "1px solid var(--color-rule)",
              }}
            >
              <div className="container-jr py-8 flex flex-col gap-5">
                {allLinks.map((l) => (
                  <Link
                    key={l.name}
                    href={l.path}
                    onClick={() => setIsOpen(false)}
                    className={`nav-link ${isActive(pathname, search, l.path) ? "active" : ""}`}
                    style={{ fontSize: 12 }}
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
