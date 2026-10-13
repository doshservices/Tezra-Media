import React from "react";
import Link from "next/link";

import { getCurrentUser } from "./currentUser";

/**
 * The signed-in account block pinned to the foot of the sidebar: initials, name,
 * role and sign-out. Registered as admin.components.afterNavLinks.
 *
 * The role line is the point of it. An Editor who tries to publish gets a
 * refusal, and seeing "Editor" under their own name explains why before they
 * run into it.
 */
export const NavAccount: React.FC = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className="tz-account">
      <Link className="tz-account__identity" href="/admin/account">
        <span className="tz-avatar" aria-hidden="true">
          {user.initials}
        </span>
        <span className="tz-account__text">
          <span className="tz-account__name" title={user.name}>
            {user.name}
          </span>
          {user.roleLabel ? <span className="tz-account__role">{user.roleLabel}</span> : null}
        </span>
      </Link>

      {/* A plain link rather than Payload's LogOutButton, which is not a public
          export and would break quietly on upgrade. */}
      <Link
        className="tz-account__logout"
        href="/admin/logout"
        aria-label="Sign out"
        title="Sign out"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      </Link>
    </div>
  );
};

export default NavAccount;
