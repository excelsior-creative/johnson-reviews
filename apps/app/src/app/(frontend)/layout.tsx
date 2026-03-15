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
      style={{ backgroundColor: "#F9F7F4", color: "#352F2C" }}
    >
      <Providers>
        <SearchProvider>
          {/* Navbar — warm white top bar with gold/teal accent */}
          <div className="w-full bg-white border-b border-[#CFD6D9]">
            <div className="max-w-[1200px] mx-auto">
              <Navbar />
            </div>
          </div>
          <main className="flex-grow bg-[#F9F7F4]">
            {children}
          </main>
          <Footer />
        </SearchProvider>
      </Providers>
    </div>
  );
}
