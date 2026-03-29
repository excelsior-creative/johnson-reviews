"use client";

import React from "react";

export const SubscribeForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to email provider
  };

  return (
    <form className="flex gap-0 max-w-sm mx-auto" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your Email Address"
        className="flex-1 bg-transparent border border-white/30 border-r-0 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-[#f2ca50]"
        style={{ fontFamily: 'Inter, sans-serif' }}
      />
      <button
        type="submit"
        className="bg-[#f2ca50] hover:bg-[#d4af37] text-[#131313] px-6 py-3 text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0"
        style={{ fontFamily: '"Noto Serif", serif' }}
      >
        Subscribe
      </button>
    </form>
  );
};
