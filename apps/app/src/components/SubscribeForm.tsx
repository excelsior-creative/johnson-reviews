"use client";

import React, { useState } from "react";

export const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="fade-in italic"
        style={{
          padding: "20px 0",
          fontFamily: "var(--font-serif)",
          fontSize: 20,
          color: "var(--color-accent)",
        }}
      >
        Welcome to the Dispatch. See you Sunday.
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div
        className="relative"
        style={{ borderBottom: "1px solid var(--color-rule-strong)" }}
        onFocus={(e) =>
          (e.currentTarget.style.borderBottomColor = "var(--color-accent)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderBottomColor = "var(--color-rule-strong)")
        }
      >
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent py-3 focus:outline-none italic"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            color: "var(--color-ink)",
          }}
        />
      </div>
      <button type="submit" className="btn btn-primary self-start">
        Subscribe to the Dispatch <span className="arrow">→</span>
      </button>
    </form>
  );
};
