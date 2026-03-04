"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

export function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", handleKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goPrev, goNext]);

  if (!images || images.length === 0) return null;

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  // Determine grid layout based on count
  const gridClass =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
      ? "grid-cols-2"
      : images.length === 3
      ? "grid-cols-3"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

  return (
    <section className="mt-12 mb-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-8 h-0.5 bg-primary inline-block" />
          {title}
        </h2>
      )}

      {/* Gallery Grid */}
      <div className={`grid ${gridClass} gap-2`}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(i)}
            aria-label={`View photo ${i + 1}${img.caption ? `: ${img.caption}` : ""}`}
          >
            <Image
              src={img.url}
              alt={img.alt || img.caption || `Gallery photo ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                size={28}
              />
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-2 text-right">
        {images.length} photo{images.length !== 1 ? "s" : ""} — click to enlarge
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm tabular-nums">
              {lightboxIndex + 1} / {images.length}
            </div>

            {/* Prev button */}
            {images.length > 1 && (
              <button
                className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next button */}
            {images.length > 1 && (
              <button
                className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.url}
                alt={currentImage.alt || currentImage.caption || "Gallery photo"}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                style={{ maxWidth: "90vw" }}
              />
              {currentImage.caption && (
                <p className="mt-3 text-white/80 text-sm text-center max-w-lg px-4">
                  {currentImage.caption}
                </p>
              )}
            </motion.div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-4 pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(i);
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                      i === lightboxIndex
                        ? "border-white scale-110"
                        : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Go to photo ${i + 1}`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
