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
          badge="About"
          title="The Johnsons, on the road."
          subtitle="Johnson Reviews is Brandon Johnson's running log of restaurants, hotels, and family travel — written down so other families can decide what's worth the drive."
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
              Hi — I&rsquo;m Brandon. I&rsquo;m a Google Local Guide (Level 10,
              500+ reviews, 27,000+ photos shared) based in Orange County. The
              Johnsons travel a lot, eat out more than we probably should, and
              for years I&rsquo;ve been writing all of it down on Google Maps.
              This site is the long-form version of those reviews — the ones
              with enough detail to actually help another family plan a trip,
              pick a restaurant, or skip a place we wished we&rsquo;d skipped.
            </p>
            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#e5e2e1",
              }}
            >
              The rules are simple. We pay for our own meals and stays. We only
              review places we&rsquo;ve actually been. We tell you what worked
              and what didn&rsquo;t, with the kid logistics other families ask
              about — parking, kid menu, wait time, stroller-friendly,
              reservation needed.
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
              If a place is good, we say so. If a place fell short, we say that
              too — with context, and without being mean about it.
            </blockquote>

            <p
              style={{
                fontFamily: '"Noto Serif", serif',
                fontSize: "1.125rem",
                lineHeight: "1.8",
                color: "#e5e2e1",
              }}
            >
              Most of what you&rsquo;ll find here is centered on Orange County
              and SoCal — Dana Point, Irvine, Laguna, San Juan Capistrano,
              Anaheim — plus the places we travel to often: Las Vegas,
              Disneyland, San Diego, Puerto Vallarta. Reviews are tagged by
              location and by category so you can browse the way you actually
              think about a trip.
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
                  How we work
                </h3>
                <ul className="space-y-4">
                  {[
                    "We pay for every meal and stay",
                    "We only review places we've been",
                    "Family-friendly notes on every post",
                    "Honest, never mean",
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
                  Google Local Guide
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
                  Level 10
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: '"Noto Serif", serif',
                    fontSize: "0.85rem",
                    color: "#d3c5ad",
                    fontStyle: "italic",
                  }}
                >
                  500+ reviews · 27,000+ photos
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
                Get in touch
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
