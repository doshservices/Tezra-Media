import React from "react";

/**
 * One line under the lockup on the sign-in screen.
 *
 * Someone arriving at /admin from a link in an email should be able to tell what
 * they are signing in to before they type a password.
 */
export const BeforeLogin: React.FC = () => (
  <p className="tz-login-note">Content manager for the TEZRA website</p>
);

export default BeforeLogin;
