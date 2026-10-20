import Image from "next/image";
import { FONT_BODY, NAVY } from "./tokens";

/** The group lockup: TEZRA's mark beside the name. Reversed variant for dark backgrounds. */
export function BrandLockup({
  tone = "dark",
  markSize = 30,
  textSize = 29,
}: {
  tone?: "dark" | "light";
  markSize?: number;
  textSize?: number;
}) {
  const onDark = tone === "light";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        /* 0.24 of the mark — the spacing in TEZRA's own artwork. */
        gap: `${Math.round(markSize * 0.24)}px`,
      }}
    >
      <Image
        src={onDark ? "/brand/tezra-mark-light.png" : "/brand/tezra-mark.png"}
        alt=""
        width={markSize}
        height={markSize}
        priority
        style={{ display: "block", flexShrink: 0 }}
      />
      {/* Stand-in for the wordmark: the supplied artwork is cropped into the letters. */}
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: `${textSize}px`,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          lineHeight: 1,
          color: onDark ? "#FFFFFF" : NAVY,
        }}
      >
        Tezra
      </span>
    </span>
  );
}
