import React from "react";

/** The square mark. Sized by its container — the breadcrumb slot clips overflow. */
export const Icon: React.FC = () => (
  // eslint-disable-next-line @next/next/no-img-element -- a static brand asset; next/image adds nothing at this size
  <img className="tz-icon" src="/brand/tezra-mark.png" alt="Tezra" width={174} height={174} />
);

export default Icon;
