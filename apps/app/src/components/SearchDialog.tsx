"use client";

import { AnimatePresence, m } from "framer-motion";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

type SearchResult = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  status: string;
};

type SearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 120);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/search?where[status][equals]=published&where[title][contains]=${encodeURIComponent(query)}&limit=5`,
        );
        const data = (await response.json()) as { docs: SearchResult[] };
        setResults(data.docs || []);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="fixed inset-0 z-[100] flex items-start justify-center"
          style={{
            padding: "10vh 16px 16px",
            background: "rgba(15, 13, 11, 0.85)",
            backdropFilter: "blur(14px) saturate(120%)",
          }}
          onClick={onClose}
        >
          <m.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full"
            style={{
              maxWidth: 640,
              background: "var(--color-bg-raised)",
              border: "1px solid var(--color-rule-strong)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--color-rule)",
                gap: 14,
              }}
            >
              <Search
                size={18}
                style={{ color: "var(--color-ink-mute)", flexShrink: 0 }}
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search reviews, restaurants, cities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none italic"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  color: "var(--color-ink)",
                }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="transition-colors"
                style={{ color: "var(--color-ink-mute)" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "60vh", padding: 8 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center" style={{ padding: "48px 0" }}>
                  <Loader2
                    size={20}
                    className="animate-spin"
                    style={{ color: "var(--color-accent)" }}
                  />
                </div>
              ) : query && results.length === 0 ? (
                <div
                  className="italic text-center"
                  style={{
                    padding: "48px 24px",
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-ink-dim)",
                    fontSize: 18,
                  }}
                >
                  Nothing matches &ldquo;{query}&rdquo;. Try another spelling?
                </div>
              ) : results.length > 0 ? (
                <div>
                  {results.map((result, i) => (
                    <Link
                      key={result.id}
                      href={`/blog/${result.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between"
                      style={{
                        padding: "18px 16px",
                        borderBottom:
                          i < results.length - 1
                            ? "1px solid var(--color-rule)"
                            : "none",
                        transition: "background-color 0.2s, padding 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(196, 169, 97, 0.06)";
                        e.currentTarget.style.paddingLeft = "24px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.paddingLeft = "16px";
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          className="group-hover:text-[color:var(--color-accent)] transition-colors"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: 20,
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {result.title}
                        </div>
                        {result.excerpt && (
                          <div
                            className="italic"
                            style={{
                              marginTop: 4,
                              fontFamily: "var(--font-serif)",
                              fontSize: 14,
                              color: "var(--color-ink-dim)",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {result.excerpt}
                          </div>
                        )}
                      </div>
                      <ArrowRight
                        size={16}
                        className="arrow"
                        style={{ color: "var(--color-ink-mute)", flexShrink: 0 }}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  className="italic text-center"
                  style={{
                    padding: "48px 24px",
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-ink-mute)",
                    fontSize: 16,
                  }}
                >
                  Try a restaurant name, a city, or a cuisine.
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between meta"
              style={{
                padding: "14px 24px",
                borderTop: "1px solid var(--color-rule)",
                background: "var(--color-bg-card)",
              }}
            >
              <span>Search · Johnson & Co.</span>
              <span>
                <kbd
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "2px 6px",
                    border: "1px solid var(--color-rule-strong)",
                    marginRight: 6,
                  }}
                >
                  ESC
                </kbd>
                to close
              </span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default SearchDialog;
