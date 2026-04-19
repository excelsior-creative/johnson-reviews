import Header from "@/components/Header";
import Link from "next/link";

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div
      className="pt-28 md:pt-40 pb-24 md:pb-32"
      style={{ backgroundColor: "#131313" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <Header
          badge="The Masthead"
          title="The Standard of Taste."
          subtitle="Johnson Reviews is the private ledger of a lifelong field critic — a record of the kitchens, counters, and corners worth crossing a city for."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 mt-16">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-10">
            <p
              className="drop-cap"
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#e5e2e1",
              }}
            >
              Established in 1984 as a pocket notebook and refined over four
              decades into this living archive, Johnson Reviews is a record of
              every establishment that met — or failed to meet — the standard.
              Each critique is written as it was eaten, and each rating is
              earned, never granted.
            </p>
            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#e5e2e1",
              }}
            >
              The mission is simple: elevate the standard of taste through
              rigorous analysis, an uncompromising palate, and a deep respect
              for the craft of hospitality. We visit anonymously, we pay our
              own tabs, and we answer only to the reader.
            </p>

            <blockquote
              style={{
                fontFamily: '"Noto Serif", serif',
                fontStyle: "italic",
                fontSize: "1.5rem",
                color: "#f2ca50",
                borderLeft: "4px solid #d4af37",
                padding: "1rem 0 1rem 2rem",
                margin: "2rem 0",
                lineHeight: "1.5",
              }}
            >
              We do not merely eat; we witness the convergence of technique,
              tradition, and audacity.
            </blockquote>

            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#e5e2e1",
              }}
            >
              The publication rates across four axes — gastronomy, ambience,
              service, and value — and refuses to soften judgement for the
              sake of accommodation. What you read here is what was plated,
              poured, and paid for.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div
              className="p-10 space-y-10"
              style={{
                backgroundColor: "#20201f",
                boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
              }}
            >
              <div>
                <h3
                  className="font-bold mb-6"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "1.5rem",
                    color: "#e5e2e1",
                  }}
                >
                  The Pillars
                </h3>
                <ul className="space-y-4">
                  {[
                    "Anonymous Visits",
                    "Tabs Paid In Full",
                    "Four-Axis Rating",
                    "No Courtesy Soft-Pedalling",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: '"Noto Serif", serif',
                        fontSize: "0.95rem",
                        color: "#d3c5ad",
                        lineHeight: "1.6",
                      }}
                    >
                      <span
                        className="flex-shrink-0 mt-[0.4em]"
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#f2ca50",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span
                  className="block mb-3"
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#99907c",
                  }}
                >
                  Established
                </span>
                <p
                  className="font-bold"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "2.25rem",
                    color: "#f2ca50",
                    lineHeight: "1",
                  }}
                >
                  1984
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-full py-5 font-bold transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(to right, #d4af37, #f2ca50)",
                  color: "#3c2f00",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                }}
              >
                Request Invitation
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
