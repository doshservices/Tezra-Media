import React from "react";
import Link from "next/link";

/** The sidebar lockup, in the band Payload reserves for its collapse control. */
export const NavHeader: React.FC = () => (
  <Link className="tz-nav-header" href="/admin" aria-label="Tezra — dashboard">
    {/* eslint-disable-next-line @next/next/no-img-element -- a static brand asset at a fixed size */}
    <img className="tz-mark tz-mark--light" src="/brand/tezra-mark.png" alt="" width={174} height={174} />
    {/* eslint-disable-next-line @next/next/no-img-element -- as above */}
    <img className="tz-mark tz-mark--dark" src="/brand/tezra-mark-light.png" alt="" aria-hidden="true" width={174} height={174} />
    <span className="tz-nav-word">Tezra</span>
  </Link>
);

export default NavHeader;
