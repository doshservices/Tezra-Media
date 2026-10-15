import React from "react";

import { getCurrentUser } from "./currentUser";

/** Header avatar. Same initials as the sidebar block, so the two agree. */
export const AccountAvatar: React.FC = async () => {
  const user = await getCurrentUser();

  return (
    <span className="tz-avatar tz-avatar--header" aria-hidden="true">
      {user?.initials ?? ""}
    </span>
  );
};

export default AccountAvatar;
