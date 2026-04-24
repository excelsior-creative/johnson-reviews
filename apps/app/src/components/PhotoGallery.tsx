"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryImage {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  title?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function PhotoGallery({ images, title = "From the visit." }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goPrev, goNext]);

  if (!images || images.length === 0) return null;

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <section>
      <div
        className="between"
        style={{ marginBottom: 32, alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}
      >
        <div>
          <div className="kicker mb-3">Photo Notes</div>
          <h3 className="display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>
            {title}
          </h3>
        </div>
        <div className="meta">
          {images.length} photo{images.length !== 1 ? "s" : ""} · Click to enlarge
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gridAutoRows: 180,
          gap: 16,
        }}
        className="gallery-grid"
      >
        {images.map((img, i) => {
          const layouts = [
            { gridColumn: "span 4", gridRow: "span 2" },
            { gridColumn: "span 2", gridRow: "span 1" },
            { gridColumn: "span 2", gridRow: "span 1" },
            { gridColumn: "span 2", gridRow: "span 2" },
            { gridColumn: "span 2", gridRow: "span 2" },
            { gridColumn: "span 2", gridRow: "span 2" },
          ];
          const layout = layouts[i] ?? { gridColumn: "span 2", gridRow: "span 1" };
          return (
            <button
              key={i}
              type="button"
              className="photo group"
              style={{ ...layout, cursor: "zoom-in" }}
              onClick={() => openLightbox(i)}
              aria-label={`View photo ${i + 1}${img.caption ? `: ${img.caption}` : ""}`}
            >
              <Image
                src={img.url}
                alt={img.alt || img.caption || `Gallery photo ${i + 1}`}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="gallery-scrim"
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(15,13,11,0) 60%, rgba(15,13,11,0.55) 100%)",
                  opacity: 0,
                  transition: "opacity 0.35s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ZoomIn
                  size={28}
                  style={{
                    color: "var(--color-accent)",
                    opacity: 0.9,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .gallery-grid button:hover .gallery-scrim { opacity: 1; }
            @media (max-width: 900px) {
              .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-auto-rows: 200px !important; }
              .gallery-grid > button { grid-column: span 1 !important; grid-row: span 1 !important; }
            }
          `,
        }}
      />

      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(15, 13, 11, 0.95)", backdropFilter: "blur(8px)" }}
            onClick={closeLightbox}
          >
            {/* Counter */}
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 meta"
              style={{ color: "var(--color-ink-dim)" }}
            >
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute top-5 right-5 p-2 transition-colors"
              style={{ color: "var(--color-ink-dim)" }}
            >
              <X size={24} />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-6 p-3 transition-colors"
                style={{ color: "var(--color-ink-dim)" }}
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next photo"
                className="absolute right-6 p-3 transition-colors"
                style={{ color: "var(--color-ink-dim)" }}
              >
                <ChevronRight size={28} />
              </button>
            )}

            <m.div
              key={lightboxIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex flex-col items-center"
              style={{ maxWidth: "90vw", maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.url}
                alt={currentImage.alt || currentImage.caption || "Gallery photo"}
                className="max-w-full"
                style={{
                  maxHeight: "78vh",
                  objectFit: "contain",
                }}
              />
              {currentImage.caption && (
                <p
                  className="italic text-pretty"
                  style={{
                    marginTop: 14,
                    fontFamily: "var(--font-serif)",
                    fontSize: 15,
                    color: "var(--color-ink-dim)",
                    textAlign: "center",
                    maxWidth: 640,
                    padding: "0 16px",
                  }}
                >
                  {currentImage.caption}
                </p>
              )}
            </m.div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto"
                style={{ maxWidth: "90vw", padding: "4px 16px" }}
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(i);
                    }}
                    aria-label={`Go to photo ${i + 1}`}
                    style={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      overflow: "hidden",
                      border: `1px solid ${i === lightboxIndex ? "var(--color-accent)" : "var(--color-rule-strong)"}`,
                      opacity: i === lightboxIndex ? 1 : 0.6,
                      transition: "opacity 0.2s, border-color 0.2s",
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`Thumbnail ${i + 1}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
