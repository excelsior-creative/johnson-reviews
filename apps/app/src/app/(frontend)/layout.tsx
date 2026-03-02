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
      style={{ backgroundColor: "#191A1B", color: "#ffffff" }}
    >
      <Providers>
        <SearchProvider>
          {/* Navbar — full width, no container constraint (matches reference) */}
          <div className="w-full bg-[#191A1B] border-b border-white/10">
            <div className="max-w-[1200px] mx-auto">
              <Navbar />
            </div>
          </div>
          <main className="flex-grow bg-[#191A1B]">
            {children}
          </main>
          <Footer />
        </SearchProvider>
      </Providers>
    </div>
  );
}
