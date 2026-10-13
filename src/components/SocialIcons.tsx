import type { SocialPlatform } from "@/content/tezra";

/**
 * Social marks.
 *
 * lucide-react no longer ships brand icons, and rather than add a second icon
 * dependency for four glyphs these are drawn here as plain geometry — a rounded
 * square and a circle for Instagram, letterforms for the rest. They inherit
 * currentColor, so one component works on both the dark footer and the navy
 * contact panel.
 */

type Props = { size?: number };

function Instagram({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function X({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M4 4 L20 20" />
      <path d="M20 4 L4 20" />
    </svg>
  );
}

function LinkedIn({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.4 10.6 v6" />
      <circle cx="7.4" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.4 16.6 v-6 M11.4 13 a2.6 2.6 0 0 1 5.2 0 v3.6" />
    </svg>
  );
}

function Facebook({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.4 7.8 h-1.3 a2 2 0 0 0 -2 2 V21" />
      <path d="M9 13.2 h4.6" />
    </svg>
  );
}

function YouTube({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.6 9.6 l4.4 2.4 -4.4 2.4 z" />
    </svg>
  );
}

function TikTok({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <path d="M14.2 3 v10.4 a3.6 3.6 0 1 1 -3.6 -3.6" />
      <path d="M14.2 3 a4.6 4.6 0 0 0 4.6 4.6" />
    </svg>
  );
}

const marks: Record<SocialPlatform, (props: Props) => React.ReactElement> = {
  instagram: Instagram,
  x: X,
  linkedin: LinkedIn,
  facebook: Facebook,
  youtube: YouTube,
  tiktok: TikTok,
};

const NAMES: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  x: "X",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
};

const isKnown = (value: string): value is SocialPlatform => value in marks;

/**
 * The platform comes from the content manager as free-form text, so an entry
 * TEZRA adds for a service with no mark here still renders — a link with a
 * generic glyph, rather than a crash or a blank space.
 */
export function SocialMark({ platform, size = 18 }: { platform: string; size?: number }) {
  if (!isKnown(platform)) return <Globe size={size} />;
  const Mark = marks[platform];
  return <Mark size={size} />;
}

/** A readable name for an aria-label, falling back to the raw value. */
export const platformName = (platform: string): string =>
  isKnown(platform) ? NAMES[platform] : platform;

function Globe({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </svg>
  );
}
