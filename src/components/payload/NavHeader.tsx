import React from "react";
import Link from "next/link";

/** The sidebar lockup, in the band Payload reserves for its collapse control. */
export const NavHeader: React.FC = () => (
  <Link className="tz-nav-header" href="/admin" aria-label="TEZRA — dashboard">
    {/* eslint-disable-next-line @next/next/no-img-element -- a static brand asset at a fixed size */}
    <img className="tz-nav-mark" src="/brand/tezra-mark.png" alt="" width={252} height={253} />
    {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
    <img
      className="tz-nav-word tz-nav-word--light"
      src="/brand/tezra-wordmark.png"
      alt="TEZRA"
      width={538}
      height={164}
    />
    {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
    <img
      className="tz-nav-word tz-nav-word--dark"
      src="/brand/tezra-wordmark-light.png"
      alt=""
      aria-hidden="true"
      width={538}
      height={164}
    />
  </Link>
);

export default NavHeader;
