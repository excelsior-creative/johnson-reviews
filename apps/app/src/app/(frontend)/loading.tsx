import React from "react";

export default function Loading() {
  return (
    <div
      className="container-jr"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          aria-hidden
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid var(--color-rule-strong)",
            borderTopColor: "var(--color-accent)",
            margin: "0 auto",
            animation: "spin 0.9s linear infinite",
          }}
        />
        <div className="meta" style={{ marginTop: 20 }}>
          Setting the page…
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes spin { to { transform: rotate(360deg); } }`,
          }}
        />
      </div>
    </div>
  );
}
