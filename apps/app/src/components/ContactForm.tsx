"use client";

import { Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type FormState = "idle" | "submitting" | "success" | "error";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "transparent",
  padding: "1rem 0",
  fontFamily: '"Noto Serif", serif',
  fontSize: "1rem",
  color: "#e5e2e1",
  border: "none",
  outline: "none",
};

const underlineStyle: React.CSSProperties = {
  borderBottom: "1px solid rgba(77,70,53,0.6)",
  transition: "border-color 0.3s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.625rem",
  textTransform: "uppercase",
  letterSpacing: "0.3em",
  color: "#99907c",
  marginBottom: "0.75rem",
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
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    },
    [name, email, message, executeRecaptcha]
  );

  if (state === "success") {
    return (
      <div
        className="p-12 text-center"
        style={{
          backgroundColor: "#20201f",
          boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
        }}
      >
        <span
          className="block mb-4"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#f2ca50",
          }}
        >
          Dispatch Received
        </span>
        <h3
          className="font-bold mb-6"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "2rem",
            color: "#e5e2e1",
          }}
        >
          Thank you.
        </h3>
        <p
          className="italic mb-10"
          style={{
            fontFamily: '"Noto Serif", serif',
            color: "#d3c5ad",
            lineHeight: "1.7",
          }}
        >
          Got it — your message is in. We&rsquo;ll get back to you within a
          few days.
        </p>
        <button
          onClick={() => setState("idle")}
          className="inline-flex items-center px-10 py-4 font-bold transition-transform hover:-translate-y-1"
          style={{
            border: "1px solid #99907c",
            color: "#f2ca50",
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label style={labelStyle}>Your Name</label>
        <div style={underlineStyle}>
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
        <div style={underlineStyle}>
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
        <div style={underlineStyle}>
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
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.75rem",
            color: "#ffb4ab",
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex items-center justify-center px-12 py-5 font-bold transition-transform duration-300 hover:-translate-y-1 disabled:opacity-60 disabled:hover:translate-y-0"
        style={{
          background: "linear-gradient(135deg, #f2ca50 0%, #d4af37 100%)",
          color: "#3c2f00",
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.3em",
        }}
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Dispatch"
        )}
      </button>
    </form>
  );
};
