import type { Access, FieldAccess } from "payload";

/**
 * Role-based access, as TEZRA specified (feedback 1.8).
 *
 *   Administrator  full content management and publishing rights
 *   Editor         create and edit content; publishing is controlled by role
 *
 * So an Editor can write and save drafts but cannot set anything live, and
 * cannot edit something already published. That last part matters: without it
 * "cannot publish" would be easy to work around by editing a live page.
 */

type User = { role?: "administrator" | "editor" } | null | undefined;

const roleOf = (user: User) => user?.role;

export const isAdmin: Access = ({ req }) => roleOf(req.user as User) === "administrator";

export const isSignedIn: Access = ({ req }) => Boolean(req.user);

/** Administrators edit anything; editors edit anything not yet published. */
export const canEdit: Access = ({ req }) => {
  const role = roleOf(req.user as User);
  if (role === "administrator") return true;
  if (role === "editor") return { _status: { not_equals: "published" } };
  return false;
};

/** Only administrators may change the publish state. */
export const onlyAdminField: FieldAccess = ({ req }) =>
  roleOf(req.user as User) === "administrator";

/**
 * Anyone may read published content; signed-in staff also see drafts, so an
 * editor can preview their own work before an administrator publishes it.
 */
export const publishedOrSignedIn: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
