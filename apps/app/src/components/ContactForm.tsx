"use client";

import { Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormState = "idle" | "submitting" | "success" | "error";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  padding: "12px 0",
  fontFamily: "var(--font-serif)",
  fontSize: 18,
  color: "var(--color-ink)",
  border: "none",
  outline: "none",
};

const underlineStyle: React.CSSProperties = {
  borderBottom: "1px solid var(--color-rule-strong)",
  transition: "border-color 0.25s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.3em",
  color: "var(--color-ink-mute)",
  marginBottom: 12,
};

export const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setState("submitting");
      setErrorMessage("");

      try {
        let recaptchaToken = "";
        if (executeRecaptcha) {
          recaptchaToken = await executeRecaptcha("contact_form");
        }

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message, recaptchaToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        setState("success");
      } catch (err) {
        setState("error");
        setErrorMessage(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    },
    [name, email, message, executeRecaptcha],
  );

  if (state === "success") {
    return (
      <div className="fade-in text-center" style={{ padding: "48px 0" }}>
        <div className="kicker mb-4">Dispatch Received</div>
        <h3
          className="display"
          style={{ fontSize: 36, marginBottom: 16 }}
        >
          Thank you.
        </h3>
        <p
          className="italic mb-10 text-pretty"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--color-ink-dim)",
            lineHeight: 1.7,
            fontSize: 18,
            maxWidth: 480,
            margin: "0 auto 40px",
          }}
        >
          Got it — your message is in. We&rsquo;ll get back to you within a few
          days.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="btn"
        >
          Send Another <span className="arrow">→</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="kicker mb-2">Write In</div>

      <div>
        <label style={labelStyle}>Your Name</label>
        <div
          style={underlineStyle}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-rule-strong)")}
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={state === "submitting"}
            style={fieldStyle}
            placeholder="Full name"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <div
          style={underlineStyle}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-rule-strong)")}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={state === "submitting"}
            style={fieldStyle}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Your Dispatch</label>
        <div
          style={underlineStyle}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-accent)")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--color-rule-strong)")}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            disabled={state === "submitting"}
            style={{ ...fieldStyle, resize: "vertical" }}
            placeholder="Share the details of your enquiry."
          />
        </div>
      </div>

      {state === "error" && (
        <p
          className="meta"
          style={{ color: "var(--color-danger)", textTransform: "none", letterSpacing: 0, fontSize: 14, fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn btn-primary"
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Dispatch <span className="arrow">→</span>
          </>
        )}
      </button>
    </form>
  );
};
