import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { SearchProvider } from "@/components/SearchProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col"
      data-theme="frontend"
      style={{ backgroundColor: "#131313", color: "#e5e2e1" }}
    >
      <Providers>
        <SearchProvider>
          {/* Navbar — fixed, full width, glass panel */}
          <Navbar />
          {/* pt-20 to clear the 80px fixed navbar */}
          <main className="flex-grow" style={{ backgroundColor: "#131313" }}>
            {children}
          </main>
          <Footer />
        </SearchProvider>
      </Providers>
    </div>
  );
}
