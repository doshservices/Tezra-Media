import type { SocialPlatform } from "@/content/tezra";

/** Social marks, drawn here rather than pulling in a second icon dependency. */

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

/** The real LinkedIn glyph — a social link only works if it is recognised at a glance. */
function LinkedIn({ size = 18 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
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

/** An unknown platform still renders, with a generic glyph rather than a crash. */
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
