import React from "react";

/** The lockup on the admin login screen, from TEZRA's own files. */
export const Logo: React.FC = () => (
  <span className="tz-logo">
    {/* eslint-disable-next-line @next/next/no-img-element -- a static brand asset at a fixed size; next/image adds nothing */}
    <img className="tz-logo__mark" src="/brand/tezra-mark.png" alt="" width={252} height={253} />
    {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
    <img
      className="tz-logo__word tz-logo__word--light"
      src="/brand/tezra-wordmark.png"
      alt="TEZRA"
      width={538}
      height={164}
    />
    {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
    <img
      className="tz-logo__word tz-logo__word--dark"
      src="/brand/tezra-wordmark-light.png"
      alt=""
      aria-hidden="true"
      width={538}
      height={164}
    />
  </span>
);

export default Logo;
