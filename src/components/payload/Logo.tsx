import React from "react";

/** The lockup on the admin login screen. Mark from TEZRA's artwork, name set alongside it. */
export const Logo: React.FC = () => (
  <span className="tz-logo">
    {/* eslint-disable-next-line @next/next/no-img-element -- a static brand asset at a fixed size; next/image adds nothing */}
    <img className="tz-mark tz-mark--light" src="/brand/tezra-mark.png" alt="" width={174} height={174} />
    {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
    <img className="tz-mark tz-mark--dark" src="/brand/tezra-mark-light.png" alt="" aria-hidden="true" width={174} height={174} />
    <span className="tz-logo__word">Tezra</span>
  </span>
);

export default Logo;
