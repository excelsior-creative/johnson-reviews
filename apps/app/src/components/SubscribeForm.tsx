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
        placeholder="Your email address"
        className="flex-1 bg-transparent border border-[#4d4635] border-r-0 text-[#e5e2e1] placeholder-[#e5e2e1]/40 px-4 py-3 text-sm focus:outline-none focus:border-[#f2ca50] transition-colors"
        style={{ fontFamily: '"Inter", sans-serif' }}
      />
      <button
        type="submit"
        className="gilded-gradient text-[#3c2f00] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all flex-shrink-0 hover:translate-y-[-1px]"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        Subscribe
      </button>
    </form>
  );
};
