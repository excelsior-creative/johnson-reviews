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
        className="flex-1 bg-transparent border border-[#CFD6D9]/30 border-r-0 text-[#F9F7F4] placeholder-[#CFD6D9]/35 px-4 py-3 text-xs focus:outline-none focus:border-[#52A3A9]/60 transition-colors"
        style={{ fontFamily: '"Lato", system-ui, sans-serif', fontWeight: 300 }}
      />
      <button
        type="submit"
        className="bg-[#52A3A9] hover:bg-[#3d8c92] text-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors flex-shrink-0"
        style={{ fontFamily: '"Lato", system-ui, sans-serif' }}
      >
        Subscribe
      </button>
    </form>
  );
};
