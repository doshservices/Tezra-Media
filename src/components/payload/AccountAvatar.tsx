import React from "react";

import { getCurrentUser } from "./currentUser";

/**
 * The avatar in the app header. Payload's default is a generic silhouette; this
 * shows the same initials as the sidebar block so the two agree.
 */
export const AccountAvatar: React.FC = async () => {
  const user = await getCurrentUser();

  return (
    <span className="tz-avatar tz-avatar--header" aria-hidden="true">
      {user?.initials ?? ""}
    </span>
  );
};

export default AccountAvatar;
