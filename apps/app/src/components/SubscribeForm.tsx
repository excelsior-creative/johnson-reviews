"use client";

import React from "react";

export const SubscribeForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to email provider
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div
        className="relative"
        style={{ borderBottom: "1px solid rgba(77,70,53,0.6)" }}
      >
        <input
          type="email"
          placeholder="Your Email Address"
          className="w-full bg-transparent py-4 focus:outline-none"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "1.125rem",
            color: "#e5e2e1",
          }}
          onFocus={(e) =>
            (e.currentTarget.parentElement!.style.borderBottomColor = "#f2ca50")
          }
          onBlur={(e) =>
            (e.currentTarget.parentElement!.style.borderBottomColor =
              "rgba(77,70,53,0.6)")
          }
        />
      </div>
      <button
        type="submit"
        className="inline-flex self-start items-center px-12 py-5 font-bold transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)",
          color: "#3c2f00",
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
        }}
      >
        Request Invitation
      </button>
    </form>
  );
};
