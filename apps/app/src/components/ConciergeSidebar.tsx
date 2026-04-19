import React from "react";
import { MapPin, Tag, Clock, Utensils, ExternalLink } from "lucide-react";

interface ConciergeSidebarProps {
  /** Venue address — if present, renders the address row. */
  address?: string | null;
  /** Price tier: "$", "$$", "$$$", "$$$$" — if present, renders the price row. */
  priceTier?: string | null;
  /** Freeform hours string — if present, renders the hours row. */
  hours?: string | null;
  /** Category / cuisine / venue-type — if present, renders the category row. */
  categoryLabel?: string | null;
  /** Outbound venue URL — if present, CTA button becomes "Visit site". */
  websiteUrl?: string | null;
  /** Heading override. Defaults to "The Details". */
  heading?: string;
}

/**
 * Editorial "Concierge" sidebar for a review detail page.
 * Reference: /reference/design/johnson_reviews_review_detail_gold_edition/
 *
 * Renders nothing if no fields are populated — graceful degradation
 * until Posts collection schema adds these fields.
 *
 * Rendered as a sticky card in the 4-col sidebar column on desktop.
 */
export const ConciergeSidebar = ({
  address,
  priceTier,
  hours,
  categoryLabel,
  websiteUrl,
  heading = "The Details",
}: ConciergeSidebarProps) => {
  const hasAnyField = Boolean(
    address || priceTier || hours || categoryLabel || websiteUrl
  );
  if (!hasAnyField) return null;

  return (
    <div className="lg:sticky lg:top-28 space-y-8">
      <div
        className="p-8 md:p-10"
        style={{
          backgroundColor: "#20201f",
          boxShadow: "0 48px 100px rgba(0,0,0,0.3)",
        }}
      >
        <h3
          className="font-bold mb-8"
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "1.5rem",
            color: "#e5e2e1",
          }}
        >
          {heading}
        </h3>

        <ul className="space-y-7">
          {address && (
            <Row icon={<MapPin className="w-5 h-5" />} label="Address" value={address} />
          )}
          {priceTier && (
            <Row icon={<Tag className="w-5 h-5" />} label="Price" value={priceTier} />
          )}
          {hours && (
            <Row icon={<Clock className="w-5 h-5" />} label="Hours" value={hours} />
          )}
          {categoryLabel && (
            <Row
              icon={<Utensils className="w-5 h-5" />}
              label="Category"
              value={categoryLabel}
            />
          )}
        </ul>

        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-10 text-center py-5 gilded-gradient transition-transform hover:-translate-y-0.5"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#3c2f00",
            }}
          >
            <span className="inline-flex items-center gap-2">
              Visit the Site
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span style={{ color: "#f2ca50" }} className="mt-0.5 flex-shrink-0">
        {icon}
      </span>
      <div className="min-w-0">
        <p
          className="mb-1"
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#99907c",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: '"Noto Serif", serif',
            fontSize: "0.9rem",
            color: "#d0c5af",
            lineHeight: "1.5",
          }}
        >
          {value}
        </p>
      </div>
    </li>
  );
}
