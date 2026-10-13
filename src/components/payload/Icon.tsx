import React from "react";

/**
 * The square TEZRA mark, for the slots Payload fills with a small glyph — the
 * breadcrumb home link and the collapsed sidebar.
 *
 * Sized by its container rather than fixed: those slots differ in size, and the
 * breadcrumb one clips overflow, so a hardcoded width loses an edge there.
 */
export const Icon: React.FC = () => (
  // eslint-disable-next-line @next/next/no-img-element -- a static brand asset; next/image adds nothing at this size
  <img className="tz-icon" src="/brand/tezra-mark.png" alt="TEZRA" width={252} height={253} />
);

export default Icon;
